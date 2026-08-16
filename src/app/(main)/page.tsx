import PostFeed from "@/components/post/PostFeed";
import {getPosts} from "@/lib/posts";

// axios는 Next fetch 캐시 계측을 안 타서 빌드 타임에 정적으로 굳어버림 — 매 요청 새로 렌더하도록 강제.
export const dynamic = "force-dynamic";

const Home = async () => {
  const {posts, nextCursorId, hasNext} = await getPosts();

  return <PostFeed initialPosts={posts} initialNextCursorId={nextCursorId} initialHasNext={hasNext}/>;
};

export default Home;
