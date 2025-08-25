// Importar os pacotes que estamos utilizando
import express from "express";
import dados from "./src/data/dados.js";

// E então acesse os dados assim:
const { bruxos, casas, varinhas, animais, pocoes } = dados;

// Criar a aplicacao/server com express e falar que aceita o JSON
const app = express();
app.use(express.json());

// Criar a const da porta
const serverPort = 3000;

// Rota raiz/principal para ver se esta tudo OK com o server
app.get("/", (req, res) => {
    res.send("Servidor funcionando...");
})

// Criar a rota GET Bruxos
app.get("/bruxos", (req, res) => {
    if (bruxos.length > 0) {
        res.status(200).json(bruxos);
    } else {
        res.status(404).json({
            mensagem: "Nenhum bruxo encontrado!"
        })
    }
})

// Criar a rota GET Casas
app.get("/casas", (req, res) => {
    if (casas.length > 0) {
        res.status(200).json(casas);
    } else {
        res.status(404).json({
            mensagem: "Nenhuma casa encontrada!"
        })
    }
})

// Criar a rota GET Varinhas
app.get("/varinhas", (req, res) => {
    if (varinhas.length > 0) {
        res.status(200).json(varinhas);
    } else {
        res.status(404).json({
            mensagem: "Nenhuma varinha encontrada!"
        })
    }
})

// Criar a rota GET Animais
app.get("/animais", (req, res) => {
    if (animais.length > 0) {
        res.status(200).json(animais);
    } else {
        res.status(404).json({
            mensagem: "Nenhum animal encontrado!"
        })
    }
})

// Criar a rota GET Poções
app.get("/pocoes", (req, res) => {
    if (pocoes.length > 0) {
        res.status(200).json(pocoes);
    } else {
        res.status(404).json({
            mensagem: "Nenhuma poção encontrada!"
        })
    }
})

// Criar a rota do GetById
app.get("/bruxos/:id", (req, res) => {
    //Capturar o id pela URL/LINK da solicitacao
    const id = parseInt(req.params.id);

    const bruxo = bruxos.find(b => b.id === id);

    if (bruxo) {
        res.status(200).json(bruxo);
    } else {
        res.status(404).json({
            mensagem: "Bruxo(a) nao encontrado!"
        })
    }
})

// Criar a rota do GetByName
app.get("/bruxos/nome/:nome", (req, res) => {
    let nome = req.params.nome;
    nome = nome.toLowerCase();

    const nomesFiltrados = bruxos.filter(b => b.nome.toLowerCase().includes(nome));

    if (nomesFiltrados) {
        res.status(200).json(nomesFiltrados);
    } else {
        res.status(404).json({
            mensagem: "Bruxo não encontrado!"
        })
    }
})

// Criar uma rota para ver quem esta vivo

app.get("/bruxos/vivos/sim", (req, res) => {
    const bruxosVivos = bruxos.filter(b => b.vivo === true);

    if (bruxosVivos) {
        res.status(200).json(bruxosVivos);
    } else {
        res.status(404).json({
            mensagem: "Não há bruxos vivos!"
        })
    }
})

// Iniciar o servidor
app.listen(serverPort, () => {
    console.log("Servidor esta rodando...")
});