# Negação de Serviço em Aplicações Node.js

Trabalho de Conclusão de Curso do curso superior de Tecnologia em Segurança da Informação.

[English version (soon)](/READEME-english.md)

### Faculdade de Tecnologia de Americana
### Curso Superior de Tecnologia em Segurança da Informação

**Autor:** Douglas Mariano Valero

**Orientador:** Prof. Especialista Marcus Vinícius Lahr Giraldi

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


APM - Application Performance Management

CEP - Código de Endereçamento Postal

CPS - Content Security Policy

CPU - Central Processing Unit

DNS - Domain Name System

DDoS - Distributed Denial of Service

DoS - Denial of Service

ECMA - European Computer Manufacturers Association

FIFO - First In First Out

HTTP - Hyper Text Transfer Protocol

HTTPS - Hyper Text Transfer Protocol Secure

I/O - Input/Output

JS - JavaScript

JSON - JavaScript Object Notation

ms - milissegundos

REDOS - Regular Expression Denial of Service

regex - Regular Expressions

SQL - Structured Query Language

URL - Uniform Resource Locator

XSS - Cross-Site Scripting




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




## Introdução


Node.js é uma plataforma de desenvolvimento construída em cima do motor de JavaScript do Google Chrome. JavaScript é a linguagem de programação padrão que os navegadores atuais utilizam principalmente para criar iterações entre o usuário e a página web. A plataforma Node.js permite que programas escritos em JavaScript sejam executados fora de um navegador, assim é possível criar aplicações completas escritas em JavaScript. O Node.js é usado principalmente para o desenvolvimento de aplicações web escaláveis. Foi lançado em 2009 e sua popularidade só aumentou desde então. Porém o crescimento da popularidade também atraiu hackers malintencionados. 

Quando um programador cria uma aplicação, existe a possibilidade de a mesma conter vulnerabilidades provenientes da própria linguagem ou da plataforma utilizada. Por exemplo algumas linguagens, como JavaScript e SQL, não interpretam caracteres especiais automaticamente, o que pode criar uma brecha para injeção de código malicioso. Por isso é muito importante que o programador conheça todas vulnerabilidades de sua ferramenta de trabalho e como combatê-las no momento de escrita do código.

Este trabalho apresenta as vulnerabilidades de negação de serviço mais comuns em Node.js e o que é possível fazer na hora de escrever o código para minimizar essas vulnerabilidades.

No primeiro capítulo estabelecem-se conceitos essenciais para o trabalho, como por exemplo: JavaScript, Node.js, Vulnerabilidades, Ameaças, Segurança da Informação, Disponibilidade, Negação de Serviço, entre outros.

Em seguida no segundo capítulo fala-se sobre a importância de escrever códigos que não bloqueiam o loop de eventos em aplicações Node.js, e como a falha em fazer o mesmo pode causar negação de serviço em uma aplicação.

No terceiro capítulo discute-se os pontos positivos e negativos das bibliotecas disponíveis para Node.js, os cuidados necessários com elas e como identificar quais bibliotecas apresentam vulnerabilidades conhecidas.

Em seguida no capítulo quatro fala-se sobre vulnerabilidades de negação de serviço causada por expressões regulares mal formuladas.

Por fim no quinto capítulo apresenta-se outras boas práticas para mitigar vulnerabilidades no código de aplicações Node.js.

O problema que este trabalho tratou é o fato de desenvolvedores muitas vezes não dedicarem a devida atenção ou não saberem como combater vulnerabilidades, e criam códigos com várias brechas que podem ser exploradas por pessoas malintencionadas e algumas vezes até por usuários legítimos sem intenção, causando danos a organização responsável pela aplicação.

A pergunta que este trabalho procurou responder é: como é possível mitigar as vulnerabilidades de negação de serviço em uma aplicação Node.js no momento em que o código é escrito?

A hipótese do trabalho foi conhecer quais são as principais vulnerabilidades de negação de serviço em aplicações Node.js, como combatê-las, e ajudar os desenvolvedores a criarem aplicações mais seguras. Beneficiando usuários, clientes e aos próprios desenvolvedores.

O objetivo geral foi apresentar algumas vulnerabilidades de negação de serviço mais comuns e mostrar como é possível combatê-las na fase de desenvolvimento de aplicações Node.js.

Os objetivos específicos deste trabalho foram: relacionar vulnerabilidades de negação de serviço, explicando como elas podem ser exploradas e os danos que podem causar, a fim de mostrar a importância de combatê-las; Dar soluções para o desenvolvimento de aplicações protegidas contra tais vulnerabilidades, ensinando técnicas, conceitos e apresentando bibliotecas, módulos ou pacotes desenvolvidos especificamente para combater essas vulnerabilidades; Conscientizar principalmente desenvolvedores de aplicações Node.js de que é preciso conhecer e reduzir as vulnerabilidades de suas aplicações, e lembrar que além disso existem outras atividades que devem ser feitas para aumentar a segurança da aplicação.

Node.js é uma tecnologia relativamente nova que ganhou popularidade rapidamente, por esse motivo o número de desenvolvedores que realmente tratam a segurança de suas aplicações com a devida importância ainda é pequeno. Portanto existe uma necessidade de aumentar a conscientização sobre a importância de tentar reduzir as possíveis vulnerabilidades de uma aplicação.

O método utilizado foi a pesquisa bibliográfica, realizada em livros e sites relacionados a segurança de aplicações web, Node.js, e combate a vulnerabilidades.




## 1 - Conceitos Básicos


Neste capítulo explica-se de forma sucinta alguns conceitos básicos úteis para o entendimento deste trabalho. Esses conceitos são: segurança da informação, disponibilidade, integridade, confidencialidade, vulnerabilidade, ameaça, frontend, backend, aplicação web, JavaScript, Node.js e negação de serviço.


### 1.1 - Segurança da Informação


Segundo Peltier (2014) o objetivo da segurança da informação é proteger recursos importantes de uma organização, não somente as informações, mas também recursos físicos, financeiros, legais, funcionários, reputação, entre outros. O autor ainda ressalta que os objetivos da segurança da informação devem se alinhar com os objetivos da empresa, deve ajudar a alcançá-los não atrapalhar. E também todos níveis da organização devem se preocupar e se conscientizar sobre aspectos relacionados à segurança da informação.

Integridade, confidencialidade e disponibilidade são os três principais conceitos de segurança da informação, que são detalhados a seguir.

Whitman e Mattord (2011) dizem que uma informação tem integridade quando ela é inteira, completa e não corrompida. Segundo eles a informação deixa de ser íntegra quando exposta à corrupção, danos, destruição ou outra interrupção de seu estado autêntico. Os autores ainda explicam que uma forma de verificar a integridade de uma informação é o uso de algoritmos Hash que geram um valor único para um arquivo e caso ocorra qualquer modificação no mesmo a Hash é alterada.

O Tribunal De Contas da União (2012) define confidencialidade como “[...] garantia de que somente pessoas autorizadas tenham acesso às informações armazenadas ou transmitidas por meio de redes de comunicação.” Segundo Whitman e Mattord (2011) algumas das medidas que podem ser tomadas para proteger a confidencialidade da informação são: classificar o nível de confidencialidade da informação, armazenar as informações em locais seguros, aplicar políticas de segurança, educar os usuários e os responsáveis pela informação.

O último dos três principais conceitos de segurança da informação é a disponibilidade:

> Consiste na garantia de que as informações estejam acessíveis às pessoas e aos processos autorizados, a qualquer momento requerido, durante o período acordado entre os gestores da informação e a área de informática. Manter a disponibilidade de informações pressupõe garantir a prestação contínua do serviço, sem interrupções no fornecimento de informações para quem é de direito. (Tribunal de Contas da União, 2012)

Disponibilidade é o principal conceito de segurança da informação para este trabalho, pois está diretamente relacionada com negação de serviço.

Vulnerabilidade é um ponto fraco ou falha em um sistema ou mecanismo de proteção que o abre para ataques ou danos. (Whitman; Mattord, 2011). Sendo vulnerabilidade um ponto fraco ou uma falha é possível fortalecer esse ponto ou corrigir tal falha. Neste trabalho estudam-se vulnerabilidades que criam oportunidades para ataques de negação de serviço e buscam-se soluções para reduzir essas falhas ou pontos fracos.

Segundo Whitman e Mattord (2011) uma ameaça é uma categoria de pessoas, objetos ou outras entidades que podem causar danos a um recurso da organização. Eles ainda definem um agente de ameaça como um elemento específico de uma ameaça, por exemplo hackers são uma ameaça, enquanto um hacker específico é um agente da ameaça. Os autores ainda ressaltam que ameaças sempre estarão presentes, e podem ter o propósito de atingir um alvo determinado ou não serem direcionadas especificamente à um alvo, mas sim a qualquer organização que apresente a vulnerabilidade explorada pelo agente da ameaça.


### 1.2 - Aplicações Web


Frontend é a parte de uma aplicação que é responsável por interagir com o cliente. No caso de uma aplicação web o frontend é o código que é interpretado pelo navegador do cliente, que formata e gera uma visualização para o cliente, com elementos que ele pode interagir, por exemplo um formulário que pode ser preenchido.

Backend é a parte da aplicação que é executada no servidor, geralmente é responsável por regras de negócio, controles de acesso, manipular informações de um banco de dados, autenticação e segurança. Usando o mesmo exemplo citado no frontend, quando um usuário envia o formulário é o backend que é responsável por validar, registrar e processar as informações.

Aplicação Web é um sistema de informação ambientado na Web, ou seja, é uma aplicação cujo backend reside em servidor web e o frontend é interpretado em um programa de acesso à web, que geralmente é um navegador, mas pode ser também, por exemplo, um aplicativo de celular.

JavaScript é uma linguagem de programação presente na maioria dos websites atuais. Segundo Düüna (2016) JavaScript é uma das linguagens de programação mais incompreendidas do mundo devido a sua história. Inicialmente era chamada de LiveScript, pois foi criada com a intenção de deixar as páginas Web mais ‘vivas’, e era apenas uma linguagem para scripts simples. Recebeu o nome JavaScript em uma tentativa (que deu certo) de se aproveitar da fama da linguagem JAVA, porém as duas não tem nenhuma relação além dessa curiosidade histórica. Hoje é uma linguagem robusta para desenvolvimento de aplicações Web, e tem o nome de ECMAScript, pois é mantida pela organização ECMA (European Computer Manufacturers Association), porém ainda é referida pela maioria dos desenvolvedores e autores de livros como JavaScript. Düüna (2016) ainda destaca que toda ferramenta tem suas peculiaridades, e devido ao crescimento e transformação, por muito tempo não padronizados, JavaScript possui algumas características que devem ser evitadas ou usadas com cautela seguindo boas práticas para se evitar vulnerabilidades de segurança e outros problemas em aplicações.


### 1.3 - Node.js


Segundo Düüna (2016) Node.js é uma plataforma desenvolvida a partir do interpretador de JavaScript do Google Chrome: V8, para interpretar códigos escritos em JavaScript do lado do servidor (backend), o que tornou possível criar aplicações web totalmente escritas na linguagem JavaScript. O autor ainda explica que Node.js estende as funcionalidades do JavaScript ligando-o a várias bibliotecas escritas nas linguagens de programação C e C++, e também com módulos que permitem acesso a funcionalidades do sistema operacional, manipular dados binários, e outros tipos de requisições. Permitindo assim que o Node.js acesse arquivos, execute comandos no sistema, receba e responda requisições de rede, ou seja, tudo que um servidor necessita, mas não era possível fazer apenas com JavaScript.

Düüna (2016) destaca algumas características importantes do Node.js no ponto de vista de segurança. Uma delas é o fato de o Node.js receber e interpretar requisições em apenas uma thread (ou tarefa), ou seja, existe apenas um ponto de entrada e saída de eventos, chamado de loop de eventos (event loop). Essa característica é muito importante para segurança da informação, especialmente no quesito de disponibilidade, pois se algo bloquear o loop de eventos, a aplicação não consegue mais servir os clientes, gerando uma negação de serviço. Estuda-se esse aspecto mais a fundo no próximo capítulo. Outra característica destacada pelo autor é o rico gerenciador de bibliotecas JavaScript utilizadas que é instalado por padrão juntamente ao Node.js, o Node Package Manager (NPM). A vantagem do NPM é que muitas bibliotecas ajudam desenvolvedores a resolverem tarefas, acelerando assim o processo de desenvolvimento de aplicações, porém essas bibliotecas também estão sujeitas a vulnerabilidades. No terceiro capítulo deste trabalho estuda-se sobre bibliotecas e os cuidados necessários ao usá-las.


### 1.4 - Negação de Serviço


Um ataque de negação de serviço, Denial of Service (DoS), ou ataque de negação de serviço distribuído, Distributed Denial of Service (DDoS), é uma tentativa de fazer um recurso computacional ficar indisponível para os usuários legítimos (Rhodes-Ousley, 2013). Portanto pode-se concluir que uma vulnerabilidade de negação de serviço é uma falha ou ponto fraco de uma aplicação que permite esse tipo de ataque.

Segundo Whitman e Mattord (2011) um ataque DoS é realizado de apenas um ponto, enquanto um ataque DDoS é realizado de várias localizações ao mesmo tempo, geralmente cada um desses pontos é um sistema comprometido, infectado por algum programa malicioso que permite o controle remoto de funções como por exemplo realizar requisições a um servidor.

O’Hanley (2014) diz que um ataque de negação de serviço tem como objetivo negar ou degradar a qualidade de acesso de um usuário legítimo a um serviço ou recurso de rede. O autor classifica os ataques DoS em dois tipos: ataques de desativação de serviço e ataques de enfraquecimento de recursos. O primeiro é caracterizado por altos números de requisições, geralmente por vários clientes, um DDoS, com a intenção de atingir o limite da fila de espera para utilizar o recurso e causando a paralisação do mesmo. Já os ataques de enfraquecimento de recurso geralmente exploram uma falha lógica na aplicação fazendo com que um processo 17 consuma recursos do servidor durante um tempo muito grande, deixando poucos recursos e tempo para o processamento de requisições de usuários legítimos.

Mueller (2016) enfatiza que uma parte importante de um ataque DoS é requisitar uma operação complexa, como por exemplo uma busca, portanto é uma boa ideia exigir autenticação do usuário para realizar esses tipos de operações, criando uma barreira de segurança a mais contra ataques DoS.

Nahari e Krutz categorizam as soluções para combater ataques DoS em dois tipos: preventivas e reativas. Soluções preventivas impedem o ataque tomando medidas de precaução, como por exemplo: filtros, estabelecimento de limites, esconder a localização de recursos e detecção de intrusos. Já as soluções reativas são acionadas durante o ataque e geralmente tem o objetivo de determinar a origem do ataque, alguns exemplos são: marcação de pacotes, testes de conexão e coleta de dados em registros (logs).




## 2 - O Loop de Eventos


A regra mais importante ao desenvolver aplicações Node.js é não bloquear o loop de eventos, portanto é preciso entender exatamente o que isso significa. Neste capítulo explica-se como o Node.js funciona, o que é o loop de eventos, como ele opera em aplicações Node.js, o que significa bloqueá-lo e como evitar esse bloqueio.


### 2.1 - Bloqueante X Não Bloqueante


Primeiro define-se o que é uma thread. Segundo Teixeira (2013) uma thread é uma linha de processo que compartilha a memória de um processo com todas outras threads que existem dentro do mesmo processo. Na prática o que isso significa é que se o processador do computador é por exemplo quad-core, ou seja tem quatro núcleos então ele tem quatro processos executando ao mesmo tempo, e dentro de cada um desses processos podem existir várias threads (várias linhas de processo).

De uma maneira simplificada pode-se dizer que um bloqueio ocorre quando operações intensas (em relação ao tempo de execução) são realizadas de forma contínua (de uma vez só), ou seja, enquanto a operação não é finalizada outras tarefas pendentes não tem uma oportunidade de executar. Segundo o site oficial do Node.js existem duas motivações principais para não bloquear uma thread de um servidor web: a performance (requisições atendidas por segundo), que é muito maior quando a thread executa apenas tarefas rápidas; e a segurança, pois se for possível bloquear a thread com alguma requisição ou input malicioso, isso cria uma vulnerabilidade que pode ser explorada e causar uma negação de serviço.

Ryan Dahl(2018) diz que quando ele criou o Node.js, seu objetivo principal era criar uma ferramenta na qual fosse possível desenvolver servidores web não bloqueantes acionados por eventos. Esse tipo de servidor tem melhor performance em aplicações focadas em entrada e saída de dados, Input e Output (I/O), pois não bloqueiam a thread. Até então a maioria dos servidores web eram do tipo baseado em processos, como por exemplo o popular Apache, esse tipo de servidor bloqueia a thread, e por isso usa múltiplas threads para atender vários clientes.

A princípio pode parecer que criar várias threads faz a aplicação ser mais rápida, porém segundo Casciaro e Mammino (2016) existem dois pontos fracos nesse tipo de servidor. O primeiro é o fato de que para cada requisição uma nova thread é criada. E na maior parte do tempo essas threads estão em estado de espera (idle), aguardando I/O do cliente. Isso é ruim pois a criação de threads não é uma operação barata, usa memória e mudanças de contexto. E criar uma thread para realizar uma tarefa simples, deixando-a a maior parte do tempo em estado de espera, não proporciona benefícios, em termos de tempo, no final das contas. O segundo ponto fraco é que cada um dessas threads é bloqueante, ou seja, ela espera uma operação finalizar para poder iniciar outra. No caso de todas ou a maioria das threads do seu servidor estarem ocupados por clientes realizando operações bloqueantes, outros clientes não conseguem usar sua aplicação, gerando uma negação de serviço. Esse tipo de processamento é chamado de paralelo, pois várias operações são realizadas ao mesmo tempo em processos diferentes.

Os autores também explicam que em um servidor com apenas uma thread não bloqueante, essa thread quase nunca fica em estado de espera, sempre há operações a serem realizadas. O importante é que essas operações não sejam bloqueantes, ou seja, sejam rápidas. Nesse caso o processo é chamado de simultâneo, pois as funções são divididas em tarefas menores e são realizadas intercaladamente, minimizando o tempo de estado de espera, dando ao usuário a sensação de que foram realizadas ao mesmo tempo. As figuras a seguir ilustram servidores com várias threads em comparação com servidores de apenas uma thread.


#### Figura 1: Diagrama de um servidor multi-threaded bloqueante

![multi-threaded](/img/1.png)

##### Fonte: Casciaro e Mammino (2016)


#### Figura 2: Diagrama de um servidor single-threaded não bloqueante

![multi-threaded](/img/2.png)

##### Fonte: Casciaro e Mammino (2016)


Como observa-se nas Figuras 1 e 2, no servidor multi-threaded bloqueante as threads ficam muito tempo no estado de espera (idle), ou seja, ocupando recursos no processador sem realizar nenhuma tarefa. Enquanto no servidor single-threaded não bloqueante, como pode ser observado na Figura 2, o tempo em idle é bem menor, ou seja, não desperdiça muitos recursos de processadores, deixando-os livres para realizar outras tarefas, como por exemplo as funções executadas pelo kernel e pelo o Work Pool, que são discutidas na próxima seção.
