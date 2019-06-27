exports.stop = (timer) => {
    const end = process.hrtime(timer); /*para o cronômetro*/
    /*divide o tempo em mili, micro e nanosegundos*/
    end[3] = end[1] % 1000;
    end[2] = Math.floor((end[1] - end[3]) / 1000) % 1000;
    end[1] = Math.floor(end[1] / 1000000);
    /*mostra no console o tempo*/
    console.log(`Tempo: ${end[0]} segundos,
                        ${end[1]} milisegundos,
                        ${end[2]} microsegundos,
                        ${end[3]} nanosegundos`);
}

