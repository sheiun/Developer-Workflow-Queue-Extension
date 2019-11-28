document.addEventListener("DOMContentLoaded", event => {
  chrome.storage.sync.get(["self", "all"], items => {
    if (items.all === undefined) {
      return;
    }
    setSelf(items.self);

    let usersDiv = document.querySelector("#users");
    items.all.forEach(user => {
      if (user.username == items.self.username) {
        return;
      }
      let div = getUserDiv(user);
      usersDiv.appendChild(div);
    });
  });
});

function setSelf(self) {
  document.querySelector("#my-avatar").src = self.avatar_url;
  document.querySelector("#my-username").innerHTML = self.username;
  document.querySelector("#my-status").innerText = self.status;
}

function getUserDiv(user) {
  // return div element
  let div = document.createElement("div");
  div.className = "card";

  let avatar = document.createElement("a");
  avatar.className = "avatar";
  avatar.href = `https://hack.ap-mic.com/${user.username}`;
  avatar.target = "_blank";
  let avatarImg = document.createElement("img");
  avatarImg.src = user.avatar_url;
  avatar.appendChild(avatarImg);

  let text = document.createElement("div");
  text.className = "text";

  text.innerHTML = `<span>${user.username}</span>
  <span>${user.status || ""}<span>`;

  div.appendChild(avatar);
  div.appendChild(text);
  return div;
}
