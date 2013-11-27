#ifndef _MY_PGP_H_
#define _MY_PGP_H_

#include "IMypgp.h"

/******************
    CRYPT INCL     
******************/

#include "cryptopp/rsa.h"
using CryptoPP::RSA;

#include <cryptopp/cryptlib.h>
using CryptoPP::PrivateKey;
using CryptoPP::PublicKey;
using CryptoPP::BufferedTransformation;

#include <cryptopp/files.h>
using CryptoPP::FileSource;
using CryptoPP::FileSink;

#include "cryptopp/osrng.h"
using CryptoPP::AutoSeededRandomPool;

#include "cryptopp/queue.h"
using CryptoPP::ByteQueue;

/******************/


#define MYPGP_CONTRACTID "@mozilla.org/messengercompose/composesecure;1"
#define MYPGP_CLASSNAME "Mypgp Secure"
#define MYPGP_CID  { 0xf380ecd6, 0x5e8d, 0x4e11, { 0x8d, 0x85, 0xd1, 0x6a, 0x86, 0x28, 0xe6, 0xd0 } }
//f380ecd6-5e8d-4e11-8d85-d16a8e28e6d0

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
