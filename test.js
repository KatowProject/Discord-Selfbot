const Discord = require('./index.js');
const client = new Discord({ api: 'https://discord.com/api/v9', token: 'token' });


// Test 1: getMessages
const channel = '932997960923480101';
const limit = 10;
const messageid = '953699252012462090';

(async () => {
    try {
        // client.sendMessage(channel, 'Hello World!');
        // client.getMessages(channel, limit);
        const msg = await client.getMessages(channel, limit);
        const message = msg.find(m => m.id === messageid);

        const embed = message.embeds[0];
        const description = embed.description;

        const content = description.split('\n');
        const xps = content.map(c => {
            const userID = c.split('[')[1].split(']')[0];
            let xp = c.split('`')[1];
            if (xp === 'NaN') xp = 0;
            return `!give-xp <@${userID}> ${parseInt(xp)}`;
        })

        for (xp of xps) {
            client.sendMessage('932997960923480099', xp);

            //delay 3s
            await new Promise(resolve => setTimeout(resolve, 3000));
        }
    } catch (err) {
        console.log(err);
    }
})()