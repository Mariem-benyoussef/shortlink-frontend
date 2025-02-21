import Link from "next/link";
import { Home, PlusCircle, Link2, LineChart, History } from "lucide-react";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/Sheet";
import { Button } from "../ui/Button";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();
  const SidebarContent = () => (
    <>
      <div className="h-full bg-[#F7F9F9] p-4">
        <div className="px-4 text-xl font-bold text-[#FF1493]">TuniLink</div>
        <nav className="flex-1 px-2 mt-6 space-y-1">
          <Link
            href="/shortlinks"
            className={`flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground group ${
              pathname === "/shortlinks" ? "bg-[#EFF6FF] text-blue-600" : ""
            }`}
          >
            <Home className="w-5 h-5 mr-3" />
            Accueil
          </Link>
          <Link
            href="/shortlinks/create"
            className={`flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground group ${
              pathname === "/shortlinks/create"
                ? "bg-[#EFF6FF] text-blue-600"
                : ""
            }`}
          >
            <PlusCircle className="w-5 h-5 mr-3" />
            Je crée
          </Link>
          <Link
            href="/shortlinks"
            className={`flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground group ${
              pathname === "/shortlinks" ? "bg-[#EFF6FF] text-blue-600" : ""
            }`}
          >
            <Link2 className="w-5 h-5 mr-3" />
            Liens
          </Link>
          <Link
            href="/analytics"
            className={`flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground group ${
              pathname === "/analytics" ? "bg-[#EFF6FF] text-blue-600" : ""
            }`}
          >
            <LineChart className="w-5 h-5 mr-3" />
            Analytique
          </Link>
          <Link
            href="#"
            className={`flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground group ${
              pathname === "/history" ? "bg-[#EFF6FF] text-blue-600" : ""
            }`}
          >
            <History className="w-5 h-5 mr-3" />
            Histoire
          </Link>
        </nav>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block lg:fixed lg:inset-y-0 lg:w-60 lg:flex lg:flex-col bg-[#F7F9F9] border-r">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar (Sheet) */}
      <div className="flex items-center justify-between p-4 ml-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden fixed left-4 top-4 z-50"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <SheetContent side="left" className="w-60 p-0 pt-5 bg-[#F7F9F9]">
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
