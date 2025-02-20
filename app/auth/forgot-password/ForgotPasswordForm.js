"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

import { CheckCircle2 } from "lucide-react";
import { Label } from "@/app/components/ui/Label";
import { Input } from "@/app/components/ui/Input";
import { Button } from "@/app/components/ui/Button";
import { Icons } from "@/app/components/ui/Icons";
import { Alert, AlertDescription, AlertTitle } from "@/app/components/ui/Alert";

export default function ForgotPasswordForm({ className, ...props }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (email) => {
    if (!email) {
      setError("L'email est requis");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("L'email n'est pas valide");
      return false;
    }
    setError("");
    return true;
  };

  async function onSubmit(event) {
    event.preventDefault();
    if (!validateEmail(email)) return;

    setIsLoading(true);
    setError("");

    try {
      // Here you would typically make an API call to send the reset email
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
      setIsSuccess(true);
    } catch (error) {
      setError("Une erreur s'est produite. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  }

  if (isSuccess) {
    return (
      <Alert className="bg-green-50 border-green-200">
        <CheckCircle2 className="h-4 w-4 text-green-600" />
        <AlertTitle className="text-green-800">Email envoyé!</AlertTitle>
        <AlertDescription className="text-green-700">
          Si un compte existe avec cette adresse email, vous recevrez un lien
          pour réinitialiser votre mot de passe.
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={error ? "border-red-500" : ""}
            />
            {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
          </div>
          <Button
            disabled={isLoading}
            className="bg-[#4169E1] hover:bg-[#4169E1]/90"
          >
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Soumettre
          </Button>
        </div>
      </form>
    </div>
  );
}
