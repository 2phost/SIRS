#include "nsIMypgpAccountManager.h"
#include "nsStringAPI.h"
#include "nsIMypgpAccount.h"

#define MYPGP_ACCOUNT_MANAGER_CONTRACTID "@mypgp.ist/accountmanager/manager;1"
#define MYPGP_ACCOUNT_MANAGER_CLASSNAME "MypgpAccountManager"
#define MYPGP_ACCOUNT_MANAGER_CID {0x432af7c9, 0xf3de, 0x4b5d, { 0x98, 0xf9, 0x5b, 0xc5, 0xae, 0xa0, 0x57, 0xe2 }}


class MypgpAccountManager : public nsIMypgpAccountManager
{
public:
  NS_DECL_ISUPPORTS
  NS_DECL_NSIMYPGPACCOUNTMANAGER

  MypgpAccountManager();

private:
  ~MypgpAccountManager();

protected:
  /* additional members */
	nsString mName;
};