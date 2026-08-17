import Link from "next/link";
import type {Post} from "@/lib/posts";

type PostListProps = {
  posts: Post[];
};

const PostList = ({posts}: PostListProps) => {
  return (
      <ul className="divide-y">
        {posts.map((post) => (
            <li key={post.id} >
              <Link href={`/post/${post.id}`}
                    className="block py-6 px-4 hover:bg-light-gray transition-colors duration-600 rounded-3xl my-2">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="rounded-full bg-light-gray px-2 py-0.5 font-medium text-foreground">
                    {post.categoryName}
                  </span>
                  {post.tags.map((tag) => (
                      <span key={tag} className="text-muted-foreground">
                        #{tag}
                      </span>
                  ))}
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
