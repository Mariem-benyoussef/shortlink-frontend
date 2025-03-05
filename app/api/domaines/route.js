import { NextResponse } from "next/server";

const API_BASE_URL = "http://localhost:8000";

const API_URL = `${API_BASE_URL}/api/domaines`;

// Fonction pour récupérer tous les domaines
export async function getDomains() {
  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des domaines");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Fonction pour créer un domaine
export async function createDomain(domainData) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(domainData),
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la création du domaine");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Gestionnaire GET pour récupérer tous les domaines
export async function GET(request) {
  try {
    const domains = await getDomains();
    if (domains) {
      return NextResponse.json(domains);
    }
    return NextResponse.json(
      { error: "Aucun domaine trouvé" },
      { status: 404 }
    );
  } catch (error) {
    console.error("Erreur lors de la récupération des domaines :", error);
    return NextResponse.json(
      { error: "Erreur serveur lors de la récupération des domaines" },
      { status: 500 }
    );
  }
}

// Gestionnaire POST pour créer un domaine
export async function POST(request) {
  try {
    const domainData = await request.json();
    const newDomain = await createDomain(domainData);
    if (newDomain) {
      return NextResponse.json(newDomain, { status: 201 });
    }
    return NextResponse.json(
      { error: "Erreur lors de la création du domaine" },
      { status: 500 }
    );
  } catch (error) {
    console.error("Erreur lors de la création du domaine :", error);
    return NextResponse.json(
      { error: "Erreur serveur lors de la création du domaine" },
      { status: 500 }
    );
  }
}

// Définir un domaine comme domaine par défaut
export async function setDefaultDomain(domainId) {
  try {
    const response = await fetch(`${API_URL}/set-default`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ domainId }),
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la définition du domaine par défaut");
    }

    return await response.json();
  } catch (error) {
    console.error("Erreur:", error);
    throw error;
  }
}
