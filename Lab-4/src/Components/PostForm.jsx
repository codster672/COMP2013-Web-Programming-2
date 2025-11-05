import "../App.css";

function PostForm({ newPost, handleOnChange, handleAddToList }) {
  return (
    <div>
      <form onSubmit={handleAddToList}>
        <label>Title: </label>
        <input
          type="text"
          name="title"
          value={newPost.title}
          onChange={handleOnChange}
        />
        <br />
        <label>Body: </label>
        <input
          type="text"
          name="body"
          value={newPost.body}
          onChange={handleOnChange}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default PostForm;
