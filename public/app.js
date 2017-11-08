const socket = io();
const client = feathers();

require('angular');
// Create the Feathers application with a `socketio` connection
client.configure(feathers.socketio(socket));

// Get the service for our `messages` endpoint
const messages = client.service('messages');

// Add a new message to the list
function addMessage(message) {
  const chat = document.querySelector('.chat');

  chat.insertAdjacentHTML('beforeend', `<div class="message flex flex-row">
    <img src="https://placeimg.com/64/64/any" alt="${message.name}" class="avatar">
    <div class="message-wrapper">
      <p class="message-header">
        <span class="username font-600">${message.name}</span>
      </p>
      <p class="message-content font-300">${message.text}</p>
    </div>
  </div>`);

  chat.scrollTop = chat.scrollHeight - chat.clientHeight;
}

messages.find().then(page => page.data.forEach(addMessage));
messages.on('created', addMessage);




