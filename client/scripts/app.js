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
      if(!app._roomList[roomname]) {
        app._roomList[roomname] = roomname;
        $('#roomSelect').append('<a>'+ roomname +'</a>');
      }
  },
  addMessage: function(message){
    var newDiv = $('<div></div>');
    newDiv.append("<a href='#' class='username'>" + message.username + "</a>");
    newDiv.append("<a href='#' id='roomtag'>" + message.roomname + "</a>");
    newDiv.append("<p id='messages'>" + message.text + "</p>" + "</div>");
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
    }, 3000);
  },
  server: 'https://api.parse.com/1/classes/chatterbox',
  send: function(message) {
    $.ajax({
      url: 'https://api.parse.com/1/classes/chatterbox',
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
      url: 'https://api.parse.com/1/classes/chatterbox',
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


$(document).ready(function() {

  $('body').on('click', '.username', function() {
    var user = $(this).text();
    app.addFriend(user);
    console.log(app._friendList);
  });

app.init();

});




















