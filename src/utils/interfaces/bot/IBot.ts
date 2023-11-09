import { Client, Collection } from "discord.js";
import { IEvent } from "./IEvent";
import { ISlashCommand } from "./ISlashCommand";

export interface IBot {
    client: Client,
    events: Collection<string, IEvent>,
    slashCommands: Collection<string, ISlashCommand>,
    owners: string[],
    prefix: string
}