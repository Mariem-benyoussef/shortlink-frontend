"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

import { Icons } from "@/app/components/ui/Icons";
import { Alert, AlertDescription, AlertTitle } from "@/app/components/ui/Alert";
import { Label } from "@/app/components/ui/Label";
import { Input } from "@/app/components/ui/Input";
import { Button } from "@/app/components/ui/Button";
import { resetPassword } from "@/app/api/auth/route";

export default function ResetPasswordForm({ className, ...props }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token"); // Get the token from the URL
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    password_confirmation: "",
  });

  const validateForm = () => {
    if (!formData.email || !formData.password || !formData.password_confirmation) {
      setError("Tous les champs sont requis");
      return false;
    }
    if (formData.password !== formData.password_confirmation) {
      setError("Les mots de passe ne correspondent pas");
      return false;
    }
    setError("");
    return true;
  };

  async function onSubmit(event) {
    event.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setError("");

    try {
      // Call the resetPassword function from api/auth.js
      await resetPassword(formData.email, formData.password, formData.password_confirmation, token);
      setIsSuccess(true); // Show success message
      setTimeout(() => router.push("/auth/login"), 3000); // Redirect to login page after 3 seconds
    } catch (error) {
      setError(error.message || "Une erreur s'est produite. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  }

  if (isSuccess) {
    return (
      <Alert className="bg-green-50 border-green-200">
        <AlertTitle className="text-green-800">Mot de passe réinitialisé!</AlertTitle>
        <AlertDescription className="text-green-700">
          Votre mot de passe a été réinitialisé avec succès. Vous allez être redirigé vers la page de connexion.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="Ex: alex@exemple.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Nouveau mot de passe</Label>
            <Input
              id="password"
              placeholder="********"
              type="password"
              autoCapitalize="none"
              autoComplete="new-password"
              disabled={isLoading}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password_confirmation">Confirmer le mot de passe</Label>
            <Input
              id="password_confirmation"
              placeholder="********"
              type="password"
              autoCapitalize="none"
              autoComplete="new-password"
              disabled={isLoading}
              value={formData.password_confirmation}
              onChange={(e) => setFormData({ ...formData, password_confirmation: e.target.value })}
            />
          </div>
          {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
          <Button
            disabled={isLoading}
            className="bg-[#4169E1] hover:bg-[#4169E1]/90"
          >
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Réinitialiser le mot de passe
          </Button>
        </div>
      </form>
    </div>
  );
}