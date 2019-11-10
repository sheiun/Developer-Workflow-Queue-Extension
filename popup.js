document.addEventListener("DOMContentLoaded", event => {
  chrome.storage.sync.get(["self"], items => {
    document.querySelector("#self").innerHTML = items.self;
  });
});
