// Use const instead of let for variables that won't be reassigned
const input = document.querySelector("input");
const ul = document.querySelector("ul");
const button = document.getElementById("myButton");

let ALL_USERS;
let ALL_POSTS;
let ALL_COMMENTS;

// Fetch data and initialize the application
async function start() {
  const [usersRes, postsRes, commentsRes] = await Promise.all([
    fetch("https://jsonplaceholder.typicode.com/users"),
    fetch("https://jsonplaceholder.typicode.com/posts"),
    fetch("https://jsonplaceholder.typicode.com/comments"),
  ]);

  ALL_USERS = await usersRes.json();
  ALL_POSTS = await postsRes.json();
  ALL_COMMENTS = await commentsRes.json();

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
          <div class="flex"> 
            <h2 class="post-header">${post.title}</h2>
            <button id="comments-btn-${post.id}" class="button-comments">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="plus"><path fill="#0092E4" d="M19,11H13V5a1,1,0,0,0-2,0v6H5a1,1,0,0,0,0,2h6v6a1,1,0,0,0,2,0V13h6a1,1,0,0,0,0-2Z"></path></svg> 
            </button>
          </div>
            <p>${post.body}</p>
          </li>`
      )
      .join("");
    postsUl.innerHTML += html;
  }

  // Attach event listeners to the comment buttons
  data.forEach((post) => {
    const commentsBtn = document.getElementById(`comments-btn-${post.id}`);
    commentsBtn.addEventListener("click", () => renderComments(post.id));
  });
}

function renderComments(postId) {
  const postComments = ALL_COMMENTS.filter(
    (comment) => comment.postId === postId
  );

  const commentsUl = document.getElementById("comments");
  commentsUl.innerHTML = `<p class="text-center">Comments for post with ID: ${postId}</p>`;
  const html = postComments
    .map(
      (comment) =>
        `<li class="list-item-comment">
          <h3>${comment.name}</h3>
          <p>${comment.body}</p>
          <p>Email: ${comment.email}</p>
        </li>`
    )
    .join("");
  commentsUl.innerHTML += html;
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
