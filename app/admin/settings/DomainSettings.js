"use client";

import { useEffect, useState } from "react";

import { X } from "lucide-react";
import { useToast } from "@/app/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/Card";
import { Label } from "@/app/components/ui/Label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/Select";
import { Input } from "@/app/components/ui/Input";
import { Button } from "@/app/components/ui/Button";

const availableDomains = ["tnbr.tn", "tnl.tn", "link.tn"];

export default function DomainSettings() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [customDomain, setCustomDomain] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("");
  const [currentDomain, setCurrentDomain] = useState("tnbr.tn"); // Default current domain

  useEffect(() => {
    if (selectedDomain) {
      setCustomDomain(selectedDomain);
    }
  }, [selectedDomain]);

  const handleSaveDomain = async () => {
    if (!customDomain) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer un domaine.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // Normally, you would make an API call to save the domain
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate a delay

      setCurrentDomain(customDomain);
      toast({
        title: "Domaine enregistré",
        description: `Le domaine ${customDomain} a été défini comme domaine par défaut.`,
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description:
          "Une erreur est survenue lors de l'enregistrement du domaine.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Paramètres</CardTitle>
        <CardDescription>
          Configurez le domaine par défaut pour le raccourcissement des liens.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="domain">Domaine</Label>
            <div className="flex flex-col gap-4 mt-2">
              <div className="flex gap-2">
                <Input
                  id="domain"
                  placeholder="Entrez un domaine"
                  value={customDomain}
                  onChange={(e) => setCustomDomain(e.target.value)}
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button
                  onClick={handleSaveDomain}
                  disabled={isLoading || !customDomain}
                >
                  {isLoading ? "Enregistrement..." : "Enregistrer"}
                </Button>
              </div>

              <Select
                value={selectedDomain}
                onValueChange={setSelectedDomain}
                disabled={isLoading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez un domaine existant" />
                </SelectTrigger>
                <SelectContent>
                  {availableDomains.map((domain) => (
                    <SelectItem key={domain} value={domain}>
                      {domain}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-muted-foreground">
          Domaine actuel : <strong>{currentDomain}</strong>
        </p>
      </CardFooter>
    </Card>
  );
}
