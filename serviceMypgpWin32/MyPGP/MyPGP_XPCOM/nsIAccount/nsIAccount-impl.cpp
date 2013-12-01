#include "nsiaccount-impl.h"

NS_IMPL_ISUPPORTS1(MypgpAccount, nsIMypgpAccount)

MypgpAccount::MypgpAccount()
{
	/* member initializers and constructor code */
	mName.Assign(L"Default Name");
}

MypgpAccount::~MypgpAccount()
{
	/* destructor code */
}


/* attribute AString name; */
NS_IMETHODIMP MypgpAccount::GetName(nsAString & aName)
{
	aName.Assign(mName);
	return NS_OK;
}
NS_IMETHODIMP MypgpAccount::SetName(const nsAString & aName)
{
	mName.Assign(aName);
	return NS_OK;
}
