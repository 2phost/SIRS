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

/* void keygen (); */
NS_IMETHODIMP Mypgp::Keygen()
{
	/* TODO CASO DO WINDOWS */
	char pPrivateKey[sizeof(getenv ("HOME"))+17];
	char pPublicKey[sizeof(getenv ("HOME"))+18];
	strcpy(pPrivateKey, getenv ("HOME"));
	strcpy(pPublicKey, getenv ("HOME"));
	strncat (pPrivateKey, "/mypgpPrivate.key", 17);
	strncat (pPublicKey, "/mypgpPublic.key", 16);

	AutoSeededRandomPool rng;
	
	InvertibleRSAFunction parameters;
	parameters.GenerateRandomWithKeySize( rng, 1024 );

	RSA::PrivateKey rsaPrivate(parameters);
	RSA::PublicKey rsaPublic(parameters);

	/* Save Keys */
	rsaPublic.Save(
        FileSink( pPublicKey, true /*binary*/ ).Ref()
    );

	rsaPrivate.Save(
        FileSink( pPrivateKey, true /*binary*/ ).Ref()
    );


    return NS_OK;
}

/* string encrypt (in string msg); */
NS_IMETHODIMP Mypgp::Encrypt(const char * msg, char * *_retval)
{
	/* TODO E se as keys não existirem?  */
	/* TODO CASO DO WINDOWS */
	char pPrivateKey[sizeof(getenv ("HOME"))+17];
	char pPublicKey[sizeof(getenv ("HOME"))+18];
	strcpy(pPrivateKey, getenv ("HOME"));
	strcpy(pPublicKey, getenv ("HOME"));
	strncat (pPrivateKey, "/mypgpPrivate.key", 17);
	strncat (pPublicKey, "/mypgpPublic.key", 16);

	AutoSeededRandomPool rng;

	RSA::PrivateKey rsaPrivate;
	RSA::PublicKey rsaPublic;

	rsaPublic.Load(
        FileSource( pPublicKey, true, NULL, true /*binary*/ ).Ref()
    );

	rsaPrivate.Load(
        FileSource( pPrivateKey, true, NULL, true /*binary*/ ).Ref()
    );

	RSAES_OAEP_SHA_Encryptor encryptor( rsaPublic );

	// Create cipher text space
	unsigned char plaintext[] = "A mãe do pommpeu";
	//strcpy(plaintext,msg);
	unsigned char *ciphertext = (unsigned char *)NS_Alloc(sizeof(unsigned char)*sizeof(plaintext));
	//unsigned char ciphertext[sizeof(plaintext)];

	encryptor.Encrypt( rng, plaintext, sizeof(msg), ciphertext);

	*_retval = (char*)NS_Alloc(sizeof(char)*sizeof((char *)ciphertext));
	strcpy(*_retval, (char *)ciphertext);
	
	return NS_OK;
}

/* string decrypt (in string msg); */
NS_IMETHODIMP Mypgp::Decrypt(const char * msg, char * *_retval)
{
    return NS_ERROR_NOT_IMPLEMENTED;
}

/* long add (in long a, in long b); */
NS_IMETHODIMP Mypgp::Add(int32_t a, int32_t b, int32_t *_retval)
{
	*_retval = a + b;
	return NS_OK;
}
