window.addEventListener("load", function(e){

	var toolbar = document.getElementById("mail-bar3");	
	toolbar.insertBefore(document.getElementById("mypgp_decypher_btn"), document.getElementById("button-tag"));
	
}, false);


function openAbout(){
	window.openDialog("chrome://mypgp/content/mypgpAbout.xul",
					"&mypgp.label.about;",
					null);
}


function openPreferences(){
	window.openDialog("chrome://mypgp/content/PreferencesWindow/myPGPmanagement.xul",
					"&mypgp.label.preferences;",
					null);
}

function descipher(){
	alert("TODO: must be implemented!");
}

function openKeyManagementWindow(){
	window.openDialog("chrome://mypgp/content/KeyManagementWindow/myPGPKeyManagement.xul",
					"&mypgp.label.key_mng;",
					null);
}