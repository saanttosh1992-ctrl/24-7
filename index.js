const mineflayer = require('mineflayer');
const pathfinder = require('mineflayer-pathfinder').pathfinder;
const Movements = require('mineflayer-pathfinder').Movements;
const pvp = require('mineflayer-pvp').plugin;
const armorManager = require('mineflayer-armor-manager');

const CONFIG = {
  host: 'kakasmp7.aternos.me',
  port: 58848,
  version: '1.21.1'
};

const BOTS_CONFIG = [
  { username: 'Kaka', chatPrefix: '[KAKA-GOD]' },
  { username: 'Chacha', chatPrefix: '[CHACHA-PRO]' },
  { username: 'Bhatija', chatPrefix: '[BHATIJA-ULTRA]' }
];

function createBotInstance(botConfig, delay = 0) {
  setTimeout(() => {
    console.log(`[+] Launching bot: ${botConfig.username}...`);

    const bot = mineflayer.createBot({
      host: CONFIG.host,
      port: CONFIG.port,
      username: botConfig.username,
      version: CONFIG.version
    });

    bot.loadPlugin(pathfinder);
    bot.loadPlugin(pvp);
    bot.loadPlugin(armorManager);

    bot.on('spawn', () => {
      console.log(`✅ ${botConfig.username} joined the server!`);
      
      setInterval(() => {
        if (!bot.entity) return;
        bot.setControlState('jump', true);
        setTimeout(() => bot.setControlState('jump', false), 350);
      }, 8000);
    });

    bot.on('end', () => {
      console.log(`⚠️ Disconnected! Reconnecting in 10s...`);
      setTimeout(() => createBotInstance(botConfig), 10000);
    });

    bot.on('error', (err) => console.log('Error:', err.message));
  }, delay);
}

BOTS_CONFIG.forEach((botConfig, index) => {
  createBotInstance(botConfig, index * 4000);
});
