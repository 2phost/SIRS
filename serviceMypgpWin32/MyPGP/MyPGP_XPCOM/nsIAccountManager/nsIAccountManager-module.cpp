#include "mozilla/ModuleUtils.h"
#include "nsIClassInfoImpl.h"
#include "nsIAccountManager-impl.h"

NS_GENERIC_FACTORY_CONSTRUCTOR(MypgpAccountManager)

// The following line defines a kNS_SAMPLE_CID CID variable.
NS_DEFINE_NAMED_CID(MYPGP_ACCOUNT_MANAGER_CID);


// Build a table of ClassIDs (CIDs) which are implemented by this module. CIDs
// should be completely unique UUIDs.
// each entry has the form { CID, service, factoryproc, constructorproc }
// where factoryproc is usually nullptr.
const mozilla::Module::CIDEntry kMypgpAccountManagerModuleCIDs[] = {
   { &kMYPGP_ACCOUNT_MANAGER_CID, false, nullptr, MypgpAccountManagerConstructor },
  { nullptr }
};

// Build a table which maps contract IDs to CIDs.
// A contract is a string which identifies a particular set of functionality. In some
// cases an extension component may override the contract ID of a builtin gecko component
// to modify or extend functionality.
const mozilla::Module::ContractIDEntry kMypgpAccountManagerModuleContracts[] = {
  { MYPGP_ACCOUNT_MANAGER_CONTRACTID, &kMYPGP_ACCOUNT_MANAGER_CID },
  { nullptr }

};

// Category entries are category/key/value triples which can be used
// to register contract ID as content handlers or to observe certain
// notifications. Most modules do not need to register any category
// entries: this is just a sample of how you'd do it.
// @see nsICategoryManager for information on retrieving category data.
static const mozilla::Module::CategoryEntry kMypgpAccountManagerModuleCategories[] = {
  { NULL }
};

static const mozilla::Module kMypgpAccountManagerModule = {
  mozilla::Module::kVersion,
  kMypgpAccountManagerModuleCIDs,
  kMypgpAccountManagerModuleContracts,
  kMypgpAccountManagerModuleCategories
};

// The following line implements the one-and-only "NSModule" symbol exported from this
// shared library.
NSMODULE_DEFN(MypgpAccountManagerModule) = &kMypgpAccountManagerModule;
