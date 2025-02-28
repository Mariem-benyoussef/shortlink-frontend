"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/Dialog";
import { Button } from "./ui/Button";
import { Label } from "./ui/Label";
import { Input } from "./ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/Select";

export function UserEditDialog({ user }) {
  const [isOpen, setIsOpen] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  const handleSave = () => {
    // Ici, vous feriez normalement un appel API pour mettre à jour l'utilisateur
    console.log("Utilisateur mis à jour:", editedUser);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost">Modifier</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Modifier l&apos;utilisateur</DialogTitle>
          <DialogDescription>
            Modifiez les informations de l&apos;utilisateur ici. Cliquez sur
            sauvegarder une fois terminé.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nom
            </Label>
            <Input
              id="name"
              value={editedUser.name}
              onChange={(e) =>
                setEditedUser({ ...editedUser, name: e.target.value })
              }
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              value={editedUser.email}
              onChange={(e) =>
                setEditedUser({ ...editedUser, email: e.target.value })
              }
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="role" className="text-right">
              Rôle
            </Label>
            <Select
              onValueChange={(value) =>
                setEditedUser({ ...editedUser, role: value })
              }
              defaultValue={editedUser.role}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Sélectionnez un rôle" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Utilisateur">Utilisateur</SelectItem>
                <SelectItem value="Administrateur">Administrateur</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              Statut
            </Label>
            <Select
              onValueChange={(value) =>
                setEditedUser({ ...editedUser, status: value })
              }
              defaultValue={editedUser.status}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Sélectionnez un statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Actif">Actif</SelectItem>
                <SelectItem value="Inactif">Inactif</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSave}>
            Sauvegarder
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
