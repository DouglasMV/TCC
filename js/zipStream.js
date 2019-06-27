const fs = require('fs');               //biblioteca do sistema de arquivos
const zlib = require('zlib');           //biblioteca de compactação
const crono = require('./crono.js');    //biblioteca do cronômetro
const file = process.argv[2];           //recebe o local do arquivo
const timer = process.hrtime();         //inicia o cronômetro

fs.createReadStream(file)                       //lê o arquivo
    .pipe(zlib.createGzip())                    //compacta o arquivo
    .pipe(zlib.createGunzip())                  //descompacta o arquivo
    .pipe(fs.createWriteStream(file + '_copy')) //grava o arquivo
    .on('finish', () => {
        crono.stop(timer);              //para o cronômetro
    });

console.log("Outras Tarefas");          //executa outras tarefas

