"use client";

import { ArrowLeft, Copy, MoreVertical, Share2 } from "lucide-react";
import Link from "next/link";
import { AddButton, BackButton, Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import Sidebar from "../components/layout/Sidebar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/Select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/Dropdown-menu";
import Header from "../components/layout/Header";
import { useEffect, useState } from "react";

export default function LinksPage() {
  const [links, setLinks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const response = await fetch("/api/shortlinks");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setLinks(data);
      } catch (error) {
        console.error("Error fetching links:", error);
      }
    };
    fetchLinks();
  }, []);

  const filteredLinks = links.filter((link) =>
    link.titre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentLinks = filteredLinks.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredLinks.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col lg:pl-60">
        <Header />
        <main className="flex-1">
          <div className="container mx-auto p-4 md:p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <BackButton />
                <h1 className="text-2xl font-semibold">Menu des liens</h1>
              </div>
              <AddButton />
            </div>

            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <Input
                placeholder="Search"
                className="w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Select defaultValue="newest">
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Trier par" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Plus récent</SelectItem>
                  <SelectItem value="oldest">Plus ancien</SelectItem>
                  <SelectItem value="clicks">Clics</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              {currentLinks.map((link) => (
                <div
                  key={link.id}
                  className="flex items-center gap-4 p-4 bg-card rounded-lg border"
                >
                  <img
                    src={link.thumbnail || "/placeholder.svg"}
                    alt=""
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium truncate">{link.titre}</h3>
                    <p className="text-sm text-muted-foreground">
                      {link.shortUrl}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="secondary" size="sm">
                      <Copy className="h-4 w-4 mr-2" /> Copier
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="text-pink-600"
                    >
                      <Share2 className="h-4 w-4 mr-2" /> Partager
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <Link href={`/shortlinks/edit/${link.id}`}>
                          <DropdownMenuItem>Modifier</DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem className="text-destructive">
                          Supprimer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between mt-6">
              <p className="text-sm text-muted-foreground">
                Affichage des données
              </p>
              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  {"<"}
                </Button>
                {[...Array(totalPages)].map((_, i) => (
                  <Button
                    key={i}
                    variant={currentPage === i + 1 ? "primary" : "outline"}
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handlePageChange(i + 1)}
                  >
                    {i + 1}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  {">"}
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
