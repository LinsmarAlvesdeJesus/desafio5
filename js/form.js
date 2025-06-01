
//class contato

class contato {
    constructor(nome, email, telefone, elogio, reclamacao, solicitacao) { 
        this.nome = nome;
        this.email = email;
        this.telefone = telefone;
        this.elogio = elogio;
        this.reclamacao = reclamacao;
        this.solicitacao = solicitacao; 
    }
}
function Post(form) {

  let data = new contato(form.elements.namedItem("NOME").value, 
            form.elements.namedItem("EMAIL").value, 
            form.elements.namedItem("TELEFONE").value, 
            form.elements.namedItem("ELOGIO").value, 
            form.elements.namedItem("RECLAMAÇÃO").value);
            form.elements.namedItem("SOLICITAÇÃO").value,
  
}

function Enviar() {

    var nome = document.getElementById("nomeid");

    if (nome.value != "") {
        alert('Obrigado sr(a) ' + nome.value + ' os seus dados foram encaminhados com sucesso');
    }

}