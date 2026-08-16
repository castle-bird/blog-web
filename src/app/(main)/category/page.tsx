import PageTitle from "@/components/layout/PageTitle";
import CategoryManager from "@/components/category/CategoryManager";
import { getCategories } from "@/lib/categories";

// axios는 Next fetch 캐시 계측을 안 타서 빌드 타임에 정적으로 굳어버림 — 매 요청 새로 렌더하도록 강제.
export const dynamic = "force-dynamic";

const CategoryPage = async () => {
  const categories = await getCategories();

  return (
      <div className="px-4 py-8">
        <PageTitle textContent="카테고리" level="h1" className="mb-6"/>
        <CategoryManager initialCategories={categories}/>
      </div>
  );
};

export default CategoryPage;
