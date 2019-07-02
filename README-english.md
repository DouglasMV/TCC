# Denial of Service in Node.js Applications

Conclusion Work of Graduation Course of Technology in Information Security.

*[Versão em Português](/README.md)*

### College of Technology (FATEC Americana-SP Brazil)
### Graduation Course of Technology in Information Security.

**Author:** Douglas Mariano Valero

**Supervisor:** Prof. Specialist Marcus Vinícius Lahr Giraldi

**Concentration area:** Information Security

##### Americana, SP. 2019.




## Thanks


First of all to God for all the graces you have given me.

To all my family and friends for support at every stage of my life.

To my supervisor Prof. Spec. Marcus Vinícius Lahr Giraldi for the patience, dedication and encouragement that greatly helped in the accomplishment of this work.

The professor of the discipline of graduation work, Dr. Maria Cristina Aranda for the accompaniment and help in the work.

To all FATEC Americana professors and colleagues for the coexistence, friendship and contribution in my formation.




## Abstract


This paper presents some of the major denial of service vulnerabilities in Node.js applications. Key concepts on information security, web applications, Node.js and denial of service are presented. The operation of Node.js is studied, mainly of the event loop, synchronous and asynchronous programming, and how to use these elements properly, avoiding the denial of service. The concept of libraries or packages in Node.js, how to use them in a safe way, and some examples of packages dedicated to security are presented. We discuss a specific type of denial of service caused by poorly worded regular expressions. Good practices in Node.js are emphasized, mainly focused on avoiding denial of service. The paper concludes by highlighting the importance of knowing and combating denial of service vulnerabilities in Node.js applications.

**Keywords:** Denial of Service. Node.js. Information Security.




## List of Figures


- [Figura 1 - Diagrama de um servidor multi-threaded bloqueante](#Figura-1-Diagrama-de-um-servidor-multi-threaded-bloqueante)
- [Figura 2 - Diagrama de um servidor single-threaded não bloqueante](#Figura-2-Diagrama-de-um-servidor-single-threaded-não-bloqueante)
- [Figura 3 - Diagrama do loop de eventos](#Figura-3-Diagrama-do-loop-de-eventos)
- [Figura 4 - Lendo um arquivo usando buffer](#Figura-4-Lendo-um-arquivo-usando-buffer)
- [Figura 5 - Lendo um arquivo usando stream](#Figura-5-Lendo-um-arquivo-usando-stream)
- [Figura 6 - Arquivo zipSync.js](#Figura-6-Arquivo-zipSync.js)
- [Figura 7 - Arquivo zipAsync.js](#Figura-7-Arquivo-zipAsync.js)
- [Figura 8 - Arquivo zipStream.js](#Figura-8-Arquivo-zipStream.js)
- [Figura 9 - Execução das três implementações da aplicação](#Figura-9-Execução-das-três-implementações-da-aplicação)
- [Figura 10 - Comando npm audit em uma aplicação com vulnerabilidades conhecidas](#Figura-10-Comando-npm-audit-em-uma-aplicação-com-vulnerabilidades-conhecidas)
- [Figura 11 - Comando npm audit em uma aplicação sem vulnerabilidades conhecidas](#Figura-11-Comando-npm-audit-em-uma-aplicação-sem-vulnerabilidades-conhecidas)
- [Figura 12 - Comando snyk test em uma aplicação com vulnerabilidades conhecidas](#Figura-12-Comando-snyk-test-em-uma-aplicação-com-vulnerabilidades-conhecidas)
- [Figura 13 - Comandos snyk test e snyk monitor em aplicação sem vulnerabilidades conhecidas](#Figura-13-Comandos-snyk-test-e-snyk-monitor-em-aplicação-sem-vulnerabilidades-conhecidas)
- [Figura 14 - Exemplo de uso da biblioteca express-rate-limit](#Figura-14-Exemplo-de-uso-da-biblioteca-express-rate-limit)
- [Figura 15 - Lista de processos iniciados com o comando pm2 start](#Figura-15-Lista-de-processos-iniciados-com-o-comando-pm2-start)
- [Figura 16 - Exemplo de uso do pacote Helmet](#Figura-16-Exemplo-de-uso-do-pacote-Helmet)
- [Figura 17 - Configuração padrão do Helmet](#Figura-17-Configuração-padrão-do-Helmet)
- [Figura 18 - Exemplo de uso de expressão regular (arquivo regex.js)](#Figura-18-Exemplo-de-uso-de-expressão-regular-arquivo-regex.js)
- [Figura 19 - Resultado da execução do arquivo regex.js](#Figura-19-Resultado-da-execução-do-arquivo-regex.js)
- [Figura 20 - Exemplo de aplicação com expressão regular vulnerável](#Figura-20-Exemplo-de-aplicação-com-expressão-regular-vulnerável)
- [Figura 21 - Usando a aplicação com uma entrada válida](#Figura-21-Usando-a-aplicação-com-uma-entrada-válida)
- [Figura 22 - Usando a aplicação com uma entrada maliciosa](#Figura-22-Usando-a-aplicação-com-uma-entrada-maliciosa)
- [Figura 23 – Arquivo crono.js](#Figura-23-Arquivo-crono.js)




## List of Abbreviations and Acronyms


- APM - Application Performance Management
- CEP - Brazilian ZIP code
- CPS - Content Security Policy
- CPU - Central Processing Unit
- DNS - Domain Name System
- DDoS - Distributed Denial of Service
- DoS - Denial of Service
- ECMA - European Computer Manufacturers Association
- FIFO - First In First Out
- HTTP - Hyper Text Transfer Protocol
- HTTPS - Hyper Text Transfer Protocol Secure
- I/O - Input/Output
- JS - JavaScript
- JSON - JavaScript Object Notation
- ms - milliseconds
- REDOS - Regular Expression Denial of Service
- regex - Regular Expressions
- SQL - Structured Query Language
- URL - Uniform Resource Locator
- XSS - Cross-Site Scripting




## Summary


- [Introdução](#Introdução)
- [1 - Conceitos Básicos](#1---Conceitos-Básicos)
- [1.1 - Segurança da Informação](#11---Segurança-da-Informação)
- [1.2 - Aplicações Web](#12---Aplicações-Web)
- [1.3 - Node.js](#13---Nodejs)
- [1.4 - Negação de Serviço](#14---Negação-de-Serviço)
- [2 - O Loop de Eventos](#2---O-Loop-de-Eventos)
- [2.1 - Bloqueante X Não Bloqueante](#21---Bloqueante-X-Não-Bloqueante)
- [2.2 - O que é o Loop de Eventos](#22---O-que-é-o-Loop-de-Eventos)
- [2.3 - Síncrno X Assíncrono](#23---Síncrono-X-Assíncrono)
- [2.4 - Streams](#24---Streams)
- [2.5 - Exemplo Prático](#25---Exemplo-Prático)
- [3 - Bibliotecas](#3---Bibliotecas)
- [3.1 - Express-rate-limit](#31---Express-rate-limit)
- [3.2 - PM2](#32---PM2)
- [3.3 - Helmet](#33---Helmet)
- [3.4 - Validação](#34---Validação)
- [4 - Expressões Regulares](#4---Expressões-Regulares)
- [5 - Boas Práticas](#5---boas-práticas)
- [Considerações Finais](#Considerações-Finais)
- [Referências Bibliográficas](#Referências-Bibliográficas)
- [Apêndice A](#Apêndice-A)




## Introduction


Node.js is a development platform built on top of the Google Chrome JavaScript engine. JavaScript is the default programming language that today's browsers primarily use to create iterations between the user and the web page. The Node.js platform allows programs written in JavaScript to run outside a browser, so you can create complete applications written in JavaScript. Node.js is mainly used for the development of scalable web applications. It was released in 2009 and its popularity has only increased since then. But growing popularity also attracted malicious hackers.

When a programmer creates an application, it may contain vulnerabilities from the language or platform used. For example, some languages, such as JavaScript and SQL, do not interpret special characters automatically, which can create a breach for malicious code injection. So it is very important that the programmer knows all vulnerabilities of his work tool and how to combat them at the time of writing the code.

This work presents the most common denial of service vulnerabilities in Node.js and what you can do at the time of writing the code to minimize these vulnerabilities.

The first chapter establishes essential concepts for the work, such as: JavaScript, Node.js, Vulnerabilities, Threats, Information Security, Availability, Denial of Service, among others.

Then in the second chapter we talk about the importance of writing codes that do not block the loop of events in Node.js applications, and how failure to do so can cause denial of service in an application.

The third chapter discusses the strengths and weaknesses of libraries available to Node.js, the necessary care with them, and how to identify which libraries have known vulnerabilities.

Next in chapter four is talked about denial of service vulnerabilities caused by badly formulated regular expressions.

Finally, the fifth chapter presents other best practices for mitigating vulnerabilities in Node.js applications code.

The problem this paper addresses is that developers often do not give enough attention or do not know how to combat vulnerabilities, and create codes with multiple loopholes that can be exploited by malicious people and sometimes even by unintentional legitimate users, causing damage the organization responsible for implementation.

The question this paper tried to answer is: How can you mitigate denial of service vulnerabilities in a Node.js application at the time the code is written?

The paper's hypothesis was to find out what the major denial-of-service vulnerabilities in Node.js applications are, how to combat them, and help developers build safer applications. Benefiting users, customers and the developers themselves.

The overall goal was to introduce some of the most common denial of service vulnerabilities and show how you can combat them in the Node.js.

The specific objectives of this work were: to relate denial of service vulnerabilities, explaining how they can be exploited and the damages they can cause, in order to show the importance of denying them; Provide solutions for the development of applications protected against such vulnerabilities, teaching techniques, concepts and presenting libraries, modules or packages specifically designed to combat these vulnerabilities; Raise awareness among Node.js application developers that you need to know and reduce the vulnerabilities of your applications, and remember that in addition there are other activities that must be done to increase the security of the application.

Node.js is a relatively new technology that has rapidly gained popularity, so the number of developers who truly treat the security of their applications with due importance is still small. So there is a need to raise awareness of the importance of trying to reduce the potential vulnerabilities of an application.

The method used was the bibliographic research, carried out in books and websites related to web application security, Node.js, and vulnerability combat.


[Back to Summary](#Summary)


## 1 - Basic Concepts


This chapter briefly explains some basic concepts useful for understanding this work. These concepts are: information security, availability, integrity, confidentiality, vulnerability, threat, frontend, backend, web application, JavaScript, Node.js and denial of service.


### 1.1 - Information Security


According to Peltier (2014), the goal of information security is to protect important resources of an organization, not only information, but also physical, financial, legal, employee, reputation, and other resources. The author further emphasizes that information security objectives must align with the company's objectives, should help to achieve them not to disrupt. And all levels of the organization must also be concerned and aware of information security aspects.

Integrity, confidentiality and availability are the three main concepts of information security, which are detailed below.

Whitman and Mattord (2011) say that information has integrity when it is whole, complete and not corrupted. According to them the information ceases to be complete when exposed to corruption, damage, destruction or other interruption of its authentic state. The authors further explain that one way to verify the integrity of an information is to use Hash algorithms that generate a unique value for a file and in case any modification occurs in it the hash is changed.

The European Court of Auditors defines confidentiality as "[...] a guarantee that only authorized persons have access to information stored or transmitted through communication networks." According to Whitman and Mattord (2011), some of the measures that can be taken to protect the confidentiality of information: classify the level of confidentiality of information, store information in secure locations, enforce security policies, educate users and those responsible for information.

The last of the three main concepts of information security is availability:

> Consists of ensuring that the information is accessible to the authorized persons and processes at any time during the period agreed between the information managers and the information technology area. Maintaining the availability of information presupposes ensuring the continuous provision of the service, without interruptions in the provision of information for the right person. (TCU, 2012)

Availability is the main concept of information security for this work, because it is directly related to denial of service.

Vulnerability is a weakness or failure of a protection system or mechanism that opens it for attacks or damages. (Whitman and Mattord, 2011). Being a vulnerability a weakness or a failure it is possible to strengthen this point or correct such failure. In this work we study vulnerabilities that create opportunities for denial-of-service attacks and seek solutions to reduce these weaknesses or weaknesses.

According to Whitman and Mattord (2011) a threat is a category of people, objects or other entities that can cause damage to an organization resource. They even define a threat agent as a specific element of a threat, for example hackers are a threat, while a specific hacker is a threat agent. The authors further point out that threats will always be present, and may be intended to reach a specific target, or not targeted specifically to a target, but to any organization that has vulnerability exploited by the threat agent.


### 1.2 - Web Applications


Frontend is the part of an application that is responsible for interacting with the client. In the case of a web application the frontend is the code that is interpreted by the client browser, which formats and generates a visualization for the client, with elements that they can interact with, for example a form that can be filled.

Backend is the part of the application that runs on the server, usually responsible for business rules, access controls, manipulating information from a database, authentication, and security. Using the same example cited in the frontend, when a user submits the form is the backend that is responsible for validating, registering, and processing the information.

Web application is an information system set in the Web, that is, it is an application whose backend resides in web server and the frontend is interpreted in a program of access to the web, that usually is a browser, but can be also, for example, a mobile app.

JavaScript is a programming language found on most current websites. According to Düüna (2016) JavaScript is one of the most misunderstood programming languages ​​in the world because of its history. Initially it was called LiveScript because it was created with the intention of making web pages more 'live', and it was just a language for simple scripts. It received the JavaScript name in an attempt (which worked) to take advantage of the fame of the language JAVA, but the two have no relation beyond this historical curiosity. Today it is a robust language for Web application development and is called ECMAScript because it is maintained by the ECMA (European Computer Manufacturers Association) organization, but is still referred to by most books, developers and authors as JavaScript. Düüna (2016) also points out that every tool has its own peculiarities, and because of the growth and transformation, long non-standardized, JavaScript has some characteristics that should be avoided or used with caution following good practices to avoid security vulnerabilities and other problems in applications.


### 1.3 - Node.js


According to Düüna (2016) Node.js is a platform developed from the Google Chrome JavaScript interpreter: V8, to interpret codes written in server-side JavaScript (backend), which made it possible to create web applications fully written in the JavaScript language. The author also explains that Node.js extends JavaScript functionality by linking it to various libraries written in C and C ++ programming languages, as well as modules that allow access to operating system functionality, manipulate binary data, and other types of requests. Thus allowing Node.js to access files, run commands on the system, receive and respond to network requests, that is, everything a server needs, but it was not possible to do it with just JavaScript.

Düüna (2016) highlights some important features of Node.js from a security point of view. One of them is the fact that Node.js receives and interprets requests in only one thread (or task), that is, there is only one point of entry and exit of events, called event loop. This feature is very important for information security, especially in the availability issue, because if something blocks the event loop, the application can no longer serve customers, generating a denial of service. This is discussed further in the next chapter. Another feature highlighted by the author is the rich JavaScript library manager that is installed by default alongside Node.js, the Node Package Manager (NPM). The advantage of NPM is that many libraries help developers solve tasks, thus speeding up the application development process, but these libraries are also subject to vulnerabilities. In the third chapter of this work we study libraries and the necessary care in using them.


### 1.4 - Denial of Service


A Denial of Service (Denial of Service) attack, or Distributed Denial of Service (DDoS) attack, is an attempt to make a computing resource unavailable to legitimate users (Rhodes-Ousley, 2013 ). Therefore it can be concluded that a denial of service vulnerability is a failure or weakness of an application that allows this type of attack.

According to Whitman and Mattord (2011) a DoS attack is performed at only one point while a DDoS attack is performed from multiple locations at the same time, usually each of these points is a compromised system, infected by some malicious program that allows remote control functions such as making requests to a server.

O'Hanley (2014) says that a denial of service attack is intended to deny or degrade a legitimate user's access quality to a service or network resource. The author classifies DoS attacks into two types: service deactivation attacks and resource depletion attacks. The first one is characterized by high numbers of requests, usually by several clients, a DDoS, with the intention of reaching the limit of the queue to use the resource and causing the resource to stop. On the other hand resource-thinning attacks often exploit a logical flaw in the application causing a process to consume server resources for a very long time, leaving fewer resources and time to process legitimate user requests.

Mueller (2016) emphasizes that an important part of a DoS attack is to require a complex operation, such as a search, so it is a good idea to require user authentication to perform these types of operations, creating a further security barrier against DoS attacks.

Nahari and Krutz categorize solutions to combat DoS attacks in two types: preventive and reactive. Preventive solutions prevent attack by taking precautionary measures, such as filters, setting limits, hiding resource locations, and detecting intruders. Already the reactive solutions are triggered during the attack and generally have the purpose of determining the origin of the attack, some examples are: marking of packages, tests of connection and data collection in registries (logs).


[Back to Summary](#Summary)


## 2 - The Event Loop


The most important rule when developing Node.js applications is not to block the event loop, so you need to understand exactly what that means. This chapter explains how Node.js works, what the event loop is, how it operates in Node.js applications, what it means to block it, and how to avoid it.


### 2.1 - Blocking X Non-Blocking


First is defined what a thread is. According to Teixeira (2013) a thread is a process thread that shares the memory of a process with all other threads that exist within the same process. In practice what this means is that if the computer's processor is for example quad-core, i.e. it has four cores then it has four processes running at the same time, and within each of these processes there may be several threads process).

In a simplified way it can be said that a block occurs when heavy operations (in relation to execution time) are carried out continuously (at one time), that is, while the operation is not completed other pending tasks do not have a opportunity to perform. According to the official site of Node.js there are two main reasons for not blocking a thread from a web server: performance (requests served per second), which is much higher when the thread performs only fast tasks; and security, because if it is possible to block the thread with some request or malicious input, this creates a vulnerability that can be exploited and cause a denial of service.

Ryan Dahl (2018) says that when he created Node.js, his main goal was to create a tool in which to develop non-blocking web servers triggered by events. This type of server has better performance in applications focused on data input and output (I/O), because they do not block the thread. Until then most of the web servers were of the process-based type, such as popular Apache, this type of server blocks the thread, and therefore uses multiple threads to serve multiple clients.

At first it may seem that creating multiple threads makes the application faster, but according to Casciaro and Mammino (2016) there are two weaknesses in this type of server. The first is the fact that for each request a new thread is created. And most of the time these threads are idle, waiting for I/O from the client. This is bad because thread creation is not a cheap operation, it uses memory and context changes. And creating a thread to accomplish a simple task, leaving it most of the time in standby, does not provide benefits, in terms of time, after all. The second weakness is that each of these threads is blocking, that is, it waits for a finalize operation to start another. In case all or most threads on your server are occupied by clients performing blocking operations, other clients are unable to use your application, generating a denial of service. This type of processing is called a parallel because several operations are performed at the same time in different processes.

The authors also explain that on a server with only one non-blocking thread, this thread almost never goes into the idle state, there are always operations to be performed. What is important is that these operations are not blocking, that is, they are fast. In this case the process is called concurrent because the functions are divided into smaller tasks and are performed interleaved, minimizing the wait state time, giving the user the feeling that they were performed at the same time. The following figures illustrate multi-threaded servers compared to single-threaded servers.


##### Figure 1: Diagram of a multi-threaded blocking server

![multi-threaded](/img/1.png)

*Source: Casciaro e Mammino (2016)*


##### Figure 2: Diagram of a non-blocking single-threaded server

![single-threaded](/img/2.png)

*Source: Casciaro e Mammino (2016)*


As shown in Figures 1 and 2, in the multi-threaded blocking server, threads stay in the idle state for a long time, that is, taking up resources in the processor without performing any tasks. While in the non-blocking single-threaded server, as can be seen in Figure 2, the time in idle is much smaller, that is, it does not waste many processor resources, leaving them free to perform other tasks, such as the functions performed by the kernel and by the Work Pool, which are discussed in the next section.


### 2.2 - What is the Event Loop


The event loop is what allows Node.js applications to perform non-blocking operations, even though JavaScript uses only one thread. In a simplified way the responsibilities of the event loop are: to redirect operations to the operating system kernel (when possible) or to the work pool (a place where some specific tasks are executed), schedule timers, receive and execute callbacks after another function is finished). Because most modern operating systems have a kernel capable of maintaining multiple threads, they can perform background operations when needed. When these operations are finished they return to the event loop to run in the Node.js. application.

Libuv is a library developed in the C language, originally developed exclusively to enable the single-threaded non-blocking nature of Node.js, is now also used on other platforms. It is responsible for creating the event loop, worker pool, and various asynchronous functions (non-blocking functions, discussed in the next section) that are not available in the operating system kernel. Figure 3 shows a diagram representing the events loop, based on Belder's talk (2016), one of the developers of Node.js and the libuv library.


##### Figure 3: Event Loop Diagram

![event-loop](/img/3.png)

*Source: Adapted from Belder (2016)*


First we notice the three entities outside the event loop: Time Heap; Kernel; and Worker Pool. Each of them is responsible for performing certain types of tasks, according to Belder (2016), the main characteristic in common is the number of references, which is nothing more than the number of tasks that entity is performing or is waiting to perform. It is observed next which types of task is responsibility of each one of these entities.

Belder (2016) explains that Time Heap has only one responsibility which is to control the calls of the setTimeout functions (performs a function, once, after a period of time) and setInterval (performs a function, several times, at each interval time). These functions are not native to the JavaScript language, but most platforms that execute JavaScript code have an implementation of them, such as the modern Chrome and Firefox browsers. Node.js also has its own implementation of these functions. Time Heap returns a callback function to the beginning of the event loop when the given time is reached.

Belder (2016) says that the kernel is responsible for performing functions such as: servers, tcp/udp connection sockets, pipes, terminal entries, DNS (Domain Name System) resolutions, among others. When the kernel completes these operations, it returns them to the event loop, more specifically in the callback pool phase, which is explained later.

According to the official documentation of Node.js, the Worker Pool or also called Thread Pool has a variety of asynchronous functions created by libuv, which do not have a similar one in the kernel that is also asynchronous. Some examples of operations performed by the Worker Pool are: DNS lookup, file system operations (access, reading, writing), some exceptional types of pipes, streams, among others. Like the kernel, the Worker Pool returns the completed operations to the callback pool in the event loop, so that they run in the application.

In Figure 3 note five squares with "JS" written inside them, according to Belder (2016), they represent the moments in which the event loop executes JavaScript codes. It is in these moments that references to the Time Heap, Kernel and Worker Pool can be created, by invoking functions implemented by Node.js. We now discuss how each step of the event loop works.

Belder (2016) explains that when a Node.js application is started the first step that occurs is the reading and execution of the application entry point, represented by index.js in Figure 3. In the case of a web application it is at that moment that the kernel receives a reference to begin listening to Hyper Text Transfer Protocol Secure (HTTPS) or Hyper Text Transfer Protocol (HTTP) requests.

The author still says that after all initial code is executed the loop enters the phase of the timers, which receives the functions of the Time Heap that have already waited the time determined to them and must be executed. Then the event loop performs these received functions.

The next phase, the pool phase, is the most important of the loop. According to official Node.js documentation, this is the phase that receives kernel and worker pool callbacks, it is responsible for determining how long to wait for callbacks, to generate a queue of those received callbacks, and to execute them in the FIFO order (First In First Out). If the pool phase queue is empty and there are no callbacks waiting at other stages (timers, check, and close), the event loop is stopped in the pool phase until it (or the timers phase) receives a callback.

Belder (2016) explains that after all callbacks of the timers and pool phases execute, the check phase is entered, this phase is responsible for executing callbacks called by a special timer function: setImmediate. It is special because it has a phase only for itself, while the other timer functions are executed in the timer phase. The function name refers to the fact that it is executed immediately after the pool phase.

The last phase of the loop is the phase called close. According to the official documentation of Node.js, it has this name because it is responsible for verifying if any callback or communication socket was closed abruptly, if this happens a close-type event is issued and the resources used are "clean".

According to Belder (2016), when the close phase ends, the event loop checks the number of references of the Time Heap, Kernel and Worker Pool, if all three are equal to zero the event loop ends, because if it continues it would end up in phase of pool and never again would leave of there, since for some code to be executed would be necessary to receive a callback of some reference, and there are zero references in all three possible places. There are two other situations where the event loop would end: if there is an unhandled runtime error; if the process.exit() function is executed at some point.

Belder (2016) further explains that if there is at least one reference in one of three possible places (Time Heap, Kernel, Worker Pool) at the end of the close phase, the loop returns to the timers phase and closes the loop, repeats the steps described above from the timer phase. The author emphasizes that in the case of a web server, as at boot time the kernel receives a reference to start listening to HTTPS requests, this reference will always be present, so the web server does not stop even when there is no task to execute .


### 2.3 - Synchronous X Asynchronous


The concepts of synchronous and asynchronous are directly linked to the most important rule of Node.js: do not block the event loop. It is also important not to block the Worker Pool because it is responsible for most tasks that use more processor resources.

In a simple way a synchronous function performs all its tasks in sequence and all at once, which means that while it executes, no other function has its turn in the thread. An asynchronous function can perform a small task (therefore fast), pause, release the thread to another function, and continue its tasks later. According to Casciaro and Mammino (2016) the asynchronous architecture and the fact that Node.js is single-threaded, has changed the way developers deal with parallelism. Because instead of creating a new thread for each new task, they use asynchronous functions to give a fair time for each task and reduce the wait time of the thread.

Because asynchronous functions stop their execution on a regular basis so that the event loop can check for other functions, it takes longer than a synchronous function to terminate. This is why many of the functions available in Node.js libraries have a synchronous version and an asynchronous version. Because if this function is to be executed once in the application initialization, it is more advantageous to use the synchronous version. Because it is faster, and the fact that it is blocking does not matter in this case because at the start of the application there are no client requests yet.

According to Simpson (2015), asynchronous functions help to create applications that do not block for two reasons: first, because they can be divided into smaller tasks that do not need to be executed at once, other functions can be performed between these tasks; the second reason is the fact that some functions need idle time, for example to wait for data reception from another application, and this can be done while other functions run. Already in a synchronous function this time of waiting would leave the thread in idle state, that is, blocking the execution of other tasks.

For example, a program must perform a function that essentially does two tasks: it requests data from an external application, and then does a simple calculation with that data. The request takes 5 ms (milliseconds), and the calculation 15 ms, but the waiting time for the external application to respond to the request is 780 ms. If this function is performed synchronously (blocking) the thread will be occupied by this function for 800 ms and during that time no other function can be executed. If the function is asynchronous the program executes the request task in 5 ms, it returns the control of the thread to the event loop that can perform other functions that are in the queue and when the external application returns the data (780 ms later of the request) a callback with this data enters the execution queue, and when its time comes, it is executed.

There are several ways to write asynchronous functions in JavaScript, only four of them will be discussed in this paper, discussed by Simpson (2015) and Casciaro and Mammino (2016): Callbacks, Promises, Async/Await, and Generators. According to Simpson (2015) callbacks are the most fundamental and most used way to write asynchronous code in JavaScript. Callbacks are defined as functions that are passed as a parameter to another function and executed after the function containing them is executed. It is important to note that not every callback is asynchronous, it depends on how the function was written.

Simpson (2015) defines Promise as an easily repeatable mechanism for encapsulating and composing future values. In a simplified way a Promise returns a state and a value, the state can be pending, resolved or refused. Usually the initial state is pending and there is no value, when the task performed by Promise is finished the state changes to resolved and the value is the result of that task. If an error occurs in the execution of the task, the state is denied and the value is the error that occurred. The advantages of Promises is that they can be chained easily; dealing with mistakes is easier; the form of writing is more understandable than callbacks.

Simpson (2015) explains that to write an asynchronous function using Async / Await it is enough to use the reserved word in JavaScript async before the declaration of a function, and within that function the await reserved word can be used to asynchronously pause the execution of the function and wait a task, which when completed resumes the execution of the function.

The author further states that a Generator is declared using an asterisk (*) after the function keyword, a function of this type can be paused anywhere within its declaration using the reserved word yield. And execution is only resumed when the next () method is called in the reference of this Generator.


### 2.4 - Streams


Teixeira (2013) defines stream as an abstract construct that is implemented by several Node.js objects. According to Casciaro and Mammino (2016), in an event-based platform such as Node.js, the most efficient way to handle input and output (I/O) is to consume the input as soon as it is available and send the output that's ready, and that's exactly what streams do.

According to Casciaro and Mammino (2016) some asynchronous functions, although they do not block the events loop, use a buffer to store the results of the tasks performed by it and only return those results after all tasks finish. There are three problems with using a buffer: As long as all tasks in this function do not finish, the next function that uses this result can not start; the buffer takes up space in memory, if the data is too large (a video file for example) or multiple clients are using this buffered function, the server can occupy all of its memory, causing an unavailability; the buffer has a maximum size, which in Node.js is approximately 1 gigabyte, if the data exceeds this value a buffer overflow error occurs.

In Node.js streams can be of four types: Readable, Writeable, Duplex and Transform. Casciaro and Mammino (2016) define a readable stream as a representation of a data source, for example a file to be read. Authors also define a writeable stream as a representation of a data destination, such as a file to be written. A duplex stream is readable and writeable at the same time. A transform stream is a special type of duplex stream, since there is an established relationship between the input and output data, whereas in the duplex stream this relation is not established.

According to Casciaro and Mammino (2016), streams can be chained, similar to promises, the difference is that in the case of promises a chain operation must be finalized so that the next one begins, on the other hand with streams each piece that goes through an operation is already sent and can be processed by the next operation. Figures 4 and 5 clarify this difference.


##### Figure 4: Reading a file using buffer

![buffer](/img/4.png)

*Source: Casciaro e Mammino (2016)*


##### Figure 5: Reading a file using stream

![stream](/img/5.png)

*Source: Casciaro e Mammino (2016)*


It is observed in the first step of Figure 4 that a portion of the file is read and stored in the memory buffer, in the second step the file reading is terminated and all content contained in the memory buffer is sent to the next operation. While in Figure 5 it is noted that in the first step, as soon as part of the file is in memory, it is already sent to the next operation, and in the second step the other part of the file is read and sent to the next operation.

According to Casciaro and Mammino (2016), in some cases the next operation may be slower than reading, which would cause a buffering of data in memory similar to buffering, but streams have an internal mechanism to prevent this. This mechanism creates a very small buffer, and while this buffer is full the reading is paused, once there is space in the buffer the reading is resumed, avoiding a buffer overflow error.


### 2.5 - Practical Example


A practical example to clarify the advantages and disadvantages of using synchronous, asynchronous, and streams code is discussed below. In this example we created a simple command line application, which just reads a file, then compacts it, then unpacks it and finally saves it. It is a good example to visualize the differences in performance and order of execution between synchronous, asynchronous code and streams.


##### Figure 6: zipSync.js file

![zipSync](/img/6.png)

*Source: Own authorship*


##### Figure 7: zipAsync.js file

![zipAsync](/img/7.png)

*Source: Own authorship*


##### Figure 8: zipStream.js file

![zipStream](/img/8.png)

*Source: Own authorship*


In Figures 6, 7 and 8 we have the source code of our application in three different ways: synchronous, asynchronous with buffer and finally asynchronous, but using streams. The source codes, line by line, are now explained.

Lines 1 through 5 are the same in all three figures. In lines 1 and 2 are loaded two libraries of Node.js that have functions to handle the file system and compact files respectively. In line 3 a variable is defined that receives the path of the file to be read. In line 4 a library is loaded, shown in appendix A, which is only used to time the application execution time. And in line 5 the time counting starts. Also in common in the three figures is the last line that prints in the terminal the string "Other Tasks". This is to visualize when other possible tasks in the application would be executed, before or after the operations in the file are finished.

Between the fifth and last line of source codes, functions are performed to read, compress, unpack, and save the file, in that order. All of these functions are part of the native Node.js libraries: fs and zlib. The difference is that in Figure 6 the functions used are synchronous, in Figure 7 the functions are asynchronous with buffer, and in Figure 8 the functions are asynchronous with streams.

The result of running the three implementations of our application using the same file (of 346MB) as input is now shown in Figure 9.


##### Figure 9: Running the three implementations of the application

![running the applications](/img/9.png)

*Source: Own authorship*


The first three lines show the result of the application with synchronous functions, the most important thing to note here is the fact that the string "Other Tasks" appears after the stopwatch finishes, that means that other tasks would be blocked and would only execute after the operations of the file. It is also observed that the synchronous application is the fastest of all as it is expected since the operations in the file do not pause.

From the fourth line to the sixth, we have the execution of the asynchronous application in buffer. Note that it is the slowest of all, it takes about 20% more time than the synchronous application. However, the highlight is the fact that the "Other Tasks" string appears before the timer finishes, that is, if there are other tasks, they do not have to wait for the operations in the file to finish to execute, which is according to the philosophy of not blocking the event loop.

From the seventh line to the ninth line, the result of the asynchronous application using streams is displayed. Like the asynchronous buffered application, "Other Tasks" are executed before operations on the file are finished. And it is also observed that the execution time is smaller in relation to the implementation with buffer, this is due to the fact that the thread chaining allows for example the compacting operation to start as soon as a small part of the read operation is ready.

It is concluded that it is better to opt for synchronous code when blocking is not a problem, for example when starting a server because the code only executes once and has not yet entered the event loop. Already for operations inside the event loop it is better to opt for the asynchronous option with streams, when possible, mainly to handle large files, because besides being faster, it is lighter in relation to the memory as already seen previously.


[Back to Summary](#Summary)


## 3 - Libraries


Mueller (2016) defines a library as any external code that is added to your application. The author further states that libraries are purely codes that are downloaded and executed as part of an application. You can use functions directly, sometimes the source code is available to change the behavior of these functions.

Casciaro and Mammino (2016) define a module as a fundamental means to structure the code of a program. It is a building block for creating applications and reusable libraries called packages. The authors also point out that one of the principles of Node.js is to create small modules as they are easier to understand and reuse, simple to test and perfect for sharing with the browser. The term package is used to refer to a module or code library.

The Node Package Manager (NPM) is the package manager used by Node.js. It was bundled to Node.js early in the development process, and according to Düüna (2016) was a good decision because NPM is one of the reasons for Node.js success. NPM makes it easy to install, publish, and manage package dependencies. There are some commands and scripts that facilitate and accelerate the application development process.

Dahl (2018) says one of his biggest regrets about creating Node.js is the lack of attention to security. An example he cites is that libraries have access to the computer and the network of their server or computer running the application. This is one of the reasons why it is recommended to run applications in a sandbox, never as root or administrator.

Düüna (2016) warns that to use third-party libraries one must have confidence. That means making sure the libraries were written by well-intentioned people, not people who want to cause harm and loss. In addition, you must trust that libraries and their dependencies have no known bugs or vulnerabilities. The author shows that a project can contain dozens and even hundreds of libraries and dependencies, which makes manual checking impossible. After all the idea is to use libraries to save time, and not spend time looking for vulnerabilities.

According to Düüna (2016) there are three options for dealing with a choice of packages: choosing popular packages; obscure packets; and write your own code. The first option is based on the fact that the more people use a package the lager is the community behind it. This implies that more people are looking for vulnerabilities and updating the package to remove them. So the most obvious vulnerabilities have most likely already been found and removed. In addition, it is common for popular packages to have one or more large companies behind, either developing or sponsoring, and generally they also provide features to improve package security. But the author warns that a greater number of users also means a greater attraction for malicious hackers.

The second option discussed by Düüna (2016) is to obscure packages. This means exposing as little of your application as possible, such as which packages it uses. The last option described by the author is to write the code itself. This is usually the most time-consuming and expensive option. In addition, the author recalls that everyone is susceptible to error, and in a third-party library it is possible that the developer or someone who used the library has found and removed vulnerabilities.

An example of a very popular package is Express (https://expressjs.com), which provides a number of features for creating web applications. It is an open source project created in June 2009, and has more than two hundred direct contributors. Because it is one of the oldest and most popular packages, the chance that a vulnerability has gone unnoticed is very small.

Düüna (2016) says that after choosing packages it is necessary to verify, audit and test them for safety. First, the author advises observing the package features that are used in the application. If most of them are not used, perhaps the package chosen is not ideal. Puffy packages can complicate application code and create unnecessary dependencies.

The author also recommends checking the path traveled by the data within the packet. Make sure they are not handled in an insecure or malicious way. If the data originates from user inputs, it is necessary to check if they conform to the standards: do not use the eval function or similar (vulnerable to code injection); the functions should not be invoked before data validation; there must be limits on values.

Düüna (2016) points out that it is common for malicious code to be inserted into scripts within the package.json file or for temporal functions, mainly setInterval. Well, these malicious code is executed by scripts or from time to time. The author also recommends checking if the packages use the native modules of Node.js (http, fs, net, tls, child_process, cluster, udp, vm, among others), since these modules are used to access system operating system functions of files, network and others. Therefore, it is also important not to run third-party packages on root or administrator accounts.

Another good practice reported by Düüna (2016) is to keep the packages up to date so that newly discovered vulnerabilities can be removed. The author also emphasizes that you have to test the updates before using them in production, as they can create unexpected bugs in the application. Two sites that maintain packet vulnerability bases are: npmjs.com/advisories and snyk.io/vuln. A very good site to look for packages is npms.io that evaluates packages in relation to popularity, maintenance and quality.

Of course joining the sites mentioned above and checking one by one of the packages used in your application, and all dependencies of them, would take a lot of time. So there are tools to perform this check quickly. NPM has a standard tool that scans vulnerable packages by simply typing the npm audit command into an open terminal in the folder that contains your project. Figures 10 and 11 respectively show the result of this command in an application having a known vulnerability packet and in a packet-free application with known vulnerabilities.


##### Figure 10: npm audit command in an application with known vulnerabilities

![npm audit with vulnerabilities](/img/10.png)

*Source: Own authorship*


##### Figure 11: npm audit command in an application without known vulnerabilities

![npm audit without vulnerabilities](/img/11.png)

*Source: Own authorship*


In Figure 10 a vulnerability was encountered, the npm audit command reports the vulnerability level as moderate. It also shows what kind of vulnerability, in this case Denial of Service. It also informs which package has the vulnerability, which other package it is dependency on, the path to the vulnerable package, and provides an address for more information. It also shows that the vulnerability has already been removed in some version of the package, in which case there is no patch available yet.

Snyk, a company focused on finding and resolving packet vulnerabilities, also has a tool for finding vulnerable packages in your application. First you need to install the tool using npm install -g snyk. You must be logged in to Snyk's website to use this tool. Then use the snyk test command to look for vulnerabilities. And you can also use the snyk monitor command, which monitors the dependencies of your application and notifies you via e-mail if new vulnerabilities are found in any package used by your application. Figures 12 and 13 respectively show examples of such commands in an application with known vulnerabilities, and an application without known vulnerabilities.


##### Figure 12: snyk test command in an application with known vulnerabilities

![snyk test with vulnerabilities](/img/12.png)

*Source: Own authorship*


##### Figure 13: snyk test and snyk monitor commands in application without known vulnerabilities

![snyk test without vulnerabilities](/img/13.png)

*Source: Own authorship*


The snyk tool shows some different information regarding the npm audit command. The main differential is the ability to monitor vulnerabilities with the snyk monitor command and receive updates via email.

As already mentioned, Düüna (2016) recommends using third-party packages because the chance of vulnerabilities going unnoticed by them is lower than if the developer wrote the code itself. This is even more relevant when it comes to packages that solve more complicated security-related issues, such as encrypting passwords. That's why it's important to know some useful security-related packages. Some of these packages, mainly related to denial of service, will be explored later in this chapter.


### 3.1 - Express-rate-limit


According to its documentation (https://github.com/nfriedly/express-rate-limit), Express-Rate-Limit is a library for Node.js/Express applications used to limit repeated requests to an application. This is very useful against distributed denial of service (DDoS) attacks because it limits the amount of resources that each attacking machine consumes.

Of course, it is possible to limit requests through other features, such as a firewall. But there are some advantages to limiting requests in the code of your application itself. One of these is discussed in the next paragraph: Ability to set a different threshold for each route of the application. Another advantage is that the application is often hosted on a third-party service, and there is no guarantee that this service will configure your firewall properly. And even if the application is hosted in the organization itself, some firewall configuration may fail or be corrupted. So it is better to have redundant limitation than to rely on only one feature.

The Express-Rate-Limit documentation also shows that you can configure the maximum number of requests at a given time, also configurable. It also allows you to set a limit for the entire application, or separately for each application route. It is thus possible to limit the requests according to the resource. For example for a login page it might be worth limiting 5 requests every 15 minutes to prevent brute-force attacks against users' passwords. On the other hand for a search page for example, it may be feasible to set up 20 requests every 5 minutes. This feature provides developer flexibility that is not possible with a firewall for example.

Figure 14 shows an example of using the express-rate-limit library applying different rules for different routes. For the route/api there is a limit of 100 requests every 15 minutes. For route/create-account there is a limit of five requests per hour. As you can see, there are some options passed to the rateLimit function. The following are some options and their descriptions according to the official documentation of the library itself:

windowMs: how long in milliseconds should keep the record of the requisitions.

max: maximum number of requests before sending a 429 error response.

message: error message sent to the user after max is reached. The default is "Too many requests, please try again later".

statusCode: HTTP status code returned after max is exceeded, by default is code 429.


##### Figure 14: Example of using the express-rate-limit library

![express-rate-limit](/img/14.png)

*Source: Available at: <https://github.com/nfriedly/express-rate-limit>. Accessed on: 03 Mar. 2019*


There are other options not highlighted in this paper. You can find them in the library's own documentation. As shown, express-rate-limit is a very useful package for security against denial of service attacks. Its use is recommended, however for some types of application there may be more appropriate packages. These cases are discussed in the package documentation itself, so it is recommended to check the best package for your application.


### 3.2 - PM2


According to its own documentation, PM2 Runtime is a production process manager for Node.js applications, with a built-in load balancer. It allows applications to run all the time, restart them without downtime, and facilitate some common development operations.

The PM2 Runtime is free and open source. There are two other paid versions of the PM2: PM2 Plus and PM2 Enterprise. These paid versions have more features and support online.

To install the PM2 Runtime simply use the npm install -g pm2 command. To start an application in production mode just use the command: pm2 start app.js. Being app.js is the entry point to your application. With this command PM2 already keeps your application running all the time, restarting automatically in case of crash, with no downtime. And for the application to restart automatically in the case of the machine where the application resides restart, just use the command: pm2 startup. To manage the application processes PM2 creates a list of processes, which can be accessed with the command pm2 ls, as shown in Figure 15.


##### Figure 15: List of processes started with the pm2 start command

![pm2](/img/15.png)

*Source: Available at: <https://pm2.io/doc/en/runtime/overview/>. Accessed on: 03 Mar. 2019*


To add processes to this list, simply use the command pm2 start, as it was written previously. To remove processes, use the command pm2 delete `app name`. There are also other commands to manage the processes, such as: pm2 stop; pm2 reload; pm2 restart.

It is also possible to generate log files easily with PM2. Just use the pm2 logs `app name` to generate logs of a process, or use the pm2 logs all command to generate logs of all processes. The log files are saved in the ~/.pm2/logs folder. There are several options for managing logs, for example: creating multiple files and not just a very large one; delete the log files; choose the file format.

A very useful feature of PM2, mainly to reduce chances of denial of service, is cluster mode. In this mode PM2 creates several child processes of your application and balances the load between them. This increases performance and reduces downtime. To use this function just start the application with the command: pm2 start app.js -i max. Being app.js is the application entry point, and -i is the option that controls the number of instances. In this case max means PM2 automatically detects the number of CPUs available and executes as many processes as possible. You can also use a specific number instead of max. In this case the number of instances will be the smaller of: the number entered in the option; and the number of CPUs available.

Another interesting feature of the PM2 is direct monitoring at the terminal. Just type the pm2 monit command into a terminal. This screen shows CPU and memory consumption, request logs, number of requests per minute, event loop delay, how many times the server has been restarted, uptime, among others. In addition PM2 has several other features to manage your application and reduce the time it is unavailable.


### 3.3 - Helmet


Helmet is a package that helps make Node.js applications made with the Express framework safer by configuring multiple HTTP headers. It is not intended specifically for denial-of-service protection, but rather for several types of vulnerabilities that can be exploited if some HTTP headers are misconfigured. The use of Helmet is recommended by several professionals, the official website of Express recommends. Düüna (2016) shows how using Helmet and with just a few lines of code it is possible to protect itself from a variety of attacks, as shown in Figure 16.


##### Figure 16: Example Helmet Package Usage

![helmet](/img/16.png)

*Source: Düüna*


Note that Düüna (2016) uses the default Helmet configuration, and also configures the Content Security Policy (CPS) header. The CPS defines which sources the scripts that are running in the application can be. The self option determines that only scripts from the application's own domain can run. This prevents Cross-Site Scripting (XSS) attacks.

One of the most important headers configured by Helmet is the X-Powered-By header. This header indicates which technology the application uses. It is good practice to remove this header. Because hackers can use it to find applications that use a particular technology that they have encountered a vulnerability. Removing this header your application is protected from these bulk attacks.

Figure 17 shows the default Helmet configuration used by Düüna (2016) in his example.


##### Figure 17: Default Helmet Configuration

![helmet config](/img/17.png)

*Source: Available at: <https://helmetjs.github.io/>. Accessed on: 03 Mar. 2019*


Also on the topic of HTTP headers but not Helmet-related, on November 27, 2018, an update was released for Node.js that resolved two denial-of-service vulnerabilities related to HTTP headers. The first is that before this update the headers could be up to 80 kilobytes, and after the update can only have up to 8 kilobytes. This was a problem because using a combination of requests with full-sized headers could cause the HTTP server to be stopped. The second vulnerability was that it was possible to send HTTP headers very slowly, keeping connections and resources allocated for a very long time, causing unavailability to other legitimate users of the application. More details about this update, and vulnerabilities, can be found on the official Node.js website.


### 3.4 - Validation


In this section we discuss the importance of validating data provided by users in order to avoid code injection attacks. It also shows some libraries focused on data validation.

Düüna (2016) defines code injection as an attack in which malicious code is inserted into the application and causes the program to execute it. This type of attack makes the server accomplish something that is not its purpose. This includes obtaining confidential information, modifying or damaging the server, among others. The author also states that because there are several types of code injection, this is the type of attack most used against web applications. According to the author to combat this type of attack it is necessary to validate the data provided by the user and to sanitize this data. This means removing special characters, which are used to write codes.

Generally code injection attacks are used to get or exclude information. However De Turckheim (2018) shows that it is possible to perform a denial of service attack using code injection. This attack consists of using an exploit in MongoDB, a database very popular in Node.js. applications. This failure is a specific MongoDB function that causes the server to pause for a certain amount of time. It shows that injecting this function into a database search can cause application unavailability.

A library for validating data is Validator.js. It has more than fifty validation functions and more than ten string sanitation functions. Two other validation libraries are Joi (https://github.com/hapijs/joi) and Celebrate (https://github.com/arb/celebrate#readme). Joi uses schemas in the format of JavaScript objects to validate data. It is very useful for validating HTTP request headers. Celebrate only facilitates the use of the Joi library in applications built on the Express framework.

It is concluded that it is very important to validate and sanitize data. For code injection attacks can cause various types of damage, including denial of service. It has also been shown that there are a number of specially developed libraries for data validation and sanitation. Using them can mean protecting your application against most web attacks.


[Back to Summary](#Summary)


## 4 - Regular Expressions


Section 3.4 showed the importance of validating user-supplied data. And one of the best tools for validating data is regular expressions, also referred to as regex. However, you must know how to write secure regular expressions. In this chapter we study what are regular expressions, how they can cause denial of service vulnerabilities, and how to write them in such a way as to avoid such vulnerabilities.

The official Node.js documentation defines regular expressions as expressions that have the function of comparing an input string to a pattern. For example, compare if the value entered is the format of an email. Of course, this is possible using string-specific JavaScript methods. The advantage of regular expressions is that you can create very complex patterns in just one line of code. It is not the scope of this work to teach all rules and syntax of regular expressions, since they are many. Kantor et al (2019) has a chapter, in its modern JavaScript tutorial, dedicated only to regular expressions. In this work we will briefly explain how regular expressions work in JavaScript. And it focuses on how to avoid vulnerabilities that can lead to denial of service.


##### Figure 18: Example of regular expression usage (regex.js file)

![regex.js](/img/18.png)

*Source: Own authorship*


##### Figure 19: Result of running the regex.js file

![running regex.js](/img/19.png)

*Source: Own authorship*


Figure 18 shows an example code that uses a regular expression to validate the format of a Postal Code. And in Figure 19 we get the result by executing the code of the file shown in Figure 18.

In the first line of Figure 18 the regular expression was defined and saved in a variable called myRegex. In the third line a string was saved that contains a value in the format valid for CEP in the cepValido variable. In lines 3, 4 and 5, three other strings were saved in three other variables, this time representing values ​​in an invalid format for CEP. In lines 8 through 11 you use a function that prints to the screen true if the string is valid according to the regular expression, and false otherwise. In Figure 19 we observe the results as expected, true for the valid string and false for the three invalid strings.

The regular expression is now explained. It is first observed that if slashes (/) are used at the beginning and at the end, these slashes are a way to define a regular expression in JavaScript. The first character inside the regular expression is a circumflex (^) which determines that the regular expression must be found at the beginning of the string. The dollar sign ($) at the end is similar to the circumflex, but indicates that the expression should be at the end of the string. In this the use of the circumflex and the dollar sign guarantee that there is nothing before or after the CEP, without the use of them the third invalid string would return true, which would be an error. Then there is \d that identifies digits 0 through 9, and {5} next to \d means that they must have five digits grouped together. The next character is a hyphen (-) that simply identifies the hyphen itself. And then you have \d {3} that identifies three grouped digits.

So the regular expression in Figure 18 will only validate strings that begin with exactly five digits, followed by a hyphen, followed by exactly three digits at the end of the string. Which perfectly represents a ZIP code. This example makes clear the power of regular expressions. Imagine writing this same validation by checking character by character, it would certainly be a much larger and more difficult code to understand.

According to official Node.js documentation, a vulnerable regular expression is a regular expression that takes an exponential time to finalize, which can cause a Regular Expression Denial of Service (REDOS) attack. The documentation further indicates four rules for avoiding denial of service vulnerabilities in regular expressions.

The first rule is to avoid nested quantifiers. For example the expression /(\d+)+$/ is an example of what should be avoided. In this expression the parentheses are called the catch group. Within this group we have \d+ representing one or more numeric digits. And outside the group we have the addition character which means one or more. And just after that is the dollar sign character that represents the end of the string. The problem with this type of regular expression occurs when using this expression in a string composed of several consecutive numeric digits but ends in a non-numeric character. Suppose the string is "1234a", what happens is that the expression finds the group "1234" which is composed of one or more digits. The expression then checks to see if you have found one or more groups of digits, which is true. Then the expression checks if the string ends in a numeric digit, which is false. So the expression goes back to the beginning and this time captures two groups "123" and "4" but still does not end with a digit. Then in the next step you capture the expressions "12" and "34", then the expressions "12", "3" and "4", and so on. In short, the expression tries all possible combinations of groups of digits but none will satisfy the regex because the string always ends with the character "a". Now imagine if a user enters a string that contains many numeric digits and a non-numeric character at the end. The time it would take for the computer to test all groups would be very large, causing a denial of service because these tests consume the entire processor and block the thread.

Another rule is to avoid "or" with repeated expressions. For example /(a​|a)*/. Similar to the first rule, this type of expression can cause excessive processor consumption and block the thread causing unavailability.

The third rule is to avoid using referrals to capture groups. For example /(a.*)\1/. When using capture groups references to them are automatically created, and can be used with \1, \2, etc. These references are useful to avoid rewriting the same group twice, but they require a lot of processor performance. It is therefore better to repeat the writing of a part of the expression so as not to affect the performance.

The fourth and final rule is to use the indexOf method when you need a simple query in a string. You can use regular expressions to find words in a string, but the indexOf method does the same and ensures that it will always take as little time as possible.


##### Figure 20: Application example with vulnerable regular expression

![regex vulnerable](/img/20.png)

*Source: Own authorship*


Figure 20 shows an example of a vulnerable regular expression because it does not obey the first rule. In fact it is the same example used to explain this rule earlier. The vulnerable regular expression is /(\d+)+$/. This code creates a web server that reads a string passed by the URL (Uniform Resource Locator) and uses the regular expression to check if the string ends in numeric digits. Obviously this is not the best way to do this, but to demonstrate a denial-of-service attack by exploiting vulnerable regular expressions is a good example because the code is succinct. After requesting a URL using a browser, the value of the input string, whether it was validated by the regex, and the time the server took it to evaluate the string using the regex and give the answer, is printed on the screen.


##### Figure 21: Using the Application with a Valid Input/Output
![regex valid](/img/21.png)

*Source: Own authorship*


##### Figure 22: Using the Application with a Malicious Input

![regex invalid](/img/22.png)

*Source: Own authorship*


Figures 21 and 22 show the result of using the application shown in Figure 20. In Figure 21 there is a valid input value of thirty characters, with a response time of approximately 2 milliseconds. In Figure 22 there is a malicious entry that exploits the vulnerable regex, obtaining a response time of more than 12 seconds. This is extremely worrying because during these 12 seconds the web application can not send responses to any client, generating a denial of service.


##### Table 1: Response times according to input size

| Number of Characters | 
Response Time (seconds) |
|:--------------------:|---------------------------:|
|26|0,869425535|
|27|1,616451710|
|28|3,167267293|
|29|6,296623415|
|30|12,238677298|
|31|24,993667302|
|32|50,202110160|
|33|100,528942781|
|34|199,121742321|

*Source: Own authorship*


Table 1 shows the response time of the application of Figure 20 for entries of different sizes (number of characters). All characters are numeric digits, except the last, creating a malicious entry, similar to Figure 22, but of several sizes.

It is observed in Table 1 that the response time of the application approximately doubles to each character added in the input string. That is, the order of time growth is exponential in relation to the size of the input. It can be estimated that in this example, with forty characters the response time would be approximately three hours and thirty minutes. Which would mean an unavailability of the application during all this time. Of course, this time depends on many factors such as the computational power of the server running the application. Even so, if your application runs on a server a hundred times faster than the one used in this example, with only forty characters a two minute outage would be generated, which is an eternity on the web.

Goldberg et al. (2019) recommend using, where possible, a validation library, such as the validator.js already mentioned in section 4.4. When it is necessary to use a regular expression, they recommend using the safe-regex library, which detects regular expressions potentially vulnerable to denial of service attacks. Authors further recommend validating the maximum input size before performing any operation with it (including regex testing). For this way, it is avoided that, in case of a vulnerability, the attacker does not have the power to use a very large input, minimizing damages.


[Back to Summary](#Summary)


## 5 - Best Practices


This chapter highlights some best practices in Node.js related to information security, especially in the availability aspect. The goal is to show actions that can prevent a variety of vulnerabilities in applications and greatly increase the security of applications. The main basis of this chapter is the most current best practice guide for Node.js, maintained by Goldberg et al (2019). The guide has 82 good practices, at the time of writing, and is constantly updated and expanded by the community leaders and contributions. Some of the best practices in this guide, primarily related to denial of service, are listed below:

- One of the best practices in Node.js is to run Node.js as a non-root user or system administrator. This is important because Node.js third-party packages have access to critical areas of the system, such as the file system. If the application has a package containing malicious code, and is running in root mode, the attacker has access and permission to read, write and delete important system files.

- There is a dilemma, a web application needs access to port 80 or 443, and these ports can only be accessed by a root user. The solution is another good practice: use a reverse proxy. The authors use Nginx as an example, which redirects requests to the Node.js application. They also recommend that everything that is possible be delegated to the reverse proxy, such as serving static files, Transport Layer Security (TLS) and gzip. As already seen, Node.js is efficient for incoming and outgoing requests. But other operations such as serving files, encryption, and file compression are not compatible with the non-blocking single-threaded philosophy of Node.js. Delegating this type of operations to a reverse proxy makes the Node.js application behave more efficiently, increasing availability.

- Another practice is to use all processor cores. As already seen, Node.js is single-threaded, that is, it runs on only one core processor. In practice this is not ideal because all current servers have multi-core processors. Not surprisingly, Node.js has a native module for clustering, which with a few lines of code allows load balancing between all available processor cores. Even easier is the use of the outsourced PM2 package, already discussed in section 3.2 of this paper.

- PM2 is also useful for further good practice. Know when to terminate and restart the process in the event of an error. Because not always that an error occurs it is necessary to restart, sometimes just registering the error in a log is enough. In addition, one should avoid restarting the process when the error is generated from a user's input. The authors give as an example the sending of an empty JavaScript Object Notation (JSON) entry to an application that does not validate this type of entry. If this generates an error and restarts the process, an attacker can generate multiple requests with an empty entry and restart the process several consecutive times in a short period of time, causing a denial of service.

- It is important to measure and monitor server resources, especially memory and CPU. To avoid memory leakage the authors suggest, for example, to avoid the use of global variables and anonymous functions. For monitoring, the authors highlight monitoring solutions from cloud vendors, such as AWS CloudWatch and Google StackDriver. The authors further indicate the use of APM (Application Performance Management), which is the monitoring and management of application performance and availability. The authors further suggest the use of smart logging, which consists of logging, grouping and viewing the logs intelligently, preferably using specialized libraries in this.

- Another good practice in Node.js is to set the NODE_ENV environment variable equal to production. By setting this value to this environment variable, it removes the application from the development mode (which is the default) and puts it into production mode. According to the authors, this makes the number of requests that Node.js can handle increase by about two-thirds. Also the CPU usage slows down a bit. In practice the application three times faster according to the authors. Also in this mode the error details are not displayed to the user, instead a generic error message is displayed when an error occurs. This is important because the less details a malicious attacker knows, the more difficult it is to find a vulnerability.

- It is also recommended to limit simultaneous requests, using libraries as express-rate-limit seen in section 3.1 of this work. The authors highlight mainly the limitation of requests for login routes in order to avoid brute-force attacks. Another library indicated by the authors is express-brute, whose differential is the ability to impose the shared boundary between the application clusters.

The Node.js documentation highlights the good practice of validating the size of user input, before any other type of verification. For a very large entrance can cause a denial of service. The example given in the Node.js documentation is the use of a very large JSON entry, which in most cases needs to pass through JSON to string conversion processes or vice versa. And this type of operation is very time consuming and uses a lot of processing, which can cause a denial of service. And also as already seen in Chapter 4, an extra character can double the execution time of a vunarable regular expression.

Düüna (2016) highlights some good practices to avoid denial of service attacks through asymmetric functions. Asymmetric functions are those whose runtime depends on the size of the user input. The first recommendation of the author is to avoid asymmetric functions when possible. But sometimes there is no way to avoid them, so the author recommends limiting the size of the entry, as seen in the previous paragraph. Düüna (2016) further recommends that only authenticated users can use asymmetric functions, reducing the possibility of denial of service attacks.


[Back to Summary](#Summary)


## Final considerations


This work showed concepts of information security as vulnerability, threat, availability and denial of service. In addition, the most common denial of service vulnerabilities in Node.js applications, and how to avoid them have been seen.

It was discussed the operation of Node.js, its non-blocking single-threaded nature, the events loop and the importance of not blocking it. We also studied the difference between synchronous, asynchronous, buffered and asynchronous codes with streams.

It was concluded that in situations where the blocking does not cause damage, that is, before the execution enters the event loop, it is preferable to use synchronous code, since in general it is faster. In situations where the blocking is harmful, that is, the application is already running in the event loop and receiving requests from multiple users, it is necessary to use asynchronous code.

We also discussed libraries, how to find vulnerabilities in libraries, and examples of libraries specific to security. It was concluded that the use of libraries should be cautious, considering such issues as popularity, maintenance and quality. And yet some security-focused libraries can greatly reduce the risk of threats in an application with just a few lines of code.

The importance of using regular expressions in a safe way was also verified. Benefiting of their advantages without compromising the security, especially the availability, of the application.

There have also been some good practices in Node.js that help mitigate vulnerabilities and increase the availability of applications.

It is also important to highlight that the vulnerabilities seen in this work do not correspond to all of them in Node.js. There are other vulnerabilities that relate, for example, to third-party services for hosting and maintenance of the application, available hardware resources, human resources, among others. As seen, there are vulnerabilities of other natures besides denial of service, as for example: code injection, cross-site-script and session theft. It is extremely important to protect the application against these types of vulnerabilities as well. This is possible using a variety of policies, controls, and techniques. For example hardening, which is to implement security measures on the server, the network or the organization.

It is concluded that many denial of service vulnerabilities can be avoided by taking measures shown in this work. In the information security environment, new technologies and techniques are emerging at all times, both to help with security and to try to break it. Therefore, it is also important to keep up-to-date on new types of vulnerabilities, threats and how to combat them so that your applications are always protected in the best possible way.


[Back to Summary](#Summary)


## Bibliographic references


BELDER, BERT. Everything You Need to Know About Node.js Event Loop. In: Node.js Interactive 2016, Vancouver, 24 set. 2016. Disponível em: <https://www.youtube.com/watch?v=PNa9OMajw9w> Acesso em: 20 fev. 2019.

CASCIARO, Mario; MAMMINO, Luciano. Node.js Design Patterns. 2. ed. Birmingham: Packt Publishing, 2016.

CELEBRATE. Biblioteca para aplicações Node.js/Express para validação de dados, 2019. Disponível em: <https://github.com/arb/celebrate#readme> Acesso em: 04 mar. 2019.

COLLINA, Matteo. Protecting Node.js from uncontrolled resource consumption headers attacks. 28 nov. 2018. Disponível em: <https://www.nearform.com/blog/protecting-node-js-from-uncontrolled-resourceconsumption-headers-attacks/> Acesso em: 20 fev. 2019.

DAHL, Ryan. 10 Things I Regret About Node.js. In: JSConf EU 2018, Berlin, 6 jun. 2018. Disponível em: <https://www.youtube.com/watch?v=M3BM9TB-8yA> Acesso em: 20 fev. 2019.

DAVIS, James C. A Sense of Time for JavaScript and Node.js. In: USENIX Security ‘18, Santa Clara, 18 set. 2018. Disponível em: <https://www.youtube.com/watch?v=Dm7Xyw3KueY> Acesso em: 20 fev. 2019.

DE TURCKHEIM, Vladimir. Node.js Applicative DoS Through MongoDB Injection. In: Node.js Interactive 2018, Vancouver, 19 out. 2018. Disponível em: <https://www.youtube.com/watch?v=xJWZsoYmsIE> Acesso em: 20 fev. 2019.

DÜÜNA, Karl; RASHID, Fahmida Y. (Ed.). Secure Your Node.js Web Application. Raleigh: Pragmatic Programmers LLC, 2016.

EXPRESS. Production Best Practices: Security. Boas práticas de segurança para aplicações Node.js/Express. Disponível em: <https://expressjs.com/en/advanced/best-practice-security.html> Acesso em: 20 fev. 2019.

EXPRESS RATE LIMIT. Biblioteca para aplicações Node.js/Express que limita o número de requisições a um servidor http, 2019. Disponível em: <https://github.com/nfriedly/express-rate-limit> Acesso em: 03 mar. 2019.

GOLDBERG, Yoni. et al. Node.js Best Practices. 2019. Disponível em: <https://github.com/i0natan/nodebestpractices> Acesso em: 17 abr. 2019.

HELMET. Biblioteca para aplicações Node.js/Express que ajuda a proteger aplicações configurando cabeçalhos http, 2019. Disponível em: <https://helmetjs.github.io/> Acesso em: 03 mar. 2019.

JOI. Biblioteca para aplicações Node.js que valida dados, 2019. Disponível em: <https://github.com/hapijs/joi>. Acesso em: 04 mar. 2019.

KANTOR, Ilya. et al. The Modern JavaScript Tutorial. Disponível em: <https://javascript.info/> Acesso em: 11 mar. 2019.

MUELLER, John Paul. Security for Web Developers. 1. Ed. Sebastopol: O’Reilly Media Inc, 2016.

NAHARI, Hadi; KRUTZ, Ronald L. Web Commerce Security Design and Development. Indianapolis: Wiley Publishing Inc, 2011.

NODE.JS. Don’t Block the Event Loop (or the Worker Pool). Disponível em: <https://nodejs.org/en/docs/guides/dont-block-the-event-loop/> Acesso em: 20 fev. 2019.

NODE.JS. November 2018 Security Releases. Disponível em: <https://nodejs.org/en/blog/vulnerability/november-2018-security-releases/> Acesso em: 20 fev. 2019.

NODE.JS. Overview of Blocking vs. Non-Blocking. Disponível em: <https://nodejs.org/en/docs/guides/blocking-vs-non-blocking/> Acesso em: 20 fev. 2019.

NODE.JS. The Node.js Event Loop, Timers and process.nextTick(). Disponível em: <https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/> Acesso em: 20 fev. 2019.

NODE.JS. The Node.js Event Loop, Timers and process.nextTick(). Disponível em: <https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/> Acesso em: 20 fev. 2019.

NPM Security Advisories. Banco de dados oficial de vulnerabilidades em bibliotecas distribuídos pelo NPM, 2019. Disponível em: <https://www.npmjs.com/advisories>. Acesso em: 20 fev. 2019.

NPMS. Ferramenta de busca de bibliotecas para Node.js. Disponível em: <https://npms.io/> Acesso em: 20 fev. 2019.

O’HANLEY, Richard (Ed.); TILLER, James S. (Ed.). Information Security Management Handbook. 6. ed. Boca Raton: CRC Press, 2014.

OPEN WEB APPLICATION SECURITY PROJECT. Denial of Service. 2 fev. 2015. Disponível em: <https://www.owasp.org/index.php/Denial_of_Service> Acesso em: 20 fev. 2019.

OPEN WEB APPLICATION SECURITY PROJECT. Regular expression Denial of Service - ReDoS. 2 fev. 2015. Disponível em: <https://www.owasp.org/index.php/Regular_expression_Denial_of_Service_-_ReDoS> Acesso em: 20 fev. 2019.

PELTIER, Thomas R. Information Security Fundamentals. 2. ed. Boca Raton: CRC Press, 2014.

PM2. Biblioteca para aplicações Node.js/Express que gerencia processos, 2019. Disponível em: <https://pm2.io/doc/en/runtime/overview/> Acesso em: 03 mar. 2019.

RHODES-OUSLEY, Mark. Information Security - The Complete Reference. 2. ed. New York: McGraw-Hill Education, 2013

SAFE-REGEX. Biblioteca para aplicações Node.js que detecta expressões regulares vulneráveis, 2019. Disponível em: <https://github.com/davisjam/safe-regex> Acesso em: 26 mar. 2019.

SAMUEL, Mike. A Node.js Security Roadmap. In: JSConf EU 2018, Berlin, 17 jul. 2018. Disponível em: <https://www.youtube.com/watch?v=1Gun2lRb5Gw> Acesso em: 20 fev. 2019.

SHARMA, Tarun. Secure Node JS Apps. 24 jun. 2018. Disponível em: <https://medium.com/@tkssharma/secure-node-js-apps-7613973b6971> Acesso em: 20 fev. 2019.

SIMPSON, Kyle. You Don’t Know JS: Async & Performance. Sebastopol : O’Reilly Media, 2015.

SNYK. Empresa que mantém bancos de dados de vulnerabilidades em várias bibliotecas de código aberto, 2019. Disponível em: <https://snyk.io/vuln/> Acesso em: 20 fev. 2019.

STAICU, Cristian-Alexandru. Freezing the Web: A Study of ReDoS Vulnerabilities in JavaScript-based Web Servers. In: USENIX Security ‘18, Santa Clara, 18 set. 2018. Disponível em: <https://www.youtube.com/watch?v=612mO3Ieexs> Acesso em: 20 fev. 2019.

TEIXEIRA, Pedro. Professional Node.js. Indianapolis: John Wiley & Sons Inc, 2013.

TRIBUNAL DE CONTAS DA UNIÃO. Boas Práticas em Segurança da Informação. 4. ed. Brasília: TCU, Secretaria de Fiscalização de Tecnologia da Informação, 2012.

VALIDATOR.JS. Biblioteca para aplicações Node.js que valida dados, 2019. Disponível em: <https://github.com/chriso/validator.js>. Acesso em: 04 mar. 2019.

WHITMAN, Michael E.; MATTORD, Hebert J. Principles of Information Security. 4. ed. Boston: Course Technology, 2011.


[Back to Summary](#Summary)


## Appendix A


Library crono.js, used to time the execution time in the examples of section 2.5.


##### Figure 23: crono.js file

![crono.js](/img/23.png)

*Source: Own Authorship*




[Back to Summary](#Summary)
