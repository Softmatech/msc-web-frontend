import { AuthProvider } from "react-admin";
import baseApiUrl from "../url_base";

const API_URL = baseApiUrl;

export const authProvider: AuthProvider = {
  login: async ({ username, password }) => {
    const request = new Request(`${API_URL}/auth/login`, {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      body: JSON.stringify({ username, password }),
    });

    const response = await fetch(request);

    if (!response.ok) {
      throw new Error("Invalid login credentials");
    }

    const data = await response.json();
    localStorage.setItem("token", data.token);
    localStorage.setItem("username", data.username);
    localStorage.setItem("role", data.roles[0].authority);

    // 🔄 Now fetch the full user info using the token
    const userRes = await fetch(`${API_URL}/auth/me`, {
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.token}`,
      }),
    });

    if (!userRes.ok) {
      throw new Error("Failed to fetch user info");
    }

    const userData = await userRes.json();
    localStorage.setItem("userId", userData.id); // ✅ Now you have the ID
  },

  logout: async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    return Promise.resolve();
  },

  checkAuth: async () => {
    const token = localStorage.getItem("token");
    if (!token) return Promise.reject("No token");

    // Optional: decode and check expiry if your token is a JWT
    try {
      const { exp } = JSON.parse(atob(token.split(".")[1]));
      if (Date.now() >= exp * 1000) {
        localStorage.removeItem("token");
        return Promise.reject("Token expired");
      }
      return Promise.resolve();
    } catch {
      return Promise.reject("Invalid token");
    }
  },

  checkError: async (error) => {
    const status = error.status;
    if (status === 401 || status === 403) {
      localStorage.removeItem("token");
      return Promise.reject("Unauthorized");
    }
    return Promise.resolve();
  },

  getPermissions: async () => {
    const role = localStorage.getItem("role");
    return role ? Promise.resolve(role) : Promise.reject("No role found");
  },

  getIdentity: async () => {
    const username = localStorage.getItem("username");
    if (!username) return Promise.reject();
    return Promise.resolve({
      id: username,
      fullName: username,
    });
  },
  canAccess: async ({ resource, action }) => {
    const role = localStorage.getItem("role");

    if (role === "Administrateur") {
      return Promise.resolve(true);
    }

    if (role === "Simple") {
      const hasAccess = [
        "persons",
        "accounts",
        "transactions",
        "cash-operations",
        "money-x-change",
      ].includes(resource);
      return Promise.resolve(hasAccess);
    }

    return Promise.resolve(false);
  },
};
