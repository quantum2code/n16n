"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  useSuspenseWorkflow,
  useUpdateWorkflowName,
} from "@/features/workflows/hooks/use-workflows";
import { SaveIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export const EditorSaveButton = ({ workflowId }: { workflowId: number }) => {
  return (
    <Button disabled={false} onClick={() => {}} className="ml-auto">
      <SaveIcon className="size-4" />
      Save
    </Button>
  );
};

export const EditorNameInput = ({ workflowId }: { workflowId: number }) => {
  const { data: workflow } = useSuspenseWorkflow(Number(workflowId));
  const updateWorflow = useUpdateWorkflowName();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(workflow?.name || "");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (workflow?.name) {
      setName(workflow.name);
    }
  }, [workflow?.name]);
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleSave = async () => {
    if (name.trim() && name == workflow?.name) {
      setIsEditing(false);
      return;
    }
    try {
      await updateWorflow.mutateAsync({ id: workflowId, name: name.trim() });
      setIsEditing(false);
    } catch (error) {
      setName(workflow?.name || "");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      setName(workflow?.name || "");
      setIsEditing(false);
    }
  };
  if (isEditing) {
    return (
      <Input
        disabled={updateWorflow.isPending}
        ref={inputRef}
        value={name}
        onChange={(e) => setName(e.target.value)}
        onBlur={handleSave}
        onKeyDown={handleKeyDown}
        className="w-auto min-w-[100px] h-7"
      />
    );
  }
  return (
    <BreadcrumbItem
      onClick={() => setIsEditing(true)}
      className="cursor-pointer hover:text-foreground transition-colors"
    >
      {workflow?.name}
    </BreadcrumbItem>
  );
};

export const EditorBreadcrumbs = ({ workflowId }: { workflowId: number }) => {
  // Placeholder for actual breadcrumb implementation
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/" prefetch>
              Workflows
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className=" translate-y-0.5" />
        <EditorNameInput workflowId={workflowId} />
      </BreadcrumbList>
    </Breadcrumb>
  );
};
export const EditorHeader = ({ workflowId }: { workflowId: number }) => {
  return (
    <header className="shrink-0 h-14 flex px-4 items-center bg-background">
      <SidebarTrigger />
      <div className="flex flex-row items-center pl-4 justify-between w-full">
        <EditorBreadcrumbs workflowId={workflowId} />
        <EditorSaveButton workflowId={workflowId} />
      </div>
    </header>
  );
};
