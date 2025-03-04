"use client";

import { useState } from "react";

import { AlertCircle } from "lucide-react";
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
import { deleteUser } from "../api/auth/route";

export function UserDeleteDialog({ user }) {
  const [isOpen, setIsOpen] = useState(false);
  const [deletedUser, setDeletedUser] = useState(user);
  const handleDelete = async () => {
    try {
      await deleteUser(deletedUser.id, deletedUser);
      // console.log("Utilisateur supprimé:", user);
      setIsOpen(false);
    } catch (error) {
      console.error("Erreur lors de la suppression de l'utilisateur:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="text-red-600 hover:text-red-800 hover:bg-red-100"
        >
          Supprimer
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-red-500" />
            Supprimer l&apos;utilisateur
          </DialogTitle>
          <DialogDescription>
            Êtes-vous sûr de vouloir supprimer l&apos;utilisateur {user.name} ?
            Cette action est irréversible.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-gray-500">
            Toutes les données associées à cet utilisateur seront définitivement
            supprimées. Cela inclut ses liens raccourcis, ses statistiques et
            ses préférences.
          </p>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Annuler
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            Supprimer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
