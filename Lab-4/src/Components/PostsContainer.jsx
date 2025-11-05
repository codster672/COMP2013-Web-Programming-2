import PostCard from "./PostCard";

export default function PostsContainer({ data }) {
  // sort so newest appear first
  const sortedPosts = [...data].sort((a, b) => b.id - a.id);

  return (
    <div>
      {sortedPosts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
