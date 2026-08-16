import Link from "next/link";

type Post = {
  id: number;
  title: string;
  authorNickname: string;
  categoryName: string;
  tags: string[];
  createdAt: string;
};

type PostListProps = {
  posts: Post[];
};

const PostList = ({posts}: PostListProps) => {
  return (
      <ul className="divide-y">
        {posts.map((post) => (
            <li key={post.id}>
              <Link href={`/post/${post.id}`} className="block py-6">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{post.categoryName}</span>
                  {post.tags.length > 0 && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span>{post.tags.join(", ")}</span>
                      </>
                  )}
                </div>
                <h2 className="mt-1 text-lg font-semibold">{post.title}</h2>
                <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{post.authorNickname}</span>
                  <span aria-hidden="true">·</span>
                  <span>{new Date(post.createdAt).toLocaleDateString("ko-KR")}</span>
                </div>
              </Link>
            </li>
        ))}
      </ul>
  );
};

export default PostList;
