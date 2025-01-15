import { REST, Routes } from 'discord.js';
import {TOKEN, COMMANDS} from './values';


const rest = new REST({ version: '10' }).setToken(TOKEN);

try {
  console.log('Started refreshing application (/) commands.');

  await rest.put(Routes.applicationCommands(CLIENT_ID), { body:   COMMANDS });

  console.log('Successfully reloaded application (/) commands.');
} catch (error) {
  console.error(error);
}