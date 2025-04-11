// URL de uma API fake
const apiFakeUrl = 'https://jsonplaceholder.typicode.com/posts/1'; // Para simulação, mas não usaremos ela diretamente

// Lista de cidades para escolher aleatoriamente
const cidades = [
    "Tobias Barreto",
    "Aracaju",
    "Itabaianinha",
    "Poço Verde",
    "Lagoa Redonda",
    "Tanque Novo",
    "Lagarto",
    "Riachão do Dantas",
    "Itapicuru"
];

// Função para selecionar uma cidade aleatória
function escolherCidadeAleatoria() {
    const cidadeAleatoria = cidades[Math.floor(Math.random() * cidades.length)];
    return cidadeAleatoria;
}

// Função para exibir uma mensagem de receita de acordo com o clima
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

// Simulando a escolha de uma cidade e exibindo a mensagem
const cidadeEscolhida = escolherCidadeAleatoria();

// Gera uma temperatura e clima aleatório para simulação
const temp = Math.floor(Math.random() * 35);  // Temperatura aleatória de 0 a 35°C
const descricaoClima = ['Céu limpo', 'Chuva', 'Nublado', 'Tempestade'][Math.floor(Math.random() * 4)]; // Clima aleatório

// Exibindo os dados no elemento com id 'clima' e a receita correspondente
document.getElementById('clima').innerText = `Em ${cidadeEscolhida}, a temperatura atual é ${temp}°C. O clima está ${descricaoClima}.`;

const mensagemReceita = exibirReceita(descricaoClima);
document.getElementById('receita').innerText = mensagemReceita;