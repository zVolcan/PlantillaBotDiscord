const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setDescription('Devuelve "Pong!".')
        .setName('ping'),
    async execute(interaction) {
        await interaction.reply({
            content: 'Pong! :D',
            ephemeral: true
        });
    }
}