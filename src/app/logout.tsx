"use client";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/authClient";
import React from "react";

const LogOut = () => {
  return (
    <div>
      <Button onClick={() => authClient.signOut()}>Log out</Button>
    </div>
  );
};

export default LogOut;
