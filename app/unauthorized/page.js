export default function Unauthorized() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold text-red-500">Accès interdit</h1>
      <p>
        Vous n&apos;avez pas les droits nécessaires pour accéder à cette page.
      </p>
    </div>
  );
}
