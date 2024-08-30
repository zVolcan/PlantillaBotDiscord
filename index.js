const Discord = require('discord.js');
const log = require('node-color-log');

// Registrando comandos
require('./registrarComandos')();

// Estableciendo permisos a usar.
const client = new Discord.Client({
    intents: [
        Discord.IntentsBitField.Flags.Guilds,
        Discord.IntentsBitField.Flags.GuildMembers,
        Discord.IntentsBitField.Flags.GuildMessages,
        Discord.IntentsBitField.Flags.GuildPresences,
        Discord.IntentsBitField.Flags.MessageContent,
    ]
});

log.info('Iniciando Bot...');

// Declarando la colección de comandos.
client.commands = new Discord.Collection();

// Handlers
require('./handlers/mensajesHandler')(client); // Mensajes
require('./handlers/eventosHandler')(client); // Eventos
require('./handlers/comandosHandler')(client); // Comandos

client.login(require('./config.json').token);