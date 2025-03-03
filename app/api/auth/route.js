// const API_BASE_URL = process.env.API_BASE_URL;
// const API_URL = `${API_BASE_URL}/api`;
const BASE_URL = "http://localhost:8000/api";
/**
 * Fonction pour se connecter
 * @param {string} email
 * @param {string} password
 * @returns {Promise<Response>}
 */
export const login = async (email, password) => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Erreur de connexion");
  }

  return response.json();
};

/**
 * Fonction pour s'inscrire
 * @param {string} name
 * @param {string} email
 * @param {string} password
 * @param {string} password_confirmation
 * @returns {Promise<Response>}
 */
export const register = async (
  name,
  email,
  password,
  password_confirmation
) => {
  const response = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ name, email, password, password_confirmation }),
  });

  if (!response.ok) {
    throw new Error("Erreur d'inscription");
  }

  return response.json();
};

/**
 * Fonction pour réinitialiser le mot de passe
 * @param {string} email
 * @returns {Promise<Response>}
 */
export const forgotPassword = async (email) => {
  const response = await fetch(`${BASE_URL}/forgot-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    throw new Error("Erreur lors de la demande de réinitialisation");
  }

  return response.json();
};

/**
 * Fonction pour réinitialiser le mot de passe
 * @param {string} email
 * @param {string} password
 * @param {string} password_confirmation
 * @param {string} token
 * @returns {Promise<Response>}
 */
export const resetPassword = async (
  email,
  password,
  password_confirmation,
  token
) => {
  const response = await fetch(`${BASE_URL}/reset-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ email, password, password_confirmation, token }),
  });

  if (!response.ok) {
    throw new Error("Erreur lors de la réinitialisation du mot de passe");
  }

  return response.json();
};

/**
 * Fonction pour récupérer la liste des utilisateurs
 * @returns {Promise<Response>}
 */
export const getUsers = async () => {
  const response = await fetch(`${BASE_URL}/get-users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des utilisateurs");
  }

  return response.json();
};

/**
 * Fonction pour modifier un utilisateur
 * @param {number} id - ID de l'utilisateur à modifier
 * @param {Object} userData - Données mises à jour de l'utilisateur
 * @returns {Promise<Response>}
 */
export const editUser = async (id, userData) => {
  const response = await fetch(`${BASE_URL}/edit-user/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error("Erreur lors de la modification de l'utilisateur");
  }

  return response.json();
};

/**
 * Fonction pour supprimer un utilisateur
 * @param {number} id - ID de l'utilisateur à supprimer
 * @returns {Promise<Response>}
 */
export const deleteUser = async (id) => {
  const response = await fetch(`${BASE_URL}/delete-user/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Erreur lors de la suppression de l'utilisateur");
  }

  return response.json();
};

/**
 * Fonction pour récupérer les informations du profil utilisateur
 * @returns {Promise<Response>}
 */
export const getProfile = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${BASE_URL}/auth/profile`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Erreur lors de la récupération du profil");
  }

  return response.json();
};

/**
 * Fonction pour mettre à jour les informations du profil utilisateur
 * @param {Object} profileData - Données mises à jour du profil (name, email, etc.)
 * @returns {Promise<Response>}
 */
export const updateProfile = async (profileData) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${BASE_URL}/auth/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(profileData),
  });

  if (!response.ok) {
    throw new Error("Erreur lors de la mise à jour du profil");
  }

  return response.json();
};

/**
 * Fonction pour changer le mot de passe de l'utilisateur
 * @param {string} currentPassword - Mot de passe actuel
 * @param {string} newPassword - Nouveau mot de passe
 * @param {string} newPasswordConfirmation - Confirmation du nouveau mot de passe
 * @returns {Promise<Response>}
 */
export const changePassword = async (
  currentPassword,
  newPassword,
  newPasswordConfirmation
) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${BASE_URL}/auth/change-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      current_password: currentPassword,
      new_password: newPassword,
      new_password_confirmation: newPasswordConfirmation,
    }),
  });

  if (!response.ok) {
    throw new Error("Erreur lors du changement de mot de passe");
  }

  return response.json();
};
