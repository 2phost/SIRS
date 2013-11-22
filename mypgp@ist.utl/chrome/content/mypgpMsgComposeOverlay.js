Components.utils.import("resource://mypgp/mypgpCommon.jsm");

if (! MyPGP) var MyPGP = {};

MyPGP.msg = {
	// Variables List
	secureMode: false,

	toggleSecure: function() {		
		this.secureMode = !this.secureMode;
		MypgpCommon.DEBUG_LOG("(toggleSecure) Message Secure: "+this.secureMode+"\n");
	},
	
	doButton: function (button) {
		switch (button){
			case 'toggleSecure':
				this.toggleSecure();
				break;
		}
	},

	setMenuSettings: function (postfix) {
		MypgpCommon.DEBUG_LOG("mypgpMsgComposeOverlay.js: Mypgp.msg.setMenuSettings: postfix="+postfix+"\n");
		document.getElementById("mypgp_secure_send"+postfix).setAttribute("checked", this.secureMode ? "true": "false");
	}

}
