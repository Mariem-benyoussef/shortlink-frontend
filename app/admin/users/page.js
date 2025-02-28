import { UserManagement } from "@/app/components/UserManagement";
import Image from "next/image";

// Metadata
export const metadata = {
  title: "Administration des utilisateurs",
  description:
    "Page d'administration pour la gestion des utilisateurs de TuniLink.",
};

export default function AdminUsersPage() {
  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/tasks-light.png"
          width={1280}
          height={998}
          alt="Tableau de bord des utilisateurs"
          className="block dark:hidden"
        />
        <Image
          src="/examples/tasks-dark.png"
          width={1280}
          height={998}
          alt="Tableau de bord des utilisateurs"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Bienvenue, Admin
            </h2>
            <p className="text-muted-foreground">
              Voici la liste de tous les utilisateurs de TuniLink.
            </p>
          </div>
        </div>
        <UserManagement />
      </div>
    </>
  );
}
