import PageTitle from "@/components/layout/PageTitle";
import { getCategories } from "@/lib/categories";

const CategoryPage = async () => {
  const categories = await getCategories();

  return (
      <div className="px-4 py-8">
        <PageTitle textContent="카테고리" level="h1"/>

        {categories.length === 0 ? (
            <p className="mt-6 text-sm text-muted-foreground">등록된 카테고리가 없습니다.</p>
        ) : (
            <ul className="mt-6 flex flex-wrap gap-2">
              {categories.map((category) => (
                  <li key={category.id} className="rounded-full bg-light-gray px-3 py-1 text-sm font-medium">
                    {category.name}
                  </li>
              ))}
            </ul>
        )}
      </div>
  );
};

export default CategoryPage;
