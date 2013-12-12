Components.utils.import("resource://mypgp/mypgpCommon.jsm");
Components.utils.import("resource://mypgp/mypgpFileManager.jsm");
Components.utils.import("resource://mypgp/mypgpWindowManager.jsm");
Components.utils.import("resource://mypgp/mypgpAccountManager.jsm");

<!-- Local Vars -->
var addr_contacts = [];


<!-- Interfaces -->
var nsIAbManager = Components.interfaces.nsIAbManager;
var nsIAbDirectory = Components.interfaces.nsIAbDirectory;
var nsIAbCard = Components.interfaces.nsIAbCard;

<!-- Component Vars -->
var input_contacts = null;
var input_contactsChildren = null;
var input_focusedContact_username = null;
var input_focusedContact_email = null;
var input_focusedContact_isTrusted = null;
var input_key_value = null;
var input_save_button = null;
var input_cancel_button = null;


<!-- Tree Vars -->
var treeEmailColId = "email_col";
var treeUsernameColId = "username_col";

<!-- Broadcasters Handlers -->
var broadcasterHandler = {

	BcNoKeySelected: null,
	BcNoFocusedContact: null,

	init: function(){
		this.BcNoKeySelected = document.getElementById("bcNoKeySelected");
		this.BcNoFocusedContact = document.getElementById("bcNoFocusedContact");
	},

	focusContact: function()
	{
		this.BcNoFocusedContact.setAttribute("disabled", "false");
	},

	selectKey: function ()
	{
		this.BcNoKeySelected.setAttribute("disabled", "false");
	},

	deselectKey: function ()
	{
		this.BcNoKeySelected.setAttribute("disabled", "true");
	}
};

var focusedContact = {
	username: 	null,
	email: 		null,
	pubKeyId: 	null,
	pubKeyFile: null,
	isTrusted: 	false,
	isChanged: 	{ modified: false, trust : false, pubKey: false },

	focus: function(username, email, isTrusted, pubKeyId)
	{
		this.username = username;
		this.email = email;
		this.isTrusted = isTrusted;
		this.pubKeyId = pubKeyId;
		if(pubKeyId!=null) this.pubKeyFile = mypgpFileManager.getKeyAsFile(email);
		broadcasterHandler.focusContact();
	},

	unfocus: function()
	{
		this.username = null;
		this.email = null;
		this.pubKeyId = null;
		this.pubKeyFile = null;
		this.isTrusted = false;
		this.isChanged = { modified: false, trust : false, pubKey: false };
		toggleIsChanged();
	},

	selectKey: function(key)
	{
	
	},

	printState: function(){
		MypgpCommon.DEBUG_LOG("[myPGPContactManager - focusedContact]\n"+
			"Username:\t"+this.userName+"\n"+
			"Email:\t"+this.email+"\n"+
			"IsTrusted:\t"+this.isTrusted+"\n"+
			"PubKeyId:\t"+this.pubKeyId);
	}
}

window.addEventListener("load", function(){

	broadcasterHandler.init();
	
	<!-- Initialize component vars -->
	input_contacts 					= document.getElementById("cntmng_tree");
	input_contactsChildren 			= document.getElementById("cntmng_tree_children");
	input_focusedContact_username = document.getElementById("focusContact_username");
	input_focusedContact_email 	= document.getElementById("focusContact_email");
	input_focusedContact_isTrusted= document.getElementById("focusContact_isTrusted");
	input_key_value 					= document.getElementById("key_value");
	input_save_button 				= document.getElementById("cntmng_save_btn");
	input_cancel_button 				= document.getElementById("cntmng_cancel_btn");

	<!-- Initialize components event listeners -->
	input_contacts.addEventListener("click", focusDetailedContact);

	<!-- PopulateContactList -->
	for(var i=0; i<MypgpAccountManager.mContacts.length; i++){
	 		
	 		var treeItem = document.createElement("treeitem");
	 		var treeRow = document.createElement("treerow");
	 		var treeCell_username = document.createElement("treecell");
	 		var treeCell_email = document.createElement("treecell");
	 		
	 		treeCell_email.setAttribute("label", MypgpAccountManager.mContacts[i].email);
	 		treeCell_username.setAttribute("label", MypgpAccountManager.mContacts[i].name);

			treeRow.appendChild(treeCell_username);
			treeRow.appendChild(treeCell_email);
	 		
	 		treeItem.setAttribute("value", MypgpAccountManager.mContacts[i]);
	 		treeItem.appendChild(treeRow);
	 		treeItem.setAttribute("id", MypgpAccountManager.mContacts[i].email);

	 		input_contactsChildren.appendChild(treeItem);
 	}
}, false);

function focusDetailedContact(event){

	if (event != null && event.detail != 2) {
    	return;
  	}else if(event != null){
	 	// do not propagate double clicks
	  	event.stopPropagation();
	}	

	//Clear the contact info
	focusedContact.unfocus();
	input_focusedContact_username.value="";
	input_focusedContact_email.value="";
	input_focusedContact_isTrusted.checked=false;
	input_key_value.value="";

  	var tree = input_contacts;
	var email=tree.view.getCellText(tree.currentIndex, tree.columns.getNamedColumn(treeEmailColId));

	var mypgp_contact = MypgpAccountManager.getContactByEmail(email);

	focusedContact.focus(
		mypgp_contact.name,
		mypgp_contact.email,
		mypgp_contact.isTrusted,
		mypgp_contact.pubKeyId);

	focusedContact.printState();

	input_focusedContact_username.value=focusedContact.username;
	input_focusedContact_username.disabled=false;

	input_focusedContact_email.value=focusedContact.email;
	input_focusedContact_email.disabled=false;

	input_focusedContact_isTrusted.checked = focusedContact.isTrusted;
	input_focusedContact_isTrusted.disabled=false;

	//TODO: load the key content to the key_value textbox
	if(focusedContact.pubKeyId != null){
		let keyFile = focusedContact.pubKeyFile;
		MypgpCommon.DEBUG_LOG("---> Key path: "+keyFile.path);
		input_key_value.value = "<"+focusedContact.pubKeyFile.leafName+">\n\n"+mypgpFileManager.readDataFromFile(focusedContact.pubKeyFile);
	}
}

function toggleIsChanged(){

	if(focusedContact.isChanged.modified){
		input_save_button.disabled=false;
		input_cancel_button.disabled=false;
	}else{
		input_save_button.disabled=true;
		input_cancel_button.disabled=true;
	}
}

function saveChanges(){

	if(focusedContact.isChanged.modified){

		var new_trust = focusedContact.isChanged.trust ? focusedContact.isTrusted : null;
		var new_pubkeyid = null;

		if(focusedContact.isChanged.pubKey){
			keyFile = mypgpFileManager.storeKeyAsFile(focusedContact.email, focusedContact.pubKeyFile);
			new_pubkeyid = focusedContact.isChanged.pubKey ? keyFile.leafName : null;
		}

		MypgpAccountManager.updateExistingContact(focusedContact.email, new_trust, new_pubkeyid);

		focusedContact.isChanged.modified = false;
		focusedContact.isChanged.trust = false;
		focusedContact.isChanged.pubKey = false;

		focusDetailedContact();
	}
}

function cancelChanges(){



	MypgpCommon.DEBUG_LOG("(myPGPContactManager.js : cancelChanges) TODO must be implemented\n");


	focusDetailedContact();
}

function establishTrust(){

	var result = mypgpWindowManager.openSpecialConfirmPromptDialog(
		"Establecer confiança com "+focusedContact.username,
		"Tem a certeza que pretende confiar no utilizador "+focusedContact.username+" com o email "+focusedContact.email+"?",
		"Confio",
		"Desconfio");

	if(!result.cancel){

		if(focusedContact.isTrusted != result.opt1){
			focusedContact.isChanged.modified = true;
			focusedContact.isChanged.trust = true;
		}

		focusedContact.isTrusted = result.opt1;
		input_focusedContact_isTrusted.checked = result.opt1;
		toggleIsChanged();
	}else
		input_focusedContact_isTrusted.checked = focusedContact.isTrusted;
}


/*
 * Menu Functions
 */

/**
 * importKey
 * A file browser is openened and the selected key is imported.
 * NOTE: only after the change has been save should the key be associated with the contact. */
function importKey(){

	var file = null;
	var overwrite;

	if(focusedContact.pubKeyId != null){
		overwrite = mypgpWindowManager.openConfirmPromptDialog("Substituição de Chave",
			"Tem a certeza que pretende substituir esta chave?");
	}else
		overwrite = true;

	if(overwrite){
		file = mypgpWindowManager.openFileBrowsingWindow(window, "Importar Chave", false, null);
		
		if(file != null){
			
			var file_content = mypgpFileManager.readDataFromFile(file);
			input_key_value.value = "<"+file.leafName+">\n"+file_content;

			focusedContact.pubKeyId = file.leafName;
			focusedContact.pubKeyFile = file;

			focusedContact.isChanged.modified = true;
			focusedContact.isChanged.pubKey = true;

	 		MypgpCommon.DEBUG_LOG("[myPGPContactManager.js : importKey]\n"+
	 			"Key added");
	 	}
	}
}


/**
 * exportKey
 * NOTE: only if a key is selected should the action be avaliable
 * Given the selected key, a file browser is selected and the key is writen in the
 * file system as a file */
function exportKey(){

	var file = mypgpWindowManager.openFileBrowsingWindow(window, "Exportar Chave", true, null);
	/*TODO: Passar a chave para o mypgpFileManager */
	
	if(file != null){
		mypgpFileManager.writeKeyAsFile(file, null, "TODO: must pass the key");
		MypgpCommon.DEBUG_LOG("(myPGPContactManager.js : importKey) "+file.path+"\n");
	}
}

/**
 * emailKey
 * NOTE: only if a key is selected should this action be avaliable
 * Given the selected key, a email window is opened with the selected key file added as an attachment */
function emailKey(){

	mypgpWindowManager.composeMail(window,
									focusedContact.username,
									focusedContact.email,
									focusedContact.key);

	MypgpCommon.DEBUG_LOG("(myPGPContactManager.js : emailKey) TODO must be implemented\n");
}

/**
 * exitContactManager
 */
function exitContactManager(){

	if(focusedContact.isChanged){

		var result = mypgpWindowManager.openSpecialConfirmPromptDialog(
			"Sair do Gestor de Contactos "+focusedContact.username,
			"Tem a certeza que pretende sair sem gravar as modificações feitas ao contacto "+focusedContact.username+"?",
			"Gravar e Sair",
			"Sair sem Gravar");

		if(!result.cancel){
			if(result.opt1)
				saveChanges();
				
			window.close();
		}
	}else{
		window.close();
	}
}

function openContactImport(){
	
	window.close();
	mypgpWindowManager.openContactAddressBook(window);
	MypgpCommon.DEBUG_LOG("[myPGPContactManager.js - openContactImport]\n");

}

function openAbout(){
	mypgpWindowManager.openAbout(window);
	MypgpCommon.DEBUG_LOG("(myPGPContactManager.js : openAbout)\n");
}

function openHelp(){

}