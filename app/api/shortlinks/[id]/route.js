import { NextResponse } from "next/server";

const API_BASE_URL = process.env.API_BASE_URL;
const API_URL = `${API_BASE_URL}/api/shortlinks`;

// Fonction pour récupérer un lien spécifique par son ID
async function fetchShortlinkById(id) {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) {
    throw new Error("Lien introuvable");
  }
  return await response.json();
}

// Fonction pour mettre à jour un lien
async function updateShortlink(id, data) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Erreur lors de la mise à jour du lien");
  }
  return await response.json();
}

// Fonction pour supprimer un lien
async function deleteShortlink(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Erreur lors de la suppression du lien");
  }
  return await response.json();
}

// Gestionnaire GET pour récupérer un lien spécifique
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const shortlink = await fetchShortlinkById(id);
    return NextResponse.json(shortlink);
  } catch (error) {
    console.error("Error fetching shortlink:", error);
    return NextResponse.json(
      { error: "Failed to fetch shortlink", details: error.message },
      { status: 500 }
    );
  }
}

// Gestionnaire PUT pour modifier un lien
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const data = await request.json();
    const updatedShortlink = await updateShortlink(id, data);
    return NextResponse.json(updatedShortlink);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update shortlink", details: error.message },
      { status: 500 }
    );
  }
}

// Gestionnaire DELETE pour supprimer un lien
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    await deleteShortlink(id);
    return NextResponse.json({ message: "Lien supprimé avec succès." });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete shortlink", details: error.message },
      { status: 500 }
    );
  }
}

// // Fetch analytics data for a shortlink
// async function fetchShortlinkAnalytics(destination) {
//   // const encodedDestination = encodeURIComponent(destination);
//   const response = await fetch(`${API_URL}/${destination}`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
//   console.log("response", response);
//   if (!response.ok) {
//     throw new Error("Analytics introuvables");
//   }
//   return await response.json();
// }

// // Gestionnaire GET pour récupérer les analytics d'un lien via la destination
// export async function GET_ANALYTICS(request, { params }) {
//   try {
//     const { destination } = await params;
//     const analytics = await fetchShortlinkAnalytics(destination);
//     return NextResponse.json(analytics);
//   } catch (error) {
//     console.error("Error fetching analytics:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch analytics", details: error.message },
//       { status: 500 }
//     );
//   }
// }
