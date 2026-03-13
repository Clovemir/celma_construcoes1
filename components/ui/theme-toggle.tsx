"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  // initialize from localStorage or system preference
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored) {
      setIsDark(stored === "dark");
      document.documentElement.classList.toggle("dark", stored === "dark");
    } else {
      const prefers = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDark(prefers);
      document.documentElement.classList.toggle("dark", prefers);
    }
  }, []);

  function toggle() {
    const newDark = !isDark;
    setIsDark(newDark);
    document.documentElement.classList.toggle("dark", newDark);
    localStorage.setItem("theme", newDark ? "dark" : "light");
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggle}
      aria-label={isDark ? "Ativar tema claro" : "Ativar tema escuro"}
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </Button>
  );
}
