import { html, useState, useEffect } from '../../deps/htm-preact.js';
import getSyncAccounts from '../utils/getSyncAccounts.js';

const ACCOUNT_TEMPLATE = {
  name: '',
  repo: '',
  edit: true,
};

export default function AccountList() {
  const [accounts, setAccounts] = useState([{...ACCOUNT_TEMPLATE}]);

  useEffect(() => {
    let haveAccounts = false;
    getSyncAccounts(accounts, setAccounts, haveAccounts);
    return () => haveAccounts = true;
  }, []);

  // Only store non-empty accounts
  function storeAccounts() {
    const storeAccounts = accounts.filter(account => account.name && account.repo);
    browser.storage.sync.set({ accounts: storeAccounts });
  }

  async function toggleView(idx, state) {
    let curAccounts = [...accounts];
    curAccounts[idx].edit = state;
    setAccounts(curAccounts);
    storeAccounts();
  }

  async function onInputChange(e, idx) {
    const { name, value } = e.target;
    const curAccounts = [...accounts];
    curAccounts[idx][name] = value;
    setAccounts(curAccounts);
  }

  async function handleAdd() {
    const curAccounts = [...accounts];
    curAccounts.unshift(ACCOUNT_TEMPLATE);
    setAccounts(curAccounts);
  }

  async function handleDelete(idx) {
    const curAccounts = [...accounts];
    curAccounts.splice(idx, 1);
    setAccounts(curAccounts);
    storeAccounts();
  }

  function getEdit(account, idx) {
    return html`
      <input type="text" name="name" placeholder="name" value=${account.name} onChange=${(e) => onInputChange(e, idx)} />
      <input type="text" name="repo" placeholder="repo" value=${account.repo} onChange=${(e) => onInputChange(e, idx)} />
      <button onClick=${() => toggleView(idx, false)}>Save</button>
    `;
  }

  function getView(account, idx) {
    return html`
      ${account.name} : ${account.repo}
      <button onClick=${() => toggleView(idx, true)}>Edit</button>
    `;
  }

  const items = accounts.map((account, idx) => {
    return html`
      <li class="${account.edit ? 'edit' : 'view'}">
        ${account.edit ? getEdit(account, idx) : getView(account, idx)}
        <button onClick=${() => handleDelete(idx)}>Delete</button>
      </li>
    `;
  });

  return html`
    <button onClick=${handleAdd}>Add Account</button>
    <ul>${items}</ul>
  `;
}