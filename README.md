# PlantillaBotDiscord
Plantilla para crear bots de Discord usando [Discord.js](https://discord.js.org/).

# Instalación
* Instale la libreria `discord.js` (npm i discord.js). 
* Luego instale la libreria `node-color-log` (npm i node-color-log). 
* Pegue el token, el ID del bot y el ID del servidor en el archivo de configuración config.json.
* Ejecute el bot con `node .`.

# Formato de comandos
```javascript
module.exports => {
  data: new SlashCommandBuilder()
      .setName('NOMBRE DEL COMANDO')
      .setDescription('DESCRIPCION'),
  async execute(interaction) {
    // ...
  }
}
```

# Formato de eventos
```javascript
module.exports => {
  name: Events.ClientReady,
  execute(client) {
    // ...
  }
}
```

# Formato de mensajes
```javascript
module.exports => {
  name: 'NOMBRE DEL COMANDO',
  execute(message) {
    // ...
  }
}
```
