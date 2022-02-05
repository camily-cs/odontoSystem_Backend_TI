//AJUSTAR:
//login admin - nao ta funcionando
//inserir mensagem na exibição do output de todas as rotas

//OK:
//todas rotas para paciente ok 
//todas rotas para dentista ok 
//todas rota para consulta ok 
//todas rotas para admin ok


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
     conexao.query("select * from tbPaciente where idPaciente = ?", [req.params.id], (erro,resultado)=>{
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
     conexao.query("select * from tbDentista where idDentista = ?",[req.params.id],(erro,resultado) => {
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
     conexao.query("select * from tbAgenda where idAgenda = ?", [req.params.id], (erro,resultado)=>{
        if(erro){
            return res.status(500).send({output:"Erro ao tentar executar a consulta "+erro});
        }
        res.status(200).send({output:resultado});
    });
});


//LISTAR TODOS ADMINS
app.get( "/admin/listar", (req, res) => {
    conexao.query("select * from tbAdmin",(erro,resultado)=>{
        if(erro){
            return res.status(500).send({output:"Erro ao tentar executar a consulta "+erro});
        }
        res.status(200).send({output:resultado});
    });
});


//LISTAR APENAS UM ADMIN
app.get("/admin/listar/:id", (req, res) => {
     conexao.query("select * from tbAdmin where idAdmin = ?", [req.params.id], (erro,resultado)=>{
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
        res.send(201).send({output:resultado});
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


//CADASTRAR ADMIN DO SISTEMA
app.post("/admin/cad", (req,res) => {
    conexao.query("insert into tbAdmin set ?", [req.body], (erro,resultado) => {
        if(erro){
            res.status(500).send({output: `Não foi possível cadastrar admin -> ${erro}`});
            return;
        }
        res.send(201).send({output:result});
    });
});


//################################# ADMIN LOGAR NO SISTEMA
 //var p cpf e senha
 /* const cpf = req.body.cpf;
 const sh = req.body.senha; */

/* app.post("/admin/login", (req,res) => {
    conexao.query("insert into tbAdmin where cpfAdmin = ? senhaAdmin = ?", [cpf], [sh], (erro,resultado) => {
        if(erro){
            res.status(500).send({output: `Não foi possível logar -> ${erro}`});
            return;
        }
        res.send(201).send({output:result});
    });
}); */


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


//ATUALIZAR ADMIN
app.put("/admin/atualizar/:id", (req, res) => {
    conexao.query("update tbAdmin set ? where idAdmin=?", [req.body, req.params.id], (erro, resultado) => {
        if(erro){
            res.status(500).send({output:`Erro ao atualizar dados do admin -> ${erro}`});
            return;
        }
        res.status(200).send({output:resultado});
    });
});



//############### DELETE(Apagar) ###################
//APAGAR PACIENTE
app.delete("/paciente/apagar/:id", (req, res) => {
    /* res.send(`Paciente de id ${req.params.id} foi deletado com sucesso`); */
    conexao.query("delete from tbPaciente where idPaciente = ?", [req.params.id],  (erro,resultado) => {
        if(erro){
            res.status(500).send({output: `Erro ao deletar paciente -> ${erro} `});
            return;
        }
        //OBS: STATUS CODE 204 NÃO RETORNA CONTEUDO, OU SEJA, NÃO EXIBIRÁ NENHUMA RESPOSTA INFORMANDO SE OS DADOS FORAM APAGADOS PARA O CLIENTE 
        /* res.status(204).send({output:resultado}); */

        //INSERINDO STATUS CODE 200 PARA EXIBIR CONTEUDO INFORMANDO QUE OS DADOS FORAM APAGADOS COM SUCESSO
        res.send(200).send({output:resultado});
    });
});


//APAGAR DENTISTA
app.delete("/dentista/apagar/:id", (req, res) => {
    /* res.send(`Dentista de id ${req.params.id} foi deletado com sucesso`); */
    conexao.query("delete from tbDentista where idDentista = ?", [req.params.id],  (erro,resultado) => {
        if(erro){
            res.status(500).send({output: `Erro ao deletar dentista -> ${erro} `});
            return;
        }
        res.send(200).send({output:resultado});
    });
});


//APAGAR CONSULTA
app.delete("/consulta/apagar/:id", (req, res) => {
    /* res.send(`Consulta de id ${req.params.id} foi deletada com sucesso`); */
    conexao.query("delete from tbAgenda where idAgenda = ?", [req.params.id],  (erro,resultado) => {
        if(erro){
            res.status(500).send({output: `Erro ao deletar consulta -> ${erro} `});
            return;
        }
        res.send(200).send({output:resultado});
    });
});


//APAGAR ADMIN
app.delete("/admin/apagar/:id", (req, res) => {
    conexao.query("delete from tbAdmin where idAdmin = ?", [req.params.id],  (erro,resultado) => {
        if(erro){
            res.status(500).send({output: `Erro ao deletar administrador -> ${erro} `});
            return;
        }
        res.send(200).send({output:resultado});
    });
});

//################### FIM CRUD ##################


//possibilitando a inicializaçao do servidor na porta 3000
app.listen(3000,()=>console.log("Servidor online na porta 3000"));



