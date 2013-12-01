#ifndef __SPECIALTHING_IMPL_H__
#define __SPECIALTHING_IMPL_H__

#include "nsIMypgpAccount.h"
#include "nsStringAPI.h"

#define MYPGPACCOUNT_CONTRACTID "@mypgp.ist/accountmanager/account;1"
#define MYPGPACCOUNT_CLASSNAME "MypgpAccount"
#define MYPGPACCOUNT_CID { 0x245626, 0x5cc1, 0x11db, { 0x96, 0x73, 0x0, 0xe0, 0x81, 0x61, 0x16, 0x5f } }

class MypgpAccount : public nsIMypgpAccount
{
public:
	NS_DECL_ISUPPORTS
	NS_DECL_NSIMYPGPACCOUNT

	MypgpAccount();

private:
	~MypgpAccount();

protected:
	/* additional members */
	nsString mName;
};

#endif