Components.utils.import("resource://mypgp/mypgpCommon.jsm");
Components.utils.import("resource://mypgp/mypgpWindowManager.jsm");
Components.utils.import("resource://mypgp/mypgpSecurityManager.jsm");

var cipherFile = null;

var deciphered_email = null;

window.addEventListener("load", function(e){

	MypgpCommon.DEBUG_LOG("[mypgpDecipherWindow] Window loaded\n");
	
	deciphered_email = document.getElementById("deciphered_email");
}, false);


function importCipherFile(){
	cipherFile = mypgpWindowManager.openFileBrowsingWindow(window, "Importar email cifrado", null, "Email Cifrado", false, null);
}

function decipherEmail(){
	MypgpSecurityManager.DEBUG_STATE();
	var plaintext = MypgpSecurityManager.decipherFileToText(cipherFile, MypgpSecurityManager.defaultSecureAccount.privKeyFile, 128);
	
	if(deciphered_email !=null)
		deciphered_email.value = plaintext;
	else
		MypgpCommon.ERROR_LOG("[mypgpDecipherWindow.js - decipherMail] Cannot find the textbox.");
}