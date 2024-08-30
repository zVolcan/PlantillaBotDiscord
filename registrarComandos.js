const { REST, Routes } = require('discord.js');
const { clientID, token, serverID } = require('./config.json');
const fs = require('fs');

module.exports = () => {
    const comandos = [];

    const carpeta = fs.readdirSync('./comandos').filter(fl => fl.endsWith('.js'));

	for (const archivo of carpeta) {
		const comando = require('./comandos/'+archivo);


		if ('data' in comando && 'execute' in comando) {
			comandos.push(comando.data.toJSON());
		} 
	}

    const rest = new REST().setToken(token);

(async () => {
	try {
		await rest.put(
			Routes.applicationCommands(clientID),
			{ body: comandos },
		);
	} catch (error) {
		console.error(error);
	}
})();
}