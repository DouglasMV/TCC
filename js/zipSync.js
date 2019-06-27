const fs = require('fs');                   //biblioteca do sistema de arquivos
const zlib = require('zlib');               //biblioteca de compactação
const crono = require('./crono.js');        //biblioteca do cronômetro
const file = process.argv[2];               //recebe o local do arquivo
const timer = process.hrtime();             //inicia o cronômetro

let buffer = fs.readFileSync(file);         //lê o arquivo
buffer = zlib.gzipSync(buffer);             //compacta o arquivo
buffer = zlib.gunzipSync(buffer);           //descompacta o arquivo
fs.writeFileSync(file + '_copy', buffer);   //grava o arquivo

crono.stop(timer);                          //para o cronômetro

console.log("Outras Tarefas");              //executa outras tarefas

