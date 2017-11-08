const socket = io();
const client = feathers();

require('angular');
// Create the Feathers application with a `socketio` connection
client.configure(feathers.socketio(socket));

// Get the service for our `messages` endpoint





