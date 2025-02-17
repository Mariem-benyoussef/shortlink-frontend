import Image from "next/image";
import Analytics from "./analytics/page";
import CreateLinkForm from "./shortlinks/create/page";
import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";
import { BackButton } from "./components/ui/Button";

export default function Home() {
  // return (
  //   <div>
  //     <h1>Dashboard Analytics</h1>
  //      <Analytics />
  //   </div>
  // );

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
            {/* <CreateLinkForm /> */}
          </div>
        </main>
      </div>
    </div>
  );
}
