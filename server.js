// Importar os pacotes que estamos utilizando
import express from "express";
import bruxos from "./src/data/bruxos.js"

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
    res.json(bruxos);
})

// Criar a rota do GetById
app.get("/bruxos/:id", (req, res) => {
    //Capturar o id pela URL/LINK da solicitacao
    const id = parseInt(req.params.id);
    
    const bruxo = bruxos.find(b => b.id === id);

    if(bruxo) {
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

    if(nomesFiltrados) {
        res.status(200).json(nomesFiltrados);
    } else {
        res.status(404).json({
            mensagem: "Bruxo não encontrado!"
        })
    }
})





// Iniciar o servidor
app.listen(serverPort, () => {
    console.log("Servidor esta rodando...")
});