import Sidebar from "@/app/components/layout/Sidebar";
import DomainSettings from "./DomainSettings";
import Header from "@/app/components/layout/Header";
import { BackButton } from "@/app/components/ui/Button";

export default function AdminSettingsPage() {
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
                <h1 className="text-2xl font-semibold">
                  Paramètres d&apos;administration
                </h1>
              </div>
            </div>
            <DomainSettings />
          </div>
        </main>
      </div>
    </div>
  );
}
