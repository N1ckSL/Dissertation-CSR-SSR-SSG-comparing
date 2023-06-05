// Use const instead of let for variables that won't be reassigned
const input = document.querySelector("input");
const ul = document.querySelector("ul");
const button = document.getElementById("myButton");

let ALL_USERS;
let ALL_POSTS;

// Fetch data and initialize the application
async function start() {
  const [usersRes, postsRes] = await Promise.all([
    fetch("https://jsonplaceholder.typicode.com/users"),
    fetch("https://jsonplaceholder.typicode.com/posts"),
  ]);

  ALL_USERS = await usersRes.json();
  ALL_POSTS = await postsRes.json();

  // Attach event listeners
  input.addEventListener("input", handleInputChange);

  renderUsers(ALL_USERS);

  const selectedName = localStorage.getItem("selectedName");
  const selectedUser = ALL_USERS.find((user) => user.name === selectedName);

  await renderPosts(
    selectedUser
      ? ALL_POSTS.filter((post) => post.userId === selectedUser.id)
      : []
  );
}

// Handle input change event
function handleInputChange() {
  const filteredUsers = ALL_USERS.filter((user) =>
    user.name.toLowerCase().includes(input.value.toLowerCase())
  );
  renderUsers(filteredUsers);
}

// Render user list
function renderUsers(data) {
  const html = data
    .map(
      (user) =>
        `<li class="list-item">
          ${user.name}
          <a href="pages/user-data.html">
            <button class="button view-data-button" data-name="${user.name}">View all data</button>
          </a>
          <button class="save-button" data-name="${user.name}"><span class="save-icon"></span></button>
        </li>`
    )
    .join("");
  ul.innerHTML = html;

  const saveButtons = document.querySelectorAll(".save-button");
  saveButtons.forEach((button) => {
    button.addEventListener("click", handleSaveButtonClick);
  });

  const viewDataButtons = document.querySelectorAll(".view-data-button");
  viewDataButtons.forEach((button) => {
    button.addEventListener("click", handleViewDataButtonClick);
  });
}

// Render posts for the selected user
function renderPosts(data) {
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
            <h2 class="post-header">${post.title}</h2>
            <p>${post.body}</p>
          </li>`
      )
      .join("");
    postsUl.innerHTML += html;
  }
}

// Handle save button click
function handleSaveButtonClick(event) {
  const name = event.target.dataset.name;
  const user = ALL_USERS.find((u) => u.name === name);

  if (user) {
    const userPosts = ALL_POSTS.filter((post) => post.userId === user.id);

    localStorage.setItem("selectedName", name);
    localStorage.setItem("selectedUser", JSON.stringify(user));

    renderPosts(userPosts);
  }
}

// Handle view data button click
function handleViewDataButtonClick(event) {
  const name = event.target.dataset.name;
  localStorage.setItem("selectedName", name);
}

// Start the application
start();
