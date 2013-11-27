Components.utils.import("resource://mypgp/mypgpCommon.jsm");
Components.utils.import("resource://mypgp/mypgpFileManager.jsm");

var EXPORTED_SYMBOLS = [ "mypgpWindowManager" ];

// Preferences
const KEY_EXT 			= "*.key"

// Windows Predefined Titles
const ABOUT_TITLE 		= "Sobre o MyPGP";
const PREFERENCES_TITLE = "Preferências";
const KEYMNG_TITLE		= "Gestão de Chaves";
const KEYGEN_TITLE		= "Gerar novo par de Chaves";
const CNTMNG_TITLE		= "Gestão de Contactos";

// MyPGP Chrome
const ABOUT 			= "chrome://mypgp/content/mypgpAbout.xul";
const PREFERENCES 		= "chrome://mypgp/content/PreferencesWindow/myPGPManagement.xul";
const KEYMANAGEMENT 	= "chrome://mypgp/content/KeyManagementWindow/myPGPKeyManagement.xul";
const KEYGEN 			= "chrome://mypgp/content/KeyManagementWindow/myPGPKeyGeneration.xul";
const CONTACTMANAGEMENT = "chrome://mypgp/content/ContactManagementWindow/myPGPContactManager.xul";

//THUNDERBIRD ContractIDs
const MESSENGER_COMPOSE_CONTRACT	= "@mozilla.org/messengercompose;1";
const IO_SERVICE_CONTRACT			= "@mozilla.org/network/io-service;1";
const FILE_PICKER_CONTRACT 			= "@mozilla.org/filepicker;1";

//THUNDERBIRD Interfaces
const nsIMsgComposeService 	= Components.interfaces.nsIMsgComposeService;
const nsIIOService			= Components.interfaces.nsIIOService;
const nsIFilePicker			= Components.interfaces.nsIFilePicker;
const nsIFile 				= Components.interfaces.nsIFile;

//THUNDERBIRD Components & Services
const tMsgComposeService = Components.classes[MESSENGER_COMPOSE_CONTRACT].getService(nsIMsgComposeService);
const tIOService = Components.classes[IO_SERVICE_CONTRACT].getService(nsIIOService);
const tFilePicker = Components.classes[FILE_PICKER_CONTRACT].createInstance();


var mypgpWindowManager = {

	filters_appended: false,

	openAbout: function (win)
	{
		win.openDialog(ABOUT, ABOUT_TITLE, null);
	},

	openHelp: function (win)
	{
		/* TODO: deve ser implementado */
	},

	openPreferences: function (win)
	{
		win.openDialog(PREFERENCES, PREFERENCES_TITLE, null);
	},

	openKeyManagement: function (win)
	{
		win.openDialog(KEYMANAGEMENT, KEYMNG_TITLE, null);
	},

	openKeyGen: function (win)
	{
		var key_pair = {priv_key:null, pub_key:null};
		win.openDialog(KEYGEN, KEYGEN_TITLE, key_pair);
		return key_pair;
	},

	openContactManagement: function (win)
	{
		win.openDialog(CONTACTMANAGEMENT, CNTMNG_TITLE, null);
	},

	openFileBrowsingWindow: function (win, title, save)
	{
		var file = null;
		var file_picker = tFilePicker.QueryInterface(nsIFilePicker);
		var mode = save ? nsIFilePicker.modeSave : nsIFilePicker.modeOpen;

		file_picker.init(win, title, mode);

		if(!this.filters_appended){
			file_picker.appendFilter("Chaves", KEY_EXT);
			this.filters_appended = true;
		}

		if (file_picker.show() == nsIFilePicker.returnCancel){
      		MypgpCommon.DEBUG_LOG("(mypgpWindowManager.jsm : openFileBrowsingWindow) leaving without file\n");
      		return null;
      	}

    	file = file_picker.file.QueryInterface(nsIFile);

    	if(file != null)
    		MypgpCommon.DEBUG_LOG("(mypgpWindowManager.jsm : openFileBrowsingWindow) Retrieving file at "+file.path+"\n");
    	else
    		MypgpCommon.ERROR_LOG("(mypgpWindowManager.jsm : openFileBrowsingWindow) Retrived file is null");

    	return file;
	},

	composeMail: function (win, keyOwnerId, keyOwnerMail, annex)
	{

		
		var sURL="mailto:?subject=<Chave%20de%20"+keyOwnerId+"%20:%20"+keyOwnerMail+">";
		var aURI = tIOService.newURI(sURL, null, null); 
		tMsgComposeService.OpenComposeWindowWithURI(null, aURI);
	}

};


