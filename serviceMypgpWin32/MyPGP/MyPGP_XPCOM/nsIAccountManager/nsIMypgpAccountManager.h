/*
 * DO NOT EDIT.  THIS FILE IS GENERATED FROM nsIAccountManager.idl
 */

#ifndef __gen_nsIAccountManager_h__
#define __gen_nsIAccountManager_h__


#ifndef __gen_nsISupports_h__
#include "nsISupports.h"
#endif

/* For IDL files that don't want to include root IDL files. */
#ifndef NS_NO_VTABLE
#define NS_NO_VTABLE
#endif

/* starting interface:    nsIMypgpAccountManager */
#define NS_IMYPGPACCOUNTMANAGER_IID_STR "432af7c9-f3de-4b5d-98f9-5bc5aea057e2"

#define NS_IMYPGPACCOUNTMANAGER_IID \
  {0x432af7c9, 0xf3de, 0x4b5d, \
    { 0x98, 0xf9, 0x5b, 0xc5, 0xae, 0xa0, 0x57, 0xe2 }}

class NS_NO_VTABLE nsIMypgpAccountManager : public nsISupports {
 public: 

  NS_DECLARE_STATIC_IID_ACCESSOR(NS_IMYPGPACCOUNTMANAGER_IID)

  /* attribute AString name; */
  NS_IMETHOD GetName(nsAString & aName) = 0;
  NS_IMETHOD SetName(const nsAString & aName) = 0;

};

  NS_DEFINE_STATIC_IID_ACCESSOR(nsIMypgpAccountManager, NS_IMYPGPACCOUNTMANAGER_IID)

/* Use this macro when declaring classes that implement this interface. */
#define NS_DECL_NSIMYPGPACCOUNTMANAGER \
  NS_IMETHOD GetName(nsAString & aName); \
  NS_IMETHOD SetName(const nsAString & aName); 

/* Use this macro to declare functions that forward the behavior of this interface to another object. */
#define NS_FORWARD_NSIMYPGPACCOUNTMANAGER(_to) \
  NS_IMETHOD GetName(nsAString & aName) { return _to GetName(aName); } \
  NS_IMETHOD SetName(const nsAString & aName) { return _to SetName(aName); } 

/* Use this macro to declare functions that forward the behavior of this interface to another object in a safe way. */
#define NS_FORWARD_SAFE_NSIMYPGPACCOUNTMANAGER(_to) \
  NS_IMETHOD GetName(nsAString & aName) { return !_to ? NS_ERROR_NULL_POINTER : _to->GetName(aName); } \
  NS_IMETHOD SetName(const nsAString & aName) { return !_to ? NS_ERROR_NULL_POINTER : _to->SetName(aName); } 

#if 0
/* Use the code below as a template for the implementation class for this interface. */

/* Header file */
class nsMypgpAccountManager : public nsIMypgpAccountManager
{
public:
  NS_DECL_ISUPPORTS
  NS_DECL_NSIMYPGPACCOUNTMANAGER

  nsMypgpAccountManager();

private:
  ~nsMypgpAccountManager();

protected:
  /* additional members */
};

/* Implementation file */
NS_IMPL_ISUPPORTS1(nsMypgpAccountManager, nsIMypgpAccountManager)

nsMypgpAccountManager::nsMypgpAccountManager()
{
  /* member initializers and constructor code */
}

nsMypgpAccountManager::~nsMypgpAccountManager()
{
  /* destructor code */
}

/* attribute AString name; */
NS_IMETHODIMP nsMypgpAccountManager::GetName(nsAString & aName)
{
    return NS_ERROR_NOT_IMPLEMENTED;
}
NS_IMETHODIMP nsMypgpAccountManager::SetName(const nsAString & aName)
{
    return NS_ERROR_NOT_IMPLEMENTED;
}

/* End of implementation class template. */
#endif


#endif /* __gen_nsIAccountManager_h__ */
