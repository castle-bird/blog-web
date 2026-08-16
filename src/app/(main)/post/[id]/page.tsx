import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import PageTitle from "@/components/layout/PageTitle";

const MOCK_POST = {
  id: 1,
  title: "Next.js App Router로 블로그 만들기",
  content:
      "Next.js App Router는 Server Component를 기본으로 사용한다.\n상태나 이벤트가 필요한 컴포넌트만 \"use client\"를 붙인다.",
  authorNickname: "castlebird",
  categoryName: "Next.js",
  tags: ["nextjs", "react", "app-router"],
  createdAt: "2026-08-01T10:00:00",
};

const PostDetail = () => {
  return (
      <article className="px-4 py-8">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="rounded-full bg-light-gray px-2 py-0.5 font-medium text-foreground">
            {MOCK_POST.categoryName}
          </span>
          {MOCK_POST.tags.map((tag) => (
              <span key={tag} className="text-muted-foreground">
                #{tag}
              </span>
          ))}
        </div>

        <PageTitle textContent={MOCK_POST.title} level="h2" className="mt-2"/>

        <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
          <span>{MOCK_POST.authorNickname}</span>
          <span aria-hidden="true">·</span>
          <span>{new Date(MOCK_POST.createdAt).toLocaleDateString("ko-KR")}</span>
        </div>

        <div className="prose dark:prose-invert mt-8 max-w-none border-t pt-8 break-words">
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
            {MOCK_POST.content}
          </ReactMarkdown>
        </div>
      </article>
  )
}

export default PostDetail;
