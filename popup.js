let changeColor = document.getElementById("changeColor");

changeColor.onclick = element => {
  let color = element.target.value;
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    chrome.tabs.executeScript(tabs[0].id, {
      code: 'document.body.style.backgroundColor = "' + color + '";'
    });
  });
};
