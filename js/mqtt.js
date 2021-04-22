const broker_ip = '10.8.0.1';
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
    geoposition="latitude: " + position.coords.latitude +
                ", longitude: " + position.coords.longitude;
    console.log(geoposition);
    message = new Paho.MQTT.Message("client_id: "+client_id+", "+geoposition);
    message.destinationName = "test/test1";
    client.send(message);
}

function onConnect() {
    console.log("client connected");
    message = new Paho.MQTT.Message("client: "+client_id+" is connected");
    message.destinationName = "test/test1";
    client.send(message);
}

var client = new Paho.MQTT.Client(broker_ip, broker_port, client_id);
console.log("Connecting to "+broker_ip+" on port "+String(broker_port));
client.connect({
    timeout: 3,
    onSuccess:onConnect
});

getLocation()

// client.disconnect(); // TODO
