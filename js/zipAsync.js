const fs = require('fs');             //biblioteca do sistema de arquivos
const zlib = require('zlib');         //biblioteca de compactação
const crono = require('./crono.js');  //biblioteca do cronômetro
const file = process.argv[2];         //recebe o local do arquivo
const timer = process.hrtime();       //inicia o cronômetro

fs.readFile(file, (err, buffer) => {                   //lê o arquivo
    zlib.gzip(buffer, (err, buffer) => {               //compacta o arquivo
        zlib.gunzip(buffer, (err, buffer) => {         //descompacta o arquivo
            fs.writeFile(file + '_copy', buffer, err => {    //grava o arquivo
                crono.stop(timer);                     //para o cronômetro
            });
        });
    });
});

console.log("Outras Tarefas");        //executa outras tarefas

