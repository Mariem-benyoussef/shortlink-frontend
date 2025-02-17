"use client";

import Header from "@/app/components/layout/Header";
import Sidebar from "@/app/components/layout/Sidebar";
import CreateLinkForm from "./CreateLinkForm";
import { BackButton } from "@/app/components/ui/Button";

export default function CreateLink() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar /> {/* Sidebar renders based on screen size */}
      <div className="flex-1 flex flex-col lg:pl-60">
        <Header />
        <main className="flex-1">
          <div className="container mx-auto p-4 md:p-6 max-w-4xl">
            <div className="flex items-center mb-6">
              <BackButton />
            </div>
            <CreateLinkForm />
          </div>
        </main>
      </div>
    </div>
  );
}
