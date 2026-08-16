import PostList from "@/components/post/PostList";
import TagList from "@/components/post/TagList";
import SubTitle from "@/components/layout/SubTitle";
import PageTitle from "@/components/layout/PageTitle";

const MOCK_POSTS = [
  {
    id: 1,
    title: "Next.js App Router로 블로그 만들기",
    authorNickname: "castlebird",
    categoryName: "Next.js",
    tags: ["nextjs", "react", "app-router"],
    createdAt: "2026-08-01T10:00:00",
  },
  {
    id: 2,
    title: "Spring Security JWT 인증 흐름 정리",
    authorNickname: "castlebird",
    categoryName: "Spring",
    tags: ["spring", "security", "jwt"],
    createdAt: "2026-07-28T14:30:00",
  },
  {
    id: 3,
    title: "Tailwind CSS v4 마이그레이션 후기",
    authorNickname: "castlebird",
    categoryName: "CSS",
    tags: ["tailwind", "css"],
    createdAt: "2026-07-20T09:15:00",
  },
  {
    id: 4,
    title: "Tailwind CSS v4 마이그레이션 후기",
    authorNickname: "castlebird",
    categoryName: "CSS",
    tags: ["tailwind", "css"],
    createdAt: "2026-07-20T09:15:00",
  },
  {
    id: 5,
    title: "Tailwind CSS v4 마이그레이션 후기",
    authorNickname: "castlebird",
    categoryName: "CSS",
    tags: ["tailwind", "css"],
    createdAt: "2026-07-20T09:15:00",
  },
  {
    id: 6,
    title: "Tailwind CSS v4 마이그레이션 후기",
    authorNickname: "castlebird",
    categoryName: "CSS",
    tags: ["tailwind", "css"],
    createdAt: "2026-07-20T09:15:00",
  },
  {
    id: 7,
    title: "Tailwind CSS v4 마이그레이션 후기",
    authorNickname: "castlebird",
    categoryName: "CSS",
    tags: ["tailwind", "css"],
    createdAt: "2026-07-20T09:15:00",
  },
  {
    id: 8,
    title: "Tailwind CSS v4 마이그레이션 후기",
    authorNickname: "castlebird",
    categoryName: "CSS",
    tags: ["tailwind", "css"],
    createdAt: "2026-07-20T09:15:00",
  },
];

const MOCK_TAGS = ["nextjs", "react", "app-router", "spring", "security", "jwt", "tailwind", "css"];

const Home = () => {
  return (
    <div className="flex gap-8 px-4 py-8">
      <div className="min-w-0 flex-1">
        <PostList posts={MOCK_POSTS}/>
      </div>

      <aside className="w-80 shrink-0">
        <PageTitle textContent="태그" className="text-sm mb-4"/>
        <TagList tags={MOCK_TAGS}/>
      </aside>
    </div>
  );
};

export default Home;
