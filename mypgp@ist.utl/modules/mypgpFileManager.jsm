Components.utils.import("resource://gre/modules/FileUtils.jsm");
Components.utils.import("resource://gre/modules/NetUtil.jsm");
Components.utils.import("resource://mypgp/mypgpCommon.jsm");


var EXPORTED_SYMBOLS = [ "mypgpFileManager" ];


/*THUNDERBIRD ContractIDs*/
const LOCAL_FILE_CONTRACT 	= "@mozilla.org/file/local;1";
const CONVERTER_CONTRACT 	= "@mozilla.org/intl/scriptableunicodeconverter";

/*THUNDERBIRD Interfaces*/
const nsIFile = Components.interfaces.nsIFile;
const nsILocalFile = Components.interfaces.nsILocalFile;
const nsIScriptableUnicodeConverter = Components.interfaces.nsIScriptableUnicodeConverter;

/*THUNDERBIRD Components*/
const tLocalFile = Components.classes[LOCAL_FILE_CONTRACT].createInstance(nsILocalFile);

/* General Utils */
var fileOutputStream 	= null;
var fileInputStream 	= null;
var outputConverter 	= Components.classes[CONVERTER_CONTRACT].createInstance(nsIScriptableUnicodeConverter);


var mypgpFileManager = {

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
	}
};