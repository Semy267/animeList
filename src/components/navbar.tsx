"use client";
import { useTheme } from "next-themes";
import { Input } from "./ui/input";
import { useEffect, useRef, useState } from "react";
import { Moon, Search, Sun } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { slugify } from "@/lib/slugify";

export default function Navbar() {
  const { resolvedTheme, setTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const search = useRef<HTMLInputElement>(null);
  const router = useRouter();
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };



  const HandleSearch = (event: { preventDefault: () => void; } ) => {
    event.preventDefault();
    const keyword = search.current?.value;
    router.push(`/search?q=${slugify(keyword ?? "")}`);
    
  };

  // Set mounted untuk menghindari hydration error
  useEffect(() => {
    setMounted(true);
  }, []);

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  

  // Hindari mismatch antara SSR dan client
  if (!mounted) return null;

  return (
    <div
      className={`
        fixed top-0 left-0 w-full z-50
        transition-colors duration-300 ease-in-out
        ${
          isScrolled
            ? "backdrop-blur-sm dark:bg-[hsl(240,10%,3.9%)]/60 bg-background-light/60 shadow-md"
            : "bg-transparent"
        }
      `}
    >
      <div className="max-w-[1200px] mx-auto px-4 py-2 flex justify-between items-center">
        <h1 className="dark:text-text-dark text-text-light">Anime App</h1>
        <div className="flex gap-8 w-1/2 justify-end">
          <div className={`flex items-center gap-2 transition-colors duration-300 ease-in-out w-1/2 border px-2 rounded-lg ${isScrolled ? "border" : "border-none"}`}>
            <Input
            ref={search}
              placeholder="Search"
              className={` border-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none ${isScrolled ? "bg-transparent" : "bg-transparent"}`}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  HandleSearch(event);
                }
              }}
            />
            <button onClick={HandleSearch}>
              <Search className="dark:text-primary-dark text-primary-light" />
            </button>
            
          </div>
          <button onClick={toggleTheme} className={`border p-1 rounded-lg transition-colors duration-300 ease-in-out ${isScrolled ? "border" : "border-none"}`}>
            {resolvedTheme === "dark" ? <Sun className="dark:text-primary-dark text-primary-light" /> : <Moon className="dark:text-primary-dark text-primary-light" />}
          </button>
        </div>
      </div>
    </div>
  );
}
