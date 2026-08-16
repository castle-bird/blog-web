import PostWriteForm from "@/components/post/PostWriteForm";
import {getCategories} from "@/lib/categories";

const PostWrite = async () => {
  const categories = await getCategories();

  return <PostWriteForm categories={categories}/>;
};

export default PostWrite;
