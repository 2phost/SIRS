#include "mozilla/ModuleUtils.h"
#include "nsIClassInfoImpl.h"

#include "Mypgp.h"

NS_GENERIC_FACTORY_CONSTRUCTOR(Mypgp)

// The following line defines a kNS_SAMPLE_CID CID variable.
NS_DEFINE_NAMED_CID(MYPGP_CID);



// Build a table of ClassIDs (CIDs) which are implemented by this module. CIDs
// should be completely unique UUIDs.
// each entry has the form { CID, service, factoryproc, constructorproc }
// where factoryproc is usually nullptr.
const mozilla::Module::CIDEntry kMypgpModuleCIDs[] = {
   { &kMYPGP_CID, false, nullptr, MypgpConstructor },
  { nullptr }
};

// Build a table which maps contract IDs to CIDs.
// A contract is a string which identifies a particular set of functionality. In some
// cases an extension component may override the contract ID of a builtin gecko component
// to modify or extend functionality.
const mozilla::Module::ContractIDEntry kMypgpModuleContracts[] = {
  { MYPGP_CONTRACTID, &kMYPGP_CID },
  { nullptr }

};

// Category entries are category/key/value triples which can be used
// to register contract ID as content handlers or to observe certain
// notifications. Most modules do not need to register any category
// entries: this is just a sample of how you'd do it.
// @see nsICategoryManager for information on retrieving category data.
static const mozilla::Module::CategoryEntry kMypgpModuleCategories[] = {
  { nullptr }
};

static const mozilla::Module kMypgpModule = {
  mozilla::Module::kVersion,
  kMypgpModuleCIDs,
  kMypgpModuleContracts,
  kMypgpModuleCategories
};

// The following line implements the one-and-only "NSModule" symbol exported from this
// shared library.
NSMODULE_DEFN(MypgpModule) = &kMypgpModule;
