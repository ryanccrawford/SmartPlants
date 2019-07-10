# Welcome to SmartPlants
- Where plants are so smart you don't have to be

smartplants.jpg

![Introduction][Introduction]

[Introduction]: http://ryancrawford.me/smart3.gif "Introduction"

![design][design]

[design]: http://ryancrawford.me/smartplants.jpg "design"

Welcome to view demo of this project visit https://smart-plants.herokuapp.com and use 'jan' as the username and enter any password.

To create this project on your own please feel free to clone using 
```$ git clone https://github.com/ryanccrawford/project-2.git```

You will need to create a database on a MySQL server and also a .env file with the following variables:
```
MYSQL_USERNAME=mysql username
MYSQL_PASSWORD=mysql password
MYSQL_DATABASE=database name
MYSQL_HOST=host name
NODE_ENV=development
```
Also, to get any meaningful use out of this web app, you'll need to build your own SmartPlant Device. Below are the items needed and instructions:

## Parts ## 
- Arduino Uno / Nano / Mega 2556 / or any board compatible with Firmata, Information here https://github.com/firmata/arduino
- PHOTOCELL - Resistor type
- 7kΩ Resistor
- LM35 Temperature Sensor
- Analog capacitive soil moisture sensor with a 5VDC input and an analog output
- Breadboard or Prototyping board, hookup wires and a USB cable 
Optional (This is for making the device wireless)
- ESP8266
- A USB ESP2866 programmer 
- LD1117V 3.3VDC voltage regulator module (If you use just the regulator you will need the external supporting circuitry too)
- Any 3.3V - 5V bidirectional Logic Level Converter
Optional II (This is for adding and LCD for information display)
- LCD either I2C or Parallel (Must be really small screen to be sure you don't go over max current. Could use separate power supply)
- Variable Resistor for adjusting the LCD contrast
- RGB LED (Can use if don't want to use display but not both due to power limitations)
Nice to have but not required
- Separate battery power supply or other
- 9V-12V Solar panel

## Building ##


![This is an image of the plans to build Smart Plants][info]

[info]: http://ryancrawford.me/assets/downloads/smartplants_build.jpg "Logo Title Text 2"

## FIRMATA & ESP FLASHING ##
You will need to flash FirmmataPlus onto the Arduino first. Note if using WiFi, you will need to adjust the BAUD rate to match the ESP8266. Some ESP's are 115200 by default. This may need some Google Fu to make sure you can pre configure the Arduino.
Here are some instructions https://github.com/firmata/arduino for information on firmata for WiFi see: https://github.com/firmata/arduino/tree/master/examples/StandardFirmataWiFi

Once al this is done got to the root of this cloned repository and type:
```
$ npm i
$ node server.js
```
This should start a node express application that you can connect to ay http://localhost:3000

Then if the device is running on the same computer make sure you know what USB to Serial COM Port your device is plugged into. Next in the settings.txt in the device/ folder edit the file to use the correct COM port and change other settings that might need to connect properly. Then while in that folder using Git Bash, run this:

```
$ cd device
$ npm i
$ node server.js
```

You should now be able to see data being sent to your app server

## The Future ##
- Adding support for web sockets
- Adding a manual watering button to control the water yourself
- Adding a plant information database to show plant information and caring parameters.
- Adding support for auto feeding systems
- Adding a camera sensor to take time laps images to monitor growth and to compare and share with the community





