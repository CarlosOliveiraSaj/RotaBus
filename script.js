const db = {
    cidade: [
        {
            cidade: "São Paulo",
            quantidade: 15,
            classe: ["econômica", "executiva", "primeira", "Econômica","Executiva"],
            passagem: ["ida", "volta"]
        },
        {
            cidade: "Rio de Janeiro",
            quantidade: 12,
            classe: ["econômica", "executiva"],
            passagem: ["ida"]
        },
        {
            cidade: "Belo Horizonte",
            quantidade: 5,
            classe: ["executiva", "primeira"],
            passagem: ["ida", "volta"]
        },
        {
            cidade: "Salvador",
            quantidade: 9,
            classe: ["econômica", "executiva", "primeira"],
            passagem: ["ida", "volta"]
        },
        {
            cidade: "Brasília",
            quantidade: 19,
            classe: ["primeira"],
            passagem: ["ida", "volta"]
        },
        {
            cidade: "Curitiba",
            quantidade: 30,
            classe: ["econômica", "executiva", "primeira"],
            passagem: ["ida", "volta"]
        },
        {
            cidade: "Fortaleza",
            quantidade: 10,
            classe: ["econômica", "primeira"],
            passagem: ["volta"]
        },
        {
            cidade: "Recife",
            quantidade: 50,
            classe: ["econômica"],
            passagem: ["volta"]
        },
        {
            cidade: "Porto Alegre",
            quantidade: 9,
            classe: ["econômica", "executiva", "primeira"],
            passagem: null
        },
        {
            cidade: "Manaus",
            quantidade: null,
            classe: null,
            passagem: ["ida", "volta"]
        }
    ]
};

document.getElementById("botao").addEventListener("click", function() {
    // Obtém os valores dos campos
    let origem = document.querySelector('input[placeholder="Local de origem"]').value.trim();
    let destino = document.getElementById("indo").value.trim();
    let quantidade = parseInt(document.getElementById("qpa").value.trim());
    let classe = document.getElementById("cla").value.trim();
    let idaEVolta = document.getElementById("cb").checked;

    // Verifica se todos os campos foram preenchidos
    if (origem === "" || destino === "" || isNaN(quantidade) || classe === "") {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    // Verifica se a quantidade de passagens é válida
    if (quantidade <= 0) {
        alert("A quantidade de passagens deve ser maior que zero.");
        return;
    }

    // Verifica se a cidade de origem existe no banco de dados
    if (!verificarCidade(origem)) {
        alert("A cidade de origem não está disponível.");
        return;
    }

    // Verifica se a cidade de destino existe no banco de dados
    if (!verificarCidade(destino)) {
        alert("A cidade de destino não está disponível.");
        return;
    }

    // Verifica se a opção de ida e volta está disponível para o destino selecionado
    if (idaEVolta && !verificarPassagemIdaEVolta(destino)) {
        alert("Opção de ida e volta não disponível para este destino.");
        return;
    }

    // Verifica se a classe selecionada está disponível para o destino selecionado
    if (!verificarClasse(destino, classe)) {
        alert("A classe selecionada não está disponível para este destino.");
        return;
    }

    // Se tudo estiver válido, exibe um alerta confirmando a busca
    alert("Buscando passagens...\nOrigem: " + origem + "\nDestino: " + destino + "\nQuantidade: " + quantidade + "\nClasse: " + classe + "\nIda e Volta: " + (idaEVolta ? "Sim" : "Não"));
});

// Função para verificar se a cidade está disponível no banco de dados
function verificarCidade(cidade) {
    return db.cidade.some(c => c.cidade === cidade);
}

// Função para verificar se a opção de ida e volta está disponível para o destino
function verificarPassagemIdaEVolta(destino) {
    const cidade = db.cidade.find(c => c.cidade === destino);
    return cidade && cidade.passagem && cidade.passagem.includes("ida") && cidade.passagem.includes("volta");
}

// Função para verificar se a classe está disponível para o destino
function verificarClasse(destino, classe) {
    const cidade = db.cidade.find(c => c.cidade === destino);
    return cidade && cidade.classe && cidade.classe.includes(classe);
}