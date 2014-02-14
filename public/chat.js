window.onload = function() {
 
    var messages = [];
    var socket = io.connect('http://10.29.2.15:3700');
    var field = document.getElementById("field");
    var sendButton = document.getElementById("send");
    var content = document.getElementById("content");
	var name = document.getElementById("name");
 
    socket.on('message', function (data) {
        if(data.message) {
            messages.push(data.message);
            var html = '';
            for(var i=0; i<messages.length; i++) {
				if (data.username) {
	                html += data.username + ': ' + messages[i] + '<br />';
				} else {
	                html +=  messages[i] + '<br />'; 
				}
            }
            content.innerHTML = html;
        } else {
            console.log("There is a problem:", data);
        }
    });
 
    sendButton.onclick =sendMessage= function() {
		if (name.value == "") {
			alert("Please type your name!");
			return;
		}

        var text = field.value;
        socket.emit('send', { message: text, username: name.value });
		field.value="";
    };
 
}


$(document).ready(function() {
		$('#field').keyup(function(e) {
			if (e.keyCode == 13) {
				sendMessage();
			}
		});
});