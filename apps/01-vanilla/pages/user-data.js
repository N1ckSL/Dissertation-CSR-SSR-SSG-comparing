(async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = await response.json();

    // Save the fetched users in a variable
    const fetchedUsers = users;

    console.log(fetchedUsers);

    // HTML template for the user page
    const userPageTemplate = `
        <div class="user">
          <h2 class="name"></h2>
          <p class="username"></p>
          <p class="email"></p>
          <p class="phone"></p>
          <p class="company"></p>
        </div>
      `;

    // Function to fetch user data from the API
    function fetchUserData(user) {
      const userData = fetchedUsers.find((u) => u.name === user);
      if (!userData) {
        console.error(`User '${user}' not found.`);
        return;
      }

      // Generate the user page (same code as mentioned in point 1)

      const glassElement = document.querySelector(".glass");
      glassElement.innerHTML = userPageTemplate;

      const nameElement = glassElement.querySelector(".name");
      const usernameElement = glassElement.querySelector(".username");
      const emailElement = glassElement.querySelector(".email");
      const phoneElement = glassElement.querySelector(".phone");
      const companyElement = glassElement.querySelector(".company");

      nameElement.textContent = userData.name;
      usernameElement.textContent = `Username: ${userData.username}`;
      emailElement.textContent = `Email: ${userData.email}`;
      phoneElement.textContent = `Phone: ${userData.phone}`;
      companyElement.textContent = `Company: ${userData.company.name}`;

      //   document.body.appendChild(glassElement);
    }

    // Get the saved name from localStorage
    const selectedName = localStorage.getItem("selectedName");

    // Check if the saved name exists
    if (selectedName) {
      fetchUserData(selectedName);
    } else {
      console.error("No saved name found in localStorage.");
    }
  } catch (error) {
    console.error("Error fetching users:", error);
  }
})();
