# Negação de Serviço em Aplicações Node.js

[English version (soon)](/READEME-english.md)

### Faculdade de Tecnologia de Americana
### Curso Superior de Tecnologia em Segurança da Informação

#### Autor: Douglas Mariano Valero

#### Orientador: Prof. Especialista Marcus Vinícius Lahr Giraldi

Trabalho de Conclusão de Curso do curso superior de Tecnologia em Segurança da Informação.

**Área de concentração:** Segurança da Informação

##### Americana, SP. 2019.


## Agradecimentos

Primeiramente a Deus por todas graças que me concedeu.
A todos meus familiares e amigos pelo apoio em cada etapa da minha vida.
Ao meu orientador Prof. Esp. Marcus Vinícius Lahr Giraldi pela paciência, dedicação e incentivo que muito ajudaram na realização deste trabalho.
A professora da disciplina de trabalho de graduação, Dra. Maria Cristina Aranda pelo acompanhamento e ajuda no trabalho.
A todos professores e colegas da FATEC Americana pela convivência, amizade e contribuição na minha formação.


## Resumo

Este trabalho apresenta algumas das principais vulnerabilidades de negação de serviço em aplicações Node.js. São apresentados conceitos fundamentais sobre segurança da informação, aplicações web, Node.js e negação de serviço. Estuda-se o funcionamento do Node.js, principalmente do loop de eventos, programação síncrona e assíncrona, e como utilizar esses elementos de forma adequada, evitandose a negação de serviço. Apresentam-se o conceito de bibliotecas ou pacotes em Node.js, como utilizá-los de forma segura, e alguns exemplos de pacotes dedicados a segurança. Discute-se um tipo de negação de serviço específico, causado por expressões regulares mal formuladas. Destacam-se boas práticas em Node.js, principalmente focadas em evitar negação de serviço. E conclui-se o trabalho destacando-se a importância de conhecer e combater vulnerabilidades de negação de serviço em aplicações Node.js.

**Palavras Chave:** Negação de Serviço. Node.js. Segurança da Informação.


## Lista de Figuras

Figura 1 - Diagrama de um servidor multi-threaded bloqueante
Figura 2 - Diagrama de um servidor single-threaded não bloqueante
Figura 3 - Diagrama do loop de eventos
Figura 4 - Lendo um arquivo usando buffer
Figura 5 - Lendo um arquivo usando stream
Figura 6 - Arquivo zipSync.js
Figura 7 - Arquivo zipAsync.js
Figura 8 - Arquivo zipStream.js
Figura 9 - Execução das três implementações da aplicação
Figura 10 - Comando npm audit em uma aplicação com vulnerabilidades conhecidas
Figura 11 - Comando npm audit em uma aplicação sem vulnerabilidades conhecidas
Figura 12 - Comando snyk test em uma aplicação com vulnerabilidades conhecidas
Figura 13 - Comandos snyk test e snyk monitor em aplicação sem vulnerabilidades conhecidas
Figura 14 - Exemplo de uso da biblioteca express-rate-limit
Figura 15 - Lista de processos iniciados com o comando pm2 start
Figura 16 - Exemplo de uso do pacote Helmet
Figura 17 - Configuração padrão do Helmet
Figura 18 - Exemplo de uso de expressão regular (arquivo regex.js)
Figura 19 - Resultado da execução do arquivo regex.js
Figura 20 - Exemplo de aplicação com expressão regular vulnerável
Figura 21 - Usando a aplicação com uma entrada válida
Figura 22 - Usando a aplicação com uma entrada maliciosa
Figura 23 – Arquivo crono.js


## Lista de Abreviaturas e Siglas

APM Application Performance Management
CEP Código de Endereçamento Postal
CPS Content Security Policy
CPU Central Processing Unit
DNS Domain Name System
DDoS Distributed Denial of Service
DoS Denial of Service
ECMA European Computer Manufacturers Association
FIFO First In First Out
HTTP Hyper Text Transfer Protocol
HTTPS Hyper Text Transfer Protocol Secure
I/O Input/Output
JS JavaScript
JSON JavaScript Object Notation
ms milissegundos
REDOS Regular Expression Denial of Service
regex Regular Expressions
SQL Structured Query Language
URL Uniform Resource Locator
XSS Cross-Site Scripting


## Sumário

[Introdução]()
[1 - Conceitos Básicos]()
[1.1 - Segurança da Informação]()
[1.2 - Aplicações Web]()
[1.3 - Node.js]()
[1.4 - Negação de Serviço]()
[2 - O Loop de Eventos]()
[2.1 - Bloqueante X Não Bloqueante]()
[2.2 - O que é o Loop de Eventos]()
[2.3 - Síncrno X Assíncrono]()
[2.4 - Streams]()
[2.5 - Exemplo Prático]()
[3 - Bibliotecas]()
[3.1 - Express-rate-limit]()
[3.2 - PM2]()
[3.3 - Helmet]()
[3.4 - Validação]()
[4 - Expressões Regulares]()
[5 - Boas Práticas]()
[Considerações Finais]()
[Referências Bibliográficas]()
[Apêndice A]()
