"use client";

type TagListProps = {
  tags: string[];
  selectedTag?: string | null;
  onSelectTag?: (tag: string | null) => void;
};

const TagList = ({tags, selectedTag = null, onSelectTag}: TagListProps) => {
  return (
      <ul className="flex flex-wrap gap-2 ">
        {tags.map((tag) => (
            <li key={tag}>
              <button
                  type="button"
                  onClick={() => onSelectTag?.(selectedTag === tag ? null : tag)}
                  className={`rounded-full px-3 py-1 text-sm transition-colors cursor-pointer  ${
                      selectedTag === tag
                          ? "bg-primary text-primary-foreground"
                          : "bg-light-gray text-muted-foreground hover:bg-primary-light hover:text-primary"
                  }`}
              >
                {tag}
              </button>
            </li>
        ))}
      </ul>
  );
};

export default TagList;
