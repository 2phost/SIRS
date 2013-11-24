Components.utils.import("resource://mypgp/mypgpCommon.jsm");


<!-- Local Vars -->

<!-- Manager Components -->
var nsIFilePicker = null;
var file_browser = null;

<!-- Input Components -->


window.addEventListener("load", function(e){

	MypgpCommon.DEBUG_LOG("(KeyManagement) Starting key management window\n");
	
	nsIFilePicker = Components.interfaces.nsIFilePicker;
	file_browser = Components.classes["@mozilla.org/filepicker;1"].createInstance(nsIFilePicker);
	<!-- TODO: fazer file_browser.appendFilter -->

}, false);



function openKeyGeneratorWindow(){

	window.openDialog("chrome://mypgp/content/KeyManagementWindow/myPGPKeyGeneration.xul",
					"&mypgp.keymng.keygen;",
					null);
	MypgpCommon.DEBUG_LOG("(KeyManagement) Opening key generation window\n");
}

function importKeysFromFile(){

	MypgpCommon.DEBUG_LOG("(KeyManagement) Initiating key file import... [TODO]\n");

	file_browser.init(window, "Importar Par de Chaves", nsIFilePicker.modeOpen); <!-- TODO: obter o nome da janela no locale -->

	var result = file_browser.show();

	if(result != nsIFilePicker.resultCancel){
		MypgpCommon.DEBUG_LOG("(KeyManagement) ... importing file ... [TODO]\n");		
	}else
		MypgpCommon.DEBUG_LOG("(KeyManagement) ... canceling import\n");
}

function exportKeysToFile(){

	MypgpCommon.DEBUG_LOG("(KeyManagement) Export keys to file\n");
	file_browser.init(window, "Exportar Par de Chaves", nsIFilePicker.modeSave); <!-- TODO: obter o nome da janela no locale -->

	var result = file_browser.show();

	if(result != nsIFilePicker.resultCancel){
		MypgpCommon.DEBUG_LOG("(KeyManagement) ... exporting to file ... [TODO]\n");
	}else
		MypgpCommon.DEBUG_LOG("(KeyManagement) ... canceling keys export.\n");

}