Components.utils.import("resource://mypgp/mypgpCommon.jsm");

<!-- Local Vars -->
var addr_books = [];
var addr_book = null;

<!-- Interfaces -->
var nsIAbManager = Components.interfaces.nsIAbManager;
var nsIAbDirectory = Components.interfaces.nsIAbDirectory;
var nsIAbCard = Components.interfaces.nsIAbCard;

<!-- Manager Vars -->
var tAbManager = Components.classes["@mozilla.org/abmanager;1"].getService(nsIAbManager);  
var tAllAddressBooks = tAbManager.directories;

<!-- Component Vars -->
var input_contacts = null;
var input_addrbook = null;

window.addEventListener("load", function(){

	<!-- Initialize component vars -->
	input_contacts = document.getElementById("cntmng_tree");
	input_addrbook = document.getElementById("cntmng_addrbook");

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
	
	var directoryURI = input_addrbook.selectedItem.value;

	try{

	   let searchResult = tAbManager.getDirectory(directoryURI).childCards;

	   if(!searchResult.hasMoreElements()) MypgpCommon.DEBUG_LOG("(ContactManager) ... no contacts in this address book ...");	

	 	while(searchResult.hasMoreElements()){
	 		let contact = searchResult.getNext().QueryInterface(nsIAbCard);
	 		MypgpCommon.DEBUG_LOG("(ContactManager) Contact first name:"+contact.firstName+"\n");
	 		<!-- TODO: começar a adicionar os contactos à tree -->
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

  	alert();

}