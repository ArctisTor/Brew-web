const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

readline.question(``, data => {
  let iterator = data;
  readline.question('', phrase => {
    console.log('------')
    for (let i = 0; i < iterator; i++) {
      console.log(phrase);
      readline.close();
    }
  })

})
