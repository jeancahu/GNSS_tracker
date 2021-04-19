# GNSS_tracker

## Instalation

    apt update
    apt upgrade
    apt install mosquitto mosquitto-clients

## Test

    mosquitto_sub -h localhost -t test/test1
    mosquitto_pub -h 10.8.0.1 -t test/test1 -m "hello world"
