"use client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Copy, MoreVertical, Share2 } from "lucide-react";
import Link from "next/link";
import { BackButton, Button } from "@/app/components/ui/Button";
import Sidebar from "@/app/components/layout/Sidebar";
import Header from "@/app/components/layout/Header";
import { Card, CardContent } from "@/app/components/ui/Card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/Dropdown-menu";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/Dialog";
import Image from "next/image";
import CountryBarChart from "@/app/components/charts/CountryBarChart";
import DevicePieChart from "@/app/components/charts/DevicePieChart";

export default function LinkDetailsPage() {
  const [links, setLinks] = useState([]);
  // const [activeDataset, setActiveDataset] = useState("last4Days");
  const [deleteId, setDeleteId] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [analyticsData, setAnalyticsData] = useState({
    countries: [],
    devices: [],
    sources: [],
  });
  const { id } = useParams();
  const [linkData, setLinkData] = useState({
    destination: "",
    titre: "",
    domaine: "",
    chemin_personnalise: "",
    utm_term: "",
    utm_content: "",
    utm_campaign: "",
    utm_source: "",
    utm_medium: "",
  });
  const router = useRouter();
  useEffect(() => {
    const fetchLinkData = async () => {
      if (!id) return;
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/shortlinks/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des données.");
        }

        const data = await response.json();
        setLinkData(data);

        const analyticsResponse = await fetch(
          `/api/shortlinks/${data.destination}`,
          {
            method: "GET",
            headers: {

              "Content-Type": "application/json",
              
            },
          }
        );
        const analyticsData = await analyticsResponse.json();
        setAnalyticsData(analyticsData);
        console.log("analyticsDataaaaaaaaaaaaaaaaaa", analyticsData);
      } catch (error) {
        console.error("Erreur lors du chargement :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLinkData();
  }, [id]);

  const getFavicon = (url) => {
    try {
      const domain = new URL(url).hostname;
      return `https://www.google.com/s2/favicons?sz=64&domain=${domain}`;
    } catch (error) {
      console.error("Invalid URL:", url);
      return "/favicon-standard.svg";
    }
  };
  const copyToClipboard = async (linkData) => {
    try {
      // await navigator.clipboard.writeText(linkData.destination);
      const shortLink = `https://${linkData.domaine}.com/${linkData.chemin_personnalise}`;
      await navigator.clipboard.writeText(shortLink);
      toast.success("URL copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy text: ", err);
      toast.error("Failed to copy URL.");
    }
  };
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
      router.push("/shortlinks");
    } catch (error) {
      console.error("Erreur de suppression:", error);
    }
  };

  const openDeleteDialog = (id) => {
    setDeleteId(id);
    setIsDeleteDialogOpen(true);
  };
  if (loading) return <p> Chargement des détails...</p>;
  if (error) return <p> Erreur : {error}</p>;
  if (!linkData) return <p> Aucune donnée trouvée</p>;

  return (
    <>
      <ToastContainer />
      <div className="flex min-h-screen bg-background">
        <Sidebar />
        <div className="flex-1 flex flex-col lg:pl-60">
          <Header />
          <main className="flex-1">
            <div className="container mx-auto p-4 md:p-6">
              <div className="flex items-center gap-4 mb-8">
                <BackButton />
                <h1 className="text-2xl font-semibold">Détails du lien</h1>
              </div>

              <Card className="mb-8">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <Image
                      src={
                        getFavicon(linkData.destination) ||
                        "/favicon-standard.svg"
                      }
                      alt="favicon"
                      width={48}
                      height={48}
                      className="rounded-lg object-cover"
                      unoptimized
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium truncate">{linkData.titre}</h3>
                      {/* <p className="text-sm text-muted-foreground truncate">
                        {linkData.destination} */}
                      <h3 className="font-medium truncate">
                        {`${linkData.domaine}.com/${linkData.chemin_personnalise}`}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => copyToClipboard(linkData)}
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
                                text: `Voici le lien: ${linkData.destination}`,
                                url: linkData.destination,
                              });
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
                            <Link href={`/shortlinks/edit/${linkData.id}`}>
                              Modifier
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => openDeleteDialog(linkData.id)}
                          >
                            Supprimer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Graphique des pays */}
              <div className="mt-8">
                <h2 className="text-lg font-semibold mb-4">Clics par pays</h2>
                <CountryBarChart data={analyticsData.countries} />
              </div>

              {/* Graphique des appareils */}
              <div className="mt-8">
                <h2 className="text-lg font-semibold mb-4">
                  Clics par appareil
                </h2>
                <DevicePieChart data={analyticsData.devices} />
              </div>
            </div>
          </main>
        </div>
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
