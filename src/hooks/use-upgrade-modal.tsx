import { UpgradeModal } from "@/components/upgrade-modal";
import { TRPCClientError } from "@trpc/client";
import { useState } from "react";

export const useUpgradeModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleError = (err: unknown) => {
    if (err instanceof TRPCClientError) {
      if (err.data.code === "FORBIDDEN") {
        setIsOpen(true);
        return true;
      }
      return false;
    }
  };

  const modal = <UpgradeModal open={isOpen} onOpenChange={setIsOpen} />;

  return { handleError, modal };
};
