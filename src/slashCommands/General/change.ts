import { ApplicationCommandOptionType, CommandInteraction } from 'discord.js';
import { IBot, ISlashCommand } from '../../utils/interfaces';
import { randomTeamName } from '../../utils/tba';

module.exports = {
    name: 'change',
    description: 'Change a user\'s nickname to a random team name every 10 seconds.',
    devOnly: false,
    executerPermissions: ['SendMessages'],
    botPermissions: ['SendMessages'],

    options: [
        {
            name: 'user',
            type: ApplicationCommandOptionType.User,
            description: 'User to change nickname of.',
            required: true
        }
    ],

    execute: async (bot: IBot, interaction: CommandInteraction) => {
        if (!interaction.isChatInputCommand()) return;
        const user = interaction.options.getUser('user')!;
        const guildUser = interaction.guild?.members.cache.get(user.id)!;

        await interaction.editReply({ content: `Now changing ${user}'s nickname every 10 seconds, good luck!` });

        setInterval(async () => {
            const randomTeam = await randomTeamName();
            await guildUser.setNickname(randomTeam).catch((e) => console.error("An error occurred:", e));
        }, 10000);

    }
} as ISlashCommand;