Components.utils.import("resource://mypgp/mypgpCommon.jsm");
Components.utils.import("resource://mypgp/mypgpFileManager.jsm");

var EXPORTED_SYMBOLS = [ "mypgpWindowManager" ];

// Preferences
const KEY_EXT 						= "*.key"
const ATTACHMENT_NAME_PREF 	= "pubKey.key";
// Windows Predefined Titles
const ABOUT_TITLE 			= "Sobre o MyPGP";
const PREFERENCES_TITLE 	= "Preferências";
const KEYMNG_TITLE			= "Gestão de Chaves";
const KEYGEN_TITLE			= "Gerar novo par de Chaves";
const CNTMNG_TITLE			= "Gestão de Contactos";
const ADDRBOOK_TITLE			= "Importar contactos";

// MyPGP Chrome
const ABOUT 					= "chrome://mypgp/content/mypgpAbout.xul";
const PREFERENCES 			= "chrome://mypgp/content/PreferencesWindow/myPGPManagement.xul";
const KEYMANAGEMENT 			= "chrome://mypgp/content/KeyManagementWindow/myPGPKeyManagement.xul";
const KEYGEN 					= "chrome://mypgp/content/KeyManagementWindow/myPGPKeyGeneration.xul";
const CONTACTMANAGEMENT 	= "chrome://mypgp/content/ContactManagementWindow/myPGPContactManager.xul";
const CONTACT_ADDRBOOK		= "chrome://mypgp/content/ContactManagementWindow/myPGPContactAddressBook.xul";

//THUNDERBIRD ContractIDs
const MESSENGER_COMPOSE_CONTRACT	= "@mozilla.org/messengercompose;1";
const IO_SERVICE_CONTRACT			= "@mozilla.org/network/io-service;1";
const FILE_PICKER_CONTRACT 		= "@mozilla.org/filepicker;1";
const ATTACHMENT_CONTRACT			= "@mozilla.org/messengercompose/attachment;1";
const COMPOSE_FIELDS_CONTRACT		= "@mozilla.org/messengercompose/composefields;1";
const ACCOUNT_MANAGER_CONTRACT	= "@mozilla.org/messenger/account-manager;1";
const MSG_COMP_PARAMS_CONTRACT	= "@mozilla.org/messengercompose/composeparams;1";

//THUNDERBIRD Interfaces
const nsIMsgComposeService	= Components.interfaces.nsIMsgComposeService;
const nsIIOService			= Components.interfaces.nsIIOService;
const nsIFilePicker			= Components.interfaces.nsIFilePicker;
const nsIFile 					= Components.interfaces.nsIFile;
const nsIMsgAttachment		= Components.interfaces.nsIMsgAttachment;
const nsIMsgCompFields		= Components.interfaces.nsIMsgCompFields;
const nsIMsgAccountManager	= Components.interfaces.nsIMsgAccountManager;
const nsIMsgComposeParams	= Components.interfaces.nsIMsgComposeParams;
const nsIMsgCompFormat		= Components.interfaces.nsIMsgCompFormat;		

//THUNDERBIRD Components & Services
const tMsgComposeService 	= Components.classes[MESSENGER_COMPOSE_CONTRACT].getService(nsIMsgComposeService);
const tIOService 				= Components.classes[IO_SERVICE_CONTRACT].getService(nsIIOService);
const tFilePicker 			= Components.classes[FILE_PICKER_CONTRACT].createInstance();


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

	openContactAddressBook: function (win)
	{
		win.openDialog(CONTACT_ADDRBOOK, ADDRBOOK_TITLE, null);
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

	composeMail: function (win, keyOwnerId, keyOwnerMail, attachment)
	{

		/*
		var params = Components.classes[COMPOSE_FIELDS_CONTRACT].createInstance(nsIMsgCompFields);

		var att = Components.classes[ATTACHMENT_CONTRACT].createInstance(nsIMsgAttachment);
		att.name = "Chave - "+keyOwnerId;
		att.url = attachment.path;
		att.contentType = "file/rfc4880"; /*OpenPGP RFC */
		/*att.temporary = false;

		param.addAttachment(att);*/

		//Create the attachment
		var tmpFile = mypgpFileManager.createTmpFile("test", "IMMA JUST A TESTRING");
		
		if(tmpFile == null){
			MypgpCommon.ERROR_LOG("(mypgpWindowManager.jsm : composeMail) Retrived temporary file is null");
			return;
		}
		var tmpFileURI = tIOService.newFileURI(tmpFile);
		var att = Components.classes[ATTACHMENT_CONTRACT].createInstance(nsIMsgAttachment);
		att.url = tmpFileURI.spec;
		att.name= ATTACHMENT_NAME_PREF;
		att.temporary = true;
		att.contentType = "application/pgp-keys";

		//Create the Message
		var msgCompFields = Components.classes[COMPOSE_FIELDS_CONTRACT].createInstance(nsIMsgCompFields);
		var accountManager = Components.classes[ACCOUNT_MANAGER_CONTRACT].createInstance(nsIMsgAccountManager);
		var msgComposeService = Components.classes[MESSENGER_COMPOSE_CONTRACT].createInstance(nsIMsgComposeService);
		var msgComposeParams = Components.classes[MSG_COMP_PARAMS_CONTRACT].createInstance(nsIMsgComposeParams);
		var sURL="mailto:?subject=<Chave%20de%20"+keyOwnerId+"%20:%20"+keyOwnerMail+">";
		var aURI = tIOService.newURI(sURL, null, null); 
		
		msgCompFields.addAttachment(att);
		msgComposeParams.composeFields = msgCompFields;
		msgComposeParams.identity = accountManager.defaultAccount.defaultIdentity;
		msgComposeParams.type = nsIMsgCompFormat.New;
		msgComposeParams.format = nsIMsgCompFormat.Default;
		msgComposeParams.originalMsgURI = "";
		msgComposeService.OpenComposeWindowWithParams("", msgComposeParams);
	}

};


