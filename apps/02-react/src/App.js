import { useEffect, useRef, useState } from "react";

function App() {
  const allUsers = useRef([]);
  const allPosts = useRef([]);

  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [input, setInput] = useState("");

  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    async function fetchData() {
      const usersRes = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const postsRes = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );

      const usersData = await usersRes.json();
      const postsData = await postsRes.json();

      allUsers.current = usersData;
      allPosts.current = postsData;

      setUsers(usersData);
      setPosts(postsData);
    }

    fetchData();
  }, []);

  useEffect(() => {
    function filterUsers() {
      const filteredUsers = allUsers.current.filter((u) =>
        u.name.toLowerCase().includes(input.toLowerCase())
      );
      setUsers(filteredUsers);
    }

    filterUsers();
  }, [input]);

  return (
    <div className="m-0 p-0 bg-[url('https://picsum.photos/1920/1080?grayscale')]">
      <div className="p-10 flex justify-between">
        <div className="p-16 m-16 w-[480px] h-full max-h-[700px] min-h-[500px] bg-[rgba(216, 216, 216, 0.36)] rounded-xl border border-solid border-[#d8d8d84d] bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 bg-gray-50">
          <input
            className="py-0.5 px-2 mb-4 w-full border border-white rounded font-lg focus-visible:outline-0 animate-rainbow bg-white"
            value={input}
            type="search"
            onChange={(e) => setInput(e.target.value)}
          />

          <ul className="">
            {users.map((user) => (
              <li
                className="mb-4 flex items-center justify-between"
                key={user.id}
              >
                {user.name}
                <div className="flex gap-2 items-center">
                  <button className="text-[#0092E4] border border-solid rounded-md border-[#0092E4] px-5 text-sm py-2.5 uppercase font-medium leading-4 transition-all hover:text-white hover:bg-[#0092E4]">
                    View all data
                  </button>

                  <button
                    className="absolute translate-x-[9.5rem] bg-plus w-10 h-10 bg-[#2B2B2B] rounded-md"
                    onClick={() => setCurrentUser(user.id)}
                  ></button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="px-6 py-4 m-16 w-[480px] h-full  min-h-[500px] bg-[rgba(216, 216, 216, 0.36)] rounded-xl border border-solid border-[#d8d8d84d] bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 bg-gray-50">
          {currentUser.length === 0 ? (
            <p className="text-center">
              Select a user to view his posts (plus icon)
            </p>
          ) : (
            <p className="text-center mb-2">
              Posts for user with ID: {currentUser}
            </p>
          )}
          {console.log(currentUser.length)}
          <ul>
            {posts.map((post) => (
              <li className="mb-4 " key={post.id}>
                {currentUser === post.userId ? (
                  <>
                    <h2 className="font-bold text-lg w-full uppercase">
                      {post.title}
                    </h2>
                    <p>{post.body}</p>
                  </>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
