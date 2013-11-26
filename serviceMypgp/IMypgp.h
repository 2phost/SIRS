/*
 * DO NOT EDIT.  THIS FILE IS GENERATED FROM iMypgp.idl
 */

#ifndef __gen_iMypgp_h__
#define __gen_iMypgp_h__


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

  /* string Encrypt (in string msg); */
  NS_IMETHOD Encrypt(const char * msg, char * *_retval) = 0;

  /* string Decrypt (in string msg); */
  NS_IMETHOD Decrypt(const char * msg, char * *_retval) = 0;

  /* long Add (in long a, in long b); */
  NS_IMETHOD Add(int32_t a, int32_t b, int32_t *_retval) = 0;

};

  NS_DEFINE_STATIC_IID_ACCESSOR(IMypgp, IMYPGP_IID)

/* Use this macro when declaring classes that implement this interface. */
#define NS_DECL_IMYPGP \
  NS_IMETHOD Encrypt(const char * msg, char * *_retval); \
  NS_IMETHOD Decrypt(const char * msg, char * *_retval); \
  NS_IMETHOD Add(int32_t a, int32_t b, int32_t *_retval); 

/* Use this macro to declare functions that forward the behavior of this interface to another object. */
#define NS_FORWARD_IMYPGP(_to) \
  NS_IMETHOD Encrypt(const char * msg, char * *_retval) { return _to Encrypt(msg, _retval); } \
  NS_IMETHOD Decrypt(const char * msg, char * *_retval) { return _to Decrypt(msg, _retval); } \
  NS_IMETHOD Add(int32_t a, int32_t b, int32_t *_retval) { return _to Add(a, b, _retval); } 

/* Use this macro to declare functions that forward the behavior of this interface to another object in a safe way. */
#define NS_FORWARD_SAFE_IMYPGP(_to) \
  NS_IMETHOD Encrypt(const char * msg, char * *_retval) { return !_to ? NS_ERROR_NULL_POINTER : _to->Encrypt(msg, _retval); } \
  NS_IMETHOD Decrypt(const char * msg, char * *_retval) { return !_to ? NS_ERROR_NULL_POINTER : _to->Decrypt(msg, _retval); } \
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

/* string Encrypt (in string msg); */
NS_IMETHODIMP _MYCLASS_::Encrypt(const char * msg, char * *_retval)
{
    return NS_ERROR_NOT_IMPLEMENTED;
}

/* string Decrypt (in string msg); */
NS_IMETHODIMP _MYCLASS_::Decrypt(const char * msg, char * *_retval)
{
    return NS_ERROR_NOT_IMPLEMENTED;
}

/* long Add (in long a, in long b); */
NS_IMETHODIMP _MYCLASS_::Add(int32_t a, int32_t b, int32_t *_retval)
{
    return NS_ERROR_NOT_IMPLEMENTED;
}

/* End of implementation class template. */
#endif


#endif /* __gen_iMypgp_h__ */
