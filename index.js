'use strict';

const limpaForm = (endereco) =>{

    document.getElementById('endereco').value = '';

    document.getElementById('bairro').value = '';

    document.getElementById('cidade').value = '';

    document.getElementById('estado').value = '';
}


const inserirForm = (endereco) =>{
    document.getElementById('endereco').value = endereco.logradouro;

    document.getElementById('bairro').value = endereco.bairro;

    document.getElementById('cidade').value = endereco.localidade;

    document.getElementById('estado').value = endereco.uf;
}


const eNumero = (numero) => /^[0-9]+$/.test(numero);

const validaCep = (cep) => cep.length == 8 && eNumero(cep); 

const encontraCep = async() => {

    limpaForm();
    
    const cep = document.getElementById('cep').value;

    const url = `https://viacep.com.br/ws/${cep}/json/`;

    if (validaCep(cep)){

        const dados = await fetch(url);

        const endereco = await dados.json();

        if (endereco.hasOwnProperty('erro')){

            document.getElementById('endereco').value = 'CEP não encontrado!';

        }else {

            inserirForm(endereco);
        }
    }else{

        document.getElementById('endereco').value = 'CEP incorreto!';
    }
     
}

document.getElementById('cep').addEventListener('focusout', encontraCep);