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
