module.exports = {
    name: 'ping',
    execute(message) {
        message.reply({
            content: 'Pong! :D'
        });
    }
}