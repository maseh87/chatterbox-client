// YOUR CODE HERE:

var app = {
  _roomList : {},
  _friendList : {},
  clearMessages: function(){
    $('#chats').empty();
  },
  addFriend : function(user) {
    if(!app._friendList[user]) {
      app._friendList[user] = true;
      $('#friendList').append('<p>'+ user + '</p>');
    }
  },
  addRoom : function(roomname){
      if(!app._roomList[roomname] && roomname !== undefined) {
        app._roomList[roomname] = roomname;
        $('#roomSelect').append('<a>'+ roomname +'</a>');
      }
  },
  addMessage: function(message){
    var newDiv = $('<div></div>');
    newDiv.append("<a href='#' class='username'>" + JSON.stringify(message.username) + "</a>");
    newDiv.append("<a href='#' id='roomtag'>" + JSON.stringify(message.roomname) + "</a>");
    newDiv.append("<p id='messages'>" + JSON.stringify(message.text) + "</p>" + "</div>");
    $('#chats').append(newDiv);
  },
  display: function(data) {
    _.each(data.results, function(chatObj) {
      app.addMessage(chatObj);
      app.addRoom(chatObj.roomname);
    });
  },
  init: function() {
    setInterval(function() {
      app.clearMessages();
      app.fetch();
    }, 5000);
  },
  server: 'https://api.parse.com/1/classes/chatterbox',
  handleSubmit: function(text, username, room){
    var message = {
      'username': username,
      'text': text,
      'roomname': room
    };
    app.send(message);
  },
  send: function(message) {
    $.ajax({
      url: app.server,
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function(data) {
        console.log(data);
      },
      error: function(data) {
        console.log('could not send');
      }
    });
  },
  fetch: function() {
    $.ajax({
      url: app.server + '?order=-createdAt',
      type: 'GET',
      success: function(data) {
        app.display(data);
      },
      error: function() {
        console.log('could not fetch');
      }
    });
  }
};

app.fetch();

$(document).ready(function() {

  $('body').on('click', '.username', function() {
    var user = $(this).text();
    app.addFriend(user);
    console.log(app._friendList);
  });
  $('body').on('click', '.btn', function(){
    var msg = $('textarea').val();
    $('textarea').val("");
    console.log(msg);
    app.handleSubmit(msg,'Phils Lost Beard', 'SadSadPlace');
  });

app.init();

});




















