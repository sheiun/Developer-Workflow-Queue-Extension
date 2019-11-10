chrome.runtime.sendMessage(
  {
    contentScriptQuery: "getSelf",
    url: ""
  },
  response => {
    if (response != undefined && response != "") {
      // local storage 也是一個選擇
      chrome.storage.sync.set({ self: response }, () => {
        console.log("`self` is set to " + response);
      });
    }
  }
);
