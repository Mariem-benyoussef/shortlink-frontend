"use client";

import Header from "@/app/components/layout/Header";
import Sidebar from "@/app/components/layout/Sidebar";
import { Button } from "@/app/components/ui/Button";
import { Input } from "@/app/components/ui/Input";
import { Label } from "@/app/components/ui/Label";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditLinkPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const linkId = searchParams.get("id"); // Récupérer l'ID depuis l'URL
  const [linkData, setLinkData] = useState({
    destination: "",
    titre: "",
    chemin_personnalise: "",
    utm_term: "",
    utm_content: "",
    utm_campaign: "",
    utm_source: "",
    utm_medium: "",
  });

  useEffect(() => {
    if (linkId) {
      fetch(`/api/shortlinks/${linkId}`)
        .then((res) => res.json())
        .then((data) => setLinkData(data))
        .catch((err) => console.error("Erreur lors du chargement:", err));
    }
  }, [linkId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/shortlinks/${linkId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(linkData),
      });

      if (response.ok) {
        router.push("/shortlinks"); // Redirection après modification
      } else {
        console.error("Erreur de mise à jour");
      }
    } catch (error) {
      console.error("Erreur réseau:", error);
    }
  };
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col lg:pl-60">
        <Header />
        <main className="flex-1">
          <div className="container mx-auto p-4 md:p-6 max-w-3xl">
            <div className="flex items-center gap-4 mb-8">
              <Link
                href="/shortlinks"
                className="p-2 hover:bg-accent rounded-full"
              >
                <ArrowLeft className="h-6 w-6" />
              </Link>
              <h1 className="text-2xl font-semibold">Modification du lien</h1>
            </div>

            <form className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Lien court</h2>
                <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                  <div className="flex-1 w-full">
                    <Input
                      defaultValue={sampleLink.domain}
                      className="w-full"
                    />
                  </div>
                  <div className="hidden md:block">/</div>
                  <div className="flex-1 w-full">
                    <Input defaultValue={sampleLink.path} className="w-full" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-lg font-semibold">URL de destination</h2>
                <Input
                  defaultValue={sampleLink.destination}
                  className="w-full font-mono text-sm"
                />
              </div>

              <div className="space-y-6">
                <h2 className="text-lg font-semibold">Détails facultatifs</h2>
                <div className="space-y-4">
                  <div>
                    <Label>Titre</Label>
                    <Input defaultValue={sampleLink.title} className="mt-2" />
                  </div>
                  <div>
                    <Label>Étiquettes</Label>
                    <Input defaultValue={sampleLink.tags} className="mt-2" />
                  </div>
                </div>
              </div>

              <Button
                onClick={handleSubmit}
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
