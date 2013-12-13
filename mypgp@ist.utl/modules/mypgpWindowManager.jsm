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
const ABOUT 				= "chrome://mypgp/content/mypgpAbout.xul";
const PREFERENCES 			= "chrome://mypgp/content/PreferencesWindow/myPGPManagement.xul";
const KEYMANAGEMENT 		= "chrome://mypgp/content/KeyManagementWindow/myPGPKeyManagement.xul";
const KEYGEN 				= "chrome://mypgp/content/KeyManagementWindow/myPGPKeyGeneration.xul";
const CONTACTMANAGEMENT 	= "chrome://mypgp/content/ContactManagementWindow/myPGPContactManager.xul";
const CONTACT_ADDRBOOK		= "chrome://mypgp/content/ContactManagementWindow/myPGPContactAddressBook.xul";
const DECIPHER 				= "chrome://mypgp/content/DecipherWindow/mypgpDecipherWindow.xul";


//THUNDERBIRD ContractIDs
const MESSENGER_COMPOSE_CONTRACT= "@mozilla.org/messengercompose;1";
const IO_SERVICE_CONTRACT		= "@mozilla.org/network/io-service;1";
const FILE_PICKER_CONTRACT 		= "@mozilla.org/filepicker;1";
const ATTACHMENT_CONTRACT		= "@mozilla.org/messengercompose/attachment;1";
const COMPOSE_FIELDS_CONTRACT	= "@mozilla.org/messengercompose/composefields;1";
const ACCOUNT_MANAGER_CONTRACT	= "@mozilla.org/messenger/account-manager;1";
const MSG_COMP_PARAMS_CONTRACT	= "@mozilla.org/messengercompose/composeparams;1";
const PROMPT_SERVICE_CONTRACT	= "@mozilla.org/embedcomp/prompt-service;1";

//THUNDERBIRD Interfaces
const nsIMsgComposeService	= Components.interfaces.nsIMsgComposeService;
const nsIIOService			= Components.interfaces.nsIIOService;
const nsIFilePicker			= Components.interfaces.nsIFilePicker;
const nsIFile 				= Components.interfaces.nsIFile;
const nsIMsgAttachment		= Components.interfaces.nsIMsgAttachment;
const nsIMsgCompFields		= Components.interfaces.nsIMsgCompFields;
const nsIMsgAccountManager	= Components.interfaces.nsIMsgAccountManager;
const nsIMsgComposeParams	= Components.interfaces.nsIMsgComposeParams;
const nsIMsgCompFormat		= Components.interfaces.nsIMsgCompFormat;		
const nsIPromptService 		= Components.interfaces.nsIPromptService;

//THUNDERBIRD Components & Services
const tMsgComposeService 	= Components.classes[MESSENGER_COMPOSE_CONTRACT].getService(nsIMsgComposeService);
const tIOService 				= Components.classes[IO_SERVICE_CONTRACT].getService(nsIIOService);
const tFilePicker 			= Components.classes[FILE_PICKER_CONTRACT].createInstance();
const tbPromptService		= Components.classes[PROMPT_SERVICE_CONTRACT].getService(nsIPromptService);

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

	openDecipherWindow: function (win)
	{
		win.openDialog(DECIPHER, null, null);
	},

	openFileBrowsingWindow: function (win, title, filter, filterName, save, pubKeyId)
	{

		var file = null;
		var file_picker = Components.classes[FILE_PICKER_CONTRACT].createInstance(nsIFilePicker);
		var mode = save ? nsIFilePicker.modeSave : nsIFilePicker.modeOpen;

		file_picker.init(win, title, mode);
		file_picker.defaultExtension = filter;

		if(save){
			MypgpCommon.DEBUG_LOG("----->"+pubKeyId);
			file_picker.defaultString = pubKeyId;
		}

		if(!this.filters_appended){
			file_picker.appendFilter(filterName, filter);
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
	},

	composeKeyTransferMail: function(win, keyOwnerId, keyOwnerMail, keyFile)
	{
		MypgpCommon.DEBUG_LOG("[mypgpWindowManager - composeKeyTransferMail] Starting ...");
		var tmpKeyFile = mypgpFileManager.createTmpKeyFile(keyFile);

		if(tmpKeyFile != null){
			var tmpKeyFileURI = tIOService.newFileURI(tmpKeyFile);
			var att = Components.classes[ATTACHMENT_CONTRACT].createInstance(nsIMsgAttachment);
			att.url = tmpKeyFileURI.spec;
			att.name= tmpKeyFile.leafName;
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
		}else
			MypgpCommon.ERROR_LOG("[mypgpWindowManager - composeKeyTransferMail] ERROR: Temporary key file is undefined.");
	},

	
	/* Prompt Windows */
	openAlertPromptDialog : function(title, dialog)
	{
		tbPromptService.alert(null, title, dialog);
	},

	openConfirmPromptDialog: function(title, dialog)
	{
		var result = tbPromptService.confirm(null, title, dialog);

		return result;
	},

	openSpecialConfirmPromptDialog: function(title, dialog, btn1_title, btn2_title)
	{
		var check = {value: false};                  // default the checkbox to false

		var flags = 
			tbPromptService.BUTTON_POS_0 * tbPromptService.BUTTON_TITLE_IS_STRING +
			tbPromptService.BUTTON_POS_2 * tbPromptService.BUTTON_TITLE_IS_STRING  +
			tbPromptService.BUTTON_POS_1 * tbPromptService.BUTTON_TITLE_CANCEL;

		var button = tbPromptService.confirmEx(null, title, dialog,
		   flags, btn1_title, "", btn2_title, null, check);

		var result = {opt1 : false, opt2: false, cancel: true};

		switch(button){
			case 0:
				result.opt1=true;
				result.cancel=false;
				return result;
			case 1:
				return result;
			case 2:
				result.opt2=true;
				result.cancel=false;
				return result;
		}
	}
};


