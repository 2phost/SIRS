function exitWithSave(){
	window.arguments[0].save = true;
	return true;
}

function exitWithoutSave(){
	document.getElementById("myPGPSaveBeforeExit.xul").acceptDialog();
	return true;
}

function justExit(){
	window.arguments[0].cancel = true;
	return true;
}