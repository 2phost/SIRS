const Cc = Components.classes;
const Ci = Components.interfaces;

var logLevel = 1;

// various global variables

var MypgpCommon = {

	// "constants"


	// variables


	// methods
	WRITE_LOG: function (str)
	{
		function f00(val, digits) {
			return ("0000"+val.toString()).substr(-digits);
		}

		var d = new Date();
		var datStr=d.getFullYear()+"-"+f00(d.getMonth()+1, 2)+"-"+f00(d.getDate(),2)+" "+f00(d.getHours(),2)+":"+f00(d.getMinutes(),2)+":"+f00(d.getSeconds(),2)+"."+f00(d.getMilliseconds(),3)+" ";
		if (gLogLevel >= 1)
			dump(datStr+str);
	},
	
	DEBUG_LOG: function (str)
	{
		if (LogLevel >= 1)
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

		if (gLogLevel >= 2)
			this.WRITE_LOG("[ERROR] "+str);
	}

};
