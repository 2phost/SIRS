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
#define IMYPGP_IID_STR "a06109fe-feca-48df-9fcb-e4dfbce71246"

#define IMYPGP_IID \
  {0xa06109fe, 0xfeca, 0x48df, \
    { 0x9f, 0xcb, 0xe4, 0xdf, 0xbc, 0xe7, 0x12, 0x46 }}

class NS_NO_VTABLE IMypgp : public nsISupports {
 public: 

  NS_DECLARE_STATIC_IID_ACCESSOR(IMYPGP_IID)

  /* string Encrypt (in string msg); */
  NS_IMETHOD Encrypt(const char * msg, char * *_retval) = 0;

  /* string Decrypt (in string msg); */
  NS_IMETHOD Decrypt(const char * msg, char * *_retval) = 0;

};

  NS_DEFINE_STATIC_IID_ACCESSOR(IMypgp, IMYPGP_IID)

/* Use this macro when declaring classes that implement this interface. */
#define NS_DECL_IMYPGP \
  NS_IMETHOD Encrypt(const char * msg, char * *_retval); \
  NS_IMETHOD Decrypt(const char * msg, char * *_retval); 

/* Use this macro to declare functions that forward the behavior of this interface to another object. */
#define NS_FORWARD_IMYPGP(_to) \
  NS_IMETHOD Encrypt(const char * msg, char * *_retval) { return _to Encrypt(msg, _retval); } \
  NS_IMETHOD Decrypt(const char * msg, char * *_retval) { return _to Decrypt(msg, _retval); } 

/* Use this macro to declare functions that forward the behavior of this interface to another object in a safe way. */
#define NS_FORWARD_SAFE_IMYPGP(_to) \
  NS_IMETHOD Encrypt(const char * msg, char * *_retval) { return !_to ? NS_ERROR_NULL_POINTER : _to->Encrypt(msg, _retval); } \
  NS_IMETHOD Decrypt(const char * msg, char * *_retval) { return !_to ? NS_ERROR_NULL_POINTER : _to->Decrypt(msg, _retval); } 

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

/* End of implementation class template. */
#endif


#endif /* __gen_iMypgp_h__ */
