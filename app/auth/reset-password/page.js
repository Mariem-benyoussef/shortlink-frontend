import ResetPasswordForm from "@/components/reset-password-form";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex min-h-screen">
        <div className="flex-1 flex flex-col justify-center px-4 py-12 sm:px-6 lg:px-8 xl:px-20">
          <div className="max-w-sm w-full mx-auto">
            <div className="mb-8">
              <Link
                href="/login"
                className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour à la connexion
              </Link>
              <h1 className="text-2xl font-semibold tracking-tight mb-2">
                Réinitialiser le mot de passe
              </h1>
              <p className="text-sm text-muted-foreground">
                Veuillez entrer votre nouveau mot de passe ci-dessous.
              </p>
            </div>
            <ResetPasswordForm />
          </div>
        </div>
        <div className="hidden lg:flex lg:flex-1 bg-blue-50 items-center justify-center p-12">
          <div className="relative w-full max-w-md aspect-[4/3]">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-VfuZ8yJeL2MFp95EVIqheUiwSAWBMR.png"
              alt="Illustration"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
