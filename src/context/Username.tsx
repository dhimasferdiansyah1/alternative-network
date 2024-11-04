"use client";
import { createContext } from "react";

const UsernameContext = createContext<{
  username: string | null;
  setUsername: (username: string | null) => void;
}>({
  username: null,
  setUsername: () => {},
});

export default UsernameContext;
