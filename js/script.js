// URL de uma API fake
const apiFakeUrl = 'https://jsonplaceholder.typicode.com/posts/1'; // Para simulação, mas não usaremos ela diretamente

// Lista de cidades para escolher aleatoriamente
const cidades = [
    "Tobias Barreto", "Aracaju", "Itabaianinha", "Poço Verde",
    "Lagoa Redonda", "Tanque Novo", "Lagarto", "Riachão do Dantas", "Itapicuru"
];

function escolherCidadeAleatoria() {
    const cidadeAleatoria = cidades[Math.floor(Math.random() * cidades.length)];
    return cidadeAleatoria;
}

function exibirReceita(clima) {
    let receita = '';

    if (clima === 'Céu limpo') {
        receita = 'Que tal um bolo gelado ou um sorvete para refrescar?';
    } else if (clima === 'Chuva') {
        receita = 'Uma torta quente ou um bolo de chocolate caem bem no clima frio!';
    } else if (clima === 'Nublado') {
        receita = 'Que tal experimentar um brownie ou um bolo de cenoura?';
    } else if (clima === 'Tempestade') {
        receita = 'O clima pede um pudim de leite ou uma sopa bem quentinha!';
    }

    return receita;
}

document.addEventListener('DOMContentLoaded', () => {
    // Carrega a NAVBAR
    fetch('/navbar.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('navbar').innerHTML = html;
        })
        .catch(error => console.error('Erro ao carregar a navbar:', error));

    // Carrega o RODAPÉ
    fetch('/rodape.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('rodape').innerHTML = html;
        })
        .catch(error => console.error('Erro ao carregar o rodapé:', error));

    // Simula clima e receita
    const cidadeEscolhida = escolherCidadeAleatoria();
    const temp = Math.floor(Math.random() * 35);
    const descricaoClima = ['Céu limpo', 'Chuva', 'Nublado', 'Tempestade'][Math.floor(Math.random() * 4)];

    const climaEl = document.getElementById('clima');
    const receitaEl = document.getElementById('receita');

    if (climaEl && receitaEl) {
        climaEl.innerText = `Em ${cidadeEscolhida}, a temperatura atual é ${temp}°C. O clima está ${descricaoClima}.`;
        receitaEl.innerText = exibirReceita(descricaoClima);
    }
});

// Carrinho de compras//
let carrinho = [];

document.querySelectorAll('.adicionar-ao-carrinho').forEach(botao => {
    botao.addEventListener('click', () => {
        const nomeProduto = botao.getAttribute('data-nome');
        carrinho.push(nomeProduto);
        atualizarCarrinho();
    });
});

function atualizarCarrinho() {
    const contador = document.getElementById('contador-carrinho');
    const quantidade = carrinho.length;

    if (quantidade > 0) {
        contador.textContent = quantidade;
        contador.style.display = 'inline-block'; // mostra o contador
    } else {
        contador.style.display = 'none'; // esconde o contador
    }
}
