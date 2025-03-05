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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/Dialog";
import { Pencil, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  addDomain,
  fetchDomains,
  setDomainAsDefault,
} from "@/app/redux/slices/domainSlice";

export default function DomainSettings() {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const { domains, currentDomain, isLoading } = useSelector(
    (state) => state.domains
  );
  const [customDomain, setCustomDomain] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("");

  // Dialog states
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [domainToEdit, setDomainToEdit] = useState({ id: "", nom: "" });
  const [domainToDelete, setDomainToDelete] = useState({ id: "", nom: "" });
  const [newDomainName, setNewDomainName] = useState("");

  // Fetch domains on mount
  useEffect(() => {
    dispatch(fetchDomains());
  }, [dispatch]);

  // Update input field when a domain is selected
  useEffect(() => {
    if (selectedDomain) {
      setCustomDomain(selectedDomain);
    }
  }, [selectedDomain]);

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

    try {
      const existingDomain = domains.find(
        (domain) => domain.nom === customDomain
      );
      let domainId;

      if (existingDomain) {
        domainId = existingDomain.id;
      } else {
        const newDomain = await dispatch(addDomain(customDomain)).unwrap();
        domainId = newDomain.id;
      }

      await dispatch(setDomainAsDefault(domainId)).unwrap();
      toast({
        title: "Domaine par défaut défini",
        description: `Le domaine ${customDomain} a été défini comme domaine par défaut pour toute l'application.`,
      });

      setCustomDomain("");
      setSelectedDomain("");
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'opération.",
        variant: "destructive",
      });
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

    try {
      await dispatch(
        editDomain({ id: domainToEdit.id, nom: newDomainName })
      ).unwrap();
      toast({
        title: "Domaine modifié",
        description: `Le domaine a été modifié avec succès.`,
      });
      setIsEditDialogOpen(false);
    } catch (error) {
      toast({
        title: "Erreur",
        description:
          "Une erreur est survenue lors de la modification du domaine.",
        variant: "destructive",
      });
    }
  };

  // Open delete dialog
  const handleOpenDeleteDialog = (domain) => {
    setDomainToDelete(domain);
    setIsDeleteDialogOpen(true);
  };

  // Delete domain
  const handleDeleteDomain = async () => {
    if (domains.length <= 1) {
      toast({
        title: "Erreur",
        description: "Vous devez conserver au moins un domaine.",
        variant: "destructive",
      });
      setIsDeleteDialogOpen(false);
      return;
    }

    try {
      await dispatch(removeDomain(domainToDelete.id)).unwrap();
      toast({
        title: "Domaine supprimé",
        description: `Le domaine a été supprimé avec succès.`,
      });
      setIsDeleteDialogOpen(false);
    } catch (error) {
      toast({
        title: "Erreur",
        description:
          "Une erreur est survenue lors de la suppression du domaine.",
        variant: "destructive",
      });
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
                  {domains.map((domain) => (
                    <SelectItem key={domain.id} value={domain.nom}>
                      <div className="flex items-center justify-between w-full">
                        <span>{domain.nom}</span>
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
