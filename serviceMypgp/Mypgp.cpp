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
	
	RSA::PrivateKey rsaPrivate;
	rsaPrivate.GenerateRandomWithKeySize(rng, 3072);

	RSA::PublicKey rsaPublic(rsaPrivate);

	//Save private key
	ByteQueue queue;
	rsaPrivate.Save(queue);

	FileSink file("private.key");

	queue.CopyTo(file);
	file.MessageEnd();

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
