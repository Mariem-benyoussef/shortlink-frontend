"use client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Copy, MoreVertical, Share2 } from "lucide-react";
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
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/Dialog";
import Image from "next/image";

export default function LinksPage() {
  const [links, setLinks] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const response = await fetch("/api/shortlinks");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        // console.log("fetched Links", data);
        setLinks(data);
      } catch (error) {
        console.error("Error fetching links:", error);
      }
    };
    fetchLinks();
  }, []);

  const getFavicon = (url) => {
    try {
      const domain = new URL(url).hostname;
      // const domain = new URL(url).origin;
      return `https://www.google.com/s2/favicons?sz=64&domain=${domain}`;
    } catch (error) {
      console.error("Invalid URL:", url);
      return "/favicon-standard.svg";
    }
  };

  const copyToClipboard = async (link) => {
    try {
      const shortLink = `https://${link.domaine}.com/${link.chemin_personnalise}`;
      // console.log("shortLink", shortLink);
      await navigator.clipboard.writeText(shortLink);
      toast.success("URL copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy text: ", err);
      toast.error("Failed to copy URL.");
    }
  };
  // Open delete confirmation modal
  const openDeleteDialog = (id) => {
    setDeleteId(id);
    setIsDeleteDialogOpen(true);
  };

  // Handle delete action
  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      const response = await fetch(`/api/shortlinks/${deleteId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Erreur lors de la suppression");

      // Update state after successful deletion
      setLinks(links.filter((link) => link.id !== deleteId));
      setIsDeleteDialogOpen(false);
      setDeleteId(null);
    } catch (error) {
      console.error("Erreur de suppression:", error);
    }
  };

  // const handleUpdate = (id) => {
  //   router.push(`/shortlinks/edit/${id}`);
  // };

  // const filteredLinks = links;
  const filteredLinks = searchTerm
    ? links.filter(
        (link) =>
          link.titre &&
          link.titre.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : links;

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
    <>
      <ToastContainer />
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
                    <Link
                      href={`/shortlinks/details/${link.id}`}
                      className="block flex-1 min-w-0"
                    >
                      <div className="flex items-center gap-4">
                        <Image
                          src={
                            getFavicon(link.destination) ||
                            "/favicon-standard.svg"
                          }
                          alt="favicon"
                          width={48} // Ajuste selon tes besoins
                          height={48}
                          className="rounded-lg object-cover"
                          unoptimized // Désactive l'optimisation si tu veux éviter les erreurs sur des images externes
                        />

                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium truncate">{link.titre}</h3>
                          <h3 className="font-medium truncate">
                            {`${link.domaine}.com/${link.chemin_personnalise}`}
                          </h3>
                        </div>
                      </div>
                    </Link>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => copyToClipboard(link)}
                      >
                        <Copy className="h-4 w-4 mr-2" /> Copier
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="text-pink-600"
                        onClick={async () => {
                          if (navigator.share) {
                            try {
                              await navigator.share({
                                title:
                                  "Je partage avec vous ce lien intéressant!",
                                text: `Voici le lien: ${link.destination}`,
                                url: link.destination,
                              });
                              // toast.success("Lien partagé avec succès !");
                            } catch (error) {
                              console.error("Error sharing:", error);
                              toast.error("Échec du partage.");
                            }
                          } else {
                            toast.error(
                              "Le partage n'est pas supporté sur cet appareil."
                            );
                          }
                        }}
                      >
                        <Share2 className="h-4 w-4 mr-2" /> Partager
                      </Button>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/shortlinks/edit/${link.id}`}>
                              Modifier
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => openDeleteDialog(link.id)}
                          >
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

        {/* DELETE CONFIRMATION MODAL (Fixed Position) */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Supprimer ce lien ?</DialogTitle>
            </DialogHeader>
            <p className="text-sm text-muted-foreground">
              Cette action est irréversible. Voulez-vous vraiment supprimer ce
              lien ?
            </p>
            <DialogFooter>
              <Button
                variant="secondary"
                onClick={() => setIsDeleteDialogOpen(false)}
              >
                Annuler
              </Button>
              <Button variant="destructive" onClick={handleDelete}>
                Supprimer
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
