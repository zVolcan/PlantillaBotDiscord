const log = require('node-color-log');
const { Events, ActivityType } = require("discord.js");

module.exports = {
    name: Events.ClientReady,
    execute(client) {
        log.info('Nombre: '+client.user.username);

        const guild = client.guilds.cache.get(require('../config.json').serverID);

        log.info('Discord: '+guild.name);
        log.info('Miembros: '+guild.memberCount);


        client.user.setActivity({
            name: guild.memberCount + " Miembros",
            type: ActivityType.Watching
        });
    }
}