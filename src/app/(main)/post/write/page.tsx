import PostWriteForm from "@/components/post/PostWriteForm";
import {getCategories} from "@/lib/categories";
import {getPost} from "@/lib/posts";

const PostWrite = async ({searchParams}: PageProps<"/post/write">) => {
  const {id} = await searchParams;
  const postId = Array.isArray(id) ? id[0] : id;

  const [categories, post] = await Promise.all([
    getCategories(),
    postId ? getPost(Number(postId)) : Promise.resolve(null),
  ]);

  return <PostWriteForm categories={categories} initialPost={post ?? undefined}/>;
};

export default PostWrite;
