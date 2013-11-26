#include "Mypgp.h"

#define MYPGPSECURE_CID                    \
{ /* 8f041931-a526-40ec-96a2-d84ca29ba148 */       \
   0x8f041931, 0xa526, 0x40ec,                     \
  {0x96, 0xa2, 0xd8, 0x4c, 0xa2, 0x9b, 0xa1, 0x48 }}

static NS_DEFINE_CID(kMsgComposeSecureCID, MYPGPSECURE_CID);

// nsISupports implementation
//NS_IMPL_THREADSAFE_ISUPPORTS1(Mypgp,
//                              IMypgp)










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
