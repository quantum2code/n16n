"use client";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import React from "react";

const Client = () => {
  const trpc = useTRPC();
  const { data: users } = useSuspenseQuery(trpc.getUsers.queryOptions());
  return (
    <div>
      <ul>
        {users.map((user) => (
          <li key={user.id + user.name}>{JSON.stringify(user)}</li>
        ))}
      </ul>
    </div>
  );
};

export default Client;
