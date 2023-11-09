import { CacheType, GuildMember, Interaction, TextChannel } from "discord.js";
import { IBot, IEvent, ISlashCommand } from "../utils/interfaces";
import logger from "../utils/logger";

module.exports = {
    name: "interactionCreate",
    once: false,
    execute: async (bot: IBot, interaction: Interaction<CacheType>, ...args: any) => {
        if (!interaction.isCommand()) return;

        const { slashCommands, owners, client } = bot;
        const { guild } = interaction;
        const channel = interaction.channel as TextChannel;
        const member = interaction.member as GuildMember;
        if (!interaction.inGuild()) return interaction.reply("This command can only be used in a server!");

        const slashCommand: ISlashCommand | undefined = slashCommands.get(interaction.commandName);
        if (!slashCommand) return await interaction.editReply("This command does not exist!");

        await interaction.deferReply({ ephemeral: slashCommand.ephemeral || false }).catch((err: Error) => {
            logger.error(err);
        });

        if (slashCommand.devOnly && !owners.includes(member.id)) {
            return await interaction.editReply("This command is only for developers!");
        }

        if (slashCommand.executerPermissions && !channel.permissionsFor(member).has(slashCommand.executerPermissions)) {
            const missingPerms = channel.permissionsFor(member).missing(slashCommand.executerPermissions!)
            return await interaction.editReply(`You don't have permission to use this command!\nMissing permissions: ${missingPerms?.join(', ')}`);
        }

        if (slashCommand.botPermissions && !channel?.permissionsFor(client.user!)?.has(slashCommand.botPermissions)) {
            const missingPerms = channel?.permissionsFor(client.user!)?.missing(slashCommand.botPermissions)
            return await interaction.editReply(`I don't have the required permissions to use this command!\nMissing permissions: ${missingPerms?.join(', ')}`);
        }

        await slashCommand.execute(bot, interaction).catch((err: Error) => {
            logger.error(err);
        });
    }
} as IEvent