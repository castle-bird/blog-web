"use client";

import {useState, type KeyboardEvent} from "react";
import {Search} from "lucide-react";
import {InputGroup, InputGroupAddon, InputGroupInput} from "@/components/ui/input-group";

type PostSearchProps = {
  onSearch: (keyword: string | null) => void;
};

const PostSearch = ({onSearch}: PostSearchProps) => {
  const [value, setValue] = useState("");

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    onSearch(value.trim() || null);
  };

  return (
      <div className="px-4">
        <InputGroup>
          <InputGroupAddon>
            <Search className="size-4"/>
          </InputGroupAddon>
          <InputGroupInput
              placeholder="제목, 내용 검색"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={handleKeyDown}
          />
        </InputGroup>
      </div>
  );
};

export default PostSearch;
