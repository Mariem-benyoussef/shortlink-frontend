// import Image from "next/image";
// import Analytics from "./analytics/page";
// import CreateLinkForm from "./shortlinks/create/page";
// import Sidebar from "./components/layout/Sidebar";
// import Header from "./components/layout/Header";
// import { BackButton } from "./components/ui/Button";

// export default function Home() {
// return (
//   <div>
//     <h1>Dashboard Analytics</h1>
//      <Analytics />
//   </div>
// );

//   return (
//     <div className="flex min-h-screen bg-background">
//       <Sidebar /> {/* Sidebar renders based on screen size */}
//       <div className="flex-1 flex flex-col lg:pl-60">
//         <Header />
//         <main className="flex-1">
//           <div className="container mx-auto p-4 md:p-6 max-w-4xl">
//             <div className="flex items-center mb-6">
//               <BackButton />
//             </div>
//             {/* <CreateLinkForm /> */}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }

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
            {/* <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2 h-12"
              asChild
            >
              <Link href="/auth/google">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Continue avec Google
              </Link>
            </Button> */}

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
