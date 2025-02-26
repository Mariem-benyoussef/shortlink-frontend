import Image from "next/image";
import Link from "next/link";
import { Button } from "./components/ui/Button";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background flex">
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-8 xl:px-20">
        <div className="max-w-sm mx-auto w-full">
          <div className="space-y-6 text-center sm:text-left">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Bienvenue sur{" "}
              <span className="text-[#FF1493] block sm:inline">TuniLink</span>
            </h1>
            <p className="text-muted-foreground">
              un service où vous pouvez simplifier vos longs liens!
            </p>
          </div>

          <div className="mt-10 space-y-4">
            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2 h-12"
              asChild
            >
              <Link href="/auth/register">
                <svg
                  className="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                Continue avec Email
              </Link>
            </Button>
          </div>

          <div className="mt-8 text-center sm:text-left">
            <div className="text-center text-sm">
              Vous avez déjà un compte?{" "}
              <Link
                href="/auth/login"
                className="text-[#4169E1] hover:underline"
              >
                Connexion
              </Link>
            </div>
          </div>
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
  );
}
