import {notFound} from "next/navigation";
import PostWriteForm from "@/components/post/PostWriteForm";
import {getCategories} from "@/lib/categories";
import {getPost} from "@/lib/posts";

const PostWrite = async ({searchParams}: PageProps<"/post/write">) => {
  const {id} = await searchParams;
  const idParam = Array.isArray(id) ? id[0] : id;
  const postId = idParam ? Number(idParam) : undefined;
  if (postId !== undefined && Number.isNaN(postId)) notFound();

  const [categories, post] = await Promise.all([
    getCategories(),
    postId !== undefined ? getPost(postId) : Promise.resolve(null),
  ]);

  return <PostWriteForm categories={categories} initialPost={post ?? undefined}/>;
};

export default PostWrite;
