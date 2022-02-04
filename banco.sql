create database odontosystem;
use odontosystem;


create table tbPaciente (
idPaciente int auto_increment primary key,
nomePaciente varchar(100) not null,
rgPaciente varchar (12) not null,
cpfPaciente varchar(14) not null unique,
dataNascimento varchar(10) not null,
sexo varchar(20) not null,
fotoPaciente varchar(200),
telPaciente varchar(11) not null unique,
endereco varchar(200) not null,
dataCadastro varchar (10) not null
);


create table tbDentista(
idDentista int auto_increment primary key,
nomeDentista varchar(100) not null,
rgDentista varchar (12) not null,
cpfDentista varchar(14) not null,
dataNascimento varchar(10) not null,
sexo  varchar(20) not null,
fotoDentista varchar(200),
crm int(10) not null unique,
especialidades varchar(50) not null,
telDentista varchar(11) not null,
endereco varchar(200) not null,
dataCadastro varchar(10) not null
);

create table tbAgenda(
idAgenda int auto_increment primary key,
idPaciente int not null,
idDentista int not null,
dataAtendimento varchar(10) not null,
horaAtendimento varchar(10) not null,
dataAgendamento varchar(10) not null,
valorConsulta decimal(10,2) not null
);



select * from tbPaciente; 
insert into tbPaciente (
	nomePaciente, 
    rgPaciente, 
    cpfPaciente, 
    dataNascimento, 
    sexo, 
    fotoPaciente, 
    telPaciente, 
    endereco, 
    dataCadastro
) values ("Luiz F. Cruz", "50.031.467-1", "486.526.058-01", "25/02/2000", "Masculino", 
"http://4.bp.blogspot.com/-Rl3bcaovZgo/VXnNaPVoe8I/AAAAAAAAKyU/tUyx5WiMtdw/s1600/ser%25C3%25A3o-sexys-as-pessoas-mais-ego%25C3%25ADstas-novo-estudo-revela-no-que-homens-e-mulheres-diferem.jpg",
"111010-1010", "rua seilaoq, 72 - bairroseilaoq, São Paulo-SP", "04/02/2022");



select * from tbDentista;
insert into tbDentista (
nomeDentista,
rgDentista,
cpfDentista, 
dataNascimento,
sexo,
fotoDentista, 
crm,
especialidades,
telDentista,
endereco,
dataCadastro
) values ( "Camily Cruz", "50.031.468-1", "486.526.059-01", "19/02/2000", "Feminino", 
"http://4.bp.blogspot.com/-Rl3bcaovZgo/VXnNaPVoe8I/AAAAAAAAKyU/tUyx5WiMtdw/s1600/ser%25C3%25A3o-sexys-as-pessoas-mais-ego%25C3%25ADstas-novo-estudo-revela-no-que-homens-e-mulheres-diferem.jpg",
"123456789", "odontopediatra", "112020-2020", "rua seilaoq, 73 - bairroseilaoq, São Paulo-SP", "04/02/2022");



select * from tbAgenda;
insert into tbAgenda (
idPaciente,
idDentista,
dataAtendimento,
horaAtendimento,
dataAgendamento,
valorConsulta
) values ("1", "1", "10/02/2022", "10:40", "04/02/2022", "100.00");
