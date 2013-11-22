Components.utils.import("resource://mypgp/mypgpCommon.jsm");

if (! MyPGP) var MyPGP = {};

MyPGP.msg = {
	// Variables List
	secureMode: false,

	toggleSecure: function() {		
		MypgpCommon.DEBUG_LOG("toggleSecure");
		this.secureMode = !this.secureMode;
	},
	
	doButton: function (button) {
		switch (button){
			case 'toggleSecure':
				this.toggleSecure();
				break;
		}
	}

}

	
