Components.utils.import("resource://mypgp/mypgpCommon.jsm");
Components.utils.import("resource://mypgp/mypgpWindowManager.jsm");
Components.utils.import("resource://mypgp/mypgpAccountManager.jsm");

window.addEventListener("load", function(e){
	
	MypgpAccountManager.init();

}, false);

window.addEventListener("unload", function(e){

	MypgpAccountManager.terminate();

}, false);

function openAbout(){
	mypgpWindowManager.openAbout(window);

	//TODO: remove
	MypgpAccountManager.deleteExistingContact("test2@test.org");
}


function openPreferences(){
	mypgpWindowManager.openPreferences(window);
}

function descipher(){
	alert("TODO: must be implemented!");
}

function openKeyManagementWindow(){
	mypgpWindowManager.openKeyManagement(window);
}

function openContactManagementWindow(){
	mypgpWindowManager.openContactManagement(window);
}