import discord
import login

async def send_message(message, user_message, is_private):
    resp = "Hello" # this is what ill be sending, may be different for txt file
    if is_private:
        await message.author.send(resp)
    else:
        await message.channel.send(resp)
    

def run_bot():
    intents = discord.Intents.default()
    intents.message_content = True
    client = discord.Client(intents=intents)

    @client.event
    async def on_ready():
        print(f"{client} is running")

    client.run(login.token)