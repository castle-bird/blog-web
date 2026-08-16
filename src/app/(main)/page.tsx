import PostList from "@/components/post/PostList";
import TagList from "@/components/post/TagList";
import PageTitle from "@/components/layout/PageTitle";
import {getPosts} from "@/lib/posts";

const Home = async () => {
  const {posts} = await getPosts();
  const tags = [...new Set(posts.flatMap((post) => post.tags))];

  return (
      <div className="flex gap-8 px-4 py-8">
        <div className="min-w-0 flex-1">
          {posts.length === 0 ? (
              <p className="text-sm text-muted-foreground">등록된 게시글이 없습니다.</p>
          ) : (
              <PostList posts={posts}/>
          )}
        </div>

        <aside className="sticky top-22.25 h-fit w-80 shrink-0">
          <PageTitle textContent="태그" className="mb-4 text-sm"/>
          <TagList tags={tags}/>
        </aside>
      </div>
  );
};

export default Home;
