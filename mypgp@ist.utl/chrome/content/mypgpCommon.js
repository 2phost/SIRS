Components.utils.import("resource://mypgp/mypgpCommon.jsm");

// Initializes pgpsirsCommon
function PGPInitCommon(id) {
   DEBUG_LOG("mypgpCommon.js: PGPInitCommon: id="+id+"\n");

	//gEnigPromptSvc = enigGetService("@mozilla.org/embedcomp/prompt-service;1", "nsIPromptService");
}


///////////////////////////////////////////////////////////////////////////////

function DEBUG_LOG(str) {
  MypgpCommon.DEBUG_LOG(str);
}
