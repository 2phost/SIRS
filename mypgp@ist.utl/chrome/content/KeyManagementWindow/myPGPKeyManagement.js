Components.utils.import("resource://mypgp/mypgpCommon.jsm");


<!-- Local Vars -->
var infiniteKey = false;
var key_size = 1024;
var key_duration = 0;
var key_owner = "";

<!-- Account Manager -->
var acctMgr = Components.classes["@mozilla.org/messenger/account-manager;1"]  
                        .getService(Components.interfaces.nsIMsgAccountManager);  

<!-- Input Components -->
var input_infiniteKey = null;
var input_expiration = null;
var input_expirationoption = null;
var input_keysize = null;
var input_accounts = null;
var warning = null;

window.addEventListener("load", function(e){
	input_infiniteKey = document.getElementById("keymng_infinitekey");
	input_expiration = document.getElementById("keymng_expiration");
	input_expirationoption = document.getElementById("keymng_exp_opts");
	input_keysize = document.getElementById("keymng_keysize_list");
	input_accounts = document.getElementById("keymng_accounts");

	input_expiration.addEventListener("blur", updateKeyDuration);
	input_expirationoption.addEventListener("select", updateKeyDuration);
	input_keysize.addEventListener("select", updateKeySize);
	input_accounts.addEventListener("select", updateKeyOwner);

	warning = document.getElementById("warn_lbl");

	<!-- Populate -->
	var accounts = acctMgr.accounts;  
	MypgpCommon.DEBUG_LOG("(KeyManagement) there are "+accounts.length+" registered accounts");
	for (var i = 0; i < accounts.length; i++) {  
  		var account = accounts.queryElementAt(i, Components.interfaces.nsIMsgAccount);  
  		if(account.defaultIdentity != null){
  			input_accounts.appendItem(account.defaultIdentity.fullName,
  										account.defaultIdentity.email, "");
  			MypgpCommon.DEBUG_LOG("(KeyManagement) Account "+i+" "+account.defaultIdentity.email);
  		}
	}

}, false);


function updateKeyOwner(){
	warning.value="";
	key_owner = input_accounts.selectedItem.value;

	MypgpCommon.DEBUG_LOG("(KeyManagement) Key owner set to "+key_owner+"\n");
}

function updateKeyDuration(){
	warning.value="";
	key_duration = input_expiration.value * input_expirationoption.selectedItem.value;
	MypgpCommon.DEBUG_LOG("(KeyManagement) Key set to last "+key_duration+" days\n");
}

function everlastingKey(){
	warning.value="";
	infiniteKey = input_infiniteKey.checked;
	input_expiration.disabled = infiniteKey;
	input_expirationoption.disabled = infiniteKey;
	

	if(infiniteKey)
		MypgpCommon.DEBUG_LOG("(KeyManagement) Key set to last forever\n");
	else
		MypgpCommon.DEBUG_LOG("(KeyManagement) Key unset to last forever\n");
}

function updateKeySize(){
	warning.value="";	
	key_size = input_keysize.selectedItem.value;
	MypgpCommon.DEBUG_LOG("(KeyManagement) Key size set to "+key_size+" \n");	
}


function createNewKeyPair(){

	if(key_duration <=0 && !infiniteKey){
		warning.value= "Impossível criar a chave, esta deve ter uma duração associada ou deve ter duração infinita." <!-- TODO: devia estar a ir buscar o valor ao locale-->
		MypgpCommon.DEBUG_LOG("(KeyManagement) ... error creating key, exiting\n");
		return;
	}

	if(key_owner === ""){
		warning.value = "Impossível criar a chave, esta deve estar associada a uma conta."
		MypgpCommon.DEBUG_LOG("(KeyManagement) ... error creating key, exiting\n");
		return;
	}

	MypgpCommon.DEBUG_LOG("(KeyManagement) Creating key["+key_size+"] for "+key_owner+"\n");

}

function importKeysFromFile(){
	MypgpCommon.DEBUG_LOG("(KeyManagement) Import keys from file\n");
	alert("TODO: must be implemented");	
}

function exportKeysToFile(){
	MypgpCommon.DEBUG_LOG("(KeyManagement) Export keys to file\n");
	alert("TODO: must be implemented");	
}