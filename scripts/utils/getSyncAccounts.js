export default async function getSyncAccounts(accounts, setAccounts, haveAccounts) {
  const results = await browser.storage.sync.get('accounts');
  const storedAccounts = results.accounts;
  if (storedAccounts && !haveAccounts) {
    setAccounts([...accounts, ...storedAccounts]);
  }
};