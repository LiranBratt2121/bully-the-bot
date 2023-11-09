import * as fs from "fs";
import path from "path";
import { getFiles } from "../utils/filesReader";
import { IBot, ISlashCommand } from "../utils/interfaces";
import logger from "../utils/logger";

export function loadSlashCommands(bot: IBot, reload: boolean) {
    const { slashCommands } = bot;

    const commandsPath = path.join(__dirname, "../slashCommands");
    fs.readdirSync(commandsPath).forEach((category: string) => {
        const commandPath = path.join(commandsPath, category);
        let slashCommandsFiles = getFiles(commandPath, ".ts");

        slashCommandsFiles.forEach((f) => {
            const filePath = `../slashCommands/${category}/${f}`

            if (reload) delete require.cache[require.resolve(filePath)]
            const command: ISlashCommand = require(filePath)

            if (!command.category) command.category = category;

            slashCommands.set(command.name, command)
        })
    })
    logger.log(`Loaded ${slashCommands.size} slash commands`)
}