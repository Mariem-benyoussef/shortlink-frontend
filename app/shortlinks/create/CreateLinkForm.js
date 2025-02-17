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
import { useState } from "react";

export default function CreateLinkForm() {
  const [formData, setFormData] = useState({
    destination: "",
    title: "",
    domain: "",
    customPath: "",
    showUtm: false,
    utm: {
      term: "",
      content: "",
      campaign: "",
      source: "",
      medium: "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUtmChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      utm: { ...prev.utm, [name]: value },
    }));
  };

  const handleSubmit = () => {
    console.log("Form Data:", formData);
  };

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
            />
          </div>

          <div className="space-y-2">
            <Label>Titre (facultatif)</Label>
            <Input
              name="title"
              value={formData.title}
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
                  name="domain"
                  value={formData.domain}
                  onChange={handleChange}
                  placeholder="tnlresa"
                />
              </div>
              <div className="flex items-center pt-8">/</div>
              <div className="flex-1">
                <Label>Chemin personnalisé unique (facultatif)</Label>
                <Input
                  name="customPath"
                  value={formData.customPath}
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
                      name="term"
                      value={formData.utm.term}
                      onChange={handleUtmChange}
                      placeholder="Terme (facultatif)"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Contenu</Label>
                    <Input
                      name="content"
                      value={formData.utm.content}
                      onChange={handleUtmChange}
                      placeholder="Contenu"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Campagne</Label>
                  <Input
                    name="campaign"
                    value={formData.utm.campaign}
                    onChange={handleUtmChange}
                    placeholder="Campagne"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Source</Label>
                    <Input
                      name="source"
                      value={formData.utm.source}
                      onChange={handleUtmChange}
                      placeholder="Source"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Moyen</Label>
                    <Input
                      name="medium"
                      value={formData.utm.medium}
                      onChange={handleUtmChange}
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
      </CardContent>
    </Card>
  );
}
