"use client";

import {useState} from "react";
import {X} from "lucide-react";
import {Input} from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {updateCategory, deleteCategory, type Category} from "@/lib/categories";
import {ApiError} from "@/lib/api";

type CategoryItemProps = {
  category: Category;
  editable: boolean;
  onUpdated: (category: Category) => void;
  onDeleted: (id: number) => void;
};

const CategoryItem = ({category, editable, onUpdated, onDeleted}: CategoryItemProps) => {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(category.name);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [editError, setEditError] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const startEditing = () => {
    if (!editable) return;
    setEditError(null);
    setEditing(true);
  };

  const handleSave = async () => {
    const trimmed = name.trim();
    if (!trimmed || trimmed === category.name) {
      setName(category.name);
      setEditing(false);
      return;
    }

    setSaving(true);
    try {
      const updated = await updateCategory(category.id, trimmed);
      onUpdated(updated);
      setEditing(false);
    } catch (err) {
      setEditError(err instanceof ApiError ? err.message : "수정에 실패했습니다.");
      setName(category.name);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deleteCategory(category.id);
      onDeleted(category.id);
    } catch (err) {
      setDeleteError(err instanceof ApiError ? err.message : "삭제에 실패했습니다.");
      setDeleting(false);
    }
  };

  if (editing) {
    return (
        <li className="flex flex-col gap-1">
          <Input
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={handleSave}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSave();
                if (e.key === "Escape") {
                  setName(category.name);
                  setEditing(false);
                }
              }}
              disabled={saving}
              className="h-auto w-32 rounded-full px-3 py-1 text-sm"
          />
          {editError && <p className="text-xs text-destructive">{editError}</p>}
        </li>
    );
  }

  return (
      <li className="flex items-center gap-1 rounded-full bg-light-gray px-3 py-1 text-sm font-medium">
        <button type="button" onClick={startEditing} className={editable ? "cursor-pointer" : undefined}>
          {category.name}
        </button>

        {editable && (
            <AlertDialog>
              <AlertDialogTrigger
                  render={
                    <button
                        type="button"
                        className="cursor-pointer text-muted-foreground hover:text-destructive"
                        aria-label={`${category.name} 삭제`}
                    />
                  }
              >
                <X className="size-3.5"/>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>&quot;{category.name}&quot; 카테고리를 삭제할까요?</AlertDialogTitle>
                  <AlertDialogDescription>사용 중인 카테고리는 삭제할 수 없습니다.</AlertDialogDescription>
                </AlertDialogHeader>
                {deleteError && <p className="text-sm text-destructive">{deleteError}</p>}
                <AlertDialogFooter>
                  <AlertDialogCancel>취소</AlertDialogCancel>
                  <AlertDialogAction variant="destructive" onClick={handleDelete} disabled={deleting}>
                    삭제
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
        )}
      </li>
  );
};

export default CategoryItem;
