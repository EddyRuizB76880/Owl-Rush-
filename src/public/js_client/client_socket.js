export default class ClientSocket {

    constructor(ip , listeningPort) {
        this.client = new WebSocket(`ws://${ip}:${listeningPort}`);
        this.setup_events();
    }

    setup_events() {
        this.client.addEventListener('open', () => {
            // Causes the server to print "Hello"
           console.log('Sending message to mf server');
            this.client.send('{"type":"new_guest"}');
        })
    }

    addEventListener(event , func) {
        this.client.addEventListener(event , func);
    }

    send_message(message) {
        this.client.send(message);
    }
}
