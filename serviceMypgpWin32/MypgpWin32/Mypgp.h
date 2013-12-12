#ifndef _MY_PGP_H_
#define _MY_PGP_H_

#include "IMypgp.h"

#include <iostream>
using std::cout;

/******************
      Ciphers  
******************/
#define CIPHER AES
// #define CIPHER Blowfish
// #define CIPHER BTEA
// #define CIPHER Camellia
// #define CIPHER CAST128
// #define CIPHER CAST256
// #define CIPHER DES
// #define CIPHER DES_EDE2
// #define CIPHER DES_EDE3
// #define CIPHER DES_XEX3
// #define CIPHER GOST
// #define CIPHER IDEA
// #define CIPHER MARS
// #define CIPHER RC2
// #define CIPHER RC5
// #define CIPHER RC6
// #define CIPHER Rijndael
// #define CIPHER SAFER_K
// #define CIPHER SAFER_SK
// #define CIPHER Serpent
// #define CIPHER SHACAL2
// #define CIPHER SHARK
// #define CIPHER SKIPJACK
// #define CIPHER ThreeWay
// #define CIPHER Twofish
// #define CIPHER XTEA

/******************
    CRYPT INCL     
******************/
#include "cryptopp/modes.h"
using CryptoPP::CFB_Mode;

#include "cryptopp/aes.h"
using CryptoPP::AES;

#include "cryptopp/rsa.h"
using CryptoPP::RSA;
using CryptoPP::InvertibleRSAFunction;
using CryptoPP::RSAES_OAEP_SHA_Encryptor;
using CryptoPP::RSAES_OAEP_SHA_Decryptor;

#include <cryptopp/cryptlib.h>
using CryptoPP::PrivateKey;
using CryptoPP::PublicKey;

#include <cryptopp/files.h>
using CryptoPP::FileSink;
using CryptoPP::FileSource;
using CryptoPP::ArraySink;

#include "cryptopp/filters.h"
using CryptoPP::StringSource;
using CryptoPP::ArraySource;

#include "cryptopp/osrng.h"
using CryptoPP::AutoSeededRandomPool;

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
