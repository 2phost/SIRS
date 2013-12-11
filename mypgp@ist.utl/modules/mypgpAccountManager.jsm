Components.utils.import("resource://gre/modules/Services.jsm");
Components.utils.import("resource://gre/modules/FileUtils.jsm");

Components.utils.import("resource://mypgp/mypgpCommon.jsm");
Components.utils.import("resource://mypgp/mypgpPreferences.jsm");

var EXPORTED_SYMBOLS = [ "MypgpAccountManager" ];


/* Storage API values */
const MYPGP_BD_NAME = "mypgp_accounts.sqlite";

const MYPGP_ACCOUNTS_TABLE_NAME = "MYPGP_ACCOUNTS";
const KEY_ROWID 	= "identifier";
const KEY_EMAIL 	= "email";
const KEY_ISTRUSTED = "isTrusted";
const KEY_PUBKEY_ID = "pubKeyId";
const KEY_PUBKEY 	= "pubkey";

const MYPGP_CREATE_ACCOUNTS_TABLE = 
	"CREATE TABLE IF NOT EXISTS "+MYPGP_ACCOUNTS_TABLE_NAME+" "+
	"( "+ KEY_ROWID +" INTEGER PRIMARY KEY AUTOINCREMENT"+
	", "+ KEY_EMAIL + " TEXT NOT NULL UNIQUE"+
	", "+ KEY_ISTRUSTED + " INTEGER NOT NULL DEFAULT 0" +
	", "+ KEY_PUBKEY_ID + " TEXT UNIQUE"+
	//KEY_PUBKEY + " TEXT UNIQUE
	")";

const MYPGP_QUERY_ACCOUNTS_TABLE = "SELECT * FROM "+MYPGP_ACCOUNTS_TABLE_NAME+";"

var MypgpAccountManager = {
	
	mDBConn : null,
	mContacts: null,
	mInitiated: false,

	init : function()
	{
	
		MypgpCommon.DEBUG_LOG("[mypgpAccountManager.jsm - init] Initiating the account manager from local db.");

		let file = FileUtils.getFile("ProfD", [MypgpPreferences.default_folder, MYPGP_BD_NAME]);
		this.mInitiated = !this.mInitiated; 
		this.mContacts = new Array();
		this.mDBConn = Services.storage.openDatabase(file);
		this.mDBConn.executeSimpleSQL(MYPGP_CREATE_ACCOUNTS_TABLE);
		
		let population_stmt = this.mDBConn.createStatement("SELECT * FROM "+MYPGP_ACCOUNTS_TABLE_NAME);
			
		population_stmt.executeAsync({
			handleResult: function(aResultSet) {
	    		for (let row = aResultSet.getNextRow(); row; row = aResultSet.getNextRow()) {
	      			let value = 
	      				{ email: 		row.getResultByName(KEY_EMAIL),
	      				  isTrusted: 	row.getResultByName(KEY_ISTRUSTED) == 0 ? false : true,
	      				  pubKeyId: 	row.getResultByName(KEY_PUBKEY_ID)};

	      			MypgpAccountManager.mContacts.push(value);
				}	
  			},

			handleError: function(aError) {
				MypgpCommon.ERROR_LOG("Error: " + aError.message);
			},

			handleCompletion: function(aReason) {
				if (aReason != Components.interfaces.mozIStorageStatementCallback.REASON_FINISHED)
			  		MypgpCommon.ERROR_LOG("Query canceled or aborted!");
			}
		});


		MypgpCommon.DEBUG_LOG("[mypgpAccountManager.jsm - init] Initiation terminated.");
	},

	//TODO: test new function
	addNewContact : function(email, isTrusted, pubKeyId){
	
		MypgpCommon.DEBUG_LOG("[mypgpAccountManager.jsm - addNewContact]\n"+
			"Attemp db insertion with ("+email+", "+isTrusted+", "+pubKeyId+")");


		for(var i=0; i < this.mContacts.length; i++){
			if(this.mContacts[i].email == email){
				MypgpCommon.ERROR_LOG("[mypgpAccountManager.jsm - addNewContact] Contact with email "+email+" already registered\n");
				return 0;
			}
			if(this.mContacts[i].pubKeyId == pubKeyId){
				MypgpCommon.ERROR_LOG("[mypgpAccountManager.jsm - addNewContact] Contact with email "
					+this.mContacts[i].email+" is already associated with a key "+pubKeyId+"\n");
				return 0;
			}
		}

		let add_header_sql = "INSERT INTO "+MYPGP_ACCOUNTS_TABLE_NAME+ "("+KEY_EMAIL+","+KEY_ISTRUSTED+", "+KEY_PUBKEY_ID+")";
		let add_body_sql = " VALUES (:new_email, :new_isTrusted, :new_pubkey_id)";	
		let add_stmt = this.mDBConn.createStatement(add_header_sql+add_body_sql);

		add_stmt.params.new_email = email;
		add_stmt.params.new_isTrusted = isTrusted ? 1 : 0;
		add_stmt.params.new_pubkey_id = pubKeyId;

		add_stmt.executeAsync({
			handleResult: function(aResultSet) { },

			handleError: function(aError) {
				MypgpCommon.ERROR_LOG("Error: " + aError.message);
			},

			handleCompletion: function(aReason) {
				if (aReason != Components.interfaces.mozIStorageStatementCallback.REASON_FINISHED)
			  		MypgpCommon.ERROR_LOG("[mypgpAccountManager - addNewContact] Insertion canceled or aborted!");
			  	else{
			  		MypgpCommon.DEBUG_LOG("[mypgpAccountManager - addNewContact] Insertion of "+email+" successfull!");
			  		let new_contact = {
			  			email: 		email,
			  			isTrusted: 	isTrusted,
			  			pubKeyId: 	pubKeyId
			  		};

			  		MypgpAccountManager.mContacts.push(new_contact);
			  	}
			}	
		});

	},

	terminate : function()
	{
		this.mDBConn.asynClose();
	},

	/* DEBUGGING */
	DEBUG_STATE : function(){
		var debug_str;

		if(this.mInitiated){

			debug_str = "MyPGP Contacts <"+this.mContacts.length+">\n";

			for(var i=0; i < this.mContacts.length; i++){
				debug_str = debug_str + i+": ("+
					this.mContacts[i].email+
					", "+this.mContacts[i].isTrusted+
					", "+this.mContacts[i].pubKeyId+");\n";
			}	

			MypgpCommon.DEBUG_LOG("[mypgpAccountManager - DEBUG]\n"+debug_str);
		}else
			MypgpCommon.ERROR_LOG("[mypgpAccountManager - DEBUG] The manager was never initiated.");
	}
};
