const input = document.querySelector("input");
const ul = document.querySelector("ul");
const button = document.getElementById("myButton");

let ALL_USERS;
let ALL_POSTS;

async function start() {
  const usersRes = await fetch("https://jsonplaceholder.typicode.com/users");
  const postsRes = await fetch("https://jsonplaceholder.typicode.com/posts");

  ALL_USERS = await usersRes.json();
  ALL_POSTS = await postsRes.json();

  const saveButtons = document.querySelectorAll(".save-button");
  saveButtons.forEach((button) => {
    button.addEventListener("click", handleSaveButtonClick);
  });

  renderUsers(ALL_USERS);

  const selectedName = localStorage.getItem("selectedName");
  const selectedUser = ALL_USERS.find((user) => user.name === selectedName);

  await renderPosts(
    selectedUser
      ? ALL_POSTS.filter((post) => post.userId === selectedUser.id)
      : []
  );
}

input.addEventListener("input", () => {
  renderUsers(
    ALL_USERS.filter((i) =>
      i.name.toLowerCase().includes(input.value.toLowerCase())
    )
  );
});

function renderUsers(data) {
  const html = data
    .map(
      (i) =>
        `<li class="list-item">  ${i.name} 
        <a href="pages/user-data.html">
        <button id="view-data" class="button" data-name="${i.name}">View all data</button>
        </a> 
        <button class="save-button" data-name="${i.name}"> <span class="save-icon" /></button>
        </li>`
    )
    .join("");
  ul.innerHTML = html;

  const saveButtons = document.querySelectorAll(".save-button");
  saveButtons.forEach((button) => {
    button.addEventListener("click", handleSaveButtonClick);
  });

  const viewDataButtons = document.querySelectorAll("#view-data");
  viewDataButtons.forEach((button) => {
    button.addEventListener("click", handleViewDataButtonClick);
  });
}

async function renderPosts(data) {
  const postsUl = document.getElementById("posts");
  const selectedName = localStorage.getItem("selectedName");
  const selectedUser = ALL_USERS.find((user) => user.name === selectedName);

  if (selectedName === null) {
    postsUl.innerHTML = `<p class="text-center">Select a user to view their posts (plus icon)</p>`;
  } else {
    postsUl.innerHTML = `<p class="text-center">Posts for user with ID: ${selectedUser.id}</p>`;
    const html = data
      .map(
        (post) =>
          `<li class="list-item-post"> 
            <h2 class='post-header'> ${post.title} </h2>
            <p> ${post.body} </p>
          </li>`
      )
      .join("");
    postsUl.innerHTML += html; // Append the rendered posts after the message
  }
}

function handleSaveButtonClick(event) {
  const name = event.target.dataset.name;
  const user = ALL_USERS.find((u) => u.name === name);

  if (user) {
    const userPosts = ALL_POSTS.filter((post) => post.userId === user.id);

    // Update selectedUser with the updated user object
    const selectedUser = ALL_USERS.find((user) => user.name === name);
    localStorage.setItem("selectedName", name);
    localStorage.setItem("selectedUser", JSON.stringify(selectedUser));

    renderPosts(userPosts);
  }
}

function handleViewDataButtonClick(event) {
  const name = event.target.dataset.name;
  localStorage.setItem("selectedName", name);
}

start();
