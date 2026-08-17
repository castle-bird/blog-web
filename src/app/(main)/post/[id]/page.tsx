import {notFound} from "next/navigation";
import type {Metadata} from "next";
import {Eye} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import PageTitle from "@/components/layout/PageTitle";
import PostActions from "@/components/post/PostActions";
import {ApiError} from "@/lib/api";
import {getPost} from "@/lib/posts";

export const dynamic = "force-dynamic";

const resolvePost = async (id: string) => {
  const postId = Number(id);
  if (Number.isNaN(postId)) notFound();

  return getPost(postId).catch((err) => {
    if (err instanceof ApiError && err.code === "POST_NOT_FOUND") notFound();
    throw err;
  });
};

export const generateMetadata = async ({params}: PageProps<"/post/[id]">): Promise<Metadata> => {
  const {id} = await params;
  const post = await resolvePost(id);

  return {
    title: post.title,
    description: post.content.slice(0, 100),
  };
};

const PostDetail = async ({params}: PageProps<"/post/[id]">) => {
  const {id} = await params;
  const post = await resolvePost(id);

  return (
      <article className="px-4 py-8">
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

        <PageTitle textContent={post.title} level="h2" className="mt-2"/>

        <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
          <span>{post.authorNickname}</span>
          <span aria-hidden="true">·</span>
          <span>{new Date(post.createdAt).toLocaleDateString("ko-KR")}</span>
          <span aria-hidden="true">·</span>
          <span className="flex items-center gap-1">
            <Eye className="size-3.5"/>
            {post.viewCount}
          </span>
        </div>

        <div className="prose dark:prose-invert mt-8 max-w-none border-t pt-8 break-words">
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
            {post.content}
          </ReactMarkdown>
        </div>

        <div className="mt-8 flex justify-end gap-2 border-t pt-8">
          <PostActions postId={post.id}/>
        </div>
      </article>
  )
}

export default PostDetail;
