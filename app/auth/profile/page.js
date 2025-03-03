"use client";
import Sidebar from "@/app/components/layout/Sidebar";
import ProfileForm from "./ProfileForm";
import Header from "@/app/components/layout/Header";
import { BackButton } from "@/app/components/ui/Button";

export default function ProfilePage() {
  return (
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
                    Gestion du profil
                  </h2>
                </div>
              </div>
            </div>

            <ProfileForm />
          </div>
        </main>
      </div>
    </div>
  );
}
