// Gestion des listes de liens.
// POST (créer une tâche), GET (récupérer toutes les liens).

import { NextResponse } from "next/server";

const API_BASE_URL = process.env.API_BASE_URL;
const API_URL = `${API_BASE_URL}/api/shortlinks`;
export async function fetchShortlinks() {
  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch: ${response.status} ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error in fetchShortlinks:", error);
    throw error;
  }
}

// Gestionnaire GET pour récupérer les liens.
export async function GET(request) {
  try {
    const shortlinks = await fetchShortlinks();
    return NextResponse.json(shortlinks);
  } catch (error) {
    console.error("Error fetching shortlinks:", error);
    return NextResponse.json(
      { error: "Failed to fetch shortlinks", details: error.message },
      { status: 500 }
    );
  }
}

// Fonction pour créer un lien raccourci
export async function createShortlink(data) {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/shortlinks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });

    // console.log("responseeeee", response);
    const shortlinkData = await response.json();
    // console.log("shortlinkDataaaaa", shortlinkData);
    return shortlinkData;
  } catch (error) {
    console.error("Error in createShortlink:", error);
    throw error;
  }
}

// Gestionnaire POST pour créer un nouveau lien
export async function POST(request) {
  try {
    const {
      destination,
      titre,
      chemin_personnalise,
      utm_term,
      utm_content,
      utm_campaign,
      utm_source,
      utm_medium,
    } = await request.json();

    // console.log("Received data:", {
    //   destination,
    //   titre,
    //   chemin_personnalise,
    //   utm_term,
    //   utm_content,
    //   utm_campaign,
    //   utm_source,
    //   utm_medium,
    // });

    const shortlink = await createShortlink({
      destination,
      titre,
      chemin_personnalise,
      utm_term,
      utm_content,
      utm_campaign,
      utm_source,
      utm_medium,
    });
    return NextResponse.json(shortlink);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create shortlink", details: error.message },
      { status: 500 }
    );
  }
}
