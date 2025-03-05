const API_BASE_URL = "http://localhost:8000";

const API_URL = `${API_BASE_URL}/api/domaines`;

// Fonction pour mettre à jour un domaine
export async function updateDomain(id, domainData) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(domainData),
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la mise à jour du domaine");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Fonction pour supprimer un domaine
export async function deleteDomain(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la suppression du domaine");
    }

    return { message: "Domaine supprimé avec succès" };
  } catch (error) {
    console.error(error);
    return null;
  }
}
