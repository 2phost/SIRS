#include "nsIAccountManager-impl.h"

NS_IMPL_ISUPPORTS1(MypgpAccountManager, nsIMypgpAccountManager)

MypgpAccountManager::MypgpAccountManager()
{
  /* member initializers and constructor code */
	mName.Assign(L"MyPGP AccountManager");
}

MypgpAccountManager::~MypgpAccountManager()
{
  /* destructor code */
}

/* attribute AString name; */
NS_IMETHODIMP MypgpAccountManager::GetName(nsAString & aName)
{
    return NS_ERROR_NOT_IMPLEMENTED;
}
NS_IMETHODIMP MypgpAccountManager::SetName(const nsAString & aName)
{
    return NS_ERROR_NOT_IMPLEMENTED;
}