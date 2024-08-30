const fs = require('fs');
const log = require('node-color-log');
const { EmbedBuilder } = require('discord.js');

module.exports = (client) => {
    const carpeta = fs.readdirSync('comandos').filter(fl => fl.endsWith('.js'));

    for (const archivo of carpeta) {
        const comando = require('../comandos/'+archivo);
        if ('data' in comando && 'execute' in comando) {
            // Se colecciona el comando existente en '../comandos'.
            client.commands.set(comando.data.name, comando);
        } else {
            // El archivo no contiene 'data' o 'execute' para que funcione.
            log.error('No se pudo ejecutar '+ archivo + '.');
        }
    }

    client.on('interactionCreate', async interaction => {
        // Se devuelve si la interacción no es un comando.
        if (!interaction.isChatInputCommand()) {
            log.error('La interacción '+interaction.customId+' no es un comando.');
            await error(interaction);
            return;
        }

        // Se busca el comando referido con el archivo.
        const comando = interaction.client.commands.get(interaction.commandName);

        if (!comando) {
            log.error('No se pudo encontrar el comando.');
            await error(interaction);
        } else {
            try {
                await comando.execute(interaction);
            } catch (e) {
                log.error('Error al ejecutar el comando '+interaction.commandName+".");
                await error(interaction);
                console.error(e);
            }
        }
    })

}

const error = async (interaction) => {
    const embed = new EmbedBuilder()
        .setTitle('Error!')
        .setDescription('Hubo un error al ejecutar el comando, por favor contacte con un administrador para solucionar este problema.')
        .setThumbnail(interaction.guild.iconURL())
        .setColor("Red")
        .setTimestamp()
        .setFooter({
            text: interaction.guild.name,
            iconURL: interaction.guild.iconURL()
        });

    if (interaction.replied || interaction.deferred) {
        await interaction.followUp({ embeds: [embed], ephemeral: true });
    } else {
        await interaction.reply({ embeds: [embed], ephemeral: true });
    }
}