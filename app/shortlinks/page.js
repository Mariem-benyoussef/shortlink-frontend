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
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/Dialog";
import Image from "next/image";
import { Search } from "../components/ui/Search";
import { DatePickerModal } from "../components/ui/DatePickerModal";
import { AdditionalFiltersModal } from "../components/ui/AdditionalFiltersModal";

export default function LinksPage() {
  const [links, setLinks] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedDomain, setSelectedDomain] = useState("all");
  const itemsPerPage = 5;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdditionalFiltersModalOpen, setIsAdditionalFiltersModalOpen] =
    useState(false);
  const [filters, setFilters] = useState({
    status: "all", // Filtre par statut
    minClicks: "", // Filtre par nombre de clics minimum
  });
  const [selectedLinks, setSelectedLinks] = useState([]);
  const [maskedLinkIds, setMaskedLinkIds] = useState([]);
  const isFilterActive = () => {
    return (
      searchTerm !== "" ||
      selectedDomain !== "all" ||
      startDate !== null ||
      endDate !== null ||
      filters.status !== "all" ||
      filters.minClicks !== ""
    );
  };

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

  const handleApplyDates = () => {
    console.log("Date de création:", startDate);
    console.log("Date d'expération:", endDate);
    setIsModalOpen(false);
  };
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
  const openDeleteDialog = (id) => {
    setDeleteId(id);
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      const response = await fetch(`/api/shortlinks/${deleteId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Erreur lors de la suppression");

      setLinks(links.filter((link) => link.id !== deleteId));
      setIsDeleteDialogOpen(false);
      setDeleteId(null);
    } catch (error) {
      console.error("Erreur de suppression:", error);
    }
  };

  const filteredLinks = links.filter((link) => {
    const matchesSearch =
      link.titre && link.titre.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDomain =
      selectedDomain === "all" ? true : link.domaine === selectedDomain;
    const matchesDate =
      startDate && endDate
        ? new Date(link.createdAt) >= startDate &&
          new Date(link.createdAt) <= endDate
        : true;
    const matchesStatus =
      filters.status === "all"
        ? true
        : filters.status === "active"
        ? !maskedLinkIds.includes(link.id) // Exclure les liens masqués
        : maskedLinkIds.includes(link.id); // Inclure uniquement les liens masqués
    const matchesClicks = filters.minClicks
      ? link.clicks >= parseInt(filters.minClicks)
      : true;
    return (
      matchesSearch &&
      matchesDomain &&
      matchesDate &&
      matchesStatus &&
      matchesClicks
    );
  });
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentLinks = filteredLinks.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredLinks.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Sélection multiple
  const toggleLinkSelection = (linkId) => {
    setSelectedLinks((prevSelected) =>
      prevSelected.includes(linkId)
        ? prevSelected.filter((id) => id !== linkId)
        : [...prevSelected, linkId]
    );
  };

  const toggleSelectAll = () => {
    if (selectedLinks.length === currentLinks.length) {
      setSelectedLinks([]); // Désélectionner tout
    } else {
      setSelectedLinks(currentLinks.map((link) => link.id)); // Sélectionner tout
    }
  };

  // Masquer/Démasquer les liens sélectionnés
  const toggleMaskLinks = () => {
    if (selectedLinks.some((id) => maskedLinkIds.includes(id))) {
      setMaskedLinkIds((prevMasked) =>
        prevMasked.filter((id) => !selectedLinks.includes(id))
      );
      toast.success("Les liens sélectionnés ont été démasqués.");
    } else {
      setMaskedLinkIds((prevMasked) => [...prevMasked, ...selectedLinks]);
      toast.success("Les liens sélectionnés ont été masqués.");
    }
    setSelectedLinks([]);
  };

  const isAnySelectedLinkMasked = selectedLinks.some((id) =>
    maskedLinkIds.includes(id)
  );
  const toggleButtonText = isAnySelectedLinkMasked
    ? "Démasquer les liens sélectionnés"
    : "Masquer les liens sélectionnés";
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
                <div className="flex items-center gap-4">
                  <AddButton />
                  {selectedLinks.length > 0 && (
                    <Button
                      variant="destructive"
                      onClick={toggleMaskLinks}
                      className="px-4 py-2 text-sm font-medium"
                    >
                      {toggleButtonText}
                    </Button>
                  )}
                </div>
              </div>
              {/* Sélectionner tout */}
              <div className="flex items-center gap-4 mb-6">
                <input
                  type="checkbox"
                  checked={
                    selectedLinks.length > 0 &&
                    selectedLinks.length === currentLinks.length
                  }
                  onChange={toggleSelectAll}
                  className="w-4 h-4"
                />
                <span className="text-sm text-muted-foreground">
                  Sélectionner tout
                </span>
              </div>
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground dark:text-muted-foreground" />
                  <Input
                    placeholder="Rechercher"
                    className="pl-8 bg-background dark:bg-darkBackground text-foreground dark:text-darkForeground border border-gray-300 dark:border-gray-600 focus:ring-[#4169E1] focus:border-[#4169E1]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="px-4 py-2 text-sm font-medium text-white bg-[#4169E1] hover:bg-[#4169E1]/90 rounded dark:bg-[#5a80e1] dark:hover:bg-[#5a80e1]/90"
                  >
                    Filtrer par date
                  </button>

                  <DatePickerModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onApply={handleApplyDates}
                    startDate={startDate}
                    setStartDate={setStartDate}
                    endDate={endDate}
                    setEndDate={setEndDate}
                  />
                </div>
                <Select defaultValue="all" onValueChange={setSelectedDomain}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Filtrer par domaine" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les domaines</SelectItem>
                    {[...new Set(links.map((link) => link.domaine))].map(
                      (domain) => (
                        <SelectItem key={domain} value={domain}>
                          {domain}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>

                {/* Bouton "Ajouter d'autres filtres" */}
                <button
                  onClick={() => setIsAdditionalFiltersModalOpen(true)}
                  className="px-4 py-2 text-sm font-medium text-white bg-[#4169E1] hover:bg-[#4169E1]/90 rounded dark:bg-[#5a80e1] dark:hover:bg-[#5a80e1]/90"
                >
                  Ajouter d&apos;autres filtres
                </button>

                {/* Bouton "Effacer les filtres" */}
                {isFilterActive() && (
                  <button
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedDomain("all");
                      setStartDate(null);
                      setEndDate(null);
                      setFilters({ status: "all", minClicks: "" });
                    }}
                    className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-500"
                  >
                    Effacer les filtres
                  </button>
                )}
              </div>
              {/* Modal pour les filtres supplémentaires */}
              <AdditionalFiltersModal
                isOpen={isAdditionalFiltersModalOpen}
                onClose={() => setIsAdditionalFiltersModalOpen(false)}
                onApply={() => setIsAdditionalFiltersModalOpen(false)}
                filters={filters}
                setFilters={setFilters}
              />
              {/* Affichage du nombre de résultats */}
              <div className="mt-4 text-sm text-muted-foreground">
                {filteredLinks.length} résultat(s) trouvé(s)
              </div>
              <div className="space-y-4">
                {filteredLinks.length === 0 ? (
                  <p className="text-center text-muted-foreground">
                    Vous n&apos;avez pas encore ajouté de lien.
                  </p>
                ) : (
                  currentLinks.map((link) => (
                    <div
                      key={link.id}
                      className="flex items-center gap-4 p-4 bg-card rounded-lg border"
                    >
                      {/* Case à cocher */}
                      <input
                        type="checkbox"
                        checked={selectedLinks.includes(link.id)}
                        onChange={() => toggleLinkSelection(link.id)}
                        className="w-4 h-4"
                      />

                      {/* Contenu du lien */}
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
                            <h3 className="font-medium truncate">
                              {link.titre}
                            </h3>
                            <h3 className="font-medium truncate">
                              {`${link.domaine}.com/${link.chemin_personnalise}`}
                            </h3>
                          </div>
                        </div>
                      </Link>

                      {/* Boutons d'actions */}
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
                  ))
                )}
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
