"use client";

import { ArrowLeft, Copy, MoreVertical, Share2 } from "lucide-react";
import Link from "next/link";

import { Button } from "@/app/components/ui/Button";
import Sidebar from "@/app/components/layout/Sidebar";
import Header from "@/app/components/layout/Header";
import { Card, CardContent } from "@/app/components/ui/Card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/Dropdown-menu";
import { useState } from "react";

// This would normally come from your database/API
const sampleData = {
  title: "Tunisiebooking.com vacances a prix promos",
  shortUrl: "bit.ly/4sBRXN8",
  thumbnail:
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-IHocTArvYPB4a47bTjt6ZceJOdYuds.png",
  stats: {
    lastWeek: [12, 15, 10, 8, 14, 16, 13, 9, 11, 7, 13, 15],
    last4Days: [14, 12, 15, 13],
  },
};

export default function LinkDetailsPage() {
  const [activeDataset, setActiveDataset] = useState("last4Days");

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col lg:pl-60">
        <Header />
        <main className="flex-1">
          <div className="container mx-auto p-4 md:p-6">
            <div className="flex items-center gap-4 mb-8">
              <Link
                href="/shortlinks"
                className="p-2 hover:bg-accent rounded-full"
              >
                <ArrowLeft className="h-6 w-6" />
              </Link>
              <h1 className="text-2xl font-semibold">Détails du lien</h1>
            </div>

            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <img
                    src={sampleData.thumbnail || "/placeholder.svg"}
                    alt=""
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium truncate">{sampleData.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {sampleData.shortUrl}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="secondary" size="sm">
                      <Copy className="h-4 w-4 mr-2" />
                      Copier
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="text-pink-600"
                    >
                      <Share2 className="h-4 w-4 mr-2" />
                      Partager
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Modifier</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          Supprimer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">
                  Clics + scans dans la durée
                </h2>
                <Link
                  href="#"
                  className="text-sm text-blue-600 hover:underline"
                >
                  voir rapport
                </Link>
              </div>

              <div className="flex items-center gap-4 text-sm">
                <button
                  onClick={() => setActiveDataset("last4Days")}
                  className={`flex items-center gap-2 ${
                    activeDataset === "last4Days"
                      ? "text-blue-600"
                      : "text-muted-foreground"
                  }`}
                >
                  <div className="w-3 h-3 rounded-full bg-blue-600" />
                  Last 4 days
                </button>
                <button
                  onClick={() => setActiveDataset("lastWeek")}
                  className={`flex items-center gap-2 ${
                    activeDataset === "lastWeek"
                      ? "text-blue-600"
                      : "text-muted-foreground"
                  }`}
                >
                  <div className="w-3 h-3 rounded-full bg-blue-600 opacity-50" />
                  Last Week
                </button>
              </div>

              <div className="flex items-center justify-between mt-6">
                <p className="text-sm text-muted-foreground">
                  Affichage des données
                </p>
                <div className="flex items-center gap-1">
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    {"<"}
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 bg-primary text-primary-foreground"
                  >
                    1
                  </Button>
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    2
                  </Button>
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    3
                  </Button>
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    4
                  </Button>
                  <span className="mx-2">...</span>
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    40
                  </Button>
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    {">"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
