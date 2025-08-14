import { Button } from "@mui/material";
import { useState } from "react";
import AuthModal from "./AuthModal";

const SecureButton = () => {
  const [open, setOpen] = useState(false);

  const handleSuccess = (data) => {
    // Do the sensitive action here
    console.log("User verified, token:", data.token);
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>Delete Securely</Button>
      <AuthModal
        open={open}
        onClose={() => setOpen(false)}
        isAdmin={false} // true if admin-only password check
        onSuccess={handleSuccess}
      />
    </>
  );
};
