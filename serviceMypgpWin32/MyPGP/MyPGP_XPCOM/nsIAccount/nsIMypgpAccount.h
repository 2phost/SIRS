/*
 * DO NOT EDIT.  THIS FILE IS GENERATED FROM nsIAccount.idl
 */

#ifndef __gen_nsIAccount_h__
#define __gen_nsIAccount_h__


#ifndef __gen_nsISupports_h__
#include "nsISupports.h"
#endif

/* For IDL files that don't want to include root IDL files. */
#ifndef NS_NO_VTABLE
#define NS_NO_VTABLE
#endif

/* starting interface:    nsIMypgpAccount */
#define NS_IMYPGPACCOUNT_IID_STR "263ed1ba-5cc1-11db-9673-00e08161165f"

#define NS_IMYPGPACCOUNT_IID \
  {0x263ed1ba, 0x5cc1, 0x11db, \
    { 0x96, 0x73, 0x00, 0xe0, 0x81, 0x61, 0x16, 0x5f }}

class NS_NO_VTABLE nsIMypgpAccount : public nsISupports {
 public: 

  NS_DECLARE_STATIC_IID_ACCESSOR(NS_IMYPGPACCOUNT_IID)

  /* attribute AString name; */
  NS_IMETHOD GetName(nsAString & aName) = 0;
  NS_IMETHOD SetName(const nsAString & aName) = 0;

};

  NS_DEFINE_STATIC_IID_ACCESSOR(nsIMypgpAccount, NS_IMYPGPACCOUNT_IID)

/* Use this macro when declaring classes that implement this interface. */
#define NS_DECL_NSIMYPGPACCOUNT \
  NS_IMETHOD GetName(nsAString & aName); \
  NS_IMETHOD SetName(const nsAString & aName); 

/* Use this macro to declare functions that forward the behavior of this interface to another object. */
#define NS_FORWARD_NSIMYPGPACCOUNT(_to) \
  NS_IMETHOD GetName(nsAString & aName) { return _to GetName(aName); } \
  NS_IMETHOD SetName(const nsAString & aName) { return _to SetName(aName); } 

/* Use this macro to declare functions that forward the behavior of this interface to another object in a safe way. */
#define NS_FORWARD_SAFE_NSIMYPGPACCOUNT(_to) \
  NS_IMETHOD GetName(nsAString & aName) { return !_to ? NS_ERROR_NULL_POINTER : _to->GetName(aName); } \
  NS_IMETHOD SetName(const nsAString & aName) { return !_to ? NS_ERROR_NULL_POINTER : _to->SetName(aName); } 

#if 0
/* Use the code below as a template for the implementation class for this interface. */

/* Header file */
class nsMypgpAccount : public nsIMypgpAccount
{
public:
  NS_DECL_ISUPPORTS
  NS_DECL_NSIMYPGPACCOUNT

  nsMypgpAccount();

private:
  ~nsMypgpAccount();

protected:
  /* additional members */
};

/* Implementation file */
NS_IMPL_ISUPPORTS1(nsMypgpAccount, nsIMypgpAccount)

nsMypgpAccount::nsMypgpAccount()
{
  /* member initializers and constructor code */
}

nsMypgpAccount::~nsMypgpAccount()
{
  /* destructor code */
}

/* attribute AString name; */
NS_IMETHODIMP nsMypgpAccount::GetName(nsAString & aName)
{
    return NS_ERROR_NOT_IMPLEMENTED;
}
NS_IMETHODIMP nsMypgpAccount::SetName(const nsAString & aName)
{
    return NS_ERROR_NOT_IMPLEMENTED;
}

/* End of implementation class template. */
#endif


#endif /* __gen_nsIAccount_h__ */
