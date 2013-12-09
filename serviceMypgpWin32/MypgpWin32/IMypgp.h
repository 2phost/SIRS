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

  /* void secureMsg (in string plaintext, in long lenght, in string keyPath); */
  NS_IMETHOD SecureMsg(const char * plaintext, int32_t lenght, const char * keyPath) = 0;

  /* string encrypt (in string plaintext, in string keysession); */
  NS_IMETHOD Encrypt(const char * plaintext, const char * keysession, char * *_retval) = 0;

  /* string decrypt (in string cyphertext, in string keysession); */
  NS_IMETHOD Decrypt(const char * cyphertext, const char * keysession, char * *_retval) = 0;

  /* void keygen (in unsigned long type, in string path); */
  NS_IMETHOD Keygen(uint32_t type, const char * path) = 0;

  /* string sessionKeygen (in long keySize, in long ivSize); */
  NS_IMETHOD SessionKeygen(int32_t keySize, int32_t ivSize, char * *_retval) = 0;

  /* long add (in long a, in long b); */
  NS_IMETHOD Add(int32_t a, int32_t b, int32_t *_retval) = 0;

};

  NS_DEFINE_STATIC_IID_ACCESSOR(IMypgp, IMYPGP_IID)

/* Use this macro when declaring classes that implement this interface. */
#define NS_DECL_IMYPGP \
  NS_IMETHOD SecureMsg(const char * plaintext, int32_t lenght, const char * keyPath); \
  NS_IMETHOD Encrypt(const char * plaintext, const char * keysession, char * *_retval); \
  NS_IMETHOD Decrypt(const char * cyphertext, const char * keysession, char * *_retval); \
  NS_IMETHOD Keygen(uint32_t type, const char * path); \
  NS_IMETHOD SessionKeygen(int32_t keySize, int32_t ivSize, char * *_retval); \
  NS_IMETHOD Add(int32_t a, int32_t b, int32_t *_retval); 

/* Use this macro to declare functions that forward the behavior of this interface to another object. */
#define NS_FORWARD_IMYPGP(_to) \
  NS_IMETHOD SecureMsg(const char * plaintext, int32_t lenght, const char * keyPath) { return _to SecureMsg(plaintext, lenght, keyPath); } \
  NS_IMETHOD Encrypt(const char * plaintext, const char * keysession, char * *_retval) { return _to Encrypt(plaintext, keysession, _retval); } \
  NS_IMETHOD Decrypt(const char * cyphertext, const char * keysession, char * *_retval) { return _to Decrypt(cyphertext, keysession, _retval); } \
  NS_IMETHOD Keygen(uint32_t type, const char * path) { return _to Keygen(type, path); } \
  NS_IMETHOD SessionKeygen(int32_t keySize, int32_t ivSize, char * *_retval) { return _to SessionKeygen(keySize, ivSize, _retval); } \
  NS_IMETHOD Add(int32_t a, int32_t b, int32_t *_retval) { return _to Add(a, b, _retval); } 

/* Use this macro to declare functions that forward the behavior of this interface to another object in a safe way. */
#define NS_FORWARD_SAFE_IMYPGP(_to) \
  NS_IMETHOD SecureMsg(const char * plaintext, int32_t lenght, const char * keyPath) { return !_to ? NS_ERROR_NULL_POINTER : _to->SecureMsg(plaintext, lenght, keyPath); } \
  NS_IMETHOD Encrypt(const char * plaintext, const char * keysession, char * *_retval) { return !_to ? NS_ERROR_NULL_POINTER : _to->Encrypt(plaintext, keysession, _retval); } \
  NS_IMETHOD Decrypt(const char * cyphertext, const char * keysession, char * *_retval) { return !_to ? NS_ERROR_NULL_POINTER : _to->Decrypt(cyphertext, keysession, _retval); } \
  NS_IMETHOD Keygen(uint32_t type, const char * path) { return !_to ? NS_ERROR_NULL_POINTER : _to->Keygen(type, path); } \
  NS_IMETHOD SessionKeygen(int32_t keySize, int32_t ivSize, char * *_retval) { return !_to ? NS_ERROR_NULL_POINTER : _to->SessionKeygen(keySize, ivSize, _retval); } \
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

/* void secureMsg (in string plaintext, in long lenght, in string keyPath); */
NS_IMETHODIMP _MYCLASS_::SecureMsg(const char * plaintext, int32_t lenght, const char * keyPath)
{
    return NS_ERROR_NOT_IMPLEMENTED;
}

/* string encrypt (in string plaintext, in string keysession); */
NS_IMETHODIMP _MYCLASS_::Encrypt(const char * plaintext, const char * keysession, char * *_retval)
{
    return NS_ERROR_NOT_IMPLEMENTED;
}

/* string decrypt (in string cyphertext, in string keysession); */
NS_IMETHODIMP _MYCLASS_::Decrypt(const char * cyphertext, const char * keysession, char * *_retval)
{
    return NS_ERROR_NOT_IMPLEMENTED;
}

/* void keygen (in unsigned long type, in string path); */
NS_IMETHODIMP _MYCLASS_::Keygen(uint32_t type, const char * path)
{
    return NS_ERROR_NOT_IMPLEMENTED;
}

/* string sessionKeygen (in long keySize, in long ivSize); */
NS_IMETHODIMP _MYCLASS_::SessionKeygen(int32_t keySize, int32_t ivSize, char * *_retval)
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
