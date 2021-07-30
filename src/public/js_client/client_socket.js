export default class ClientSocket {

 
    constructor(host_information , starting_message) {
         (window.location.host);
        this.client = new WebSocket(`ws://${host_information}`);
        this.setup_events();
        this.starting_message = starting_message;
    }

    setup_events() {
        this.client.addEventListener('open', () => {
            // Causes the server to print "Hello"
            ('Sending message to mf server');
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
