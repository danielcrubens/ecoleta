
function populateUFs() {
  const ufSelect = document.querySelector("select[name=uf]")

  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
  .then( res => res.json() )
  .then( states => {

      for( const state of states ) {
          ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
      }

  })
}

populateUFs()


function getCities(event) {
  const citySelect = document.querySelector("[name=city]")
  const stateInput = document.querySelector("[name=state]")

  const ufValue = event.target.value

  const indexOfSelectedState = event.target.selectedIndex
  stateInput.value = event.target.options[indexOfSelectedState].text


  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

  citySelect.innerHTML ="<option value>Selecione a Cidade</option>" /*deixando o campo em branco ante de carregar os dados*/
  citySelect.disabled = true

  fetch(url)
  .then( res => res.json() )
  .then( cities => {
      for( const city of cities ) {
          citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
      }

      citySelect.disabled = false
  } )
}

document
.querySelector("select[name=uf]")
.addEventListener("change", getCities)

//Itens de coleta
//pegar todos os li's
const itemsToCollect = document.querySelectorAll('.items-grid li');
for (const item of itemsToCollect) {
  item.addEventListener('click', handleSelectedItem);
}

const collectedItems = document.querySelector('[name=items]');
let selectedItems = [];

function handleSelectedItem(event) {
  const itemLi = event.target;
  const itemId = event.target.dataset.id;
  itemLi.classList.toggle('selected');//adicionar ou remover uma classe com js
  //verifica se existem itens selecionados, se sim
  //pegar os itens selecionados
  const alreadeSelected = selectedItems.indexOf(itemId);
  //se já estiver selecionado
  if (alreadeSelected >= 0) {
    //tirar da selecao
    const filteredItems = selectedItems.filter((item) => {
      return item != itemId;
    });
    selectedItems = filteredItems;
  } else {
    //se nao estiver selecionado
    //adicionar a seleção
    selectedItems.push(itemId);
  }
  //atualizar o campo escondido com os itens seleciionados
  collectedItems.value = selectedItems;
}












