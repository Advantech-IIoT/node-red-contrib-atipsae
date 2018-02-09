# node-red-contrib-atipsae
Node-RED node for ADVANTECH IIoT [UNO-IPS2730-AE](http://www.advantech.com/products/1-2mlj2z/uno-ips2730-ae/mod_2ca60cb5-a216-4f76-accb-4c3108e8621e).

Notice that an Advantech IIoT Platform SDK have to be installed to make this node works correctly.
Advantech IIoT Platform SDK download link is shown below:
Windows:
  https://github.com/Advantech-IIoT/Platform-SDK/tree/master/windows/bin
Linux:
  https://github.com/Advantech-IIoT/Platform-SDK/tree/master/linux/bin

## Installation
Use npm command to install this package locally in the Node-RED modules directory
```bash
npm install node-red-contrib-atipsae
```
or install it globally with the command
```bash
npm install node-red-contrib-atipsae -g
```

## Description
You must use the Node-RED with [UNO-IPS2730-AE](http://www.advantech.com/products/1-2mlj2z/uno-ips2730-ae/mod_2ca60cb5-a216-4f76-accb-4c3108e8621e).

## Example
You can try demo flow  [(demo.json)](./demo.json) via import function from Node-RED editor.

![node-red_node](./png/node-red_node.png)

The inputs must be [**msg.payload.UPSInputLostDelay**](./#) and [**msg.payload.UPSCutOffDelay**](./#) which are numeric.

[**msg.payload.UPSInputLostDelay**](./#) is a number which is the DC Input Lost detection duration(sec).

[**msg.payload.UPSCutOffDelay**](./#) is a number which is the DC-OUT cut-off delay time(minutes).

Another input [**msg.payload.port**](./#) is COM port name which is used to connect with UPS.
- - -
There are 3 outputs, [**Emergency**](./#), [**Status**](./#) and [**Response**](./#).

The [**Emergency**](./#) output is a string and consists of the following.

"**DC-IN is Losted**"

"**Battery Over Temperature**"

"**Battery Gauge is Lost Connection**"

"**EEPROM Access Fail**"

"**DC-IN is Over Voltage**"

"**The DC-Out Cut-Off trigger**"

"**Restores power to IPS-AE DC-IN**"


The [**Status**](./#) output is a javascript object format in msg.payload and the object contents are as follows

**fwversion** : DEVICE firmware version

**ips** : the status of DEVICE. 1 is ready and 0 is not ready

**dcin** : the status of DC-IN. 1 is ready and 0 is not ready

**battery** : the status of BATTERY. 1 is ready and 0 is not ready

**inputlostdelay** : the DC Input Lost detection duration(sec)

**utoffdelay** : the DC-OUT cut-off delay time(minutes)

**atterylife** : BATTERY life(minutes) at the present rate of discharge. "65535" is BATTERY charged.

**emperature** : BATTERY temperature(celsius)

**maxtemperature** : It's the max temperature(celsius) of BATTERY from the system started.

**batteryvoltage** : It's the the BATTERY voltage(mV).

**capacity** : BATTERY capacity(%)


The [**Response**](./#). output is a string to describe the input result.

---
## Tested Platform 
- Windows 10 Enterprise LTSB with node.js 6.10.1

## History
- 1.1.7 - October 2017 : Initial Release

## License
Copyright 2017 ADVANTECH Corp. under [the Apache 2.0 license](LICENSE).
