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
import { Bell, LogOut, Settings } from "lucide-react";

export default function Header() {
  return (
    <header className="border-b sticky top-0 bg-background z-40">
      <div className="flex h-16 items-center px-4 gap-4">
        <div className="flex-1">
          <form className="flex items-center">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Rechercher" className="pl-8" />
            </div>
          </form>
        </div>
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
              <AvatarFallback>MO</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={() => alert("Ouvrir les paramètres")}>
              <Settings className="w-5 h-5 mr-3" />
              Paramètres
            </DropdownMenuItem>
            {/* <DropdownMenuItem onClick={() => alert("Changer de compte")}>
              <Bell className="w-5 h-5 mr-3" />
              Notifications
            </DropdownMenuItem> */}
            <DropdownMenuItem onClick={() => alert("Déconnexion")}>
              <LogOut className="w-5 h-5 mr-3" />
              Déconnexion
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
