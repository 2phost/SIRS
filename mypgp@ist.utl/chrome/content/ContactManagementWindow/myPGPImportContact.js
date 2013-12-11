Components.utils.import("resource://mypgp/mypgpCommon.jsm");
Components.utils.import("resource://mypgp/mypgpFileManager.jsm");
Components.utils.import("resource://mypgp/mypgpWindowManager.jsm");

<!-- Local Vars -->
var addr_books = [];
var addr_book = null;
var addr_contacts = [];


<!-- Interfaces -->
var nsIAbManager = Components.interfaces.nsIAbManager;
var nsIAbDirectory = Components.interfaces.nsIAbDirectory;
var nsIAbCard = Components.interfaces.nsIAbCard;

<!-- Manager Vars -->
var tAbManager 				= Components.classes["@mozilla.org/abmanager;1"].getService(nsIAbManager);  
var tAllAddressBooks 		= tAbManager.directories;

<!-- Component Vars -->
var input_contacts = null;
var input_addrbook = null;
var input_contactsChildren = null;
var input_focusedContact_username = null;
var input_focusedContact_email = null;
var input_focusedContact_isTrusted = null;
var input_save_button = null;
var input_cancel_button = null;
var input_focusedContact_Keys = null;
var input_focusedContact_RevokedKeys = null;

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

var docElementsManager = {

	focusedContactKeyTree: 							null,
	focusedContactKeyTree_children: 				null,
	focusedContactRevokedKeyTree: 				null,
	focusedContactRevokedKeyTree_children: 	null,

	init: function ()
	{
		this.focusedContactKeyTree = document.getElementById("keys_tree");
		this.focusedContactKeyTree_children = document.getElementById("keys_tree_children");
		this.focusedContactRevokedKeys = document.getElementById("revokedkeys_tree");
		this.focusedContactRevokedKeys_children = document.getElementById("revokedkeys_tree_children");
	}

}

var focusedContact = {
	username: 	null,
	email: 		null,
	key: 			null,
	isTrusted: 	false,
	isChanged: 	false,

	focus: function(username, email)
	{
		this.username = username;
		this.email = email;
		broadcasterHandler.focusContact();
	},

	unfocus: function()
	{
		this.username = null;
		this.email = null;
		this.key = null;
	},

	selectKey: function(key)
	{
		this.key = key;
		broadcasterHandler.selectKey();
	}
}

window.addEventListener("load", function(){

	broadcasterHandler.init();
	docElementsManager.init();

	<!-- Initialize component vars -->
	input_contacts = document.getElementById("cntmng_tree");
	input_contactsChildren = document.getElementById("cntmng_tree_children");
	input_addrbook = document.getElementById("cntmng_addrbook");
	input_focusedContact_username = document.getElementById("focusContact_username");
	input_focusedContact_email = document.getElementById("focusContact_email");
	input_focusedContact_isTrusted =document.getElementById("focusContact_isTrusted");
	input_save_button = document.getElementById("cntmng_save_btn");
	input_cancel_button = document.getElementById("cntmng_cancel_btn");
	input_focusedContact_Keys = document.getElementById("keys_tree_children");
	input_focusedContact_RevokedKeys = document.getElementById("revokedkeys_tree_children");

	<!-- Initialize components event listeners -->
	input_contacts.addEventListener("click", focusDetailedContact);
	input_addrbook.addEventListener("select", populateContactList);

	docElementsManager.focusedContactKeyTree.addEventListener("select", function(){
		var t = docElementsManager.focusedContactKeyTree;
		var key = t.view.getCellValue(t.currentIndex, t.columns.getColumnAt(0));
		focusedContact.selectKey(key);
	});

	<!-- Populate Address Books -->
	while (tAllAddressBooks.hasMoreElements()) {  
  		let addressBook = tAllAddressBooks.getNext().QueryInterface(nsIAbDirectory);
  		if(addressBook != null){ <!--TODO: testar se é mail list tambem -->
  			addr_books.push(addressBook);
  		}
  	}

  	for(var i=0; i < addr_books.length; i++){
  		input_addrbook.appendItem(addr_books[i].dirName, addr_books[i].URI, addr_books[i].description);
  	}

  	input_addrbook.selectedItem=addr_books[0];

}, null);

function populateContactList(){
	MypgpCommon.DEBUG_LOG("(ContactManager) Address book selected : "+input_addrbook.selectedItem.label+"populating...\n");

	/*TODO: clear current children in the tree*/

	var directoryURI = input_addrbook.selectedItem.value;
	var treeChildren = input_contactsChildren;
	var contacts=[];

	try{

	   let searchResult = tAbManager.getDirectory(directoryURI).childCards;

	   if(!searchResult.hasMoreElements()) MypgpCommon.DEBUG_LOG("(ContactManager) ... no contacts in this address book ...");	

	 	while(searchResult.hasMoreElements()){
	 		let contact = searchResult.getNext().QueryInterface(nsIAbCard);
	 		MypgpCommon.DEBUG_LOG("(ContactManager) Contact first name:"+contact.firstName+"\n");
	 		contacts.push(contact);
	 	}

	 	for(var i=0; i<contacts.length; i++){
	 		
	 		var treeItem = document.createElement("treeitem");
	 		var treeRow = document.createElement("treerow");
	 		var treeCell_username = document.createElement("treecell");
	 		var treeCell_email = document.createElement("treecell");
	 		
	 		treeCell_username.setAttribute("label", contacts[i].displayName);
	 		treeCell_email.setAttribute("label", contacts[i].primaryEmail);

	 		treeRow.appendChild(treeCell_email);
			treeRow.appendChild(treeCell_username);

	 		treeItem.setAttribute("value", contacts[i]);
	 		treeItem.appendChild(treeRow);
	 		treeItem.setAttribute("id", contacts[i].primaryEmail);

	 		input_contactsChildren.appendChild(treeItem);
	 	}
	}catch(e){
		alert(e);
		MypgpCommon.ERROR_LOG("(ContactManager) ERROR: "+e+"\n");
	}
}

function toggleIsChanged(){

	focusedContact.isChanged = !focusedContact.isChanged;

	if(focusedContact_isChanged){
		input_save_button.disabled=false;
		input_cancel_button.disabled=false;
	}else{
		input_save_button.disabled=true;
		input_cancel_button.disabled=true;
	}

	MypgpCommon.DEBUG_LOG("(myPGPContactManager.js : toggleIsChanged)\n");
	
}

function saveChanges(){
	<!-- TODO save changes -->
	toggleIsChanged();

	MypgpCommon.DEBUG_LOG("(myPGPContactManager.js : saveChanges) TODO must be implemented\n");

	focusDetailedContact();
}

function cancelChanges(){
	<!-- TODO rollback changes -->
	toggleIsChanged();

	MypgpCommon.DEBUG_LOG("(myPGPContactManager.js : cancelChanges) TODO must be implemented\n");

	focusDetailedContact();
}

function establishTrust(){

	var params = {trust:false};

	<!--TODO: modificar mensagem de prompt dependendo se está a confiar ou a deixar de confiar -->
	if(input_focusedContact_isTrusted.checked)
		;

	window.openDialog("chrome://mypgp/content/ContactManagementWindow/myPGPEstablishTrustDialog.xul", "",
							"chrome, dialog, modal, resizable=yes", params).focus();

	if(params.trust){
		focusedContact.isTrusted = true;
		input_focusedContact_isTrusted.checked = true;
		toggleIsChanged();
	}else{
		focusedContact.isTrusted = false;
		input_focusedContact_isTrusted.checked = false;
		toggleIsChanged();
	}

	MypgpCommon.DEBUG_LOG("(myPGPContactManager.js : establishTrust) TODO must be implemented\n");
}

function populateFocusedContactKeys(email){
	MypgpCommon.DEBUG_LOG("(myPGPContactManager.js : populateFocusedContactKeys) TODO must be implemented\n");
}

function focusDetailedContact(event){

	if (event.detail != 2) {
    	return;
  	}

  	

  	// do not propagate double clicks
  	event.stopPropagation();
  	var tree = input_contacts;

	var username=tree.view.getCellText(tree.currentIndex, tree.columns.getNamedColumn(treeUsernameColId));
	var email=tree.view.getCellText(tree.currentIndex, tree.columns.getNamedColumn(treeEmailColId));

	input_focusedContact_isTrusted.disabled=false;

	input_focusedContact_username.value=username;
	input_focusedContact_username.disabled=false;

	input_focusedContact_email.value=email;
	input_focusedContact_email.disabled=false;

	focusedContact.focus(username, email);

	<!-- TODO carregar as chaves validas e revogadas conhecidas deste utilizador -->
	populateFocusedContactKeys(email);
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

	file = mypgpWindowManager.openFileBrowsingWindow(window, "Importar Chave", false, null);
	


	if(file != null){
		MypgpCommon.DEBUG_LOG("(myPGPContactManager.js : importKey) "+file.path+"\n");

		var keyItem = document.createElement("treeitem");
 		var keyRow = document.createElement("treerow");
 		var keyCell_Key = document.createElement("treecell");
 		var keyCell_Validity = document.createElement("treecell");
 		
 		keyCell_Key.setAttribute("label", "TODO: key");
 		keyCell_Key.setAttribute("value", file);
 		keyCell_Validity.setAttribute("label", "TODO: key validity");
 		keyCell_Validity.setAttribute("value", file);

		keyRow.appendChild(keyCell_Validity);
 		keyRow.appendChild(keyCell_Key);
		
 		keyItem.setAttribute("value", file);
 		keyItem.setAttribute("id", file.path);
 		keyItem.setAttribute("flex", 1);
 		keyItem.appendChild(keyRow);
 		
 		input_focusedContact_Keys.appendChild(keyItem);

 		MypgpCommon.DEBUG_LOG("(myPGPContactManager.js : importKey) Key added\n");
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

	var params = {cancel:false, save:false};

	if(focusedContact.isChanged){
		window.openDialog("chrome://mypgp/content/ContactManagementWindow/myPGPSaveBeforeExit.xul", "",
								"chrome, dialog, modal, resizable=yes", params).focus();

		if(!params.cancel){
			if(params.save){
				<!--TODO: gravar modificacoes e sair-->
				window.close();
			}else
				window.close();
		}
	}

	window.close();

	MypgpCommon.DEBUG_LOG("(myPGPContactManager.js : exitContactManager) TODO must be implemented\n");
}

function openAbout(){
	mypgpWindowManager.openAbout(window);
	MypgpCommon.DEBUG_LOG("(myPGPContactManager.js : openAbout)\n");
}

function openHelp(){

}