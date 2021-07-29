export default class Session {
    constructor(id , host) {
        this.session_id = id;
        this.host = host;
        this.guests = [];
        this.icons = [];
        this.active_player = 0;
        this.wsPlayers = new Map(); // socket -> new Player()
    }

    set_new_guest(guest_id , guest_icon) {
        this.guests.push(guest_id);
        this.icons.push(guest_icon);
    }

    new_guest_protocol(message_from_client , socket) {
        socket.send(this.get_guests());
        this.broadcast( `{"type":"new_guest","id":"${message_from_client.id}","icon": "${message_from_client.icon}"}` , 
                                                            message_from_client.id);
        this.set_new_guest(message_from_client.id , message_from_client.icon);
        this.map_player_with_socket(message_from_client.id , socket);  
    }

    get_guests() {
        let guest_list = '{"type":"guest_list","guest_list":[';
        let icons_list = '"icons":[';
        let index = 0;
        for (index ; index < this.guests.length ; index++) {
          guest_list += `"${this.guests[index]}",`;
          icons_list += `"${this.icons[index]}",`;
        }
        //Find a smarter and more efficient way to discard last comma
        guest_list = guest_list.slice(0 , -1);
        icons_list = icons_list.slice(0 , -1);
        guest_list += `],${icons_list}]}`;
        return guest_list;
    }

    broadcast(message, origin_id) {
        console.log(`Broadcast: sending to ${this.wsPlayers.size} players`);
        for (const [key, value] of this.wsPlayers) {
          if(key !== origin_id){
              console.log(`Broadcast: sending to ${key}`);
            value.send(message);
          }
        }
    }
    
    select_active_player(active_position) {
        this.active_player = active_position;
        let active_player_message = `{"type":"active_id","id":"${this.guests[active_position]}"}`;
        console.log(active_player_message);
        this.broadcast(active_player_message, '');
    }
      
    re_roll(message , sender_id) {
        this.broadcast(message , sender_id);
        this.active_player = (this.active_player + 1) % this.wsPlayers.size;
        this.select_active_player(this.active_player);
    }

    who_goes_first() {
        const active_player_position = Math.floor(Math.random() * this.wsPlayers.size);
        this.select_active_player(active_player_position);
    }

    map_player_with_socket(player_id , socket) {
        this.wsPlayers.set(player_id , socket);
        socket.on ('close', () => {
            console.log(`session:${player_id} closed the connection`);
            this.wsPlayers.delete(player_id);
        });
    }

}