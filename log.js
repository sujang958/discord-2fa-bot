const chalk = require('chalk');

module.exports = {
    web(text) {
       console.log(chalk.greenBright("[Web]"), text);
    },
    system(text) {
        console.log(chalk.cyanBright("[System]"), text);
    },
    bot(text) {
        console.log(chalk.blueBright("[Bot]"), text);
    },
}