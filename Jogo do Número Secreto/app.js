let listaDosNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tenativas = 1;

function exibirTextoNaTela (tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, "Brazilian Portuguese Female", {rate:1.2});
}

function exibirMensagemInicial() {
    exibirTextoNaTela("h1", "Jogo do número secreto");
    exibirTextoNaTela("p", "Escolha um número entre 1 e 10");
}

exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector("input").value;
    if (chute == numeroSecreto) {
        exibirTextoNaTela("h1", "Parabéns você acertou!");
        let numeroTentativas = tenativas > 1 ? "tentativas" : "tentativa";
        let mensagemTentativas = `Você descobriu o número secreto com ${tenativas} ${numeroTentativas}`;
        exibirTextoNaTela("p", mensagemTentativas);
        document.getElementById("reiniciar").removeAttribute("disabled");
    }else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela("p", "O número secreto é menor");
        } else {
            exibirTextoNaTela("p", "O número secreto é maior");
        }
        tenativas++;
        limparCampo();
    }
}

function limparCampo() {
    chute = document.querySelector("input");
    chute.value = "";
}

function gerarNumeroAleatorio() {
   let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
   let quantidadeDeNumerosNaLista = listaDosNumerosSorteados.length;

   if  (quantidadeDeNumerosNaLista == numeroLimite) {
    listaDosNumerosSorteados = [];
   }

   if (listaDosNumerosSorteados.includes(numeroEscolhido)) {
    return gerarNumeroAleatorio();
   } else {
    listaDosNumerosSorteados.push(numeroEscolhido);
    console.log(listaDosNumerosSorteados);
    return numeroEscolhido;
   }
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tenativas = 1;
    exibirMensagemInicial();
    document.getElementById("reiniciar").setAttribute("disabled", true);
}
