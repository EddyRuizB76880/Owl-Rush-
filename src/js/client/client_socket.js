export default class ClientSocket {

 
    constructor(ip , listeningPort , starting_message) {
        this.client = new WebSocket(`ws://${ip}:${listeningPort}`);
        this.setup_events();
        this.starting_message = starting_message;
    }

    setup_events() {
        this.client.addEventListener('open', () => {
            // Causes the server to print "Hello"
           console.log('Sending message to mf server');
            this.client.send(this.starting_message);
        })
    }

    addEventListener(event , func) {
        this.client.addEventListener(event , func);
    }

    send_message(message) {
        this.client.send(message);
    }
}
