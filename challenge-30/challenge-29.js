(function(window) {
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
   function app()
   {
   var ajax = new XMLHttpRequest;
   ajax.open('GET','/company.json');
   ajax.send();
   var $form = new DOM('[data-js="form"]');
   var h1CompanyName = document.createElement('h1');
   var $inputs =  new DOM('[data-js="inputForm"]');
   var table = new DOM('[data-js = "carTable"]');
   ajax.addEventListener('readystatechange',handleClickAjax,false);
   $form.on('submit',handleClickSubmit);
   function handleClickSubmit(event){
        event.preventDefault();
        AddValueonTable();
        clearInputs();
   }

   function handleClickAjax(){
     if(isRequestOk()){
        insertCompanyName();

     }
   }

   function isRequestOk(){
     return ajax.readyState === 4 && ajax.status === 200;
   }

   function insertCompanyName(){
    var h1Text = document.createTextNode(JSON.parse(ajax.responseText).name + '-' + JSON.parse(ajax.responseText).phone);
    h1CompanyName.appendChild(h1Text);
    document.body.insertBefore(h1CompanyName,$form.get());
   }

   function AddValueonTable(){
           var tr = createLineOnTable()
            $inputs.forEach(function(input,index,arr){
              var td = document.createElement('td');
              if(index === 4)
              {
                var $image = document.createElement('img');
                $image.setAttribute('src',input.value);
                td.appendChild($image);
              }
              else
              {
              td.textContent = input.value
              }
            tr.appendChild(td);

            })
            table.get().appendChild(tr);
   }

   function createLineOnTable(){
        return  document.createElement('tr');

   }

   function clearInputs(){
       $inputs.forEach(function(input){
            input.value = '';
       })
   }
  }
   app();

})(window);
