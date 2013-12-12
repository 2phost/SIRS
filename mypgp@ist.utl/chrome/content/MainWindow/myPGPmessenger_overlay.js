Components.utils.import("resource://mypgp/mypgpCommon.jsm");
Components.utils.import("resource://mypgp/mypgpWindowManager.jsm");
Components.utils.import("resource://mypgp/mypgpAccountManager.jsm");
Components.utils.import("resource://mypgp/mypgpFileManager.jsm");
Components.utils.import("resource://mypgp/mypgpSecurityManager.jsm");

window.addEventListener("load", function(e){
	
	MypgpAccountManager.init();
	MypgpSecurityManager.init();
	mypgpFileManager.init();
	
}, false);

window.addEventListener("unload", function(e){

	MypgpAccountManager.terminate();

}, false);

function openAbout(){
	mypgpWindowManager.openAbout(window);


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