require('dotenv').config()

const axios = require('axios')
const TelegramBot = require('node-telegram-bot-api')

const BOT_TOKEN = process.env.BOT_TOKEN
const CHAT_ID = process.env.CHAT_ID
const TARGET_URL = process.env.TARGET_URL

const teleBot = new TelegramBot(BOT_TOKEN, {polling: false})

async function checkWeb() {
    try {
        const response = await axios.get(TARGET_URL, {timeout: 10000})
        if ( response.status >= 200 && response.status < 400) {
            // do nothing for now
            // await teleBot.sendMessage(CHAT_ID, `Web ${TARGET_URL} is up`)
        } else {
            await teleBot.sendMessage(CHAT_ID, `Web ${TARGET_URL} is down with status ${response.status}`)
        }
    } catch (error) {
        await teleBot.sendMessage(CHAT_ID, `Web ${TARGET_URL} is erroneous with message ${error.message}`)
    }
}

checkWeb()
setInterval(checkWeb, 30 * 60 * 1000)