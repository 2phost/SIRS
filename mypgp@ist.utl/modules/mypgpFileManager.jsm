var EXPORTED_SYMBOLS = [ "MyPGPFileManager" ];




/*THUNDERBIRD ContractIDs*/
const FILE_PICKER_CONTRACT = "@mozilla.org/filepicker;1";

/*THUNDERBIRD Interfaces*/
const nsIFilePicker = Components.interfaces.nsIFilePicker;
const nsIFile = Components.interfaces.nsIFile;

/*THUNDERBIRD Components*/
const tFilePicker = Components.classes[FILE_PICKER_CONTRACT].createInstance();

var MyPGPFileManager = {

	importKey: function (win, title, defaultExtention)
	{

		var file = null;
		var file_picker = tFilePicker.QueryInterface(nsIFilePicker);
		file_picker.init(win, title, nsIFilePicker.modeOpen);

		if(defaultExtention)
			file_picker.defaultExtention = defaultExtention;

		if (file_picker.show() == nsIFilePicker.returnCancel)
      		return null;

    	file = file_picker.file.QueryInterface(nsIFile);

    	return file;
	},

	exportKey: function (win, title, defaultExtention)
	{
		var file = null;
		var file_picker = tFilePicker.QueryInterface(nsIFilePicker);
		file_picker.init(win, title, nsIFilePicker.modeSave);

		if(defaultExtention)
			file_picker.defaultExtention = defaultExtention;

		if (file_picker.show() == nsIFilePicker.returnCancel)
      		return null;

    	file = file_picker.file.QueryInterface(nsIFile);

    	return file;
	}
};