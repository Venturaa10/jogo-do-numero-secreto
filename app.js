// !! Lembrar do ';' no final de cada linha de código do JS
let listaDeNumerosSorteados = []; //Lista vazia, pois atribuíremos valor a ela;
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;
// ---> Nessa linha estou usando de fato a função.
// let titulo = document.querySelector('h1'); //Estou dizendo que irei adicionar um valor ao 'h1' do documento.
// titulo.innerHTML = 'Jogo do número secreto'; // O inner.HTML indica o valor será inserido dentro do HTML 

// let paragrafo = document.querySelector('p');
// paragrafo.innerHTML = 'Escolha um número entre 1 e 10:';

function exibirTextoNaTela(tag, texto) { // --> Essa Função foi criada para diminuir a minha linha de código (let titulo e paragrafo), pois o conteudo de ambas são bem parecidas, e como uma boa pratica, essa função foi criada para executar ambas.
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2}); // 1º Parametro: O texto que será lido / 2º O idioma / Voz que o texto será lido (Se encontra no site ResponsiveVoice) / 3º É a velocidade da fala    
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1','Jogo do número secreto');//O primeiro elemento se refere a tag do HTML e o segundo é o texto que queremos atribuir a ela. 
    exibirTextoNaTela('p','Escolha um número entre 1 e 10:');
}

exibirMensagemInicial();

//Criando a interação com o botão "Chutar"

function verificarChute() { // function -> É uma função, um trecho de código que executa uma ação
    let chute = document.querySelector('input').value; // --> value: Informa que eu quero pegar apenas o valor que for atribuído dentro do input no HTML
    
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1','Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}`;
        exibirTextoNaTela('p',mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled'); // Linha de código que faz a ação de ativar o botão "Novo Jogo" no HTML, após o usuario acertar o número secreto
        // removeAttribute --> Remove o atributo ('elemento')
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O número secreto é menor');
        } else {
            exibirTextoNaTela('p','O número secreto é maior');
        }
        tentativas ++;
        limparCampo();
    }
} // -> A chave é o escopo dessa função

function gerarNumeroAleatorio() { // --> Função declarada, para usar eu devo chama-lá
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1); //return utilizado pois após a execução da função, eu quero que me informe o valor gerado, ou seja, retorne o valor gerado
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length //length --> Mostra a quantidade de elementos dentro da lista

    if (quantidadeDeElementosNaLista == numeroLimite) { //Se a quantidade de elementos na lista for igual ao Numero Limite(10) (número que representa a quantidade de números secretos que podem ser gerados no jogo), ou seja, caso a lista atinja por exemplo 10 elementos, significa que todos os números já foram 'secretos', logo acabou os números para continuar o jogo
        listaDeNumerosSorteados = [] // Aqui eu peço que quando atingir o max que é correspondente ao (numeroLimite), a lista seja esvaziada para que o jogo possa continuar
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) { // if Criado para evitar que gere novamente o mesmo número como secreto novamente, porem depois de gerar todos os números até não  sobrar nenhum parar sortear, o console apresenta um erro
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido); // push --> Adiciona item ao final da lista
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled',true) // Nessa linha de código estou desativando o botão 'Novo Jogo' novamente. pois ele só será reativado quando o usuario acerta o jogo atual.
    // O 'true' na linha de código acima indica que o 'disabled' tem que estar habilitado, ou seja, o botão estará desabilitado.
}