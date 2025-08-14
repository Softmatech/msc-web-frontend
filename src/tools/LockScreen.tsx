import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LockScreen = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleUnlock = async () => {
    try {
      const response = await fetch("/api/auth/re-authenticate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
        credentials: "include", // if using cookies
      });

      if (response.ok) {
        const lastRoute = localStorage.getItem("lastRoute") || "/";
        navigate(lastRoute);
      } else {
        setError("Mot de passe incorrect");
      }
    } catch (err) {
      setError("Erreur de connexion");
    }
  };

  return (
    <div style={{ marginTop: 100, textAlign: "center" }}>
      <h2>🔒 Écran verrouillé</h2>
      <input
        type="password"
        placeholder="Entrer votre mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ padding: 10, marginTop: 20 }}
      />
      <br />
      <button onClick={handleUnlock} style={{ marginTop: 10 }}>
        Déverrouiller
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default LockScreen;
