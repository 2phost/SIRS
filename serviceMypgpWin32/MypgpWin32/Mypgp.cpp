#include "Mypgp.h"

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

/* void keygen (in unsigned long type, in string path); */
NS_IMETHODIMP Mypgp::Keygen(uint32_t type, const char * path)
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

	/* Save Keys */
	char *publicPath = (char*)NS_Alloc(strlen(path)+16);
	strncpy(publicPath, path, strlen(path));
	strncat(publicPath, "mypgpPublic.key", 16);

	char *privatePath = (char*)NS_Alloc(strlen(path)+17);
	strncpy(privatePath, path, strlen(path));
	strncat(privatePath, "mypgpPrivate.key", 17);

	rsaPublic.Save(
        FileSink( publicPath, true /*binary*/ ).Ref()
    );

	rsaPrivate.Save(
        FileSink( privatePath, true /*binary*/ ).Ref()
    );

	NS_Free(publicPath);
	NS_Free(privatePath);	

    return NS_OK;
}

/* string sessionKeygen (); */
NS_IMETHODIMP Mypgp::SessionKeygen(char * *_retval)
{
	int i, j;

	char *key = (char *)NS_Alloc(sizeof(unsigned char)*CryptoPP::CIPHER::DEFAULT_KEYLENGTH);
	char *iv = (char *)NS_Alloc(sizeof(unsigned char)*CryptoPP::CIPHER::BLOCKSIZE);

	AutoSeededRandomPool rnd;

	// Generate a random key
	rnd.GenerateBlock((unsigned char *)key, CryptoPP::CIPHER::DEFAULT_KEYLENGTH);

	// Generate a random IV
	rnd.GenerateBlock((unsigned char *)iv, CryptoPP::CIPHER::BLOCKSIZE);	

	*_retval = (char *)NS_Alloc(CryptoPP::CIPHER::DEFAULT_KEYLENGTH + CryptoPP::CIPHER::BLOCKSIZE +1);
	for(i=0; i < CryptoPP::CIPHER::DEFAULT_KEYLENGTH; i++){
		(*_retval)[i] = key[i] == '\0' ? '0' : key[i]; //TODO remover? está assim para se tornar string mas necessário?
	}
	for(j=0; i < (CryptoPP::CIPHER::DEFAULT_KEYLENGTH + CryptoPP::CIPHER::BLOCKSIZE); i++, j++){
		(*_retval)[i] = iv[j] == '\0' ? '1' : iv[j]; //TODO remover? está assim para se tornar string mas necessário?
	}
	
//TODO PARA DEBUG -- remover
//	(*_retval)[CryptoPP::CIPHER::DEFAULT_KEYLENGTH + CryptoPP::CIPHER::BLOCKSIZE] = '\0';
//	cout << strlen(*_retval);

	NS_Free(key);
	NS_Free(iv);
    return NS_OK;
}

/* string encrypt (in string plaintext, in string keysession); */
NS_IMETHODIMP Mypgp::Encrypt(const char * plaintext, const char * keysession, char * *_retval)
{
	int i,j;
	
	/* Get key and iv from keysession*/
	unsigned char key[CryptoPP::CIPHER::DEFAULT_KEYLENGTH];
	unsigned char iv[CryptoPP::CIPHER::BLOCKSIZE];

	for(i=0; i<=CryptoPP::CIPHER::DEFAULT_KEYLENGTH; i++){
		key[i] = (unsigned char)keysession[i];
	}
	for(j=0; i<CryptoPP::CIPHER::DEFAULT_KEYLENGTH + CryptoPP::CIPHER::BLOCKSIZE; i++, j++){
		iv[j] = (unsigned char)keysession[i];
	}	

	char *cypherText = (char *)NS_Alloc(strlen(plaintext));
	// Encryptor
	CFB_Mode<AES>::Encryption cfbEncryption(key, sizeof(key), iv);
	cfbEncryption.ProcessData((unsigned char *)cypherText, (unsigned char *)plaintext, strlen(plaintext));

	//TODO DEBUG
	*_retval = (char *)NS_Alloc(strlen(plaintext));
	for(int i = 0; i< strlen(plaintext); i++){
		(*_retval)[i] = cypherText[i];
	}
	
	//converter para string
	char *cypher = (char *)NS_Alloc(strlen(plaintext)+1);
	for(int i=0; i<strlen(plaintext); i++){
		cypher[i] = cypherText[i];
	}
	cypher[strlen(plaintext)] = '\0';

	cout << plaintext << '\n' << cypher << '\n' << strlen(cypher) << '\n' << strlen(plaintext) << '\n';     

	// Decrypt teste
	char *teste = (char *)NS_Alloc(strlen(plaintext));
	CFB_Mode<AES>::Decryption cfbDecryption(key, sizeof(key), iv);
	cfbDecryption.ProcessData((unsigned char *)teste, (unsigned char *)cypherText, strlen(plaintext));

	//converter para string
	char *teste2 = (char *)NS_Alloc(strlen(plaintext)+1);
	for(int i=0; i<strlen(plaintext); i++){
		teste2[i] = teste[i];
	}
	teste2[strlen(plaintext)] = '\0';

	cout << "RESULTADO " << teste2;
	return NS_OK;
}

/* string decrypt (in string cyphertext, in string keysession); */
NS_IMETHODIMP Mypgp::Decrypt(const char * cyphertext, const char * keysession, char * *_retval)
{
    return NS_ERROR_NOT_IMPLEMENTED;
}

/* long add (in long a, in long b); */
NS_IMETHODIMP Mypgp::Add(int32_t a, int32_t b, int32_t *_retval)
{
	*_retval = a + b;
	return NS_OK;
}
