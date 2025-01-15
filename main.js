import { REST, Routes, Client, Events, GatewayIntentBits } from 'discord.js';
import values from './values.js';
import axios from 'axios';


const rest = new REST({ version: '10' }).setToken(process.env.VOCE_SABIA_TOKEN);

try {

    await rest.put(Routes.applicationCommands(values.APP_ID), { body: values.COMMANDS });

    console.log('Successfully reloaded application (/) commands.');
} catch (error) {
    console.error(error);
}

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on(Events.ClientReady, readyClient => {
    console.log(`Logged in as ${readyClient.user.tag}!`);
});
client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'ping') {
        await interaction.reply('Pong!');
    }

    if (interaction.commandName === 'pergunte') {
        const message = interaction.options.getString('pergunta');
        try {
            await interaction.reply({content: 'Estou pensando...', withResponse: true});
            const response = await createAPIMessage(message);
            await interaction.followUp(response);
            
        } catch (error) {
            console.error(error);
            await interaction.reply('Não consegui responder a sua pergunta, tente novamente mais tarde.');
        }   
    }

    if (interaction.commandName === 'traduza') {
        const message = interaction.options.getString('mensagem');
        try {
            await interaction.reply({content: 'Estou traduzindo...', withResponse: true});
            const response = await translateAPIMessage(message);
            await interaction.followUp(response);
        } catch (error) {
            console.error(error);
            await interaction.reply('Não consegui traduzir a sua mensagem, tente novamente mais tarde.');
        }
    }
});

const createAPIMessage = async (message) => {
   const {data} = await axios.post('http://localhost:11434/api/generate', { 
        model: 'llama2-uncensored:7b',
        prompt: message,
        stream: false,
        temperature: '1.0',
        top_k: '100',
        top_p: '1.0',
     });

     return data.response;
};


const translateAPIMessage = async (message) => {
    const {data} = await axios.post('http://localhost:11434/api/generate', { 
         model: 'llama2-uncensored:7b',
         prompt: `Traduza para o português: ${message}`,
         stream: false,
         temperature: '1.0',
         top_k: '100',
         top_p: '1.0',
      });
 
      return data.response;
 };

client.login(values.TOKEN);