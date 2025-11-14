import Link from "next/link";
import { Button } from "./ui/button";
import {
  AlertTriangleIcon,
  LinkIcon,
  Loader2Icon,
  MoreHorizontalIcon,
  PackageOpenIcon,
  PlusIcon,
  SearchIcon,
  TrashIcon,
} from "lucide-react";
import { Input } from "./ui/input";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
} from "./ui/empty";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardTitle } from "./ui/card";
import {
  DropdownMenuTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";

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

interface StateViewProps {
  message?: string;
}

export const LoadingView = ({ message }: StateViewProps) => {
  return (
    <div className="text-center text-muted-foreground flex flex-col justify-center items-center">
      <PackageOpenIcon className="size-8 mb-4" />
      <div className="flex gap-3 items-center">
        <Loader2Icon className="animate-spin size-4" />
        {message ? message : `Loading...`}
      </div>
    </div>
  );
};

export const ErrorView = ({ message }: StateViewProps) => {
  return (
    <div className="text-center text-muted-foreground flex flex-col justify-center items-center">
      <AlertTriangleIcon className="size-8 mb-4 text-destructive" />
      <div className="flex gap-3 items-center">
        {message ? message : `Something went wrong.`}
      </div>
    </div>
  );
};

interface EmptyViewProps extends StateViewProps {
  entity?: string;
  onNew?: () => void;
}

export const EmptyView = ({ message, onNew, entity }: EmptyViewProps) => {
  return (
    <Empty>
      <EmptyMedia variant={"icon"}>
        <PackageOpenIcon className="size-8" />
      </EmptyMedia>
      <EmptyHeader>No items!</EmptyHeader>
      {!!message && <EmptyDescription>{message}</EmptyDescription>}
      {!!onNew && (
        <EmptyContent>
          <Button onClick={onNew}>Create New {entity ? entity : "item"}</Button>
        </EmptyContent>
      )}
    </Empty>
  );
};

interface EntityListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  getKey?: (item: T, index: number) => string | number;
  emptyView?: React.ReactNode;
  className?: string;
}

export const EntityList = <T,>({
  items,
  renderItem,
  getKey,
  emptyView,
  className,
}: EntityListProps<T>) => {
  if (items.length === 0) {
    return <div className="max-w-sm mx-auto">{emptyView}</div>;
  }
  return (
    <div
      className={cn(
        "flex flex-col gap-4 min-w-full h-full items-start ",
        className
      )}
    >
      {items.map((item, index) => (
        <div key={getKey ? getKey(item, index) : index} className="w-full">
          {renderItem(item, index)}
        </div>
      ))}
    </div>
  );
};

interface EnityItemProps {
  href: string;
  title: string;
  description?: React.ReactNode;
  image?: React.ReactNode;
  actions?: React.ReactNode;
  onRemove?: () => void | Promise<void>;
  isRemoving?: boolean;
  className?: string;
}

export const EntityItem = ({
  href,
  title,
  description,
  image,
  actions,
  onRemove,
  isRemoving,
  className,
}: EnityItemProps) => {
  const handleRemove = async (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isRemoving) return;
    if (onRemove) {
      await onRemove();
    }
  };
  return (
    <Link href={href} prefetch>
      <Card
        className={cn(
          "flex flex-row items-start justify-between p-4 w-full border rounded-xl",
          isRemoving && "opacity-50 pointer-events-none",
          className
        )}
      >
        <CardContent className="flex flex-row items-center gap-3 p-0">
          {image && image}
          <div className="flex flex-col gap-2">
            <CardTitle>{title}</CardTitle>
            {!!description && <CardDescription>{description}</CardDescription>}
          </div>
        </CardContent>
        <div className="flex items-center gap-2">
          {(actions || onRemove) && (
            <div className=" flex gap-x-4 items-center">
              {actions}
              {!!onRemove && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant={"outline"}
                      size="sm"
                      disabled={isRemoving}
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      <MoreHorizontalIcon className="size-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="start"
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  >
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.preventDefault();
                        handleRemove(e as unknown as MouseEvent);
                      }}
                    >
                      <TrashIcon /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          )}
        </div>
      </Card>
    </Link>
  );
};
