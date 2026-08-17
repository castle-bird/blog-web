"use client";

import {useState} from "react";
import {useAccessToken} from "@/lib/auth";
import {createCategory, type Category} from "@/lib/categories";
import {ApiError} from "@/lib/api";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import CategoryItem from "@/components/category/CategoryItem";

type CategoryManagerProps = {
  initialCategories: Category[];
};

const CategoryManager = ({initialCategories}: CategoryManagerProps) => {
  const accessToken = useAccessToken();
  const [categories, setCategories] = useState(initialCategories);
  const [name, setName] = useState("");
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAdd = async () => {
    const trimmed = name.trim();
    if (!trimmed) return;

    setAdding(true);
    setError(null);
    try {
      const category = await createCategory(trimmed);
      setCategories((prev) => [...prev, category]);
      setName("");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "추가에 실패했습니다.");
    } finally {
      setAdding(false);
    }
  };

  return (
      <div>
        {accessToken && (
            <div className="mb-6 flex items-center gap-2">
              <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAdd()}
                  placeholder="새 카테고리 이름"
                  className="max-w-60"
              />
              <Button type="button" onClick={handleAdd} disabled={adding}>
                추가
              </Button>
              {error && <p className="text-sm text-destructive">{error}</p>}
            </div>
        )}

        {categories.length === 0 ? (
            <p className="text-sm text-muted-foreground">등록된 카테고리가 없습니다.</p>
        ) : (
            <ul className="flex flex-wrap gap-2">
              {categories.map((category) => (
                  <CategoryItem
                      key={category.id}
                      category={category}
                      editable={!!accessToken}
                      onUpdated={(updated) =>
                          setCategories((prev) => prev.map((c) => (c.id === updated.id ? updated : c)))
                      }
                      onDeleted={(id) => setCategories((prev) => prev.filter((c) => c.id !== id))}
                  />
              ))}
            </ul>
        )}
      </div>
  );
};

export default CategoryManager;
