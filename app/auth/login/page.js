import Image from "next/image";
import LoginForm from "./LoginForm";
import { BackButton } from "@/app/components/ui/Button";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex min-h-screen">
        <div className="flex-1 flex flex-col justify-center px-4 py-12 sm:px-6 lg:px-8 xl:px-20">
          <div className="max-w-sm w-full mx-auto">
            <div className="mb-8">
              <BackButton />
              <h1 className="text-2xl font-semibold tracking-tight mb-2">
                Connexion
              </h1>
              <p className="text-sm text-muted-foreground">
                Connectez-vous dès maintenant!
              </p>
            </div>
            <LoginForm />
          </div>
        </div>
        <div className="hidden lg:flex lg:flex-1 bg-blue-50 items-center justify-center p-12">
          <div className="relative w-full max-w-md aspect-[4/3]">
            <Image
              src="/images/shortlink.png"
              alt="Shortlink"
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
