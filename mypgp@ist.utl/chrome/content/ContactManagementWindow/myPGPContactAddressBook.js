Components.utils.import("resource://mypgp/mypgpCommon.jsm");
Components.utils.import("resource://mypgp/mypgpFileManager.jsm");
Components.utils.import("resource://mypgp/mypgpWindowManager.jsm");
Components.utils.import("resource://mypgp/mypgpAccountManager.jsm");

<!-- Local Vars -->
var addr_books = [];
var addr_book = null;
var addr_contacts = [];

<!-- Interfaces -->
var nsIAbManager 		= Components.interfaces.nsIAbManager;
var nsIAbDirectory 	= Components.interfaces.nsIAbDirectory;
var nsIAbCard 			= Components.interfaces.nsIAbCard;

<!-- Manager Vars -->
var tAbManager 		= Components.classes["@mozilla.org/abmanager;1"].getService(nsIAbManager);  
var tAllAddressBooks = tAbManager.directories;

<!-- Component Vars -->
var input_contacts = null;
var input_addrbook = null;
var input_contactsChildren = null;
var input_focusedContact_username = null;
var input_focusedContact_email = null;
var input_focusedContact_isTrusted = null;
var input_add_button = null;

<!-- Tree Vars -->
var treeEmailColId = "email_col";
var treeUsernameColId = "username_col";

<!-- -->
var imported_contact = false;

var focusedContact = {
	username: 	null,
	email: 		null,
	pubKeyId:	null,
	isTrusted: 	false,

	focus: function(username, email)
	{
		this.username = username;
		this.email = email;
		this.isTrusted = false;
		this.pubKeyId = null;
	}
}

window.addEventListener("load", function(){

	<!-- Initialize component vars -->
	input_contacts = document.getElementById("cntmng_tree");
	input_contactsChildren = document.getElementById("cntmng_tree_children");
	input_addrbook = document.getElementById("cntmng_addrbook");
	input_add_button = document.getElementById("cntmng_add_btn");
	
	
	<!-- Initialize components event listeners -->
	input_contacts.addEventListener("click", focusDetailedContact);
	input_addrbook.addEventListener("select", populateContactList);

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

function focusDetailedContact(event){

	if (event.detail != 2) {
    	return;
  	}

  	// do not propagate double clicks
  	event.stopPropagation();
  	var tree = input_contacts;

	var username=tree.view.getCellText(tree.currentIndex, tree.columns.getNamedColumn(treeUsernameColId));
	var email=tree.view.getCellText(tree.currentIndex, tree.columns.getNamedColumn(treeEmailColId));

	input_add_button.disabled = false;

	focusedContact.focus(username, email);
}

function addContactToMyPGP()
{
	MypgpAccountManager.addNewContact(
		focusedContact.username,
		focusedContact.email,
		focusedContact.isTrusted,
		focusedContact.pubKeyId);

	imported_contact = true;
}


function exitContactAddressBook()
{
	window.close();
	mypgpWindowManager.openContactManagement(window);
}