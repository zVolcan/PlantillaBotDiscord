const fs = require('fs');

module.exports = (client) => {
    const carpeta = fs.readdirSync('mensajes').filter(fl => fl.endsWith('.js'));

    for (const archivo of carpeta) {
        const mensaje = require('../mensajes/'+archivo);
        if ('name' in mensaje && 'execute' in mensaje) {
            client.on('messageCreate', (message) => {
                if (message.content == require('../config.json').prefix + mensaje.name) {
                    mensaje.execute(message);
                }
            });
        } else {
            log.error('No se pudo ejecutar '+ archivo + '.');
        }
    }
}