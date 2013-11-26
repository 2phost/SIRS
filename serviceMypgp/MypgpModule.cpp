#include "mozilla/ModuleUtils.h"
#include "Mypgp.h"
#include "nsIClassInfoImpl.h"


NS_GENERIC_FACTORY_CONSTRUCTOR(Mypgp)

NS_DEFINE_NAMED_CID(MYPGP_CID);




const mozilla::Module::CIDEntry kMypgpModuleCIDs[] = {
   { &kMYPGP_CID, false, NULL, MypgpConstructor },
  { NULL }
};

const mozilla::Module::ContractIDEntry kMypgpModuleContracts[] = {
  { "@mozilla.org/messengercompose/composesecure;1", &kMYPGP_CID },
  { NULL }

};

static const mozilla::Module::CategoryEntry kMypgpModuleCategories[] = {
  { NULL }
};

static const mozilla::Module kMypgpModule = {
  mozilla::Module::kVersion,
  kMypgpModuleCIDs,
  kMypgpModuleContracts,
  kMypgpModuleCategories
};

NSMODULE_DEFN(MypgpModule) = &kMypgpModule;

/*
#include "mozilla/ModuleUtils.h"
#include "Mypgp.h"

NS_GENERIC_FACTORY_CONSTRUCTOR(Mypgp)
static nsModuleComponentInfo components[] =
{
    {
       MY_COMPONENT_CLASSNAME, 
       MY_COMPONENT_CID,
       MY_COMPONENT_CONTRACTID,
       MyComponentConstructor,
    }
};
NS_IMPL_NSGETMODULE("MyComponentsModule", components) 
*/
