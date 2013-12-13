/*
 * DO NOT EDIT.  THIS FILE IS GENERATED FROM Mypgp.idl
 */

#ifndef __gen_Mypgp_h__
#define __gen_Mypgp_h__


#ifndef __gen_nsISupports_h__
#include "nsISupports.h"
#endif

/* For IDL files that don't want to include root IDL files. */
#ifndef NS_NO_VTABLE
#define NS_NO_VTABLE
#endif

/* starting interface:    IMypgp */
#define IMYPGP_IID_STR "f380ecd6-5e8d-4e11-8d85-d16a8e28e6d0"

#define IMYPGP_IID \
  {0xf380ecd6, 0x5e8d, 0x4e11, \
    { 0x8d, 0x85, 0xd1, 0x6a, 0x8e, 0x28, 0xe6, 0xd0 }}

class NS_NO_VTABLE IMypgp : public nsISupports {
 public: 

  NS_DECLARE_STATIC_IID_ACCESSOR(IMYPGP_IID)

  enum {
    LONG_KEY = 0U,
    SHORT_KEY = 1U
  };

  /* long secureMsg (in string plaintext, in string cypherPath, in string keyPath); */
  NS_IMETHOD SecureMsg(const char * plaintext, const char * cypherPath, const char * keyPath, int32_t *_retval) = 0;

  /* string unSecureMsg (in string cypherPath, in string keyPath, in long encryptSessionSize); */
  NS_IMETHOD UnSecureMsg(const char * cypherPath, const char * keyPath, int32_t encryptSessionSize, char * *_retval) = 0;

  /* void encryptSession (in string sessionKey, in long sessionKeySize, in string keyPath, out string encryptSession, out long encryptSessionSize); */
  NS_IMETHOD EncryptSession(const char * sessionKey, int32_t sessionKeySize, const char * keyPath, char * *encryptSession, int32_t *encryptSessionSize) = 0;

  /* void decryptSession (in string encryptSession, in long encryptSessionSize, in string keyPath, out string sessionKey, out long sessionKeySize); */
  NS_IMETHOD DecryptSession(const char * encryptSession, int32_t encryptSessionSize, const char * keyPath, char * *sessionKey, int32_t *sessionKeySize) = 0;

  /* void encrypt (in string plaintext, in string keysession, in long keySize, in long ivSize, out string cypher_Text); */
  NS_IMETHOD Encrypt(const char * plaintext, const char * keysession, int32_t keySize, int32_t ivSize, char * *cypher_Text) = 0;

  /* void decrypt (in string cyphertext, in string keysession, in long keySize, in long ivSize, out string plain_Text); */
  NS_IMETHOD Decrypt(const char * cyphertext, const char * keysession, int32_t keySize, int32_t ivSize, char * *plain_Text) = 0;

  /* void keygen (in unsigned long type, in string publicPath, in string privatePath); */
  NS_IMETHOD Keygen(uint32_t type, const char * publicPath, const char * privatePath) = 0;

  /* void sessionKeygen (in long keySize, in long ivSize, out string keySession); */
  NS_IMETHOD SessionKeygen(int32_t keySize, int32_t ivSize, char * *keySession) = 0;

  /* string sign (in string publicKeyPath, in string privateKeyPath, in string name, in string validaty, in unsigned long type); */
  NS_IMETHOD Sign(const char * publicKeyPath, const char * privateKeyPath, const char * name, const char * validaty, uint32_t type, char * *_retval) = 0;

  /* long verifier (in string publicKeyPath, in string privateKeyPath, in string name, in string validaty, in unsigned long type, in string signature); */
  NS_IMETHOD Verifier(const char * publicKeyPath, const char * privateKeyPath, const char * name, const char * validaty, uint32_t type, const char * signature, int32_t *_retval) = 0;

  /* long add (in long a, in long b); */
  NS_IMETHOD Add(int32_t a, int32_t b, int32_t *_retval) = 0;

};

  NS_DEFINE_STATIC_IID_ACCESSOR(IMypgp, IMYPGP_IID)

/* Use this macro when declaring classes that implement this interface. */
#define NS_DECL_IMYPGP \
  NS_IMETHOD SecureMsg(const char * plaintext, const char * cypherPath, const char * keyPath, int32_t *_retval); \
  NS_IMETHOD UnSecureMsg(const char * cypherPath, const char * keyPath, int32_t encryptSessionSize, char * *_retval); \
  NS_IMETHOD EncryptSession(const char * sessionKey, int32_t sessionKeySize, const char * keyPath, char * *encryptSession, int32_t *encryptSessionSize); \
  NS_IMETHOD DecryptSession(const char * encryptSession, int32_t encryptSessionSize, const char * keyPath, char * *sessionKey, int32_t *sessionKeySize); \
  NS_IMETHOD Encrypt(const char * plaintext, const char * keysession, int32_t keySize, int32_t ivSize, char * *cypher_Text); \
  NS_IMETHOD Decrypt(const char * cyphertext, const char * keysession, int32_t keySize, int32_t ivSize, char * *plain_Text); \
  NS_IMETHOD Keygen(uint32_t type, const char * publicPath, const char * privatePath); \
  NS_IMETHOD SessionKeygen(int32_t keySize, int32_t ivSize, char * *keySession); \
  NS_IMETHOD Sign(const char * publicKeyPath, const char * privateKeyPath, const char * name, const char * validaty, uint32_t type, char * *_retval); \
  NS_IMETHOD Verifier(const char * publicKeyPath, const char * privateKeyPath, const char * name, const char * validaty, uint32_t type, const char * signature, int32_t *_retval); \
  NS_IMETHOD Add(int32_t a, int32_t b, int32_t *_retval); 

/* Use this macro to declare functions that forward the behavior of this interface to another object. */
#define NS_FORWARD_IMYPGP(_to) \
  NS_IMETHOD SecureMsg(const char * plaintext, const char * cypherPath, const char * keyPath, int32_t *_retval) { return _to SecureMsg(plaintext, cypherPath, keyPath, _retval); } \
  NS_IMETHOD UnSecureMsg(const char * cypherPath, const char * keyPath, int32_t encryptSessionSize, char * *_retval) { return _to UnSecureMsg(cypherPath, keyPath, encryptSessionSize, _retval); } \
  NS_IMETHOD EncryptSession(const char * sessionKey, int32_t sessionKeySize, const char * keyPath, char * *encryptSession, int32_t *encryptSessionSize) { return _to EncryptSession(sessionKey, sessionKeySize, keyPath, encryptSession, encryptSessionSize); } \
  NS_IMETHOD DecryptSession(const char * encryptSession, int32_t encryptSessionSize, const char * keyPath, char * *sessionKey, int32_t *sessionKeySize) { return _to DecryptSession(encryptSession, encryptSessionSize, keyPath, sessionKey, sessionKeySize); } \
  NS_IMETHOD Encrypt(const char * plaintext, const char * keysession, int32_t keySize, int32_t ivSize, char * *cypher_Text) { return _to Encrypt(plaintext, keysession, keySize, ivSize, cypher_Text); } \
  NS_IMETHOD Decrypt(const char * cyphertext, const char * keysession, int32_t keySize, int32_t ivSize, char * *plain_Text) { return _to Decrypt(cyphertext, keysession, keySize, ivSize, plain_Text); } \
  NS_IMETHOD Keygen(uint32_t type, const char * publicPath, const char * privatePath) { return _to Keygen(type, publicPath, privatePath); } \
  NS_IMETHOD SessionKeygen(int32_t keySize, int32_t ivSize, char * *keySession) { return _to SessionKeygen(keySize, ivSize, keySession); } \
  NS_IMETHOD Sign(const char * publicKeyPath, const char * privateKeyPath, const char * name, const char * validaty, uint32_t type, char * *_retval) { return _to Sign(publicKeyPath, privateKeyPath, name, validaty, type, _retval); } \
  NS_IMETHOD Verifier(const char * publicKeyPath, const char * privateKeyPath, const char * name, const char * validaty, uint32_t type, const char * signature, int32_t *_retval) { return _to Verifier(publicKeyPath, privateKeyPath, name, validaty, type, signature, _retval); } \
  NS_IMETHOD Add(int32_t a, int32_t b, int32_t *_retval) { return _to Add(a, b, _retval); } 

/* Use this macro to declare functions that forward the behavior of this interface to another object in a safe way. */
#define NS_FORWARD_SAFE_IMYPGP(_to) \
  NS_IMETHOD SecureMsg(const char * plaintext, const char * cypherPath, const char * keyPath, int32_t *_retval) { return !_to ? NS_ERROR_NULL_POINTER : _to->SecureMsg(plaintext, cypherPath, keyPath, _retval); } \
  NS_IMETHOD UnSecureMsg(const char * cypherPath, const char * keyPath, int32_t encryptSessionSize, char * *_retval) { return !_to ? NS_ERROR_NULL_POINTER : _to->UnSecureMsg(cypherPath, keyPath, encryptSessionSize, _retval); } \
  NS_IMETHOD EncryptSession(const char * sessionKey, int32_t sessionKeySize, const char * keyPath, char * *encryptSession, int32_t *encryptSessionSize) { return !_to ? NS_ERROR_NULL_POINTER : _to->EncryptSession(sessionKey, sessionKeySize, keyPath, encryptSession, encryptSessionSize); } \
  NS_IMETHOD DecryptSession(const char * encryptSession, int32_t encryptSessionSize, const char * keyPath, char * *sessionKey, int32_t *sessionKeySize) { return !_to ? NS_ERROR_NULL_POINTER : _to->DecryptSession(encryptSession, encryptSessionSize, keyPath, sessionKey, sessionKeySize); } \
  NS_IMETHOD Encrypt(const char * plaintext, const char * keysession, int32_t keySize, int32_t ivSize, char * *cypher_Text) { return !_to ? NS_ERROR_NULL_POINTER : _to->Encrypt(plaintext, keysession, keySize, ivSize, cypher_Text); } \
  NS_IMETHOD Decrypt(const char * cyphertext, const char * keysession, int32_t keySize, int32_t ivSize, char * *plain_Text) { return !_to ? NS_ERROR_NULL_POINTER : _to->Decrypt(cyphertext, keysession, keySize, ivSize, plain_Text); } \
  NS_IMETHOD Keygen(uint32_t type, const char * publicPath, const char * privatePath) { return !_to ? NS_ERROR_NULL_POINTER : _to->Keygen(type, publicPath, privatePath); } \
  NS_IMETHOD SessionKeygen(int32_t keySize, int32_t ivSize, char * *keySession) { return !_to ? NS_ERROR_NULL_POINTER : _to->SessionKeygen(keySize, ivSize, keySession); } \
  NS_IMETHOD Sign(const char * publicKeyPath, const char * privateKeyPath, const char * name, const char * validaty, uint32_t type, char * *_retval) { return !_to ? NS_ERROR_NULL_POINTER : _to->Sign(publicKeyPath, privateKeyPath, name, validaty, type, _retval); } \
  NS_IMETHOD Verifier(const char * publicKeyPath, const char * privateKeyPath, const char * name, const char * validaty, uint32_t type, const char * signature, int32_t *_retval) { return !_to ? NS_ERROR_NULL_POINTER : _to->Verifier(publicKeyPath, privateKeyPath, name, validaty, type, signature, _retval); } \
  NS_IMETHOD Add(int32_t a, int32_t b, int32_t *_retval) { return !_to ? NS_ERROR_NULL_POINTER : _to->Add(a, b, _retval); } 

#if 0
/* Use the code below as a template for the implementation class for this interface. */

/* Header file */
class _MYCLASS_ : public IMypgp
{
public:
  NS_DECL_ISUPPORTS
  NS_DECL_IMYPGP

  _MYCLASS_();

private:
  ~_MYCLASS_();

protected:
  /* additional members */
};

/* Implementation file */
NS_IMPL_ISUPPORTS1(_MYCLASS_, IMypgp)

_MYCLASS_::_MYCLASS_()
{
  /* member initializers and constructor code */
}

_MYCLASS_::~_MYCLASS_()
{
  /* destructor code */
}

/* long secureMsg (in string plaintext, in string cypherPath, in string keyPath); */
NS_IMETHODIMP _MYCLASS_::SecureMsg(const char * plaintext, const char * cypherPath, const char * keyPath, int32_t *_retval)
{
    return NS_ERROR_NOT_IMPLEMENTED;
}

/* string unSecureMsg (in string cypherPath, in string keyPath, in long encryptSessionSize); */
NS_IMETHODIMP _MYCLASS_::UnSecureMsg(const char * cypherPath, const char * keyPath, int32_t encryptSessionSize, char * *_retval)
{
    return NS_ERROR_NOT_IMPLEMENTED;
}

/* void encryptSession (in string sessionKey, in long sessionKeySize, in string keyPath, out string encryptSession, out long encryptSessionSize); */
NS_IMETHODIMP _MYCLASS_::EncryptSession(const char * sessionKey, int32_t sessionKeySize, const char * keyPath, char * *encryptSession, int32_t *encryptSessionSize)
{
    return NS_ERROR_NOT_IMPLEMENTED;
}

/* void decryptSession (in string encryptSession, in long encryptSessionSize, in string keyPath, out string sessionKey, out long sessionKeySize); */
NS_IMETHODIMP _MYCLASS_::DecryptSession(const char * encryptSession, int32_t encryptSessionSize, const char * keyPath, char * *sessionKey, int32_t *sessionKeySize)
{
    return NS_ERROR_NOT_IMPLEMENTED;
}

/* void encrypt (in string plaintext, in string keysession, in long keySize, in long ivSize, out string cypher_Text); */
NS_IMETHODIMP _MYCLASS_::Encrypt(const char * plaintext, const char * keysession, int32_t keySize, int32_t ivSize, char * *cypher_Text)
{
    return NS_ERROR_NOT_IMPLEMENTED;
}

/* void decrypt (in string cyphertext, in string keysession, in long keySize, in long ivSize, out string plain_Text); */
NS_IMETHODIMP _MYCLASS_::Decrypt(const char * cyphertext, const char * keysession, int32_t keySize, int32_t ivSize, char * *plain_Text)
{
    return NS_ERROR_NOT_IMPLEMENTED;
}

/* void keygen (in unsigned long type, in string publicPath, in string privatePath); */
NS_IMETHODIMP _MYCLASS_::Keygen(uint32_t type, const char * publicPath, const char * privatePath)
{
    return NS_ERROR_NOT_IMPLEMENTED;
}

/* void sessionKeygen (in long keySize, in long ivSize, out string keySession); */
NS_IMETHODIMP _MYCLASS_::SessionKeygen(int32_t keySize, int32_t ivSize, char * *keySession)
{
    return NS_ERROR_NOT_IMPLEMENTED;
}

/* string sign (in string publicKeyPath, in string privateKeyPath, in string name, in string validaty, in unsigned long type); */
NS_IMETHODIMP _MYCLASS_::Sign(const char * publicKeyPath, const char * privateKeyPath, const char * name, const char * validaty, uint32_t type, char * *_retval)
{
    return NS_ERROR_NOT_IMPLEMENTED;
}

/* long verifier (in string publicKeyPath, in string privateKeyPath, in string name, in string validaty, in unsigned long type, in string signature); */
NS_IMETHODIMP _MYCLASS_::Verifier(const char * publicKeyPath, const char * privateKeyPath, const char * name, const char * validaty, uint32_t type, const char * signature, int32_t *_retval)
{
    return NS_ERROR_NOT_IMPLEMENTED;
}

/* long add (in long a, in long b); */
NS_IMETHODIMP _MYCLASS_::Add(int32_t a, int32_t b, int32_t *_retval)
{
    return NS_ERROR_NOT_IMPLEMENTED;
}

/* End of implementation class template. */
#endif


#endif /* __gen_Mypgp_h__ */
