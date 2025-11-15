"use client";
import { ErrorView, LoadingView } from "@/components/entity-components";
import { useSuspenseWorkflow } from "@/features/workflows/hooks/use-workflows";

export const EditorLoading = () => {
  return <LoadingView message="Loading Workflow editor..." />;
};

export const EditorError = () => {
  return <ErrorView message="Error Loading Workflow editor" />;
};

export const Editor = ({ workflowId }: { workflowId: number }) => {
  const { data: workflow } = useSuspenseWorkflow(workflowId);
  return (
    <div>
      <h1>Editing Workflow: {workflow?.name}</h1>
      {JSON.stringify(workflow, null, 2)}
    </div>
  );
};
