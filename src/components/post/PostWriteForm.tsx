"use client";

import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {useAccessToken, useAuthReady} from "@/lib/auth";
import type {Category} from "@/lib/categories";
import SubTitle from "@/components/layout/SubTitle";

type PostWriteFormProps = {
  categories: Category[];
};

const PostWriteForm = ({categories}: PostWriteFormProps) => {
  const router = useRouter();

  const accessToken = useAccessToken();
  const authReady = useAuthReady();

  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState<number | "">("");
  const [tagsInput, setTagsInput] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (authReady && !accessToken) router.replace("/login");
  }, [authReady, accessToken, router]);

  if (!authReady || !accessToken) return null;

  return (
      <div className="px-4 py-8">
        <div className="flex flex-col gap-4">
          <div>
            <Label htmlFor="title"><SubTitle className="font-medium text-foreground" textContent="제목"/></Label>
            <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="제목을 입력하세요"
                className="mt-1"
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="category"><SubTitle className="font-medium text-foreground" textContent="카테고리"/></Label>
              <Select
                  items={categories.map((category) => ({value: category.id, label: category.name}))}
                  value={categoryId === "" ? null : categoryId}
                  onValueChange={(value) => setCategoryId(value ?? "")}
              >
                <SelectTrigger id="category" className="mt-1 w-full">
                  <SelectValue placeholder="선택"/>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1">
              <Label htmlFor="tags"><SubTitle className="font-medium text-foreground" textContent="태그"/></Label>
              <Input
                  id="tags"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="쉼표로 구분 (예: nextjs, react)"
                  className="mt-1"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="content"><SubTitle className="font-medium text-foreground" textContent="본문"/></Label>
              <Textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="마크다운으로 작성하세요"
                  className="mt-1 min-h-125 font-mono"
              />
            </div>

            <div>
              <Label><SubTitle className="font-medium text-foreground" textContent="미리보기"/></Label>
              <div
                  className="prose prose-sm dark:prose-invert mt-1 min-h-125 max-w-none rounded-lg border border-input px-2.5 py-2 break-words">
                <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
                  {content}
                </ReactMarkdown>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="button">등록</Button>
          </div>
        </div>
      </div>
  );
};

export default PostWriteForm;
