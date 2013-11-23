window.addEventListener("load", function(e){

	var toolbar = document.getElementById("mail-bar3");	
	toolbar.insertBefore(document.getElementById("mypgp_decypher_btn"), document.getElementById("button-tag"));
	
}, false);


function openAbout(){
	window.openDialog("chrome://mypgp/content/mypgpAbout.xul", "About MyPGP", null);
}


function openPreferences(){
	window.openDialog("chrome://mypgp/content/PreferencesWindow/myPGPmanagement.xul", "Preferences", null);
}

function descipher(){
	alert("TODO: must be implemented!");
}