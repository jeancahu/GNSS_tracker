#!/bin/python

import paho.mqtt.client as mqtt
from sys import exit

broker_ip="10.8.0.1" # Mosquitto server IP
broker_port=1883
client_id="main"

def on_message(client, userdata, message):
    print("message received " ,str(message.payload.decode("utf-8")))
    print("message topic=",message.topic)
    print("message qos=",message.qos)
    print("message retain flag=",message.retain)

def on_connect(client, obj, flags, error_code):
    client.publish("test/test1",
                   "client "+client_id+" connected")
    print("Connected, result code", error_code)

def on_subscribe(client, obj, mid, granted_qos):
    print(client, obj, mid, granted_qos)
    print(client)

def main():
    client = mqtt.Client(client_id=client_id)

    client.on_connect = on_connect
    client.on_subscribe = on_subscribe
    client.on_message = on_message

    client.connect(broker_ip,
                   port=broker_port)
    client.subscribe("test/test1")

    try:
        client.loop_forever()
    except KeyboardInterrupt:
        print("\nServer disconnect")
        client.publish("test/test1",
                       "client "+client_id+" disconnect")
        client.disconnect()
        exit(0)

if __name__ == "__main__":
    main()
