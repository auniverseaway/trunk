import { html, render } from '../deps/htm-preact.js';
import AccountList from './components/AccountList.js';

function Options() {
  return html`<${AccountList} />`;
}

const app = html`<${Options} />`;
render(app, document.body);