CREATE TABLE Projeto 
( 
 id_projeto INT PRIMARY KEY,  
 nome_projeto INT,  
 material_total INT,  
 hora_homem_total INT,  
 idUsuario INT,  
); 

CREATE TABLE Usuario 
( 
 id_usuario INT PRIMARY KEY,  
 login INT,  
 senha INT,  
 nome INT,  
 idcargo INT,  
); 

CREATE TABLE Item 
( 
 id_item INT PRIMARY KEY,  
 material INT,  
 hora_homem INT,  
 idProjeto INT,  
 idItem INT,  
); 

CREATE TABLE Tarefas 
( 
 id_tarefas INT PRIMARY KEY,  
 nome_tarefa INT,  
 peso_tarefa INT,  
 idItem INT,  
); 

CREATE TABLE AvancoTarefa 
( 
 id_avanco INT PRIMARY KEY,  
 data INT,  
 avanco INT,  
 idItem INT,  
); 

CREATE TABLE cargo 
( 
 id_cargo INT PRIMARY KEY,  
 nome INT,  
); 

ALTER TABLE Projeto ADD FOREIGN KEY(id_usuario) REFERENCES Usuario (idUsuario)
ALTER TABLE Usuario ADD FOREIGN KEY(id_cargo) REFERENCES cargo (idcargo)
ALTER TABLE Item ADD FOREIGN KEY(id_projeto) REFERENCES Projeto (idProjeto)
ALTER TABLE Item ADD FOREIGN KEY(id_item_pai) REFERENCES Item (idItem)
ALTER TABLE Tarefas ADD FOREIGN KEY(id_item) REFERENCES Item (idItem)
ALTER TABLE AvancoTarefa ADD FOREIGN KEY(id_item) REFERENCES Item (idItem)
