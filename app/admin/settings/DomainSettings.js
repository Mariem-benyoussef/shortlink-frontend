"use client";

import { useEffect, useState } from "react";
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
import {
  createDomain,
  getDomains,
  setDefaultDomain,
} from "@/app/api/domaines/route";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/Dialog";
import { Pencil, Trash2 } from "lucide-react";
import { deleteDomain, updateDomain } from "@/app/api/domaines/[id]/route";

export default function DomainSettings() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [customDomain, setCustomDomain] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("");
  const [availableDomains, setAvailableDomains] = useState([]);
  const [currentDomain, setCurrentDomain] = useState("");

  // Dialog states
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [domainToEdit, setDomainToEdit] = useState({ id: "", nom: "" });
  const [domainToDelete, setDomainToDelete] = useState({ id: "", nom: "" });
  const [newDomainName, setNewDomainName] = useState("");

  // Fetch domains on mount
  useEffect(() => {
    fetchDomains();
  }, []);

  // Update input field when a domain is selected
  useEffect(() => {
    if (selectedDomain) {
      setCustomDomain(selectedDomain);
    }
  }, [selectedDomain]);

  // Fetch domains function
  async function fetchDomains() {
    try {
      const data = await getDomains();
      console.log("data", data);
      if (data && Array.isArray(data)) {
        setAvailableDomains(data);

        // Find the default domain
        const defaultDomain = data.find((domain) => domain.isDefault);
        if (defaultDomain) {
          setCurrentDomain(defaultDomain.nom);
        }

        // change here
        else if (data.length > 0) {
          setCurrentDomain(data[0].nom);
        }
      } else {
        toast({
          title: "Erreur",
          description: "Aucun domaine disponible n'a été trouvé.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description:
          "Une erreur s'est produite lors de la récupération des domaines.",
        variant: "destructive",
      });
    }
  }

  // Save domain as default
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
      // Check if domain exists
      const existingDomain = availableDomains.find(
        (domain) => domain.nom === customDomain
      );

      let domainId;

      if (existingDomain) {
        // Use existing domain ID
        domainId = existingDomain.id;
      } else {
        // Create new domain if not found
        const newDomain = await createDomain({ nom: customDomain });
        if (!newDomain) {
          throw new Error("Échec de la création du domaine");
        }
        domainId = newDomain.id;

        // Update available domains
        await fetchDomains();
      }

      // Set domain as default
      const result = await setDefaultDomain(domainId);

      if (result) {
        setCurrentDomain(customDomain);
        toast({
          title: "Domaine par défaut défini",
          description: `Le domaine ${customDomain} a été défini comme domaine par défaut pour toute l'application.`,
        });

        // Refresh domains list
        await fetchDomains();

        // Reset fields
        setCustomDomain("");
        setSelectedDomain("");
      } else {
        toast({
          title: "Erreur",
          description:
            "Une erreur est survenue lors de la définition du domaine par défaut.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Erreur:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'opération.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Open edit dialog
  const handleOpenEditDialog = (domain) => {
    setDomainToEdit(domain);
    setNewDomainName(domain.nom);
    setIsEditDialogOpen(true);
  };

  // Edit domain
  const handleEditDomain = async () => {
    if (!newDomainName) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer un nom de domaine.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const result = await updateDomain(domainToEdit.id, {
        nom: newDomainName,
      });
      if (result) {
        toast({
          title: "Domaine modifié",
          description: `Le domaine a été modifié avec succès.`,
        });
        // If edited domain is the current domain, update it
        if (currentDomain === domainToEdit.nom) {
          setCurrentDomain(newDomainName);
        }
        // Refresh domains list
        fetchDomains();
        // Close dialog
        setIsEditDialogOpen(false);
      } else {
        toast({
          title: "Erreur",
          description:
            "Une erreur est survenue lors de la modification du domaine.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description:
          "Une erreur est survenue lors de la modification du domaine.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Open delete dialog
  const handleOpenDeleteDialog = (domain) => {
    setDomainToDelete(domain);
    setIsDeleteDialogOpen(true);
  };

  // Delete domain
  const handleDeleteDomain = async () => {
    if (availableDomains.length <= 1) {
      toast({
        title: "Erreur",
        description: "Vous devez conserver au moins un domaine.",
        variant: "destructive",
      });
      setIsDeleteDialogOpen(false);
      return;
    }

    setIsLoading(true);
    try {
      const result = await deleteDomain(domainToDelete.id);
      if (result) {
        toast({
          title: "Domaine supprimé",
          description: `Le domaine a été supprimé avec succès.`,
        });
        // If deleted domain is the current domain, set the first domain as current
        if (currentDomain === domainToDelete.nom) {
          const remainingDomains = availableDomains.filter(
            (d) => d.id !== domainToDelete.id
          );
          if (remainingDomains.length > 0) {
            setCurrentDomain(remainingDomains[0].nom);

            // If deleted domain was default, set new default domain
            if (domainToDelete.isDefault) {
              await setDefaultDomain(remainingDomains[0].id);
            }
          }
        }
        // Refresh domains list
        fetchDomains();
        // Close dialog
        setIsDeleteDialogOpen(false);
      } else {
        toast({
          title: "Erreur",
          description:
            "Une erreur est survenue lors de la suppression du domaine.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description:
          "Une erreur est survenue lors de la suppression du domaine.",
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
                    <SelectItem key={domain.id} value={domain.nom}>
                      <div className="flex items-center justify-between w-full">
                        <span>
                          {domain.nom} {domain.isDefault && "(Par défaut)"}
                        </span>
                        <div className="flex gap-2 ml-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenEditDialog(domain);
                            }}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-600"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenDeleteDialog(domain);
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="space-x-2">
        {currentDomain && <span>Domaine par défaut: {currentDomain}</span>}
      </CardFooter>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modifier le domaine</DialogTitle>
            <DialogDescription>
              Modifiez le nom du domaine sélectionné.
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-4">
            <Input
              value={newDomainName}
              onChange={(e) => setNewDomainName(e.target.value)}
              disabled={isLoading}
              className="flex-1"
            />
            <Button
              onClick={handleEditDomain}
              disabled={isLoading || !newDomainName}
            >
              {isLoading ? "Modification..." : "Modifier"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Supprimer le domaine</DialogTitle>
            <DialogDescription>
              Vous êtes sur le point de supprimer le domaine{" "}
              {domainToDelete.nom}. Cette action est irréversible.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="destructive" onClick={handleDeleteDomain}>
              {isLoading ? "Suppression..." : "Supprimer"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
