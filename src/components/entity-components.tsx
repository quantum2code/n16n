import Link from "next/link";
import { Button } from "./ui/button";
import { LinkIcon, PlusIcon, SearchIcon } from "lucide-react";
import { Input } from "./ui/input";

type EntityHeaderProps = {
  title: string;
  description: string;
  newButtonLabel?: string;
  disabled?: boolean;
  isCreating?: boolean;
} & (
  | { onNew: () => void; newButtonHref?: never }
  | { onNew?: never; newButtonHref: string }
  | { onNew?: never; newButtonHref?: never }
);
export const EntityHeader = ({
  title,
  description,
  newButtonLabel,
  disabled,
  isCreating,
  onNew,
  newButtonHref,
}: EntityHeaderProps) => {
  return (
    <div className="p-3 ">
      <div className="z-20 flex justify-between w-full  border-3 border-orange-200 squircle checkerboard-conic overflow-hidden">
        <div className="flex flex-col w-[70%] gap-1 pl-6 py-4 bg-linear-90 from-orange-100 from-50% to-transparent">
          <h1 className="text-2xl font-bold text-black/90">{title}</h1>
          <p className="text-sm text-black/70 font-medium">{description}</p>
        </div>
        <div className="pr-4 flex-1 justify-end bg-linear-90 to-orange-100 to-90% from-transparent flex items-center">
          {onNew && !newButtonHref && (
            <Button disabled={disabled && isCreating} onClick={onNew}>
              <PlusIcon />
              {newButtonLabel}
            </Button>
          )}
          {newButtonHref && !onNew && (
            <Button disabled={disabled && isCreating} variant="outline" asChild>
              <Link href={newButtonHref}>
                <LinkIcon />
                {newButtonLabel}
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

type EntityContainerProps = {
  children: React.ReactNode;
  header?: React.ReactNode;
  search?: React.ReactNode;
  pagination?: React.ReactNode;
};

export const EntityContainer = ({
  header,
  search,
  children,
  pagination,
}: EntityContainerProps) => {
  return (
    <div className="flex flex-col min-h-0 h-full">
      {header && <div className="flex-none">{header}</div>}
      {search && <div className="flex-none px-4 py-2">{search}</div>}
      <div className="flex-1 flex justify-center items-center overflow-auto px-4 py-2">
        {children}
      </div>
      {pagination && (
        <div className="flex-none px-4 py-3 border-t bg-gray-50">
          {pagination}
        </div>
      )}
    </div>
  );
};

interface EntitySearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

export const EntitySearch = ({
  value,
  onChange,
  placeholder = "Search",
}: EntitySearchProps) => {
  return (
    <div className="relative ml-auto w-full max-w-sm">
      <SearchIcon className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search"
        className="pl-10 pr-3 py-2 w-full border-border"
      />
    </div>
  );
};

interface EntityPaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
}

export const EntityPagination = ({
  page,
  totalPages,
  onPageChange,
  disabled,
}: EntityPaginationProps) => {
  return (
    <div className="flex items-center justify-between space-x-2 py-4 ">
      <span className="text-sm text-muted-foreground">
        Page {totalPages === 0 ? 0 : page} of {totalPages}
      </span>
      <div className="flex gap-3">
        <Button
          variant="outline"
          size="sm"
          disabled={disabled || page <= 1}
          onClick={() => onPageChange(page - 1)}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          disabled={disabled || page >= totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};
