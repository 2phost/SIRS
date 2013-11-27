//Components.utils.import("resource://mypgp/jquery-2.0.3.min.js");
//Components.utils.import("resource://mypgp/openpgp.min.js");

var EXPORTED_SYMBOLS = [ "MypgpCommon" ];

const Cc = Components.classes;
const Ci = Components.interfaces;


/*THUNDERBIRD ContractIDs*/
const FILE_PICKER_CONTRACT = "@mozilla.org/filepicker;1";

/*THUNDERBIRD Interfaces*/
const nsIFilePicker = Ci.nsIFilePicker;

/*THUNDERBIRD Components*/
const tFilePicker = Cc[FILE_PICKER_CONTRACT].createInstance();

var logLevel = 1;

// various global variables
//var pub_key = null;

var MypgpCommon = {

	// "constants"


	// variables


	// methods
	
	/*ENCRYPT: function (msg) {
		
		
			//require("resource://mypgp/openpgp.min.js");
    		openpgp.init();
    		pub_key = openpgp.read_publicKey("Version: GnuPG/MacGPG2 v2.0.18 (Darwin)\nComment: GPGTools - http://gpgtools.org\n\n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\n=Lx12");

			//var testeMsg = openpgp.write_encrypted_message(pub_key, "O DUDU");
			this.DEBUG_LOG(testeMsg);
    		return true;

	},*/	


	/*** DEBUGGING ***/

	WRITE_LOG: function (str)
	{
		function f00(val, digits) {
			return ("0000"+val.toString()).substr(-digits);
		}

		var d = new Date();
		var datStr=d.getFullYear()+"-"+f00(d.getMonth()+1, 2)+"-"+f00(d.getDate(),2)+" "+f00(d.getHours(),2)+":"+f00(d.getMinutes(),2)+":"+f00(d.getSeconds(),2)+"."+f00(d.getMilliseconds(),3)+" ";
		if (logLevel >= 1){
			try {
				var consoleSvc = Cc["@mozilla.org/consoleservice;1"].getService(Ci.nsIConsoleService);
				consoleSvc.logStringMessage(datStr+str);
			}
			catch (ex) {}
			dump(datStr+str);
		}
	},
	
	DEBUG_LOG: function (str)
	{
		if (logLevel >= 1)
			this.WRITE_LOG("[DEBUG] "+str);
	},

	ERROR_LOG: function (str)
	{
		try {
			var consoleSvc = Cc["@mozilla.org/consoleservice;1"].getService(Ci.nsIConsoleService);

			var scriptError = Cc["@mozilla.org/scripterror;1"].createInstance(Ci.nsIScriptError);
			scriptError.init(str, null, null, 0, 0, scriptError.errorFlag, "Mypgp");
			consoleSvc.logMessage(scriptError);

		}
		catch (ex) {}

		if (logLevel >= 2)
			this.WRITE_LOG("[ERROR] "+str);
	}

};
