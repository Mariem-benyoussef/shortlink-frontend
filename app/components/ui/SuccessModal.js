"use client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Copy, Eye, MessageCircle, X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "./Dialog";
import { Button } from "./Button";
import { useState } from "react";
import { FaFacebook, FaLinkedin, FaTiktok } from "react-icons/fa";
export default function SuccessModal({
  isOpen,
  onClose,
  shortUrl,
  onViewDetails,
}) {
  const [showMore, setShowMore] = useState(false);
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      toast.success("URL copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy text: ", err);
      toast.error("Failed to copy URL.");
    }
  };

  const shareLink = async (platform) => {
    const shareData = {
      title: "Lien partagé via TuniLink",
      text: "Consultez ce lien:",
      url: shortUrl,
    };

    switch (platform) {
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            shortUrl
          )}`,
          "_blank"
        );
        break;
      case "whatsapp":
        window.open(
          `https://wa.me/?text=${encodeURIComponent(shortUrl)}`,
          "_blank"
        );
        break;
      case "X":
        window.open(
          `https://x.com/intent/tweet?url=${encodeURIComponent(shortUrl)}`,
          "_blank"
        );
        break;
      case "telegram":
        window.open(
          `https://t.me/share/url?url=${encodeURIComponent(shortUrl)}`,
          "_blank"
        );
        break;

      case "tiktok":
        window.open(
          `https://www.tiktok.com/share?url=${encodeURIComponent(shortUrl)}`,
          "_blank"
        );
        break;
      case "linkedin":
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
            shortUrl
          )}`,
          "_blank"
        );
        break;
      default:
        if (navigator.share) {
          try {
            await navigator.share(shareData);
          } catch (err) {
            console.error("Error sharing:", err);
          }
        }
    }
  };

  return (
    <>
      <ToastContainer />
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogTitle>Modal</DialogTitle>
        <DialogContent className="sm:max-w-md">
          <div className="text-center">
            <div className="mx-auto w-16 h-16 mb-4 bg-yellow-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">🚀</span>
            </div>
            <h2 className="text-xl font-semibold mb-4">Votre lien est prêt!</h2>

            <div className="space-y-4">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={onViewDetails}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Afficher les détails du lien
                </Button>
                <Button
                  className="flex-1 bg-[#4169E1] hover:bg-[#4169E1]/90"
                  onClick={copyToClipboard}
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copier le lien
                </Button>
              </div>

              <div className="flex flex-wrap justify-center gap-4 pt-4">
                <button
                  onClick={() => shareLink("facebook")}
                  className="w-12 h-12 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:opacity-90"
                >
                  <FaFacebook className="w-6 h-6" />
                </button>
                <button
                  onClick={() => shareLink("whatsapp")}
                  className="w-12 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:opacity-90"
                  aria-label="Partager sur WhatsApp"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                </button>

                <button
                  onClick={() => shareLink("X")}
                  className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center hover:opacity-90"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M18.146 1.846H22L14.82 10.41 23.5 22h-7.074l-5.428-7.246-6.432 7.246H1.5l8.275-9.42L1 1.846h7.333l4.756 6.542L18.146 1.846Zm-1.283 18.38h2.288L6.747 3.325H4.314l12.55 16.9Z"></path>
                  </svg>
                </button>
                <button
                  onClick={() => shareLink("telegram")}
                  className="w-12 h-12 rounded-full bg-[#0088cc] text-white flex items-center justify-center hover:opacity-90"
                  aria-label="Partager sur Telegram"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M21.47 2.29a1.08 1.08 0 0 0-1.1-.2L2.3 9.08a1.05 1.05 0 0 0 .11 1.98l4.92 1.48 2.3 6.93a1.07 1.07 0 0 0 1.6.55l3.03-2.36 4.18 3.05a1.07 1.07 0 0 0 1.66-.77l3.1-15.23a1.08 1.08 0 0 0-.33-1.04zM9.46 14.06 8.8 17.52l-.72-2.35 1.38-1.11zm1.55 1.09 1.3 1-1.72 1.33.42-2.33zm8.62-10.34L15.4 19.49l-3.72-2.71-3.06 2.37-1.73-5.2 10.79-7.42z" />
                  </svg>
                </button>
              </div>
              <button
                onClick={() => setShowMore(!showMore)}
                className="mt-4 text-sm text-blue-500"
              >
                {showMore ? "Moins" : "Plus d'options"}
              </button>

              {showMore && (
                <div className="flex flex-wrap justify-center gap-4 pt-4">
                  <button
                    onClick={() => shareLink("tiktok")}
                    className="w-12 h-12 rounded-full bg-[#000000] text-white flex items-center justify-center hover:opacity-90"
                  >
                    <FaTiktok className="w-6 h-6" />
                  </button>

                  <button
                    onClick={() => shareLink("linkedin")}
                    className="w-12 h-12 rounded-full bg-[#0077b5] text-white flex items-center justify-center hover:opacity-90"
                  >
                    <FaLinkedin className="w-6 h-6" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
