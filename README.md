# Thingsmaster
Web application to manage connected objects (with MQTT).

This "POC" has been made with love for [@RivieraDev 2015](http://www.rivieradev.fr/)

## The beginning
on an original idea originally developed for DevoxxFR 2015 by:

- Philippe Charrière (@k33g_org)
- Laurent Huet (@lhuet35)

## Install

- you need **Redis**
- then, git clone the project
- then, type at the root of the project : `npm install`
- then, type at the root of the project : `bower install`

## Get started

- type `./broker.sh`
- go to [http://localhost:3008/](http://localhost:3008/)

## Things simulation

- go to things directory
- update the configuration file `/things/config.js` with the name or the ip address of your computer
- type `node things.js`
- type `node fake-sphero.js`
- type `node fake-grovenest.js`

Then you can see in the browser, the updated list of things. Click on item if you want to see details of data, or send a message to the broker.

## Real Things samples

- `samples/arduino/` : you need an **Arduino**, [Johnny Five](http://johnny-five.io/), and [babel-node](https://babeljs.io)
- `samples/Bob-Gateway` : Node source code with [CylonJS](http://cylonjs.com/) to "drive" a **Sphero**
- `samples/Sam-Nest` : Python source code to play with a **GrovePi** shield
- `sample/Bobby` : Node source code to play with a **GoPiGo**

Enjoy :)

