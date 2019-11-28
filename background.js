chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.contentScriptQuery == "getSelf") {
    getSelf(request).then(sendResponse);
    return true;
  }
  if (request.contentScriptQuery == "getAll") {
    getAll(request).then(sendResponse);
    return true;
  }
  if (request.contentScriptQuery == "postData") {
    fetch(request.url, {
      method: "POST",
      headers: {
        Accept: "application/json, application/xml, text/plain, text/html, *.*",
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
      },
      body: "result=" + request.data
    })
      .then(response => response.json())
      .then(response => sendResponse(response))
      .catch(error => console.log("Error:", error));
    return true;
  }
});

async function getSelf(request) {
  let obj = await fetch("https://hack.ap-mic.com/api/v4/user/")
    .then(response => response.json())
    .then(obj => {
      return {
        id: obj.id,
        name: obj.name,
        username: obj.username,
        avatar_url: obj.avatar_url
      };
    });
  let status = await fetch(`https://hack.ap-mic.com/api/v4/user/status`)
    .then(res => res.json())
    .then(obj => obj.message);
  obj.status = status;
  return obj;
}

async function getAll(request) {
  let arr = await fetch("https://hack.ap-mic.com/api/v4/users/?per_page=10000")
    .then(response => response.json())
    .then(arr => arr.filter(el => el.state == "active"))
    .then(arr =>
      arr.map(({ id, name, username, avatar_url, ...rest }) => {
        return { id, name, username, avatar_url };
      })
    );
  arr = Promise.all(
    arr.map(async obj => {
      let status = await (
        await fetch(`https://hack.ap-mic.com/api/v4/users/${obj.id}/status`)
      ).json();
      obj.status = status.message;
      return obj;
    })
  );
  return arr;
}
