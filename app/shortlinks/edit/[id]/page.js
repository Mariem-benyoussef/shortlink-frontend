"use client";

import Header from "@/app/components/layout/Header";
import Sidebar from "@/app/components/layout/Sidebar";
import { Button } from "@/app/components/ui/Button";
import { Input } from "@/app/components/ui/Input";
import { Label } from "@/app/components/ui/Label";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";


// In a real app, this would be fetched based on the ID
const sampleLink = {
  domain: "tnbresa",
  path: "40PtFR3",
  destination:
    "https://tn.tunisiebooking.com/theme/rsitv2_new_v2.php?item=c291cmNiX2NvbW09d2VjJTJDZGVza3RvcCZ2aWxsZV90eHQ9TFoZGlhJmikX3htbF9ob3RlbDOmdmlsbGU9TWFoZlhJmRlcQ9TWFoZGlhJmikX3",
  title: "Tunisiebooking.com vacances a prix promos",
  tags: "40PtFR3",
};

export default function EditLinkPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col lg:pl-60">
        <Header />
        <main className="flex-1">
          <div className="container mx-auto p-4 md:p-6 max-w-3xl">
            <div className="flex items-center gap-4 mb-8">
              <Link href="/shortlinks" className="p-2 hover:bg-accent rounded-full">
                <ArrowLeft className="h-6 w-6" />
              </Link>
              <h1 className="text-2xl font-semibold">Modification du lien</h1>
            </div>

            <form className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Lien court</h2>
                <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                  <div className="flex-1 w-full">
                    <Input
                      defaultValue={sampleLink.domain}
                      className="w-full"
                    />
                  </div>
                  <div className="hidden md:block">/</div>
                  <div className="flex-1 w-full">
                    <Input defaultValue={sampleLink.path} className="w-full" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-lg font-semibold">URL de destination</h2>
                <Input
                  defaultValue={sampleLink.destination}
                  className="w-full font-mono text-sm"
                />
              </div>

              <div className="space-y-6">
                <h2 className="text-lg font-semibold">Détails facultatifs</h2>
                <div className="space-y-4">
                  <div>
                    <Label>Titre</Label>
                    <Input defaultValue={sampleLink.title} className="mt-2" />
                  </div>
                  <div>
                    <Label>Étiquettes</Label>
                    <Input defaultValue={sampleLink.tags} className="mt-2" />
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#4169E1] hover:bg-[#4169E1]/90"
              >
                MODIFIER
              </Button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
