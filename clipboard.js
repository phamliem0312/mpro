// import clipboard from 'clipboardy';
// var clipboard = require('clipboardy');
// try {
//   clipboard.writeSync('🦄');
// }
// catch (err) {
//   console.log(err.stack)
// }

var keypress = require('keypress');
 
// make `process.stdin` begin emitting "keypress" events
keypress(process.stdin);
 
// listen for the "keypress" event
process.stdin.on('keypress', function (ch, key) {
  console.log('got "keypress"', key);
  if (key && key.ctrl && key.name == 'c') {
    process.stdin.pause();
  }
});
 
process.stdin.setRawMode(true);
// process.stdin.resume();