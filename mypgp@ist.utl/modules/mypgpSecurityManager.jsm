Components.utils.import("resource://gre/modules/FileUtils.jsm");
Components.utils.import("resource://mypgp/mypgpCommon.jsm");

var EXPORTED_SYMBOLS = [ "MypgpSecurityManager" ];

/* MyPGP Components */
const MYPGP_SECURE_CONTRACT		= "@mozilla.org/messengercompose/composesecure;1";

const IMypgp					= Components.interfaces.IMypgp;

const mypgpSecure 				= Components.classes[MYPGP_SECURE_CONTRACT].createInstance(IMypgp);

/* Thunderbird Components */
const ACCOUNT_MANAGER_CONTRACT	= "@mozilla.org/messenger/account-manager;1";

const nsIMsgAccountManager		= Components.interfaces.nsIMsgAccountManager;
const nsIMsgAccount 			= Components.interfaces.nsIMsgAccount;
const nsIMsgIdentity			= Components.interfaces.nsIMsgIdentity;

const tbAccountManagerSvc		= Components.classes[ACCOUNT_MANAGER_CONTRACT].getService(nsIMsgAccountManager);

var MypgpSecurityManager = {

	defaultSecureAccount : null,
	otherSecureAccounts : null,

	init : function(){

		let accounts = tbAccountManagerSvc.accounts;

		var account = tbAccountManagerSvc.defaultAccount.QueryInterface(nsIMsgAccount);

		let mPub = FileUtils.getFile("Home", ["myPGP", "myKeys", "pub_"+account.defaultIdentity.email+".key"]);
		let mPriv = FileUtils.getFile("Home", ["myPGP", "myKeys", "priv_"+account.defaultIdentity.email+".key"]);

		this.defaultSecureAccount = {
			name: 			account.defaultIdentity.identityName,
			email: 			account.defaultIdentity.email,
			pubKeyFile: 	mPub.exists() ? mPub : null,
			privKeyFile: 	mPriv.exists() ? mPriv : null,
			cert: 			null //TODO: load certificate file
		};
	
		this.otherSecureAccounts = new Array();

		if (accounts.queryElementAt) { // Gecko 17+
		
			for (var i = 0; i < accounts.length; i++) {
				account = accounts.queryElementAt(i, Components.interfaces.nsIMsgAccount);
				
				if(account.defaultIdentity != null && account.defaultIdentity.email != this.defaultSecureAccount.email){

					let mPub = FileUtils.getFile("Home", ["myPGP", "myKeys", "pub_"+account.defaultIdentity.email+".key"]);
					let mPriv = FileUtils.getFile("Home", ["myPGP", "myKeys", "priv_"+account.defaultIdentity.email+".key"]);

					let nAcc = {
						name: 			account.defaultIdentity.identityName,
						email: 			account.defaultIdentity.email,
						pubKeyFile: 	mPub.exists() ? mPub : null,
						privKeyFile: 	mPriv.exists() ? mPriv : null,
						cert: 			null //TODO: load certificate file
					};			

					this.otherSecureAccounts.push(nAcc);
				}
			}
		} else { // Gecko < 17
		
			for (var i = 0; i < accounts.Count(); i++) {
				account = accounts.QueryElementAt(i, Components.interfaces.nsIMsgAccount);
				
				if(account.defaultIdentity != null && account.defaultIdentity.email != this.defaultSecureAccount.email){
					let nAcc = {
						name: 			account.defaultIdentity.identityName,
						email: 			account.defaultIdentity.email,
						pubKeyFile: 	null, //TODO: load public key file
						privKeyFile: 	null, //TODO: load private key file
						cert: 			null //TODO: load certificate file
					};			

					this.otherSecureAccounts.push(nAcc);
				}
			}
		}

		MypgpCommon.DEBUG_LOG("[mypgpSecurityManager - init] Security Manager has been initiated.");

	},

	generateKeyPair : function(email, keySize)
	{
		//TODO: caminho deve ser constuido nas preferencias

		let mPubKey = FileUtils.getFile("Home", ["myPGP", "myKeys", "pub_"+email+".key"]);
		let mPrivKey = FileUtils.getFile("Home", ["myPGP", "myKeys", "priv_"+email+".key"]);

		mypgpSecure.keygen(keySize, mPubKey.path, mPrivKey.path);

		MypgpCommon.DEBUG_LOG("[mypgpSecurityManager - generateKeyPair]\n"+
			"Created new key pair for user <"+email+"> "+
			"with size "+keySize);

		//TODO genererate certificate

		if(email == this.defaultSecureAccount.email){
			this.defaultSecureAccount.pubKeyFile = mPubKey;
			this.defaultSecureAccount.privKeyFile = mPrivKey;
			//TODO assign certificate
		}else{

			for(var i = 0; i < this.otherSecureAccounts.length; i++)
				if(this.otherSecureAccounts[i].email == email){
					this.otherSecureAccounts[i].pubKeyFile = mPubKey;
					this.otherSecureAccounts[i].privKeyFile = mPrivKey;
					//TODO assign certificate
				}
		}
	},

	generateCertificate : function(name, email, validaty, size)
	{
	
	},

	cipherTextToFile : function(email, plaintext)
	{
		let tempCipherText = FileUtils.getFile("Home", ["myPGP","tmp", "cipher_"+email+".out"]);

		if(email == this.defaultSecureAccount.email && this.defaultSecureAccount.pubKeyFile != null){

			mypgpSecure.secureMsg(plaintext, tempCipherText.path, this.defaultSecureAccount.pubKeyFile.path);
			
			MypgpCommon.DEBUG_LOG("Cipher Text Path:"+tempCipherText.path);
			MypgpCommon.DEBUG_LOG("Pub Key Path:"+this.defaultSecureAccount.pubKeyFile.path);

			return tempCipherText;

		}else{
			MypgpCommon.ERROR_LOG("SO FUNCIONA PARA CONTA DEFAULT");
			return null;
		}
	},

	terminate : function ()
	{

	},


	DEBUG_STATE : function ()
	{
		
		let defAcc = this.defaultSecureAccount;
		let otAccs = this.otherSecureAccounts;

		debug_str = "[mypgpSecurityManager - DEBUG]\n"+
			" - Default Account:\n"+
			"\nName:\t\t"+(defAcc.name ? defAcc.name : "NA")+
			"\nEmail:\t\t"+defAcc.email+
			"\nPubKeyFile:\t"+(defAcc.pubKeyFile ? defAcc.pubKeyFile.leafName : "NA")+
			"\nPrivKeyFile:\t"+(defAcc.privKeyFile ? defAcc.privKeyFile.leafName : "NA")+
			"\nCert:\t\t"+(defAcc.cert ? defAcc.cert.leafName : "NA")+"\n\n"+
			"--- Other Secure Accounts <"+otAccs.length+">---\n";

		for(var i=0; i < otAccs.length; i++)
			debug_str = debug_str +
				"\nAccount<"+i+">"+
				"\nName:\t\t"+(otAccs[i].name ? otAccs[i].name : "NA")+
				"\nEmail:\t\t"+otAccs[i].email+
				"\nPubKeyFile:\t"+(otAccs[i].pubKeyFile ? otAccs[i].pubKeyFile.leafName : "NA")+
				"\nPrivKeyFile:\t"+(otAccs[i].privKeyFile ? otAccs[i].privKeyFile.leafName : "NA")+
				"\nCert:\t\t"+(otAccs[i].cert ? otAccs[i].cert.leafName : "NA");

		MypgpCommon.DEBUG_LOG(debug_str);

		
	}

};
