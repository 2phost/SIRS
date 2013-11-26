#ifndef _MY_PGP_H_
#define _MY_PGP_H_

#include "IMypgp.h"

#define MYPGP_CONTRACTID "@mozilla.org/mypgp;1"
#define MYPGP_CLASSNAME "Mypgp Secure"
#define MYPGP_CID  { 0x597a60b0, 0x5272, 0x4284, { 0x90, 0xf6, 0xe9, 0x6c, 0x24, 0x2d, 0x74, 0x6 } }

/* Header file */
class Mypgp : public IMypgp
{
public:
  NS_DECL_ISUPPORTS
  NS_DECL_IMYPGP

  Mypgp();
  virtual ~Mypgp();

private:

protected:
  /* additional members */
};

#endif //_MY_PGP_H_
