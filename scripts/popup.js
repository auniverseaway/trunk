function hello() {
  console.log('hello');
}

(async function init() {
  const tabs = await browser.tabs.query({ active: true, currentWindow: true });
  const url = new URL(tabs[0].url);

  const user = url.pathname.split('/').pop();
  
  if (!user.startsWith('@')) return;

  const { hostname } = url;
  await browser.tabs.update(tabs[0].id, { url: `https://mastodon.world/${user}@${hostname}` });
  setTimeout(async () => {
    const reloadTabs = await browser.tabs.query({ active: true, currentWindow: true });
    console.log(reloadTabs[0].url);
  }, 1000);

})();

