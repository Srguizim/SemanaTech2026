function mudarTema() {
  document.body.classList.toggle('escuro');
}
function validarNome() {
    let nome = document.getElementById("nome").value;
    let mensagem = document.getElementById("mensagemNome");

    if(nome.length >= 3){
        mensagem.textContent = "Nome válido.";
        mensagem.className = "valido";
    } else {
        mensagem.textContent = "Nome inválido. Deve ter pelo menos 3 caracteres.";
        mensagem.className = "invalido";
    }
}
function validarEmail(){
    let email = document.getElementById("email").value;
    let mensagem = document.getElementById("mensagemEmail");

    if(email.includes("@")){
        mensagem.textContent = "Email válido.";
        mensagem.className = "valido";
    } else {
        mensagem.textContent = "Email inválido.";
        mensagem.className = "invalido";
    }
}

function mostrarSenha() {
    let senha = document.getElementById("senha");
    if (senha.type === "password") {
        senha.type = "text";
    } else {
        senha.type = "password";
    }
}

function trocarImagem(imagem) {

    const imagemPrincipal = document.getElementById("imagemPrincipal");

    imagemPrincipal.src = imagem.src;
}


function salvarDados(){
    let nome = document.querySelector("#nome")
    let email = document.querySelector("#email")
    let idade = document.querySelector("#idade")
    let cidade = document.querySelector("#cidade")
    let msgConfirmacao = document.querySelector("#msgConfirmacao")

    let dadosPerfil = document.querySelector("#dados")

    dadosPerfil.innerHTML = `
    <h2> Meu perfil </h2>
    <p> Nome: ${nome.value} </p>
    <p> Email: ${email.value} </p>
    <p> Idade: ${idade.value} </p>
    <p> Cidade: ${cidade.value} </p>
    `;

    msgConfirmacao.style.display = "block";

    setTimeout(function() {

        msgConfirmacao.style.display = "none"

    }, 5000);
}

