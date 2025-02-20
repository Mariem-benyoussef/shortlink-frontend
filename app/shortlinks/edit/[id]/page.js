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

  const [linkData, setLinkData] = useState({
    destination: "",
    titre: "",
    chemin_personnalise: "",
    domain: "",
    utm_term: "",
    utm_content: "",
    utm_campaign: "",
    utm_source: "",
    utm_medium: "",
  });

  useEffect(() => {
    const fetchLinkData = async () => {
      console.log("id", id);
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
      } catch (error) {
        console.error("Erreur lors du chargement :", error);
      }
    };

    fetchLinkData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      }
    } catch (error) {
      console.error("Erreur réseau:", error);
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
                  <div>
                    <Label>Étiquettes</Label>
                    <Input
                      name="chemin_personnalise"
                      value={linkData.chemin_personnalise || ""}
                      onChange={handleChange}
                      className="mt-2"
                    />
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#4169E1] hover:bg-[#4169E1]/90"
              >
                MODIFIER
              </Button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
