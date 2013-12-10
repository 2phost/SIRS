Components.utils.import("resource://mypgp/mypgpCommon.jsm");
Components.utils.import("resource://gre/modules/FileUtils.jsm");
Components.utils.import("resource://gre/modules/NetUtil.jsm");

var EXPORTED_SYMBOLS = [ "MypgpPreferences" ];

/* Default Values */
const KEY_EXT = ".key";


var MypgpPreferences = {

	default_folder: "myPGP"

};