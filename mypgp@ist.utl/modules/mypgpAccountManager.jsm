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
	"( "+ KEY_ROWID +" INTEGER PRIMARY KEY AUTOINCREMENT, "+
	KEY_EMAIL + " TEXT NOT NULL UNIQUE, "+
	KEY_ISTRUSTED + " INTEGER NOT NULL DEFAULT 0," +
	KEY_PUBKEY_ID + " TEXT UNIQUE, "+
	KEY_PUBKEY + " TEXT UNIQUE)";

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

		MypgpCommon.DEBUG_LOG("[mypgpAccountManager.jsm - init] Initiation terminated.");
	},

	create_insert_statement: function(email, isTrusted, pubKeyId, pubKey){
		return "TODO";
	},

	test_populate : function()
	{
		
	},

	test_query : function()
	{

	},

	close : function()
	{

	}
};