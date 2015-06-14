#!/usr/bin/env python
# sudo python nest2.py
import json
import time
import grovepi
import math
import thread
from noob import *

import paho.mqtt.client as mqtt


class MegaNest:

  def initialize(self):
    self.lcdDisplay = LCDDisplay().initialize({
      'name': "MyDisplay",
      'message': "NEST-Like|RivieraDev"
    })

    # temperature and humidity
    self.dhtSensor = DHTSensor().initialize({
      'name': "NEST",
      'digitalPort': 7
    })

    # distance
    self.ultrasonicRanger = UltrasonicRanger().initialize({
      'name': "Ranger",
      'digitalPort': 4
    })

    self.buzzer = Buzzer().initialize({
      'name': "Buzzer",
      'digitalPort': 8
    })

    self.soundSensor = SoundSensor().initialize({
      'name': "Listener",
      'analogPort': 0
    })

    self.lightSensor = LightSensor().initialize({
      'name': "Listener",
      'analogPort': 1
    })

    return self

  def subscribeTo(self, topic):
    self.subscriptionTopic = topic
    return self

  def publishOn(self, topic):
    self.publicationTopic = topic
    return self


  def broker(self, brokerName, brokerPort):
    self.brokerName = brokerName
    self.brokerPort = brokerPort
    return self

  def start(self):

    def on_connect(client, userdata, rc):
      print("Connected with result code "+str(rc))
      # Subscribing in on_connect() means that if we lose the connection and
      # reconnect then subscriptions will be renewed.
      client.subscribe(self.subscriptionTopic)  

    def on_message(client, userdata, msg):
      print("Nest has got a message: "+msg.topic+" "+str(msg.payload)) 
      infos = json.loads(msg.payload)
      if 'value' in infos.keys():
        self.lcdDisplay.setText(
            "NEST-RivieraDev " + "### " + str(infos["value"]) + " ###"
        ).console()
        # {"action":"set_temp", "value":234}

    self.mqttClient = mqtt.Client("sam")
    self.mqttClient.on_connect = on_connect
    self.mqttClient.on_message = on_message
    self.mqttClient.connect(self.brokerName, self.brokerPort, 60)
    self.mqttClient.loop_forever()
    return self

  def startPublishingHT(self):
    while True:
      try:
        [temperature, humidity] = self.dhtSensor.temperatureHumidity()
        
        self.lcdDisplay.setText(
          "NEST-RivieraDev|T:"+str(temperature)+"F|h:"+str(humidity)+"%"
        ).console()

        distance = self.ultrasonicRanger.distance()

        sound = self.soundSensor.soundValue()

        light = self.lightSensor.lightValue()

        #if (distance < 15) and (distance > 5):
        #  self.buzzer.buzz(1)

        print("distance:" + str(distance) + " cm")
        print("sound:" + str(sound) + " db(?)")
        print("resistance:" + str(resistance) + " (?)")
        print("light:" + str(light) + " (?)")

        if (not math.isnan(temperature)) and (not math.isnan(humidity)):
          self.mqttClient.publish(self.publicationTopic, json.dumps({
            'name': "GroveNest",
            'kind': "grovenest",
            'remark': "MEGA-Nest",
            'unit': "F + % / cm",
            'publishOn': self.publicationTopic,
            'temperature': temperature,
            'humidity': humidity,
            'distance': distance,
            'sound': sound,
            'light': light,
            'time': time.strftime("%H:%M:%S")
          }))
        time.sleep(2)
      except (IOError,TypeError) as e:
        print e


# --- Main ---
megaNest = MegaNest().initialize()
megaNest.broker("k33g-orgs-macbook-pro.local", 1883)
megaNest.subscribeTo("hello/grove/nest")
megaNest.publishOn("infos/grove/nest")

try:
  thread.start_new_thread( megaNest.start, () )
  thread.start_new_thread( megaNest.startPublishingHT, () )

except Exception as e:
   print e

while 1:
  pass

