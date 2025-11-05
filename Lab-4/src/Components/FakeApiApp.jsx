import { useEffect, useState } from "react";
import PostForm from "./PostForm";
import PostsContainer from "./PostsContainer";

export default function FakeApiApp() {
  const URL = "https://jsonplaceholder.typicode.com/posts";
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newPost, setNewPost] = useState({ title: "", body: "" });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const response = await fetch(URL);
    const posts = await response.json();
    setData(posts);
    setIsLoading(false);
  };

  const handleOnChange = (e) => {
    setNewPost((prevPost) => {
      return {
        ...prevPost,
        [e.target.name]: e.target.value,
      };
    });
  };

    // this function will handle adding a new post to the list
  const handleAddToList = (e) => {
    e.preventDefault();

    // check if title or body are empty
    if (newPost.title === "") {
      alert("Please add a title before submitting!");
    } else if (newPost.body === "") {
      alert("Please add a body before submitting!");
    } else {
      // add new post to the data list
      setData((prevList) => {
        return [newPost, ...prevList]; // adds new post to the top of the list
      });

      // reset the input fields
      setNewPost({
        title: "",
        body: "",
      });
    }
  };

  return (
    <div>
      <h1>Fake API Posts</h1>
      {isLoading && <h1>Loading...</h1>}
      <PostForm
        newPost={newPost}
        handleOnChange={handleOnChange}
        handleAddToList={handleAddToList}
      />
      <PostsContainer data={data} />
    </div>
  );
}
