//######## SERVIDOR #########
//criando servidor utilizando o modulo express:
const express = require("express");

//criando referencia servidor express:
const app = express();

//fazendo o servidor express receber e tratar dados no formato json
app.use(express.json());


//####### CORS #########
//importando o modulo cors
const cors = require("cors");


//######### MYSQL ###########
//importar o módulo do mysql para a manipulação de banco de dados
const mysql = require("mysql");


//criando conexao com o banco de dados MYSQL
const conexao = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"odontosystem"
});


//testando conexao com o banco de dados
    //conexao.threadId-mostra o id da thread que estabeleceu a conexao com o banco de dados
conexao.connect((erro)=>{
    if(erro){
        console.error("Erro ao estabelecer a conexão com o banco de dados "+erro.stack);
        return;
    }
    console.log("Conectado ao banco de dados -> "+conexao.threadId);
});




//######################## CRUD ######################
//Criação das rotas para realizar o CRUD, usando os verbos GET, POST, PUT, DELETE


//######################  GET(Obter) #######################
//LISTAR TODOS OS PACIENTES
app.get( "/paciente/listar", (req, res) => {
    /* res.send ("Todos os clientes cadastrados"); */

    //CONSULTANDO O BANCO DE DADOS PARA EXIBIR LISTA DE PACIENTES CADASTRADOS:
    conexao.query("select * from tbPaciente",(erro,resultado)=>{
        if(erro){
            return res.status(500).send({output:"Erro ao tentar executar a consulta "+erro});
        }
        res.status(200).send({output:resultado});
    });
});


//LISTAR APENAS UM PACIENTE
app.get("/paciente/listar/:id", (req, res) => {
    /* res.send ("Cliente fulano"); */

     //CONSULTANDO O BANCO DE DADOS PARA EXIBIR UM PACIENTE CADASTRADO:
     conexao.query("select * from tbPaciente",(erro,resultado)=>{
        if(erro){
            return res.status(500).send({output:"Erro ao tentar executar a consulta "+erro});
        }
        res.status(200).send({output:resultado});
    });
});


//LISTAR TODOS OS DENTISTAS
app.get( "/dentista/listar", (req, res) => {
    /* res.send ("Todos os dentistas cadastrados"); */

    //CONSULTANDO O BANCO DE DADOS PARA EXIBIR LISTA DE DENTISTAS CADASTRADOS:
    conexao.query("select * from tbDentista",(erro,resultado)=>{
        if(erro){
            return res.status(500).send({output:"Erro ao tentar executar a consulta "+erro});
        }
        res.status(200).send({output:resultado});
    });
});


//LISTAR APENAS UM DENTISTA
app.get("/dentista/listar/:id", (req, res) => {
    /* res.send ("Dentista fulano"); */

     //CONSULTANDO O BANCO DE DADOS PARA EXIBIR UM DENTISTA CADASTRADO:
     conexao.query("select * from tbDentista",(erro,resultado)=>{
        if(erro){
            return res.status(500).send({output:"Erro ao tentar executar a consulta "+erro});
        }
        res.status(200).send({output:resultado});
    });
});



//LISTAR TODAS AS CONSULTAS
app.get( "/consulta/listar", (req, res) => {
    /* res.send ("Todas as consultas marcadas"); */

    //CONSULTANDO O BANCO DE DADOS PARA EXIBIR LISTA DE CONSULTAS CADASTRADAS:
    conexao.query("select * from tbAgenda",(erro,resultado)=>{
        if(erro){
            return res.status(500).send({output:"Erro ao tentar executar a consulta "+erro});
        }
        res.status(200).send({output:resultado});
    });
});


//LISTAR APENAS UMA CONSULTA
app.get("/consulta/listar/:id", (req, res) => {
    /* res.send ("Consulta tal"); */

     //CONSULTANDO O BANCO DE DADOS PARA EXIBIR UMA CONSULTA CADASTRADA:
     conexao.query("select * from tbAgenda",(erro,resultado)=>{
        if(erro){
            return res.status(500).send({output:"Erro ao tentar executar a consulta "+erro});
        }
        res.status(200).send({output:resultado});
    });
});



//###################  POST(Cadastrar) #####################
//CADASTRAR PACIENTE
app.post("/paciente/cad", (req, res) => {
    /* res.send ("Paciente cadastrado com sucesso"); */
    /* res.send( "Os dados enviados foram " +req.body.nome+ ", " +req.body.dataNascimento+ ", " +req.body.endereco); */
   
   //CADASTRANDO PACIENTE NO BANCO DE DADOS
    conexao.query("insert into tbPaciente set ?",[req.body], (erro,resultado) => {
        if(erro){
            res.status(500).send({output: `Não foi possível cadastrar o paciente -> ${erro}`});
            return;
        }
        res.send(201).send({output:result});
    });
});


//CADASTRAR DENTISTA
app.post("/dentista/cad", (req, res) => {
    /* res.send ("Dentista cadastrado com sucesso"); */

    //CADASTRANDO DENTISTA NO BANCO DE DADOS
    conexao.query("insert into tbDentista set ?",[req.body], (erro,resultado) => {
        if(erro){
            res.status(500).send({output: `Não foi possível cadastrar o dentista -> ${erro}`});
            return;
        }
        res.send(201).send({output:result});
    });
});


//CADASTRAR CONSULTA
app.post("/consulta/cad", (req, res) => {
    /* res.send ("Consulta marcada com sucesso"); */

    //CADASTRANDO CONSULTA NO BANCO DE DADOS
    conexao.query("insert into tbAgenda set ?",[req.body], (erro,resultado) => {
        if(erro){
            res.status(500).send({output: `Não foi possível marcar a consulta -> ${erro}`});
            return;
        }
        res.send(201).send({output:result});
    });
});



//#################### PUT(Atualizar) #################
//ATUALIZAR DADOS DO PACIENTE
app.put("/paciente/atualizar/:id", (req, res) => {
    /* res.send(`O id passado foi ${req.params.id} e os dados para atualização são ${req.body} `); */
    conexao.query("update tbPaciente set ? where idPaciente=?", [req.body, req.params.id], (erro, resultado) => {
        if(erro){
            res.status(500).send({output:`Erro ao atualizar dados do paciente -> ${erro}`});
            return;
        }
        res.status(200).send({output:resultado});
    });
});



//ATUALIZAR DADOS DO DENTISTA
app.put("/dentista/atualizar/:id", (req, res) => {
    /* res.send(`O id passado foi ${req.params.id} e os dados para atualização são ${req.body} `); */
    conexao.query("update tbDentista set ? where idDentista=?", [req.body, req.params.id], (erro, resultado) => {
        if(erro){
            res.status(500).send({output:`Erro ao atualizar dados do dentista -> ${erro}`});
            return;
        }
        res.status(200).send({output:resultado});
    });
});



//ATUALIZAR INFORMAÇÕES DA CONSULTA
app.put("/consulta/atualizar/:id", (req, res) => {
    /* res.send(`O id passado foi ${req.params.id} e os dados para atualização são ${req.body} `); */
    conexao.query("update tbAgenda set ? where idAgenda=?", [req.body, req.params.id], (erro, resultado) => {
        if(erro){
            res.status(500).send({output:`Erro ao atualizar informações da consulta -> ${erro}`});
            return;
        }
        res.status(200).send({output:resultado});
    });
});



//############### DELETE(Apagar) ###################
//APAGAR PACIENTE
app.delete("/paciente/apagar/:id", (req, res) => {
    res.send(`Paciente de id ${req.params.id} foi deletado com sucesso`);
});


//APAGAR DENTISTA
app.delete("/dentista/apagar/:id", (req, res) => {
    res.send(`Dentista de id ${req.params.id} foi deletado com sucesso`);
});


//APAGAR CONSULTA
app.delete("/consulta/apagar/:id", (req, res) => {
    res.send(`Consulta de id ${req.params.id} foi deletada com sucesso`);
});

//################### FIM CRUD ##################


//possibilitando a inicializaçao do servidor na porta 3000
app.listen(3000,()=>console.log("Servidor online na porta 3000"));