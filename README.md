# Welcom to SmartPlants
- Where plants are so smart you don't have to be

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
Also to get any meaningful use out of this web app, you'll need to build your own SmartPlant Device. Below are the items needed and instructions:

## Parts ## 
- 1. Ardunio Uno / Nano / Mega 2556 / or anyboard compatibale with Firmata, Information here https://github.com/firmata/arduino
- 2. PHOTOCELL - Risistor type
- 3. 4.7kΩ Resistor
- 4. LM35 Temperature Sensor
- 5. Analog capacitive soil moisture sensor with a 5VDC input and an anolog output
- 6. Breadbord or Prototyping board, hookup wires and a USB cable 
Optional (This is for making the device wireless)
- 6. ESP8266
- 7. A usb ESP2866 programer 
- 8. LD1117V 3.3VDC voltage regulator modual (If you use just the regulator you will need the external supporting circuitry too)
- 9. Any 3.3V - 5V bidirectional Logic Level Converter
Optional II (This is for adding and LCD for information display)
- 10. LCD either I2C or Parallel (Must be really small screen to be sure you don't go over max current. Could use seperate power supply)
- 11. Variable Resistor for adjusting the LCD contrast
- 12. RGB LED (Can use if don't want to use display but not both due to power limitations)
Nice to have but not required
- 13. Seperate battery power supply or other
- 14. 9V-12V Solar panel

## Building ##

![This is an image of the plans to build Spmart Plants](http://ryancrawford.me/assets/downloads/smartplants_build.jpg" Build Diagram")


## FIRMATA & ESP FLASHING ##
You will need to flash FirmmataPlus onto the Ardunio first. Note if using WiFi, you will need to adjust the BAUD rate to match the ESP8266. Some ESP's ar 115200 by defualt. This may need some Google Fu to make sure you can pre configuare the Ardunio.
Here are some instructions https://github.com/firmata/arduino for information on firmata for WiFi see : https://github.com/firmata/arduino/tree/master/examples/StandardFirmataWiFi

Once al this is done got to the root of this cloned reposotory and type:
```
$ npm i
$ node server.js
```
This should start a node express application that you can connect to ay http://localhost:3000

Then if the device is running on the same computer make sure you know what USB to Serial COM Port your device is plugged into. Next in the settings.txt in the device/ folder edit the file to use the correct COM port and change anyother settings that might need to connect properly. Then while in that folder using Git Bash, run this:

```
$ cd device
$ npm i
$ node server
```

You should now beable to see data being sent to your app server





