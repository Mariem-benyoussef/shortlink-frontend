"use client";

import Header from "@/app/components/layout/Header";
import Sidebar from "@/app/components/layout/Sidebar";
import { BackButton } from "@/app/components/ui/Button";
import { UserManagement } from "@/app/components/UserManagement";

export default function AdminUsersPage() {
  return (
    <>
      <div className="flex min-h-screen bg-background">
        <Sidebar />
        <div className="flex-1 flex flex-col lg:pl-60">
          <Header />
          <main className="flex-1">
            <div className="container mx-auto p-4 md:p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <BackButton />
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight">
                      Bienvenue, Admin
                    </h2>
                    <p className="text-muted-foreground">
                      Voici la liste de tous les utilisateurs de TuniLink.
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-full">
                <UserManagement />
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
