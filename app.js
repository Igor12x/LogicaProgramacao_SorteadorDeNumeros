const MESSAGEM_SEM_NUMEROS = 'Números sorteados: nenhum até agora';
const MESSAGEM_NUMEROS_SORTEADOS = 'Números sorteados:';
const CLASS_DESABILITAR_BOTAO = 'container__botao-desabilitado';
const CLASS_HABILITAR_BOTAO = 'container__botao';

const quantidadeCampo = document.getElementById('quantidade');
const deCampo = document.getElementById('de');
const ateCampo = document.getElementById('ate');
const resultadoCampo = document.getElementById('resultado');
const botaoReiniciar = document.getElementById('btn-reiniciar');

function sortear() {
    const quantidadeDeNumeros = parseInt(quantidadeCampo.value);
    const de = parseInt(deCampo.value);
    const ate = parseInt(ateCampo.value);

    if (validarCampo(quantidadeDeNumeros, de, ate)) {
        const sorteados = gerarNumerosSorteados(quantidadeDeNumeros, de, ate);
        mostrarResultado(sorteados);
        alterarStatusBotao();
    } else {
        reiniciar();
        alterarStatusBotao();
    }
}

function reiniciar() {
    quantidadeCampo.value = '';
    deCampo.value = '';
    ateCampo.value = '';
    mostrarMensagemSemNumeros();
    alterarStatusBotao();
}

function mostrarMensagemSemNumeros() {
    resultadoCampo.innerHTML = `<label class="texto__paragrafo">${MESSAGEM_SEM_NUMEROS}</label>`;
}


function obterNumeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function alterarStatusBotao() {
    if (botaoReiniciar.classList.contains(CLASS_DESABILITAR_BOTAO)) {

        botaoReiniciar.classList.remove(CLASS_DESABILITAR_BOTAO);
        botaoReiniciar.classList.add(CLASS_HABILITAR_BOTAO);

    } else {
        
        botaoReiniciar.classList.add(CLASS_DESABILITAR_BOTAO);
        botaoReiniciar.classList.remove(CLASS_HABILITAR_BOTAO);

    }
}

function validarCampo(quantidade, min, max) {
    return verificarMinMax(min, max) && verificarQuantidadeDeNumeros(quantidade, min, max);
}

function verificarMinMax(min, max) {
    if (min > max) {
        alert('Você não pode ter um número mínimo maior que o número máximo');
        return false;
    }
    return true;
}

function verificarQuantidadeDeNumeros(quantidade, min, max) {
    const diferenca = max - min + 1;
    if (quantidade > diferenca) {
        alert(`Por favor insira uma quantidade de números menor ou igual a ${diferenca}`);
        return false;
    }
    return true;
}

function gerarNumerosSorteados(quantidade, min, max) {
    const sorteados = [];
    for (let i = 0; i < quantidade; i++) {
        let numero;
        do {
            numero = obterNumeroAleatorio(min, max);
        } while (sorteados.includes(numero));
        sorteados.push(numero);
    }
    return sorteados;
}

function mostrarResultado(numeros) {
    resultadoCampo.innerHTML = `<label class="texto__paragrafo">${MESSAGEM_NUMEROS_SORTEADOS} ${numeros.join(', ')}</label>`;
}
