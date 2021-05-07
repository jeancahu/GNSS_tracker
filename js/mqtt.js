const mqtt = require('paho-mqtt');

const broker_ip = '161.35.54.122';
const broker_port = 9001;
const client_id = "client js 1";

function getLocation() {
    if (navigator.geolocation) {
        // navigator.geolocation.getCurrentPosition(showPosition); // run once
        navigator.geolocation.watchPosition(showPosition); // keep running in loop
    } else {
        console.log("Geolocation is not supported by this browser");
    }
}

function showPosition(position) {
    var geoposition = "latitude: " + position.coords.latitude +
                ", longitude: " + position.coords.longitude;
    console.log(geoposition);
    message = new mqtt.Message("client_id: "+client_id+", "+geoposition);
    message.destinationName = "test/test1";
    try {
        client.send(message);
    } catch (error) {
        console.error(error);
        console.log("reconnect")
        client.connect()
        sleep(5)
    }
}

function onConnect() {
    console.log("client connected");
    message = new mqtt.Message("client: "+client_id+" is connected");
    message.destinationName = "test/test1";
    client.send(message);
}

var client = new mqtt.Client(broker_ip, broker_port, client_id);
console.log("Connecting to "+broker_ip+" on port "+String(broker_port));
client.connect({
    timeout: 3,
    onSuccess:onConnect
});

getLocation()

// client.disconnect(); // TODO
