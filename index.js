const axios = require('axios');

class Discord {
    constructor(conf) {
        if (typeof conf !== 'object') throw new Error('Config is not an object');
        if (typeof conf.token !== 'string') throw new Error('Token is not a string');
        if (typeof conf.api !== 'string' && !conf.api.includes('https://')) throw new Error('API is not a string');

        this.api = conf.api;
        this.token = { headers: { Authorization: `${conf.token}` } };
    }

    async getMessages(channel, limit = 10) {
        try {
            const url = this.api + `/channels/${channel}/messages?limit=${limit}`;
            const response = await axios.get(url, this.token);

            return response.data;
        } catch (err) {
            throw new Error(err);
        }
    }

    async sendMessage(channel, message) {
        try {
            const url = this.api + `/channels/${channel}/messages`;
            const response = await axios.post(url, { content: message }, this.token);

            return response.data;
        } catch (err) {
            //get status text
            throw new Error('Error: ' + err.response.statusText);
        }
    }

    changeToken(token) {
        if (typeof token !== 'string') throw new Error('Token is not a string');

        this.token = { headers: { Authorization: `${token}` } };
    }
}

module.exports = Discord;