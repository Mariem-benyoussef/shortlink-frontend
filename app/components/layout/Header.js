"use client";
import { Input } from "../ui/Input";
import { Search } from "../ui/Search";
import { Avatar, AvatarFallback } from "../ui/Avatar";
import { Button } from "../ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/Dropdown-menu";
import { LogOut, Settings } from "lucide-react";
import ThemeToggle from "./ToggleTheme";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/app/redux/slices/authSlice";
export default function Header() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const getInitials = (name) => {
    if (!name) return "";
    const names = name.split(" ");
    return names
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };
  const handleLogout = () => {
    dispatch(logout());
    router.push("/auth/login");
  };
  return (
    <header className="border-b sticky top-0 bg-background z-40">
      <div className="flex h-16 items-center px-4 gap-4">
        <div className="flex-1">
          <form className="flex items-center">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground dark:text-muted-foreground" />
              <Input
                placeholder="Rechercher"
                className="pl-8 bg-background dark:bg-darkBackground text-foreground dark:text-darkForeground border border-gray-300 dark:border-gray-600 focus:ring-[#4169E1] focus:border-[#4169E1]"
              />
            </div>
          </form>
        </div>
        {/* 
        <ThemeToggle /> */}
        <Button variant="ghost" className="rounded-full" size="icon">
          <span className="sr-only">Notifications</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
            <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
          </svg>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer">
              <AvatarFallback>{user && getInitials(user.name)}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem className="flex flex-col items-start">
              <span className="font-semibold">{user?.name}</span>{" "}
              <span className="text-sm text-muted-foreground">
                {user?.email}
              </span>{" "}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/auth/profile")}>
              <Settings className="w-5 h-5 mr-3" />
              Gestion du profil
            </DropdownMenuItem>
            <DropdownMenuItem>
              <ThemeToggle />
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="w-5 h-5 mr-3" />
              Déconnexion
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
