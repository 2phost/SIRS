var EXPORTED_SYMBOLS = [ "MypgpCommon" ];

const Cc = Components.classes;
const Ci = Components.interfaces;
const IMypgp = Ci.IMypgp;

/*THUNDERBIRD ContractIDs*/
const FILE_PICKER_CONTRACT 		= "@mozilla.org/filepicker;1";
const XPCOM_APPINFO_CONTRACT 	= "@mozilla.org/xre/app-info;1";

/*THUNDERBIRD Interfaces*/
const nsIXULRuntime	= Ci.nsIXULRuntime;

/*THUNDERBIRD Components*/
const tFilePicker = Cc[FILE_PICKER_CONTRACT].createInstance();

/*THUNDERBIRD Services*/
const tXULRuntime = Cc[XPCOM_APPINFO_CONTRACT].getService(nsIXULRuntime);

var logLevel = 1;

// various global variables
//var pub_key = null;

var MypgpCommon = {

	// "constants"
	MYPGP_CONTRACTID: "@mozilla.org/messengercompose/composesecure;1",

	// variables
	mypgpSvc: null,

	// methods
	
	getService: function ()
	{
		if (this.enigmailSvc) {
			return this.mypgpSvc;
    	}
		
		try {
      		this.mypgpSvc = Cc[this.MYPGP_CONTRACTID].createInstance(IMypgp);
    	}
    	catch (ex) {
      		this.ERROR_LOG("enigmailCommon.js: Error in instantiating EnigmailService\n");
      		return null;
    	}

		return this.mypgpSvc;
	},

	getOperativeSystem: function ()
	{
		return tXULRuntime.OS;
	},

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
