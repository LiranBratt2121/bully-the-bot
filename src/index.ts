import { Client, Collection, IntentsBitField } from 'discord.js';
import { loadEvents, loadSlashCommands } from './handlers';
import { IBot, IEvent, ISlashCommand } from './utils/interfaces';
import logger from './utils/logger';
logger.log('Starting...');

require('dotenv').config();

const owners = [process.env.OWNER_ID || ''];

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildMembers
    ]
});

const events = new Collection<string, IEvent>();
const slashCommands = new Collection<string, ISlashCommand>();

const bot: IBot = {
    client,
    events,
    slashCommands,
    owners,
    prefix: '!'
};

loadEvents(bot, false);
loadSlashCommands(bot, false);


client.login(process.env.TOKEN);