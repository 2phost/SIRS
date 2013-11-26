Components.utils.import("resource://mypgp/mypgpCommon.jsm");


if (! MyPGP) var MyPGP = {};

MyPGP.msg = {
	// Variables List
	originText: null,
	editor: null,
	secureMode: false,

	toggleSecure: function() {		
		this.secureMode = !this.secureMode;
		MypgpCommon.DEBUG_LOG("mypgpMsgComposeOverlay.js: Mypgp.msg.toggleSecure: secureMode="+this.secureMode+"\n");
	},
	
	doButton: function (button) {
		MypgpCommon.DEBUG_LOG("mypgpMsgComposeOverlay.js: Mypgp.msg.doButton: button="+button+"\n");
		switch (button){
			case 'toggleSecure':
				this.toggleSecure();
				break;
		}
	},

	setMenuSettings: function (postfix) {
		MypgpCommon.DEBUG_LOG("mypgpMsgComposeOverlay.js: Mypgp.msg.setMenuSettings: postfix="+postfix+"\n");
		document.getElementById("mypgp_secure_send"+postfix).setAttribute("checked", this.secureMode ? "true": "false");
	},

// flags are declared in base/public/nsIDocumentEncoder.idl
// OutputSelectionOnly = 1,         OutputFormatted = 2, 
// OutputRaw = 4,                   OutputBodyOnly = 8,
// OutputPreformatted = 16,         OutputWrap = 32, 
// OutputFormatFlowed = 64,         OutputAbsoluteLinks = 258, 
// OutputEncodeW3CEntities = 256,   OutputCRLineBreak = 512, 
// OutputLFLineBreak = 1024,        OutputNoScriptContent = 2048, 
// OutputNoFramesContent = 4096,    OutputNoFormattingInPre = 8192, 
// OutputEncodeBasicEntities=16384, OutputEncodeLatin1Entities=32768, 
// OutputEncodeHTMLEntities=65536,  OutputPersistNBSP=131072
	getTextEditor: function (formatType, flag) {
		MypgpCommon.DEBUG_LOG("mypgpMsgComposeOverlay.js: Mypgp.msg.getTextEditor: formatType="+formatType+", flag="+flag+"\n");		
		this.editor.beginningOfDocument();
		var getText = this.editor.outputToString(formatType,flag);
		return getText;
	},
	
	replaceTextEditor: function (text) {
		MypgpCommon.DEBUG_LOG("mypgpMsgComposeOverlay.js: Mypgp.msg.replaceTextEditor: text="+text+"\n");
		this.editor.selectAll();
		this.editor.insertText("MyPGP->"+text);
	},
	
	encryptMsg: function (msgSendType) {
		MypgpCommon.DEBUG_LOG("mypgpMsgComposeOverlay.js: Mypgp.msg.encryptMsg: msgType="+msgSendType+", Mypgp.msg.secureMode="+this.secureMode+"\n");

		// Get plain text
		try {  
    		//var editor_type = GetCurrentEditorType();
			this.originText = this.getTextEditor('text/plain', 4);
			this.replaceTextEditor("Olá Pompeu");
			
			try {
        		var myComponent = Components.classes['@mozilla.org/messengercompose/composesecure;1']
                                   .createInstance(Components.interfaces.IMypgp);
        		alert(myComponent.Add(4,6));
			} catch (anError) {
 	       	dump("ERROR: " + anError);
			}
			//openpgp.init();

			//MypgpCommon.ENCRYPT("LOL"); //TODO APAGAR
			MypgpCommon.DEBUG_LOG("mypgpMsgComposeOverlay.js: Mypgp.encryptMsg: Mypgp.msg.originText="+this.originText+"\n");
		} catch(ex) {  
    		Components.utils.reportError(ex);  
    		return false;  
  		}

		return true;
	},	

	sendMessageListener: function (event) {
		MypgpCommon.DEBUG_LOG("mypgpMsgComposeOverlay.js: Mypgp.msg.sendMessageListener\n");
		var msgcomposeWindow = document.getElementById("msgcomposeWindow");
    	var sendMsgType = msgcomposeWindow.getAttribute("msgtype");

		if (! this.encryptMsg(sendMsgType)) {
     		event.preventDefault();
       	event.stopPropagation();
     	}	
	}

}

//own state listener to get access to the compose window after it is loaded but before editing has started
MyPGP.composeStateListener = {
	
	NotifyComposeFieldsReady: function() {
		// Note: NotifyComposeFieldsReady is only called when a new window is created (i.e. not in case a window object is reused).
   	MypgpCommon.DEBUG_LOG("mypgpMsgComposeOverlay.js: ECSL.NotifyComposeFieldsReady\n");
		try {
      	MyPGP.msg.editor = GetCurrentEditor();
    	} catch (ex) {}

		if (!MyPGP.msg.editor)
      	return;
	},
	
	NotifyComposeBodyReady: function() {

	},	

	ComposeProcessDone: function(aResult) {
		// Note: called after a mail was sent (or saved)
	},

  	SaveInFolderDone: function(folderURI) {
	  	
	}
}

// Listen to message sending event
window.addEventListener('compose-send-message',
  function _mypgp_sendMessageListener (event)
  {
    MyPGP.msg.sendMessageListener(event);
  },
  true);

window.addEventListener('compose-window-init',
  function _mypgp_composeWindowInit (event)
  {
    MypgpCommon.DEBUG_LOG("mypgpMsgComposeOverlay.js: _mypgp_composeWindowInit\n");
    gMsgCompose.RegisterStateListener(MyPGP.composeStateListener);
  },
  true);
