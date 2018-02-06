(function (window) {
  'use strict';

  /*
  Vamos estruturar um pequeno app utilizando módulos.
  Nosso APP vai ser um cadastro de carros. Vamos fazê-lo por partes.
  A primeira etapa vai ser o cadastro de veículos, de deverá funcionar da
  seguinte forma:
  - No início do arquivo, deverá ter as informações da sua empresa - nome e
  telefone (já vamos ver como isso vai ser feito)
  - Ao abrir a tela, ainda não teremos carros cadastrados. Então deverá ter
  um formulário para cadastro do carro, com os seguintes campos:
    - Imagem do carro (deverá aceitar uma URL)
    - Marca / Modelo
    - Ano
    - Placa
    - Cor
    - e um botão "Cadastrar"
  Logo abaixo do formulário, deverá ter uma tabela que irá mostrar todos os
  carros cadastrados. Ao clicar no botão de cadastrar, o novo carro deverá
  aparecer no final da tabela.
  Agora você precisa dar um nome para o seu app. Imagine que ele seja uma
  empresa que vende carros. Esse nosso app será só um catálogo, por enquanto.
  Dê um nome para a empresa e um telefone fictício, preechendo essas informações
  no arquivo company.json que já está criado.
  Essas informações devem ser adicionadas no HTML via Ajax.
  Parte técnica:
  Separe o nosso módulo de DOM criado nas últimas aulas em
  um arquivo DOM.js.
  E aqui nesse arquivo, faça a lógica para cadastrar os carros, em um módulo
  que será nomeado de "app".
  */
  function app() {
    var ajaxForCompany = new XMLHttpRequest;
    ajaxForCompany.open('GET', 'JS/company.json');
    ajaxForCompany.send();
    var $form = new DOM('[data-js="form"]');
    var h1CompanyName = document.createElement('h1');
    var $inputs = new DOM('[data-js="inputForm"]');
    var $tableBody = new DOM('[data-js = "carTable"]').get();
    var ajaxGetCar = new XMLHttpRequest;
    ajaxGetCar.open('GET', 'http://localhost:3000/car');
    ajaxGetCar.send();
    ajaxGetCar.onreadystatechange = getValuesFromServer;
    ajaxForCompany.addEventListener('readystatechange', handleClickAjax, false);
    $form.on('submit', handleClickSubmit);

    function getValuesFromServer() {
      if (isRequestOk(ajaxGetCar)) {
          var allCars = JSON.parse(ajaxGetCar.responseText);
          if(allCars.length === 0)
            return;
          allCars.forEach(function (car) {
            addValuesOnTable(car.brandModel,car.year,car.plate,car.color,car.image);
        })
       
      }
    }
    getValuesFromServer();

    function handleClickSubmit(event) {
      event.preventDefault();
      saveValueOnServer();
      getValueFromInputs();
      clearInputs();
    }

    function handleClickAjax() {
      if (isRequestOk(ajaxForCompany)) {
        insertCompanyName();

      }
    }

    function isRequestOk(ajax) {
      return ajax.readyState === 4 && ajax.status === 200;
    }

    function insertCompanyName() {
      var h1Text = document.createTextNode(JSON.parse(ajaxForCompany.responseText).name + '-' + JSON.parse(ajaxForCompany.responseText).phone);
      h1CompanyName.appendChild(h1Text);
      document.body.insertBefore(h1CompanyName, $form.get());
    }

    function saveValueOnServer() {
      var ajaxPostCar = new XMLHttpRequest;
      ajaxPostCar.open('POST', 'http://localhost:3000/car');
      ajaxPostCar.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      var brandModel = new DOM('[data-js1="input-brandModel"]').get().value;
      var year = new DOM('[data-js1="input-year"]').get().value;
      var plate = new DOM('[data-js1="input-plate"]').get().value;
      var color = new DOM('[data-js1="input-color"]').get().value;
      var image = new DOM('[data-js1="input-image"]').get().value;
      ajaxPostCar.send('brandModel=' + brandModel + '&year=' + year + '&plate=' + plate + '&color=' + color + '&image=' + image + '');
    }

    function addValuesOnTable(brandModel,year,plate,color,image) {
      var $fragment = document.createDocumentFragment();
      var $tr = createLineOnTable();
      var $tdBrandModel = createElementTd();
      var $tdYear = createElementTd();
      var $tdPlate = createElementTd();
      var $tdColor = createElementTd();
      var $tdImage = createElementTd();
      var $image = document.createElement('img');

      $image.setAttribute('src', image);
      $tdImage.appendChild($image);
      $tdPlate.setAttribute('data-js','car-plate');

      $tdBrandModel.textContent = brandModel;
      $tdYear.textContent = year;
      $tdPlate.textContent = plate;
      $tdColor.textContent = color;

      $tr.appendChild($tdBrandModel);
      $tr.appendChild($tdYear);
      $tr.appendChild($tdPlate);
      $tr.appendChild($tdColor);
      $tr.appendChild($tdImage);
      $tr.innerHTML += addButtonRemoveOnLine()
      $fragment.appendChild($tr);
      $tableBody.appendChild($fragment);
      addListenerOnButtonRemove()
    }

    function createElementTd(){
      return document.createElement('td');

    }

    function getValueFromInputs(){
      var brandModel = new DOM('[data-js1="input-brandModel"]').get().value;
      var year = new DOM('[data-js1="input-year"]').get().value;
      var plate = new DOM('[data-js1="input-plate"]').get().value;
      var color = new DOM('[data-js1="input-color"]').get().value;
      var image = new DOM('[data-js1="input-image"]').get().value;
      addValuesOnTable(brandModel,year,plate,color,image);

    }

    function addButtonRemoveOnLine() {
      return '<td><button data-js="button-remove">Remover</button></td>';
    }

    function addListenerOnButtonRemove() {
      var $buttonRemove = new DOM('[data-js="button-remove"]');
      $buttonRemove.on('click', removeLineFromTable);
    }

    function removeLineFromTable() {
      var LineToBeRemoved = this.parentNode.parentNode;
      var PlateContent = LineToBeRemoved.children[2].textContent;
      removeLineFromServer(PlateContent)
      $tableBody.removeChild(LineToBeRemoved);
    }

    function removeLineFromServer(PlateContent){
      var ajaxForDelete = new XMLHttpRequest;
      ajaxForDelete.open('DELETE','http://localhost:3000/car');
      ajaxForDelete.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      ajaxForDelete.send('plate=' + PlateContent);
    }

    function createLineOnTable() {
      return document.createElement('tr');

    }

    function clearInputs() {
      $inputs.forEach(function (input) {
        input.value = '';
      })
    }
  
  }
  app();

})(window);
