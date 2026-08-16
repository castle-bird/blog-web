"use client";

import {useEffect, useRef, useState} from "react";
import PostList from "@/components/post/PostList";
import TagList from "@/components/post/TagList";
import PageTitle from "@/components/layout/PageTitle";
import Loading from "@/components/common/Loading";
import {getPosts, type Post} from "@/lib/posts";

type PostFeedProps = {
  initialPosts: Post[];
  initialNextCursorId: number | null;
  initialHasNext: boolean;
};

const PostFeed = ({initialPosts, initialNextCursorId, initialHasNext}: PostFeedProps) => {
  const [posts, setPosts] = useState(initialPosts);
  const [cursorId, setCursorId] = useState(initialNextCursorId);
  const [hasNext, setHasNext] = useState(initialHasNext);
  const [loading, setLoading] = useState(false);
  const loadingRef = useRef(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !hasNext) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || loadingRef.current || cursorId === null) return;

      loadingRef.current = true;
      setLoading(true);

      getPosts(cursorId)
          .then((res) => {
            setPosts((prev) => [...prev, ...res.posts]);
            setCursorId(res.nextCursorId);
            setHasNext(res.hasNext);
          })
          .catch(() => {
            // ponytail: 스크롤 중 실패하면 재시도 없이 그냥 멈춤. 재시도 큐 필요해지면 추가.
            setHasNext(false);
          })
          .finally(() => {
            loadingRef.current = false;
            setLoading(false);
          });
    }, {rootMargin: "200px"});

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasNext, cursorId]);

  const tags = [...new Set(posts.flatMap((post) => post.tags))];

  return (
      <div className="flex gap-8 px-4 py-8">
        <div className="min-w-0 flex-1">
          {posts.length === 0 ? (
              <p className="text-sm text-muted-foreground">등록된 게시글이 없습니다.</p>
          ) : (
              <>
                <PostList posts={posts}/>
                {hasNext && (
                    <div ref={sentinelRef} className="py-4">
                      {loading && <Loading message="게시글을 더 불러오는 중..."/>}
                    </div>
                )}
              </>
          )}
        </div>

        <aside className="sticky top-22.25 h-fit w-80 shrink-0">
          <PageTitle textContent="태그" className="mb-4 text-sm"/>
          <TagList tags={tags}/>
        </aside>
      </div>
  );
};

export default PostFeed;
