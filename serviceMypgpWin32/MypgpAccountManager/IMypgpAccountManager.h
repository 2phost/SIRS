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

/* starting interface:    IMypgpAccountManager */
#define IMYPGPACCOUNTMANAGER_IID_STR "920b6f5c-223a-49b5-99f0-f3fb22530704"

#define IMYPGPACCOUNTMANAGER_IID \
  {0x920b6f5c, 0x223a, 0x49b5, \
    { 0x99, 0xf0, 0xf3, 0xfb, 0x22, 0x53, 0x07, 0x04 }}

class NS_NO_VTABLE IMypgpAccountManager : public nsISupports {
 public: 

  NS_DECLARE_STATIC_IID_ACCESSOR(IMYPGPACCOUNTMANAGER_IID)

  /* attribute AString name; */
  NS_IMETHOD GetName(nsAString & aName) = 0;
  NS_IMETHOD SetName(const nsAString & aName) = 0;

};

  NS_DEFINE_STATIC_IID_ACCESSOR(IMypgpAccountManager, IMYPGPACCOUNTMANAGER_IID)

/* Use this macro when declaring classes that implement this interface. */
#define NS_DECL_IMYPGPACCOUNTMANAGER \
  NS_IMETHOD GetName(nsAString & aName); \
  NS_IMETHOD SetName(const nsAString & aName); 

/* Use this macro to declare functions that forward the behavior of this interface to another object. */
#define NS_FORWARD_IMYPGPACCOUNTMANAGER(_to) \
  NS_IMETHOD GetName(nsAString & aName) { return _to GetName(aName); } \
  NS_IMETHOD SetName(const nsAString & aName) { return _to SetName(aName); } 

/* Use this macro to declare functions that forward the behavior of this interface to another object in a safe way. */
#define NS_FORWARD_SAFE_IMYPGPACCOUNTMANAGER(_to) \
  NS_IMETHOD GetName(nsAString & aName) { return !_to ? NS_ERROR_NULL_POINTER : _to->GetName(aName); } \
  NS_IMETHOD SetName(const nsAString & aName) { return !_to ? NS_ERROR_NULL_POINTER : _to->SetName(aName); } 

#if 0
/* Use the code below as a template for the implementation class for this interface. */

/* Header file */
class _MYCLASS_ : public IMypgpAccountManager
{
public:
  NS_DECL_ISUPPORTS
  NS_DECL_IMYPGPACCOUNTMANAGER

  _MYCLASS_();

private:
  ~_MYCLASS_();

protected:
  /* additional members */
};

/* Implementation file */
NS_IMPL_ISUPPORTS1(_MYCLASS_, IMypgpAccountManager)

_MYCLASS_::_MYCLASS_()
{
  /* member initializers and constructor code */
}

_MYCLASS_::~_MYCLASS_()
{
  /* destructor code */
}

/* attribute AString name; */
NS_IMETHODIMP _MYCLASS_::GetName(nsAString & aName)
{
    return NS_ERROR_NOT_IMPLEMENTED;
}
NS_IMETHODIMP _MYCLASS_::SetName(const nsAString & aName)
{
    return NS_ERROR_NOT_IMPLEMENTED;
}

/* End of implementation class template. */
#endif


/* starting interface:    IMypgpAccount */
#define IMYPGPACCOUNT_IID_STR "77f6d54b-edea-4305-8524-fa6b2c93a221"

#define IMYPGPACCOUNT_IID \
  {0x77f6d54b, 0xedea, 0x4305, \
    { 0x85, 0x24, 0xfa, 0x6b, 0x2c, 0x93, 0xa2, 0x21 }}

class NS_NO_VTABLE IMypgpAccount : public nsISupports {
 public: 

  NS_DECLARE_STATIC_IID_ACCESSOR(IMYPGPACCOUNT_IID)

  /* attribute AString name; */
  NS_IMETHOD GetName(nsAString & aName) = 0;
  NS_IMETHOD SetName(const nsAString & aName) = 0;

};

  NS_DEFINE_STATIC_IID_ACCESSOR(IMypgpAccount, IMYPGPACCOUNT_IID)

/* Use this macro when declaring classes that implement this interface. */
#define NS_DECL_IMYPGPACCOUNT \
  NS_IMETHOD GetName(nsAString & aName); \
  NS_IMETHOD SetName(const nsAString & aName); 

/* Use this macro to declare functions that forward the behavior of this interface to another object. */
#define NS_FORWARD_IMYPGPACCOUNT(_to) \
  NS_IMETHOD GetName(nsAString & aName) { return _to GetName(aName); } \
  NS_IMETHOD SetName(const nsAString & aName) { return _to SetName(aName); } 

/* Use this macro to declare functions that forward the behavior of this interface to another object in a safe way. */
#define NS_FORWARD_SAFE_IMYPGPACCOUNT(_to) \
  NS_IMETHOD GetName(nsAString & aName) { return !_to ? NS_ERROR_NULL_POINTER : _to->GetName(aName); } \
  NS_IMETHOD SetName(const nsAString & aName) { return !_to ? NS_ERROR_NULL_POINTER : _to->SetName(aName); } 

#if 0
/* Use the code below as a template for the implementation class for this interface. */

/* Header file */
class _MYCLASS_ : public IMypgpAccount
{
public:
  NS_DECL_ISUPPORTS
  NS_DECL_IMYPGPACCOUNT

  _MYCLASS_();

private:
  ~_MYCLASS_();

protected:
  /* additional members */
};

/* Implementation file */
NS_IMPL_ISUPPORTS1(_MYCLASS_, IMypgpAccount)

_MYCLASS_::_MYCLASS_()
{
  /* member initializers and constructor code */
}

_MYCLASS_::~_MYCLASS_()
{
  /* destructor code */
}

/* attribute AString name; */
NS_IMETHODIMP _MYCLASS_::GetName(nsAString & aName)
{
    return NS_ERROR_NOT_IMPLEMENTED;
}
NS_IMETHODIMP _MYCLASS_::SetName(const nsAString & aName)
{
    return NS_ERROR_NOT_IMPLEMENTED;
}

/* End of implementation class template. */
#endif


#endif /* __gen_Mypgp_h__ */
