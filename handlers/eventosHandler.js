const fs = require('fs');

module.exports = (client) => {
    const carpeta = fs.readdirSync('eventos').filter(fl => fl.endsWith('.js'));

    for (const archivo of carpeta) {
        const evento = require('../eventos/'+archivo);
        if ('name' in evento && 'execute' in evento) {
            if (evento.once) {
                client.once(evento.name, (...args) => evento.execute(...args));
            } else {
                client.on(evento.name, (...args) => evento.execute(...args));
            }
        } else {
            log.error('No se pudo ejecutar '+ archivo + '.');
        }
    }
}