"use client";

import { Button } from "@/app/components/ui/Button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/Card";
import { Input } from "@/app/components/ui/Input";
import { Label } from "@/app/components/ui/Label";
import { Switch } from "@/app/components/ui/Switch";
import { useEffect, useState } from "react";

export default function CreateLinkForm() {
  const [formData, setFormData] = useState({
    destination: "",
    titre: "",
    chemin_personnalise: "",
    showUtm: false,
    utm_term: "",
    utm_content: "",
    utm_campaign: "",
    utm_source: "",
    utm_medium: "",
  });
  const [error, setError] = useState(null);
  const [shortlink, setShortlink] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Fonction pour vérifier l'unicité du chemin personnalisé
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
      console.log("response data", data);

      return data.isUnique; // Assuming the Laravel API responds with { isUnique: true/false }
    } catch (error) {
      console.error("Erreur lors de la vérification du chemin :", error);
      setError("Erreur de connexion au serveur. Veuillez réessayer.");
      return false;
    }
  };

  const handleSubmit = async () => {
    setError(null);
    setShortlink(null);

    if (!formData.destination) {
      setError("Le champ Destination est obligatoire.");
      return;
    }

    try {
      new URL(formData.destination); // Validate URL format
    } catch (err) {
      setError("Veuillez entrer une URL valide pour le champ Destination.");
      return;
    }

    // Vérification de l'unicité du chemin personnalisé (sil est rempli, cest facultatif)
    if (formData.chemin_personnalise) {
      const isCheminUnique = await checkCheminUnique(
        formData.chemin_personnalise
      );
      if (!isCheminUnique) {
        setError("Le champ Chemin personnalisé doit être unique.");
        return;
      }
    }

    try {
      const response = await fetch(`/api/shortlinks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(
          errorData.error ||
            "Une erreur s'est produite lors de la création du lien."
        );
        return;
      }

      const data = await response.json();
      setShortlink(data); // Store the created shortlink
    } catch (error) {
      console.error("Erreur lors de la création du lien :", error);
      setError("Une erreur inattendue s'est produite.");
    }
  };

  useEffect(() => {
    console.log("Updated formData:", formData);
  }, [formData]);

  useEffect(() => {
    if (shortlink) {
      console.log("Lien créé avec succès :", shortlink);
    }
  }, [shortlink]);

  return (
    <Card className="border-2 border-blue-100">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">Créer un lien</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Destination</Label>
            <Input
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              placeholder="https://exemple.com/mon-url-longue"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Titre (facultatif)</Label>
            <Input
              name="titre"
              value={formData.titre}
              onChange={handleChange}
              placeholder="Titre (facultatif)"
            />
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Lien Court</h3>
            <div className="flex gap-2">
              <div className="flex-1">
                <Label>Domaine</Label>
                <Input
                  placeholder="tnbresa"
                  disabled
                  className="bg-gray-200 text-gray-500 cursor-not-allowed pointer-events-none"
                />
              </div>
              <div className="flex items-center pt-8">/</div>
              <div className="flex-1">
                <Label>Chemin personnalisé unique (facultatif)</Label>
                <Input
                  name="chemin_personnalise"
                  value={formData.chemin_personnalise}
                  onChange={handleChange}
                  placeholder="Chemin personnalisé"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Fonctionnalités avancées</h3>
            <div className="flex items-center space-x-2">
              <Label>Paramètres UTM</Label>
              <Switch
                checked={formData.showUtm}
                onCheckedChange={() =>
                  setFormData((prev) => ({ ...prev, showUtm: !prev.showUtm }))
                }
              />
            </div>
            {formData.showUtm && (
              <div className="space-y-4 pt-2">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Terme (facultatif)</Label>
                    <Input
                      name="utm_term"
                      value={formData.utm_term}
                      onChange={handleChange}
                      placeholder="Terme (facultatif)"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Contenu</Label>
                    <Input
                      name="utm_content"
                      value={formData.utm_content}
                      onChange={handleChange}
                      placeholder="Contenu"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Campagne</Label>
                  <Input
                    name="utm_campaign"
                    value={formData.utm_campaign}
                    onChange={handleChange}
                    placeholder="Campagne"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Source</Label>
                    <Input
                      name="utm_source"
                      value={formData.utm_source}
                      onChange={handleChange}
                      placeholder="Source"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Moyen</Label>
                    <Input
                      name="utm_medium"
                      value={formData.utm_medium}
                      onChange={handleChange}
                      placeholder="Moyen"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <Button
          onClick={handleSubmit}
          className="w-full bg-[#4169E1] hover:bg-[#4169E1]/90"
        >
          Créer votre lien
        </Button>

        {error && <p className="text-red-500 mt-2">{error}</p>}
        {shortlink && (
          <p className="text-green-500 mt-2">
            {/* Lien créé avec succès : {shortlink.destination} */}
            Lien créé avec succès!
          </p>
        )}
      </CardContent>
    </Card>
  );
}
