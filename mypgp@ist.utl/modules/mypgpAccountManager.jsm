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
	//KEY_ISTRUSTED + " INTEGER NOT NULL DEFAULT 0," +
	//KEY_PUBKEY_ID + " TEXT UNIQUE, "+
	//KEY_PUBKEY + " TEXT UNIQUE
	")";

const MYPGP_QUERY_ACCOUNTS_TABLE = "SELECT * FROM "+MYPGP_ACCOUNTS_TABLE_NAME+";"

var MypgpAccountManager = {
	
	mDBConn : null,
	contacts: null,

	init : function()
	{
	
		MypgpCommon.DEBUG_LOG("[mypgpAccountManager.jsm - init] Initiating the account manager from local db.");

		let file = FileUtils.getFile("ProfD", [MypgpPreferences.default_folder, MYPGP_BD_NAME]);
		this.mDBConn = Services.storage.openDatabase(file);
		
		this.mDBConn.executeSimpleSQL(MYPGP_CREATE_ACCOUNTS_TABLE);
		
		/*
		var statement = this.mDBConn.createStatement(MYPGP_QUERY_ACCOUNTS_TABLE);
		statement.executeAsync({
			handleResult: function(aResult){
				for (let row = aResultSet.getNextRow(); row; row = aResultSet.getNextRow()) {
					let value = row.getResultByName(KEY_ROWID);			
					MypgpCommon.DEBUG_LOG("[mypgpAccountManager.jsm - init] Value is "+value);
				}
			},
			
			handleError: function(aError){
				MypgpCommon.ERROR_LOG("[mypgpAccountManager.jsm - init] Failed to load MyPGP contact cause, "+aError);
			},

			handleCompletion: function(aReason){
				if (aReason != Components.interfaces.mozIStorageStatementCallback.REASON_FINISHED)
      				MypgpCommon.ERROR_LOG("[mypgpAccountManager.jsm - init] Failed to load MyPGP contact cause, query was aborted or canceled");
			},
		});
		*/

		MypgpCommon.DEBUG_LOG("[mypgpAccountManager.jsm - init] Initiation terminated.");
	},


	test_populate : function()
	{
		
		var test_mail = "rodrigo@test.org";
		var test_isTrusted = "1";

		MypgpCommon.DEBUG_LOG("[mypgpAccountManager.jsm - test_populate] Attemp db insertion with ("+test_mail+", "+test_isTrusted+")");	

		
		var insert_statement = 
			"INSERT INTO "+MYPGP_ACCOUNTS_TABLE_NAME+" ("+KEY_EMAIL+", "+KEY_ISTRUSTED+") VALUES ("+test_mail+", "+ test_isTrusted+")";

		let insert_stmt = this.mDBConn.createStatement("INSERT INTO "+MYPGP_ACCOUNTS_TABLE_NAME+" (email) VALUES (:new_mail)");
		insert_stmt.params.new_mail="test@test.org";
		insert_stmt.executeAsync({
			handleResult: function(aResultSet) {
    			MypgpgCommon.DEBUG_LOG("Insertion successfull "+aResultSet);
    	
  			},

			handleError: function(aError) {
				MypgpgCommon.ERROR_LOG("Error: " + aError.message);
			},

			handleCompletion: function(aReason) {
				if (aReason != Components.interfaces.mozIStorageStatementCallback.REASON_FINISHED)
			  		MypgpCommon.ERROR_LOG("Query canceled or aborted!");
			}	
		});
	},

	test_query : function()
	{

		MypgpCommon.DEBUG_LOG("[mypgpAccountManager.jsm - test_populate] Attemp db query all mails");	

		let query_stmt = this.mDBConn.createStatement("SELECT * FROM "+MYPGP_ACCOUNTS_TABLE_NAME);
		
		
		query_stmt.executeAsync({
			handleResult: function(aResultSet) {
	    		for (let row = aResultSet.getNextRow(); row; row = aResultSet.getNextRow()) {
	      			let value = row.getResultByName(KEY_EMAIL);
					MypgpCommon.DEBUG_LOG("QUERY RESULT: "+value);
				}
  			},

			handleError: function(aError) {
				MypgpgCommon.ERROR_LOG("Error: " + aError.message);
			},

			handleCompletion: function(aReason) {
				if (aReason != Components.interfaces.mozIStorageStatementCallback.REASON_FINISHED)
			  		MypgpCommon.ERROR_LOG("Query canceled or aborted!");
			}	
		});	
	},

	terminate : function()
	{
		this.mDBConn.asynClose();
	},

	/* DEBUGGING */
	DEBUG_STATE : function(){
		var debug_str = "";
		MypgpCommon.DEBUG_LOG("[mypgpAccountManager - DEBUG]\n"+debug_str);
	}
};
