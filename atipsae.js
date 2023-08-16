/**
 * 
 * please reference http://nodered.org/docs/creating-nodes/node-js
 * 
 **/
 
function getUpsModule()
{
	try {
		return require('./lib/' + process.platform + '-' + process.arch + '/ipsae.node');
	} catch(e) {
		console.error(e);
		return null;
	}
}

module.exports = function(RED) {
    "use strict";
	
    function AdvIPSAENode(n) {
		// Create a RED node
        RED.nodes.createNode(this,n);
		var ups = getUpsModule();

		this.serial = n.serial;

		var node = this;

		function emerency(_msg)
		{
			//console.log("[emerency] : " + msg);
			var msg0 = {serial: node.serial, payload: _msg};
			node.send([msg0,null,null]);
		}

		function infomation(_msg)
		{
			//console.log("[infomation] : " + msg);
			try {
				var msg0 = {serial: node.serial, payload: JSON.parse(_msg)};
				node.send([null,msg0,null]);
			}
			catch(e) { node.error(e.message,_msg); }
		}

		function ups_status()
		{
			if(ups!=null)
			{
				if(ups.getSerialStatus())
				{
					node.status({fill:"green",shape:"dot",text:"Comport:Avaliable"});
				}
				else
				{
					node.status({fill:"red",shape:"ring",text:"Comport:Not avaliable"});
				}
			}
		}
		
		if(node.serial!=="")
		{
			if(ups!=null)
			{
				ups.start(node.serial, emerency, infomation);
			}
		}
		
		ups_status();
		
		this.on('input', function (msg) {
			var respondmsg = "";
			var msg0 = {};
			if(ups!=null)
			{
				if(msg.payload.port)
				{
					ups.bye();
					node.serial = msg.payload.port;
					ups.start(msg.payload.port, emerency, infomation);
					if(ups.getSerialStatus())
					{
						//respondmsg = "Comport:Avaliable";
						node.status({fill:"green",shape:"dot",text:"Comport: Avaliable"});
					}
					else
					{
						//respondmsg = "Comport:Not avaliable";
						node.status({fill:"red",shape:"ring",text:"Comport: Not avaliable"});
					}
				}
				else
				{
					if (!ups.getSerialStatus()) {
						node.warn('UPS is not connected. Please connect it first.');
						return;
					}
					
					if(msg.payload.UPSDCinLostDelayTime)
					{
						respondmsg = ups.setDCinLostDelayTime(parseInt(msg.payload.UPSDCinLostDelayTime, 10));
					}
					else if(msg.payload.UPSDCoutCutOffDelayTime)
					{
						respondmsg = ups.setDCoutCutOffDelayTime(parseInt(msg.payload.UPSDCoutCutOffDelayTime, 10));
					}
					if(respondmsg === "")respondmsg = "error";
					msg0.payload = "UPS: " + respondmsg;
					node.send([null,null,msg0]);
				}
			}
			else
			{
				msg0.payload = "UPS: load module error";
				node.send([null,null,msg0]);
			}
		});

		this.on("close", function() {
			// Called when the node is shutdown - eg on redeploy.
			// Allows ports to be closed, connections dropped etc.
			// eg: node.client.disconnect();
			if(ups!=null)ups.bye();
		});
    }
    RED.nodes.registerType("atipsae",AdvIPSAENode);
};
