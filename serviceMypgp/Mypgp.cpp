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
	AutoSeededRandomPool rng;
	
	

	InvertibleRSAFunction parameters;
	parameters.GenerateRandomWithKeySize(rng, 1024);
	
	RSA::PrivateKey rsaPrivate(parameters);
	RSA::PublicKey rsaPublic(parameters);

	rsaPublic.Save(
		FileSink("pubKey.key", true).Ref()
	);

	rsaPrivate.Save(
		FileSink("privKey.key", true).Ref()
	);

    return NS_OK;
}

/* string encrypt (in AString msg); */
NS_IMETHODIMP Mypgp::Encrypt(const nsAString & msg, char * *_retval)
{
	//*_retval = msg;
	//return NS_OK;
	return NS_ERROR_NOT_IMPLEMENTED;
}

/* string decrypt (in AString msg); */
NS_IMETHODIMP Mypgp::Decrypt(const nsAString & msg, char * *_retval)
{
    return NS_ERROR_NOT_IMPLEMENTED;
}

/* long add (in long a, in long b); */
NS_IMETHODIMP Mypgp::Add(int32_t a, int32_t b, int32_t *_retval)
{
	*_retval = a + b;
	return NS_OK;
}
