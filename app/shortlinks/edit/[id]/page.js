"use client";

import Header from "@/app/components/layout/Header";
import Sidebar from "@/app/components/layout/Sidebar";
import { BackButton, Button } from "@/app/components/ui/Button";
import { Input } from "@/app/components/ui/Input";
import { Label } from "@/app/components/ui/Label";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditLinkPage() {
  const router = useRouter();
  const { id } = useParams();
  
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const [initialDestination, setInitialDestination] = useState(""); // Stocke la valeur originale de destination
  const [initialChemin, setInitialChemin] = useState(""); // Stocke la valeur originale de chemin_personnalise
  
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

  useEffect(() => {
    const fetchLinkData = async () => {
      if (!id) return;
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
        setInitialDestination(data.destination); // Stocke la destination actuelle
        setInitialChemin(data.chemin_personnalise); // Stocke le chemin_personnalise actuel
      } catch (error) {
        console.error("Erreur lors du chargement :", error);
      }
    };

    fetchLinkData();
  }, [id]);

  const checkCheminUnique = async (chemin) => {
    try {
      const response = await fetch(`/api`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ chemin_personnalise: chemin }),
      });

      if (!response.ok) {
        throw new Error("Server error or invalid response");
      }

      const data = await response.json();
      return data.isUnique;
    } catch (error) {
      console.error("Erreur lors de la vérification du chemin :", error);
      setError("Erreur de connexion au serveur. Veuillez réessayer.");
      return false;
    }
  };

  const checkDestinationUnique = async (destination) => {
    try {
      const response = await fetch(`/api`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ destination }),
      });

      if (!response.ok) {
        throw new Error("Server error or invalid response");
      }

      const data = await response.json();
      return data.isUnique;
    } catch (error) {
      console.error("Erreur lors de la vérification de la destination :", error);
      setError("Erreur de connexion au serveur. Veuillez réessayer.");
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    if (!linkData.destination) {
      setError("Le champ Destination est obligatoire.");
      setIsLoading(false);
      return;
    }

    try {
      new URL(linkData.destination);
    } catch (err) {
      setError("Veuillez entrer une URL valide pour le champ Destination.");
      setIsLoading(false);
      return;
    }

    // Vérifier l’unicité de la destination uniquement si elle a changé
    if (linkData.destination !== initialDestination) {
      const isDestinationUnique = await checkDestinationUnique(linkData.destination);
      if (!isDestinationUnique) {
        setError("Le champ Destination doit être unique.");
        setIsLoading(false);
        return;
      }
    }

    // Vérifier l’unicité du chemin_personnalise uniquement si il a changé
    if (linkData.chemin_personnalise !== initialChemin) {
      const isCheminUnique = await checkCheminUnique(linkData.chemin_personnalise);
      if (!isCheminUnique) {
        setError("Le champ Chemin personnalisé doit être unique.");
        setIsLoading(false);
        return;
      }
    }

    try {
      const response = await fetch(`/api/shortlinks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(linkData),
      });

      if (response.ok) {
        router.push("/shortlinks");
      } else {
        console.error("Erreur de mise à jour");
        setError("Une erreur est survenue lors de la mise à jour.");
      }
    } catch (error) {
      console.error("Erreur réseau:", error);
      setError("Une erreur est survenue lors de la mise à jour.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLinkData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col lg:pl-60">
        <Header />
        <main className="flex-1">
          <div className="container mx-auto p-4 md:p-6 max-w-3xl">
            <div className="flex items-center gap-4 mb-8">
              <BackButton />
              <h1 className="text-2xl font-semibold">Modification du lien</h1>
            </div>

            <form className="space-y-8" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Lien court</h2>
                <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                  <div className="flex-1 w-full">
                    <Input
                      placeholder="tnbresa"
                      disabled
                      className="bg-gray-200 text-gray-500 cursor-not-allowed pointer-events-none"
                    />
                  </div>
                  <div className="hidden md:block">/</div>
                  <div className="flex-1 w-full">
                    <Input
                      name="chemin_personnalise"
                      value={linkData.chemin_personnalise || ""}
                      onChange={handleChange}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-lg font-semibold">URL de destination</h2>
                <Input
                  name="destination"
                  value={linkData.destination || ""}
                  onChange={handleChange}
                  className="w-full font-mono text-sm"
                />
              </div>

              <div className="space-y-6">
                <h2 className="text-lg font-semibold">Détails facultatifs</h2>
                <div className="space-y-4">
                  <div>
                    <Label>Titre</Label>
                    <Input
                      name="titre"
                      value={linkData.titre || ""}
                      onChange={handleChange}
                      className="mt-2"
                    />
                  </div>
                </div>
              </div>

              {error && <p className="text-red-500">{error}</p>}
              <Button
                type="submit"
                className="w-full bg-[#4169E1] hover:bg-[#4169E1]/90"
              >
                {isLoading ? "En cours..." : "MODIFIER"}
              </Button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
