Components.utils.import("resource://mypgp/mypgpCommon.jsm");

window.addEventListener("load", function(e){

}, false);


function createNewKeyPair(){
	MypgpCommon.DEBUG_LOG("(KeyManagement) Create new key pair\n");
	alert("TODO: must be implemented");
	window.title="new title";
	window.parent.reload();
}

function importKeysFromFile(){
	MypgpCommon.DEBUG_LOG("(KeyManagement) Import keys from file\n");
	alert("TODO: must be implemented");	
}

function exportKeysToFile(){
	MypgpCommon.DEBUG_LOG("(KeyManagement) Export keys to file\n");
	alert("TODO: must be implemented");	
}