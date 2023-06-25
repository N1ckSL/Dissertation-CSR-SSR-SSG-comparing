import * as React from 'react';

const Home = () => {
  const allUsers = React.useRef([]);
  const allPosts = React.useRef([]);
  const allComments = React.useRef([]);

  const [input, setInput] = React.useState('');
  const [currentUser, setCurrentUser] = React.useState('');
  const [selectedPostId, setSelectedPostId] = React.useState(null);

  const [data, setData] = React.useState({
    users: [],
    posts: [],
    comments: [],
    postComments: [],
  });

  React.useEffect(() => {
    async function fetchData() {
      const [usersRes, postsRes, commentsRes] = await Promise.all([
        fetch('https://jsonplaceholder.typicode.com/users'),
        fetch('https://jsonplaceholder.typicode.com/posts'),
        fetch('https://jsonplaceholder.typicode.com/comments'),
      ]);

      const usersData = await usersRes.json();
      const postsData = await postsRes.json();
      const commentsData = await commentsRes.json();

      allUsers.current = usersData;
      allPosts.current = postsData;
      allComments.current = commentsData;

      setData({
        users: usersData,
        posts: postsData,
        comments: commentsData,
        postComments: data.postComments,
      });
    }

    fetchData();
  }, [data.postComments]);

  React.useEffect(() => {
    function filterUsers() {
      const filteredUsers = allUsers.current.filter((user) =>
        user.name.toLowerCase().includes(input.toLowerCase())
      );

      setData((prevData) => ({
        ...prevData,
        users: filteredUsers,
      }));
    }

    const debounceTimer = setTimeout(filterUsers, 300);

    return () => clearTimeout(debounceTimer);
  }, [input]);

  const handleUserClick = (userId) => {
    setCurrentUser(userId);
    setSelectedPostId(null);

    setData((prevData) => ({
      ...prevData,
      postComments: [],
    }));
  };

  const handlePostClick = async (postId) => {
    setSelectedPostId(postId);

    const commentsRes = await fetch(
      `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
    );
    const commentsData = await commentsRes.json();

    setData((prevData) => ({
      ...prevData,
      postComments: commentsData,
    }));
  };

  const { users, posts, postComments } = data;

  return (
    <div className="m-0 p-0 bg-[url('https://picsum.photos/1920/1080?grayscale')] bg-cover">
      <div className="p-10 flex justify-between">
        <div className="p-2 lg:p-16 m-16 w-[480px] h-full min-h-[500px] bg-[rgba(216, 216, 216, 0.36)] rounded-xl border border-solid border-[#d8d8d84d] bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 bg-gray-50">
          <input
            className="py-0.5 px-2 mb-4 w-full border border-white rounded font-lg focus-visible:outline-0 animate-rainbow bg-white"
            value={input}
            type="search"
            placeholder="Search by name"
            onChange={(e) => setInput(e.target.value)}
          />

          <ul>
            {users.map((user) => (
              <li
                className="mb-4 flex items-center justify-between"
                key={user.id}
              >
                {user.name}
                <div className="flex gap-2 items-center">
                  <button
                    className="relative text-[#0092E4] border border-solid rounded-md border-[#0092E4] px-5 text-sm py-2.5 uppercase font-medium leading-4 transition-all hover:text-white hover:bg-[#0092E4]"
                    onClick={() => handleUserClick(user.id)}
                  >
                    View all data
                  </button>

                  <button
                    className="absolute translate-x-[9.5rem] bg-plus w-10 h-10 bg-[#2B2B2B] rounded-md"
                    onClick={() => setCurrentUser(user.id)}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="px-6 py-4 m-16 w-[480px] h-full  min-h-[500px] bg-[rgba(216, 216, 216, 0.36)] rounded-xl border border-solid border-[#d8d8d84d] bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 bg-gray-50">
          {currentUser ? (
            <p className="text-center mb-2">
              Posts for user with ID: {currentUser}
            </p>
          ) : (
            <p className="text-center">
              Select a user to view their posts (plus icon)
            </p>
          )}

          <ul>
            {posts
              .filter((post) => currentUser === post.userId)
              .map((post) => (
                <li className="mb-4" key={post.id}>
                  <div className="flex justify-between items-center animate-rainbow-bottom pb-2">
                    <h2 className="font-bold text-lg w-full uppercase">
                      {post.title}
                    </h2>
                    <button
                      className="w-12 h-12 p-2 bg-[#2c2c2c] rounded-md"
                      onClick={() => handlePostClick(post.id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        id="plus"
                      >
                        <path
                          fill="#0092E4"
                          d="M19,11H13V5a1,1,0,0,0-2,0v6H5a1,1,0,0,0,0,2h6v6a1,1,0,0,0,2,0V13h6a1,1,0,0,0,0-2Z"
                        ></path>
                      </svg>
                    </button>
                  </div>
                  <p className="mt-2">{post.body}</p>
                </li>
              ))}
          </ul>
        </div>

        <div className="px-6 py-4 m-16 w-[480px] h-full  min-h-[500px] bg-[rgba(216, 216, 216, 0.36)] rounded-xl border border-solid border-[#d8d8d84d] bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 bg-gray-50">
          {selectedPostId ? (
            <p className="text-center mb-2">
              Comments for post with ID: {selectedPostId}
            </p>
          ) : (
            <p className="text-center">
              Select a POST to view their comments (plus icon)
            </p>
          )}

          {selectedPostId && (
            <ul>
              {postComments.map((comment) => (
                <li
                  className="mb-4 animate-rainbow-thin border rounded-md p-2"
                  key={comment.id}
                >
                  <p className="font-bold text-xl mb-2">{comment.email}</p>
                  <p className="font-medium text-lg leading-none	uppercase mb-4">
                    {comment.name}
                  </p>
                  <p>{comment.body}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
