const dotenv = require("dotenv");
dotenv.config();
const { Client, GatewayIntentBits } = require("discord.js");
const { getRandomName } = require("./get_team");

const pythonScript = "get_teams_from_api.py";

const client = new Client({
  intents: [
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.login(process.env.DISCORD_TOKEN);

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

async function changeNickname(targetMember, newNickname) {
  const interval = 10000; // 10 seconds
  setInterval(async () => {
    const randomTeam = await getRandomName(pythonScript);
    try {
      await targetMember.setNickname(randomTeam);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }, interval);
}

client.on("messageCreate", async (message) => {
  if (message.content.startsWith("/change")) {
    const args = message.content.split(" ");
    if (args.length !== 3) {
      // Incorrect command usage
      await message.reply(
        "Invalid command. Please use the syntax: `/change <nameofuser> <name>`"
      );
      return;
    }

    const command = args[0];
    const targetUsername = args[1];
    const newNickname = args[2];

    const guild = client.guilds.cache.get("1163963735191326802");

    if (!guild) {
      await message.reply("Guild not found.");
      return;
    }

    try {
      const members = await guild.members.fetch({
        query: targetUsername,
        limit: 1,
      });
      const targetMember = members.first();

      if (!targetMember) {
        await message.reply(`User "${targetUsername}" not found.`);
        return;
      }

      await targetMember.setNickname(newNickname);
      await message.reply(
        `Nickname changed for ${targetMember.user.username} to ${newNickname}`
      );
    } catch (error) {
      console.error("An error occurred:", error);
      await message.reply("An error occurred while changing the nickname.");
    }
  } else if (message.content.startsWith("/bully")) {
    const args = message.content.split(" ");
    if (args.length !== 2) {
      // Incorrect command usage
      await message.reply(
        "Invalid command. Please use the syntax: `/bully <nameofuser>`"
      );
      return;
    }

    const targetUsername = args[1];

    const guild = client.guilds.cache.get("1163963735191326802");

    if (!guild) {
      await message.reply("Guild not found.");
      return;
    }

    try {
      const members = await guild.members.fetch({
        query: targetUsername,
        limit: 1,
      });
      const targetMember = members.first();

      if (!targetMember) {
        await message.reply(`User "${targetUsername}" not found.`);
        return;
      }

      await message.reply(
        `Bullying and changing the nickname of ${targetMember.user.username} every 10 seconds.`
      );

      changeNickname(targetMember, targetMember.user.username);
    } catch (error) {
      console.error("An error occurred:", error);
      await message.reply(
        "An error occurred while bullying and changing the nickname."
      );
    }
  }
});

client.on("error", console.error);
