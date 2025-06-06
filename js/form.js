//class contato
class contato {
    constructor(nome, email, telefone, tipoContato) { 
        this.nome = nome;
        this.email = email;
        this.telefone = telefone;
        this.tipoContato = tipoContato; 
    }
}

function validateForm(form) {
    let isValid = true;

    // Validação do campo Nome
    const nomeInput = document.getElementById("nomeid");
    const nomeError = document.getElementById("nomeError");
    // Regex para aceitar apenas letras (maiúsculas e minúsculas), espaços e caracteres acentuados comuns
    const nomeRegex = /^[A-Za-z\u00C0-\u017F\s]+$/; 
    if (nomeInput.value.trim() === "") {
        nomeError.textContent = "Por favor, preencha o seu nome.";
        isValid = false;
    } else if (!nomeRegex.test(nomeInput.value)) {
        nomeError.textContent = "Por favor, insira um nome válido (somente letras).";
        isValid = false;
    } else {
        nomeError.textContent = "";
    }

    // Validação do campo Email
    const emailInput = document.getElementById("emailid");
    const emailError = document.getElementById("emailError");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailInput.value.trim() === "") {
        emailError.textContent = "Por favor, preencha o seu e-mail.";
        isValid = false;
    } else if (!emailRegex.test(emailInput.value)) {
        emailError.textContent = "Por favor, insira um e-mail válido.";
        isValid = false;
    } else {
        emailError.textContent = "";
    }

    // Validação do campo Telefone
    const telefoneInput = document.getElementById("telefoneid");
    const telefoneError = document.getElementById("telefoneError");
    const telefoneRegex = /^[0-9]{10,11}$/; 
    if (telefoneInput.value.trim() === "") {
        telefoneError.textContent = "Por favor, preencha o seu telefone.";
        isValid = false;
    } else if (!telefoneRegex.test(telefoneInput.value)) {
        telefoneError.textContent = "Por favor, insira um número de telefone válido (somente números, 10 ou 11 dígitos).";
        isValid = false;
    } else {
        telefoneError.textContent = "";
    }

    // Validação da seleção do campo Contato
    const contatoSelect = document.getElementById("contatoid");
    const contatoError = document.getElementById("contatoError");
    if (contatoSelect.value === "") { 
        contatoError.textContent = "Por favor, selecione uma opção de contato.";
        isValid = false;
    } else {
        contatoError.textContent = "";
    }

    if (isValid) {
        let data = new contato(
            nomeInput.value,
            emailInput.value,
            telefoneInput.value,
            contatoSelect.value
        );
        console.log(data); 
        Enviar(nomeInput.value); 
    }

    return false; 
}

function Enviar(nome) {
    alert('Obrigado sr(a) ' + nome + ' os seus dados foram encaminhados com sucesso');
}