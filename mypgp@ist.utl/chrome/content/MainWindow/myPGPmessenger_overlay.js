Components.utils.import("resource://mypgp/mypgpCommon.jsm");
Components.utils.import("resource://mypgp/mypgpWindowManager.jsm");

window.addEventListener("load", function(e){

	var toolbar = document.getElementById("mail-bar3");	
	toolbar.insertBefore(document.getElementById("mypgp_decypher_btn"), document.getElementById("button-tag"));
	
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