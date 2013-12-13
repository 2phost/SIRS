Components.utils.import("resource://mypgp/mypgpCommon.jsm");
Components.utils.import("resource://mypgp/mypgpSecurityManager.jsm");
Components.utils.import("resource://mypgp/mypgpFileManager.jsm");

const IO_SERVICE_CONTRACT	= "@mozilla.org/network/io-service;1";
const ATTACHMENT_CONTRACT	= "@mozilla.org/messengercompose/attachment;1";

const nsIIOService			= Components.interfaces.nsIIOService;
const nsIMsgAttachment		= Components.interfaces.nsIMsgAttachment;

const tbIOService 			= Components.classes[IO_SERVICE_CONTRACT].getService(nsIIOService);

const tbAccountManager 		= Components.classes["@mozilla.org/messenger/account-manager;1"]
                        		.getService(Components.interfaces.nsIMsgAccountManager);

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
			
			this.originText = this.getTextEditor('text/plain', 4);
				
			
			try {
				var mypgpSvc = MypgpCommon.getService();
				alert(mypgpSvc.add(4,4));
			} catch (anError) {
 	       	dump("ERROR: " + anError);
			}

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

    	// do not continue unless this is an actual send event  
  		if( !(sendMsgType == nsIMsgCompDeliverMode.Now || sendMsgType == nsIMsgCompDeliverMode.Later) )  
    		return;  

    	if(this.secureMode){
			// alter subject  
			// you should save changes to both message composition fields and subject widget  
			let original_subject = gMsgCompose.compFields.subject;
			gMsgCompose.compFields.subject = "Esta mensagem foi cifrada por MyPGP@ist"; //TODO : escolher melhor subj  
			document.getElementById("msgSubject").value = gMsgCompose.compFields.subject;  


			var plaintext;
			 
			try {  
				var editor = GetCurrentEditor();  
				var editor_type = GetCurrentEditorType();  
				
				editor.beginTransaction();  
				editor.beginningOfDocument(); // seek to beginning  
				
				if( editor_type == "textmail" || editor_type == "text" ) {  
					editor.insertText("Assunto: "+original_subject);
					editor.insertLineBreak();
					plaintext = editor.outputToString("text/plain", 4);  	  
				} else {  
					editor.insertHTML("<p>Assunto: "+original_subject+"</p><br>");
					plaintext = editor.outputToString("text/html", 2);
				}

				editor.selectAll();
				editor.deleteSelection(editor.eNext, editor.eStrip);

				editor.endTransaction();  

			} catch(ex) { 
				MypgpCommon.ERROR_LOG("[mypgpMsgComposerOverlay - ()] ERROR:"+ex);
				Components.utils.reportError(ex);  
				return false;  
			} 

			let from = getCurrentIdentity().email;
			let attachmentFile = MypgpSecurityManager.cipherTextToFile(from, plaintext);

			if(attachmentFile != null){

				MypgpCommon.DEBUG_LOG("[mypgpMsgComposeOverlay - ()] Ciphered Attachment created at "+attachmentFile.path);
				try{
					var tmpFileURI = tbIOService.newFileURI(attachmentFile);
					var att = Components.classes[ATTACHMENT_CONTRACT].createInstance(nsIMsgAttachment);
					att.url = tmpFileURI.spec;
					att.name= attachmentFile.leafName;
					att.temporary = true;
					att.contentType = "application/pgp-keys";

					gMsgCompose.compFields.addAttachment(att);

					toggleSecure();

					MypgpCommon.DEBUG_LOG("[mypgpMsgComposeOverlay - ()]\n"+
						attachmentFile.leafName+" attached to the message.");
				}catch(error){
					MypgpCommon.ERROR_LOG("[mypgpMsgComposeOverlay - ()] ERROR: "+error);
				}
			}
		}else
			MypgpCommon.DEBUG_LOG("[mypgpMsgComposeOverlay - ()]\n"+
						"Sending regular mail.");
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
