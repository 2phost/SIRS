#include "Mypgp.h"
#include <cstdlib>

static NS_DEFINE_CID(kMsgComposeSecureCID, MYPGP_CID);


NS_IMPL_ISUPPORTS1(Mypgp, IMypgp)

Mypgp::Mypgp()
{
  /* member initializers and constructor code */
}

Mypgp::~Mypgp()
{
  /* destructor code */
}

/* void secureMsg (in string plaintext, in string cypherPath, in string keyPath); */
NS_IMETHODIMP Mypgp::SecureMsg(const char * plaintext, const char * cypherPath, const char * keyPath)
{
  int i, j;
  /**********************
		Generate KeySession
  **********************/
  int sessionKeySize = CryptoPP::CIPHER::DEFAULT_KEYLENGTH + CryptoPP::CIPHER::BLOCKSIZE;
  char * keySession;
  SessionKeygen(CryptoPP::CIPHER::DEFAULT_KEYLENGTH, CryptoPP::CIPHER::BLOCKSIZE, &keySession);
	
  /**********************
		Encrypt Plaintext with Ks
  **********************/
  char * cypherText;
  Encrypt(plaintext, keySession, CryptoPP::CIPHER::DEFAULT_KEYLENGTH, CryptoPP::CIPHER::BLOCKSIZE, &cypherText);
	
  /**********************
		Encrypt Ks with Kp sender's
  **********************/
  int encryptSessionSize;
  char * encryptSession;
  EncryptSession(keySession, sessionKeySize, keyPath, &encryptSession, &encryptSessionSize);

  /**********************
		Save to file

	**********************/
	
	int outfileSize = strlen(plaintext) + encryptSessionSize;
	char * outfileData = (char *)malloc(sizeof(unsigned char) * outfileSize);

	
  for(i=0; i<encryptSessionSize; i++){
	outfileData[i] = encryptSession[i];
  }
	

  for(i=0, j=encryptSessionSize; i<strlen(plaintext); i++, j++){
	outfileData[j] = cypherText[i];
  }
	
  /*StringSource (const byte *string, size_t length, bool pumpAll, BufferedTransformation *attachment=NULL)*/
  StringSource((unsigned char *)outfileData, outfileSize, true, new HexEncoder (new FileSink(cypherPath, true)));


  return NS_OK;
}

/* string unSecureMsg (in string cypherPath, in string keyPath); */
NS_IMETHODIMP Mypgp::UnSecureMsg(const char * cypherPath, const char * keyPath, char * *_retval)
{
  int i, j;
  /**********************
		Read from file
  **********************/
  int encryptSessionSize = 256; // encryptSessionSize is always 256
	
  std::string s;
  FileSource file( cypherPath, true, new HexDecoder(new CryptoPP::StringSink( s ) ));

  char * encryptSession = (char *)malloc(sizeof(unsigned char)*256);
  for(i=0; i<256; i++){
	encryptSession[i] = s[i];
  }
	

  int cypherTextSize = 0;
  char * cypherText = (char *)malloc(sizeof(unsigned char)*(s.length() - 256));
  for(i=256, j=0 ; i<s.length(); i++, j++){
	cypherText[j] = s[i];
	cypherTextSize++;
  }
	
  /**********************
		Decrypt Ks with Kprv
  **********************/
  int keySessionSize;
  char * keySession;
  DecryptSession(encryptSession, encryptSessionSize, keyPath, &keySession, &keySessionSize);

	
  /**********************
		Obtain Plaintext

  **********************/
  char * plainText;
  Decrypt(cypherText, keySession, CryptoPP::CIPHER::DEFAULT_KEYLENGTH, CryptoPP::CIPHER::BLOCKSIZE, &plainText);
	

  *_retval = (char *)malloc(sizeof(unsigned char) * (cypherTextSize+1));
  for(i=0; i < cypherTextSize; i++){
	(*_retval)[i] = plainText[i];
  }
  (*_retval)[cypherTextSize] = '\0';

	
  return NS_OK;
}

/* void encryptSession (in string sessionKey, in long sessionKeySize, in string keyPath, out string encryptSession, out long encryptSessionSize); */
NS_IMETHODIMP Mypgp::EncryptSession(const char * sessionKey, int32_t sessionKeySize, const char * keyPath, char * *encryptSession, int32_t *encryptSessionSize)
{
  /**********************************************************************
	Precondition:
    CiphertextLength(plaintextLength) != 0 (i.e., plaintext isn't too long) 
    size of ciphertext == CiphertextLength(plaintextLength) 
  ***********************************************************************/
  int i;
  RSA::PublicKey publicKey;
  AutoSeededRandomPool rng;
	
  /* Load (BufferedTransformation &bt) */
  /* FileSource (const char *filename, bool pumpAll, BufferedTransformation *attachment=NULL, bool binary=true) */
  publicKey.Load(
				 FileSource( keyPath, true, NULL, true /*binary*/ ).Ref()
				 );
	
  bool key_ok = publicKey.Validate(rng, 3);
  if(!key_ok)
	cout << "Not a valid public key\n";
  else
	cout << "Valid public key\n";
		
  ////////////////////////////////////////////////
  // Encrypt
    
  /* PK_FinalTemplate (const CryptoMaterial &key) */
  RSAES_OAEP_SHA_Encryptor encryptor( publicKey );

  *encryptSessionSize = encryptor.CiphertextLength( sessionKeySize );
	
  char *keyEncrypted = (char *)malloc(sizeof(unsigned char) * *encryptSessionSize );
		    
  //Encrypt (RandomNumberGenerator &rng, const byte *plaintext, size_t plaintextLength, byte *ciphertext, const NameValuePairs &parameters=g_nullNameValuePairs) const =0
  encryptor.Encrypt( rng, (unsigned char *)sessionKey, sessionKeySize, (unsigned char *)keyEncrypted);
    
  *encryptSession = (char *)malloc(sizeof(unsigned char) * *encryptSessionSize);
  for(i=0; i < *encryptSessionSize; i++){
	(*encryptSession)[i] = keyEncrypted[i];
  }

  NS_Free(keyEncrypted);
	
  return NS_OK;
}

/* void decryptSession (in string encryptSession, in long encryptSessionSize, in string keyPath, out string sessionKey, out long sessionKeySize); */
NS_IMETHODIMP Mypgp::DecryptSession(const char * encryptSession, int32_t encryptSessionSize, const char * keyPath, char * *sessionKey, int32_t *sessionKeySize)
{
  /***************************************************************
	Precondition:
    size of plaintext == (ciphertextLength) bytes. 
  ****************************************************************/
  int i;

  RSA::PrivateKey privateKey;
  AutoSeededRandomPool rng;
	
  /* Load (BufferedTransformation &bt) */
  /* FileSource (const char *filename, bool pumpAll, BufferedTransformation *attachment=NULL, bool binary=true) */
  privateKey.Load(
				  FileSource( keyPath, true, NULL, true /*binary*/ ).Ref()
				  );
	
  bool key_ok = privateKey.Validate(rng, 3);
  if(!key_ok)
	cout << "Not a valid private key\n";
  else
	cout << "Valid private key\n";
		

  ////////////////////////////////////////////////
  // Decrypt
  /* PK_FinalTemplate (const CryptoMaterial &key) */
  RSAES_OAEP_SHA_Decryptor decryptor( privateKey );
    
  *sessionKeySize = decryptor.MaxPlaintextLength( encryptSessionSize );
    
  char *keyDecrypted = (char *)malloc(sizeof(unsigned char) * *sessionKeySize );
  
  /* Decrypt (RandomNumberGenerator &rng, const byte *ciphertext, size_t ciphertextLength, byte *plaintext, const NameValuePairs &parameters=g_nullNameValuePairs) const =0 */
  decryptor.Decrypt( rng, (unsigned char *)encryptSession, encryptSessionSize, (unsigned char *)keyDecrypted);
    
  *sessionKey = (char *)malloc(sizeof(unsigned char) * *sessionKeySize);
  for(i=0; i < *sessionKeySize; i++){
	(*sessionKey)[i] = keyDecrypted[i];
  }

  NS_Free(keyDecrypted);

    
  return NS_OK;
}

/* void keygen (in unsigned long type, in string publicPath, in string privatePath); */
NS_IMETHODIMP Mypgp::Keygen(uint32_t type, const char * publicPath, const char * privatePath)
{
  int keysize;

  if(type == LONG_KEY){
	keysize = 2046;
  } else if (type == SHORT_KEY) {
	keysize = 1024;
  } else {
	return NS_ERROR_FAILURE;
  }

  AutoSeededRandomPool rng;
	
  InvertibleRSAFunction parameters;
  parameters.GenerateRandomWithKeySize( rng, keysize );

  RSA::PrivateKey rsaPrivate(parameters);
  RSA::PublicKey rsaPublic(parameters);

  rsaPublic.Save(
				 FileSink( publicPath, true /*binary*/ ).Ref()
				 );

  rsaPrivate.Save(
				  FileSink( privatePath, true /*binary*/ ).Ref()
				  );

  return NS_OK;
}

/* void sessionKeygen (in long keySize, in long ivSize, out string keySession); */
NS_IMETHODIMP Mypgp::SessionKeygen(int32_t keySize, int32_t ivSize, char * *keySession)
{
  int i, j;

  /* Standard - CryptoPP::CIPHER::DEFAULT_KEYLENGTH */
  char *key = (char *)malloc(sizeof(unsigned char)*keySize);
  /* Standard - CryptoPP::CIPHER::BLOCKSIZE */
  char *iv = (char *)malloc(sizeof(unsigned char)*ivSize);

  AutoSeededRandomPool rnd;

  // Generate a random key
  rnd.GenerateBlock((unsigned char *)key, keySize);

  // Generate a random IV
  rnd.GenerateBlock((unsigned char *)iv, ivSize);	

  *keySession = (char *)malloc(sizeof(unsigned char)*(keySize + ivSize));
  for(i=0; i < ivSize; i++){
	(*keySession)[i] = iv[i];
  }
  for(i=0; i < keySize; i++){
	(*keySession)[i] = key[i];
  }

  NS_Free(key);
  NS_Free(iv);
  return NS_OK;
}

/* void encrypt (in string plaintext, in string keysession, in long keySize, in long ivSize, out string cypherText); */
NS_IMETHODIMP Mypgp::Encrypt(const char * plaintext, const char * keysession, int32_t keySize, int32_t ivSize, char * *cypher_Text)
{
  int i,j;
	
  /* Get key and iv from keysession*/
  unsigned char key[CryptoPP::CIPHER::DEFAULT_KEYLENGTH];
  unsigned char iv[CryptoPP::CIPHER::BLOCKSIZE];

  for(i=0; i<CryptoPP::CIPHER::DEFAULT_KEYLENGTH; i++){
	key[i] = (unsigned char)keysession[i];
  }
  for(j=0; i<CryptoPP::CIPHER::DEFAULT_KEYLENGTH + CryptoPP::CIPHER::BLOCKSIZE; i++, j++){
	iv[j] = (unsigned char)keysession[i];
  }

  char *cypherText = (char *)malloc(sizeof(unsigned char) * strlen(plaintext));
	
  // Encryptor
  CFB_Mode<AES>::Encryption cfbEncryption(key, sizeof(key), iv);
  cfbEncryption.ProcessData((unsigned char *)cypherText, (unsigned char *)plaintext, strlen(plaintext));


  *cypher_Text = (char *)malloc(sizeof(unsigned char) * strlen(plaintext));
  for(i=0; i < strlen(plaintext); i++){
	(*cypher_Text)[i] = cypherText[i];
  }

  NS_Free(cypherText);

  return NS_OK;
}

/* void decrypt (in string cyphertext, in string keysession, in long keySize, in long ivSize, out string plain_Text); */
NS_IMETHODIMP Mypgp::Decrypt(const char * cyphertext, const char * keysession, int32_t keySize, int32_t ivSize, char * *plain_Text)
{
  int i,j;
	

  /* Get key and iv from keysession*/
  unsigned char key[CryptoPP::CIPHER::DEFAULT_KEYLENGTH];
  unsigned char iv[CryptoPP::CIPHER::BLOCKSIZE];

  for(i=0; i<CryptoPP::CIPHER::DEFAULT_KEYLENGTH; i++){
	key[i] = (unsigned char)keysession[i];
  }
  for(j=0; i<CryptoPP::CIPHER::DEFAULT_KEYLENGTH + CryptoPP::CIPHER::BLOCKSIZE; i++, j++){
	iv[j] = (unsigned char)keysession[i];
  }

	
  char *plainText = (char *)malloc(sizeof(unsigned char) * strlen(cyphertext));
	
  // Decryptor
  CFB_Mode< AES >::Decryption cfbDecryption(key, sizeof(key), iv);
  cfbDecryption.ProcessData((unsigned char *)plainText, (unsigned char *)cyphertext, strlen(cyphertext));
	
  *plain_Text = (char *)malloc(sizeof(unsigned char) * strlen(cyphertext));
  for(i=0; i < strlen(cyphertext); i++){
	(*plain_Text)[i] = plainText[i];
  }

  NS_Free(plainText);
	
  return NS_OK;
}

/* void createCertificate (in string publicKeyPath, in string privateKeyPath, in string name, in string validaty, in unsigned long type, in string path); */
NS_IMETHODIMP Mypgp::CreateCertificate(const char * publicKeyPath, const char * privateKeyPath, const char * name, const char * validaty, uint32_t type, const char * path)
{
  

  return NS_OK;
}


/* long add (in long a, in long b); */
NS_IMETHODIMP Mypgp::Add(int32_t a, int32_t b, int32_t *_retval)
{
  *_retval = a + b;
  return NS_OK;
}
