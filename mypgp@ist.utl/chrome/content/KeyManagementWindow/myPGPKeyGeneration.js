Components.utils.import("resource://mypgp/mypgpCommon.jsm");
Components.utils.import("resource://mypgp/mypgpWindowManager.jsm");
Components.utils.import("resource://mypgp/mypgpSecurityManager.jsm");

<!-- Local Vars -->
var infiniteKey = false;
var key_size = 1;
var key_duration = 0;
var key_owner = "";

<!-- Account Manager -->
var acctMgr = Components.classes["@mozilla.org/messenger/account-manager;1"]  
                        .getService(Components.interfaces.nsIMsgAccountManager);  

<!-- Input Components -->
var input_infiniteKey 		= null;
var input_expiration 		= null;
var input_expirationoption 	= null;
var input_keysize 			= null;
var input_accounts 			= null;
var input_create_btn 		= null;


window.addEventListener("load", function(e){

	input_infiniteKey 		= document.getElementById("keygen_infinitekey");
	input_expiration 		= document.getElementById("keygen_expiration");
	input_expirationoption 	= document.getElementById("keygen_exp_opts");
	input_keysize 			= document.getElementById("keygen_keysize_list");
	input_accounts 			= document.getElementById("keygen_accounts");
	input_create_btn		= document.getElementById("keygen_create_btn");

	input_expiration.addEventListener("blur", updateKeyDuration);
	input_expirationoption.addEventListener("select", updateKeyDuration);
	input_keysize.addEventListener("select", updateKeySize);
	input_accounts.addEventListener("select", updateKeyOwner);

	<!-- Populate -->
	var accounts = acctMgr.accounts;  
	MypgpCommon.DEBUG_LOG("(KeyManagement) there are "+accounts.length+" registered accounts");
	for (var i = 0; i < accounts.length; i++) {  
  		var account = accounts.queryElementAt(i, Components.interfaces.nsIMsgAccount);  
  		if(account.defaultIdentity != null){
  			input_accounts.appendItem(account.defaultIdentity.identityName,
  										account.defaultIdentity.email, "");
  			MypgpCommon.DEBUG_LOG("(KeyManagement) Account "+i+" "+account.defaultIdentity.email);
  		}
	}

}, false);


function updateKeyOwner(){
	key_owner = input_accounts.selectedItem.value;

	MypgpCommon.DEBUG_LOG("(KeyManagement) Key owner set to "+key_owner+"\n");
}

function updateKeyDuration(){
	key_duration = input_expiration.value * input_expirationoption.selectedItem.value;
	MypgpCommon.DEBUG_LOG("(KeyManagement) Key set to last "+key_duration+" days\n");
}

function everlastingKey(){
	infiniteKey = input_infiniteKey.checked;
	input_expiration.disabled = infiniteKey;
	input_expirationoption.disabled = infiniteKey;
	

	if(infiniteKey)
		MypgpCommon.DEBUG_LOG("(KeyManagement) Key set to last forever\n");
	else
		MypgpCommon.DEBUG_LOG("(KeyManagement) Key unset to last forever\n");
}

function updateKeySize(){
	key_size = input_keysize.selectedItem.value;
	MypgpCommon.DEBUG_LOG("(KeyManagement) Key size set to "+key_size+" \n");	
}


function generateNewKeyPair(event){

	
	if(key_owner === ""){
		mypgpWindowManager.openAlertPromptDialog("Impossível criar chave", 
			"A chave deve estar asssociada a uma conta para que possa ser criada.");

		MypgpCommon.DEBUG_LOG("(KeyManagement) ... error creating key, exiting\n");
		return;
	}

	if(key_duration <=0 && !infiniteKey){
		mypgpWindowManager.openAlertPromptDialog("Impossível criar chave", 
			"A chave deve ter um tempo de validade positivo ou infinito, para que possa ser criada.");
		MypgpCommon.DEBUG_LOG("(KeyManagement) ... error creating key, exiting\n");
		return;
	}

	input_create_btn.disabled=true;
	
	MypgpSecurityManager.generateKeyPair(key_owner, input_keysize.selectedItem.value);
	//TODO: generate the certiticate
	MypgpSecurityManager.generateCertificate("DUDU", key_owner, "2014", input_keysize.selectedItem.value)
	MypgpSecurityManager.DEBUG_STATE();


	window.close();
}
