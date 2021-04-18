#!/bin/python
# Python 3.7+

import paho.mqtt.client as mqtt

broker_ip="192.168.1.1" # Mosquitto server IP

client = mqtt.Client(client_id="BUS1")

client.connect(broker_ip,
               port=1883)

client.publish("channel/topic","payload")
