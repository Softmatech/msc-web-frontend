// AuthModal.js
import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import baseApiUrl from "../url_base";

const AuthModal = ({ open, onClose, userRole, currentUsername, onSuccess }) => {
  const [username, setUsername] = useState(currentUsername || "");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const isAdmin = userRole === "Administrateur";

  const handleConfirm = async () => {
    try {
      const payload = isAdmin
        ? { username: currentUsername, password }
        : { username, password };

      const response = await fetch(baseApiUrl + "/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Unauthorized");

      const data = await response.json();
      onSuccess?.(data);
      setUsername("");
      setPassword("");
      setError("");
      onClose();
    } catch (err) {
      setError("Authentication failed");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Authentication</DialogTitle>
      <DialogContent>
        {!isAdmin && (
          <TextField
            label="Username"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        )}
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <Typography color="error">{error}</Typography>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleConfirm} variant="contained">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AuthModal;
