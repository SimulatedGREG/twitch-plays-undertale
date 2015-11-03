var irc = require('tmi.js');
var robot = require('robotjs');

var options = {
  options: {
      debug: true
  },
  connection: {
      random: "chat",
      reconnect: true
  },
  channels: ["#simulatedgreg"]
};

var client = new irc.client(options);
client.connect();

client.on('chat', function(channel, user, message, self) {
  message = message.toLowerCase();
  function longPress(command, repeats) {
    var timeout = repeats * 250;
    robot.keyToggle(command, 'down');
    setTimeout(function() {
      robot.keyToggle(command, 'up');
    }, timeout);

    console.log(user.username + ' pressed ' + message);
  }

  //TODO: random, fix long numbers
  var commands = ['up', 'down', 'left', 'right', 'c', 'x', 'z'];
  message.split(' ').forEach(function(n) {
    var a = n.split(/(\w)(\d)/);

    if(a.length !== 1) {
      a = [a[0] + a[1], a[2]];
    }

    if(commands.indexOf(a[0]) > -1) {
      longPress(a[0], a[1] || 1);
    }
  });

});
