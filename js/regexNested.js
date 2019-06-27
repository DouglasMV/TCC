const http = require('http');                               //biblioteca http
const url = require('url');                                 //biblioteca url

http.createServer((req, res) => {                           //cria um web server http
    let timer = process.hrtime();                         //inicia o cronômetro
    const regex = /(\d+)+$/;                                //regex vulnerável
    const number = url.parse(req.url, true).query.num;      //recebe o valor passado na url
    res.writeHead(200, {"Content-type":"text/html"});       //Tipo da resposta
    res.write("Input: " + number);                          //mostra o valor recibido
    res.write("<br>Valido: " + regex.test(number));         //mostra se o valor é válido com a regex
    timer = process.hrtime(timer);                          //finaliza o cronômetro
    res.write(`<br>Timer: ${timer[0]} segundos, ${timer[1]} nanosegundos`); //mostra o tempo de execução
    res.end();                                              //finaliza a resposta http
}).listen(3000);                                            //o servidor ouve requisições na porta 3000


