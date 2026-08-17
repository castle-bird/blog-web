"use client";

import {useState} from "react";
import {useRouter} from "next/navigation";
import Link from "next/link";
import {Button} from "@/components/ui/button";
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
import {useAccessToken} from "@/lib/auth";
import {deletePost} from "@/lib/posts";
import {ApiError} from "@/lib/api";

type PostActionsProps = {
  postId: number;
};

const PostActions = ({postId}: PostActionsProps) => {
  const router = useRouter();
  const accessToken = useAccessToken();
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!accessToken) return null;

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deletePost(postId);
      router.refresh();
      router.push("/");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "삭제에 실패했습니다.");
      setDeleting(false);
    }
  };

  return (
      <>
        <Button variant="outline" nativeButton={false} render={<Link href={`/post/write?id=${postId}`}/>}>
          수정
        </Button>

        <AlertDialog>
          <AlertDialogTrigger render={<Button variant="destructive"/>}>
            삭제
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>게시글을 삭제할까요?</AlertDialogTitle>
              <AlertDialogDescription>삭제하면 되돌릴 수 없습니다.</AlertDialogDescription>
            </AlertDialogHeader>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <AlertDialogFooter>
              <AlertDialogCancel>취소</AlertDialogCancel>
              <AlertDialogAction variant="destructive" onClick={handleDelete} disabled={deleting}>
                삭제
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
  );
};

export default PostActions;
