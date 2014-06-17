// YOUR CODE HERE:

var app = {
  _roomList : {},
  _friendList : {},
  _selectedRoom : 'all',
  clearMessages: function(){
    $('#chats').empty();
  },
  addFriend : function(user) {
    if(!app._friendList[user]) {
      app._friendList[user] = true;
      $('#friendList').append('<p class="friendList">'+ user + '</p>');
    }
  },
  addRoom : function(roomname){
      if(!app._roomList[roomname] && roomname !== undefined && roomname.length > 0) {
        app._roomList[roomname] = roomname;
        $('.btn-group').append('<a class="btn dropdown-toggle" id="roomtag">'+ roomname +'</a>');
      }
  },
  addMessage: function(message){
    var newDiv = $('<div class="chatMessages"></div>');
    if(app._friendList[message.username]){
      newDiv.addClass('friendList');
    }
    newDiv.append("<a href='#' class='username'>" + _.escape(message.username) + "</a>");
    newDiv.append("<a href='#' id='messageRoom'>" + _.escape(app._selectedRoom) + "</a>");
    newDiv.append("<p id='messages'>" + _.escape(message.text) + "</p>" + "</div>");
    $('#chats').append(newDiv);
  },
  display: function(data) {
    app.clearMessages();
    _.each(data.results, function(chatObj) {
      if(app._selectedRoom === 'all' || chatObj.roomname === app._selectedRoom){
        app.addMessage(chatObj);
      }
      app.addRoom(chatObj.roomname);
    });
  },
  init: function() {
    setInterval(function() {
      app.fetch();
    }, 5000);
  },
  server: 'https://api.parse.com/1/classes/chatterbox',
  handleSubmit: function(text, username, room){
    if(room = 'all'){
      room = '';
    }
    var message = {
      'username': username,
      'text': text,
      'roomname': app._selectedRoom
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
        console.log("Message sent");
      },
      error: function(data) {
        console.log('Error: Message not sent');
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
        console.log('Erro: Could not fetch');
      }
    });
  }
};

app.fetch();

$(document).ready(function() {

  $('body').on('click', '.username', function() {
    var user = $(this).text();
    app.addFriend(user);
  });
  $('body').on('click', '#send', function(){
    var msg = $('textarea').val();
    $('textarea').val("");
    console.log(app._selectedRoom);
    app.handleSubmit(msg,'Albrey\'s Dance Moves' , app._selectedRoom);
  });
  $('body').on('click', '#roomtag', function() {
    app._selectedRoom = $(this).text();
    console.log('Switched Room: ' + app._selectedRoom);
  });
  $('body').on('click', '#allRooms', function(){
    app._selectedRoom = 'all';
    console.log('Switched Room: ' + app._selectedRoom);
  });
  app.init();

});




















