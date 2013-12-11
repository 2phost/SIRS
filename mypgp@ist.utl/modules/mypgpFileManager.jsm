/**
 *
 * Mozilla Interfaces
 * SEE : http://mxr.mozilla.org/comm-central/find?
*/
Components.utils.import("resource://gre/modules/FileUtils.jsm");
Components.utils.import("resource://gre/modules/NetUtil.jsm");

Components.utils.import("resource://mypgp/mypgpCommon.jsm");
Components.utils.import("resource://mypgp/mypgpPreferences.jsm");

var EXPORTED_SYMBOLS = [ "mypgpFileManager" ];

const TMP_DIR 		= "TmpD";
const PROFILE_DIR	= "ProfD";
const MYPGP_DIR 	= "myPGP";
const PREF_EXT 	= ".key";


/*THUNDERBIRD ContractIDs*/
const LOCAL_FILE_CONTRACT 				= "@mozilla.org/file/local;1";
const DIRECTORY_SERVICE_CONTRACT		= "@mozilla.org/file/directory_service;1";
const CONVERTER_CONTRACT 				= "@mozilla.org/intl/scriptableunicodeconverter";

/*THUNDERBIRD Interfaces*/
const nsIFile 								= Components.interfaces.nsIFile;
const nsILocalFile 						= Components.interfaces.nsILocalFile;
const nsIProperties						= Components.interfaces.nsIProperties;
const nsIScriptableUnicodeConverter = Components.interfaces.nsIScriptableUnicodeConverter;

/*THUNDERBIRD Components*/
const tLocalFile 							= Components.classes[LOCAL_FILE_CONTRACT].createInstance(nsILocalFile);
const tDirectoryService 				= Components.classes[DIRECTORY_SERVICE_CONTRACT].getService();
const tDirectoryServiceProperties 	= tDirectoryService.QueryInterface(nsIProperties);

/* General Utils */
var fileOutputStream = null;
var fileInputStream 	= null;
var outputConverter 	= Components.classes[CONVERTER_CONTRACT].createInstance(nsIScriptableUnicodeConverter);


var mypgpFileManager = {

	initiated: false,

	init: function()
	{
		if(!this.initiated){
			this.initiated = true;
			FileUtils.getDir(TMP_DIR, ["myPGP"], true);
		}
	},

	/**
	 *
	 * @param {nsIFile} file
	 * @param {} flags
	 * @param {string} data
	 */
	writeKeyAsFile: function (file, flags, data)
	{
		file.createUnique(nsIFile.NORMAL_FILE_TYPE, 0600);

		fileOutputStream = FileUtils.openSafeFileOutputStream(file);
		outputConverter.charset = "UTF-8";

		fileInputStream = outputConverter.convertToInputStream(data);

		NetUtil.asyncCopy(fileInputStream, fileOutputStream, function(status){
			if(!Components.isSuccessCode(status)){
				MypgpCommon.ERROR_LOG("(mypgpFileManager.jsm : writeKeyAsFile) Error writing to file");
				return null;
			}
		});
	},

	/**
	*
	*/
	storeKeyAsFile: function(email, file)
	{
		

		var keyFile = null;
		//var parsedEmail = email.replace(/\./g, '_');

		let keyDir = FileUtils.getFile(PROFILE_DIR,
			[MypgpPreferences.default_folder,
			MypgpPreferences.keys_folder]);

		file.copyTo(keyDir, email+PREF_EXT);

		keyDir.append(email+PREF_EXT);

		return keyDir;
	},

	getKeyAsFile: function(email)
	{
		let keyDir = FileUtils.getFile(PROFILE_DIR,
			[MypgpPreferences.default_folder,
			MypgpPreferences.keys_folder]);

		keyDir.append(email+PREF_EXT);

		return keyDir;
	},

	/**
	 * readDataFromFile:
	 * @param {nsIFile} file
	 */
	readDataFromFile: function(file){

		var data = "";
		var fstream = Components.classes["@mozilla.org/network/file-input-stream;1"].
		     createInstance(Components.interfaces.nsIFileInputStream);
		var cstream = Components.classes["@mozilla.org/intl/converter-input-stream;1"].
		     createInstance(Components.interfaces.nsIConverterInputStream);
		fstream.init(file, -1, 0, 0);
		cstream.init(fstream, "UTF-8", 0, 0); // you can use another encoding here if you wish

		let (str = {}) {
			let read = 0;
			do { 
				read = cstream.readString(0xffffffff, str); // read as much as we can and put it in str.value
				data += str.value;
			} while (read != 0);
		}
		
		cstream.close(); // this closes fstream

		return data;
	},

	/**
	 *
	*/
	getTmpDirectory: function ()
	{

		var tmpDir;

		try{
    		tmpDir = FileUtils.getDir(TMP_DIR, ["myPGP"], true);
    		MypgpCommon.DEBUG_LOG("(mypgpFileManager.jsm : getTmpDirectory) Pointing to "+tmpDir.path);
    	}catch(exp){
    		MypgpCommon.ERROR_LOG("(mypgpFileManager.jsm : getTmpDirectory) ERROR: "+exp);
    		
    	}

		return tmpDir;
	},

	createTmpFile: function (title, data)
	{
		var tmpFile = null;

		tmpFile = FileUtils.getFile(TMP_DIR, [MYPGP_DIR , title+PREF_EXT]);
		tmpFile.createUnique(nsIFile.NORMAL_FILE_TYPE, FileUtils.PERMS_FILE);

		fileOutputStream = FileUtils.openSafeFileOutputStream(tmpFile);
		outputConverter.charset = "UTF-8";

		fileInputStream = outputConverter.convertToInputStream(data);

		NetUtil.asyncCopy(fileInputStream, fileOutputStream, function(status){
			if(!Components.isSuccessCode(status)){
				MypgpCommon.ERROR_LOG("(mypgpFileManager.jsm : createTmpFile) Error writing to file");
				return null;
			}
		});

		MypgpCommon.DEBUG_LOG("(mypgpFileManager.jsm : createTmpFile) Returning file at "+tmpFile.path);
		return tmpFile;
	}
};