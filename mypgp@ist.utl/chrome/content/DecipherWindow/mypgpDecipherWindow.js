Components.utils.import("resource://mypgp/mypgpCommon.jsm");
Components.utils.import("resource://mypgp/mypgpWindowManager.jsm");
Components.utils.import("resource://mypgp/mypgpSecurityManager.jsm");

var cipherFile = null;
var key_deciphering_key = null;

var deciphered_email = null;
var input_ciphered_email = null;
var input_kdk = null;

window.addEventListener("load", function(e){

	MypgpCommon.DEBUG_LOG("[mypgpDecipherWindow] Window loaded\n");
	
	deciphered_email = document.getElementById("deciphered_email");
	input_ciphered_email = document.getElementById("ciphered_email");
	input_kdk = document.getElementById("kdk");

}, false);


function importCipherFile(){
	cipherFile = mypgpWindowManager.openFileBrowsingWindow(window, "Importar email cifrado", null, "Email Cifrado", false, null);
	input_ciphered_email.value = cipherFile.leafName;	
}

function importKdk(){
	key_deciphering_key = mypgpWindowManager.openFileBrowsingWindow(window, "Importar Chave de decifragem da chave de sessão", ".key", "Chave", false, null);
	MypgpCommon.DEBUG_LOG(key_deciphering_key.path);
	input_kdk.value = key_deciphering_key.leafName;
}

function decipherEmail(){
	MypgpSecurityManager.DEBUG_STATE();
	if(cipherFile != null && key_deciphering_key!=null){
		var plaintext = MypgpSecurityManager.decipherFileToText(cipherFile, key_deciphering_key, 128);
		deciphered_email.value = plaintext;
	}else
		MypgpCommon.ERROR_LOG("[mypgpDecipherWindow.js - decipherMail] Cannot find the textbox.");
}