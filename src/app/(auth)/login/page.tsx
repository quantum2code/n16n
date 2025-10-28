import { LoginForm } from "@/features/auth/components/login-form";
import { requireUnAuth } from "@/lib/auth-utils";
import React from "react";

const Page = async () => {
  await requireUnAuth();
  return (
    <div className="flex flex-col items-center">
      <LoginForm />
    </div>
  );
};

export default Page;
