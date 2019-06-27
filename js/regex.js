const minhaRegex = /\d{5}-\d{3}/;   //regex de um CEP

const cepValido = "12345-678";      //um CEP válido
const cepInvalido1 = "-12345678";   //um CEP inválido
const cepInvalido2 = "1234-5678";   //um CEP inválido
const cepInvalido3 = "12345--678";  //um CEP inválido
/* Testando a validade das strings usando a regex */
console.log(minhaRegex.test(cepValido));
console.log(minhaRegex.test(cepInvalido1));
console.log(minhaRegex.test(cepInvalido2));
console.log(minhaRegex.test(cepInvalido3));

