const { mainModule } = require("process");

function helpFn(){
    console.log('List of All commands: \n \t node main.js tree "directoryPath"\n \t node main.js organize "directoryPath" \t node main.js help');
}
module.exports={
    helpKey: helpFn
}
