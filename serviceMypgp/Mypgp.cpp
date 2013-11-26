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

/* string Encrypt (in string msg); */
NS_IMETHODIMP Mypgp::Encrypt(const char * msg, char * *_retval)
{
	//*_retval = msg;
	return NS_OK;
    //return NS_ERROR_NOT_IMPLEMENTED;
}

/* string Decrypt (in string msg); */
NS_IMETHODIMP Mypgp::Decrypt(const char * msg, char * *_retval)
{
    return NS_ERROR_NOT_IMPLEMENTED;
}

/* long Add (in long a, in long b); */
NS_IMETHODIMP Mypgp::Add(PRInt32 a, PRInt32 b, PRInt32 *_retval)
{
	*_retval = a + b;
	return NS_OK;
}
