Components.utils.import("resource://mypgp/mypgpCommon.jsm");
Components.utils.import("resource://mypgp/mypgpWindowManager.jsm");

<!-- Local Vars -->
var current_tab = 1;
var selected_key = null;


window.addEventListener("load", function(e){

	MypgpCommon.DEBUG_LOG("(KeyManagement) Starting key management window\n");

}, false);



function openKeyGeneratorWindow(){
	var key_pair = mypgpWindowManager.openKeyGen(window)
	MypgpCommon.DEBUG_LOG("(KeyManagement) Opening key generation window\n");
}

function importKeysFromFile(){
	var file = mypgpWindowManager.openFileBrowsingWindow(window, "Importar Par de Chaves", false);
	MypgpCommon.DEBUG_LOG("(KeyManagement) Initiating key file import... [TODO]\n");
}

function exportKeysToFile(){
	var file = mypgpWindowManager.openFileBrowsingWindow(window, "Exportar Par de Chaves", true);
	
	/*TODO: Passar a chave para o mypgpFileManager */
	if(file != null){
		mypgpFileManager.writeKeyAsFile(file, null, "TODO: must pass the key");
		MypgpCommon.DEBUG_LOG("(myPGPContactManager.js : importKey) "+file.path+"\n");
	}
}