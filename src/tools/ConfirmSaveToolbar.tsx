import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { SaveButton, Toolbar, useSaveContext } from "react-admin";
import { useFormContext } from "react-hook-form";

const ConfirmSaveToolbar = ({
  message = "Voulez-vous vraiment enregistrer ?",
  successMessage = "Données enregistrées avec succès !",
  onSuccess, // optional parent handler
}) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [pendingOnSuccess, setPendingOnSuccess] = useState<
    null | ((data: any) => void)
  >(null);
  const [savedData, setSavedData] = useState<any>(null);

  const { handleSubmit } = useFormContext();
  const { save } = useSaveContext();

  const handleOpen = (e: React.MouseEvent) => {
    e.preventDefault();
    setConfirmOpen(true);
  };

  const handleConfirm = () => {
    setConfirmOpen(false);
    handleSubmit(
      (data) => {
        save(data, {
          onSuccess: (responseData) => {
            setSavedData(responseData); // store response
            setSuccessOpen(true);
            setPendingOnSuccess(() => onSuccess); // store callback
          },
        });
      },
      (errors) => {
        console.warn("Validation errors:", errors);
      },
    )();
  };

  const handleSuccessClose = () => {
    setSuccessOpen(false);
    if (pendingOnSuccess) {
      pendingOnSuccess(savedData); // pass the saved data to onSuccess
      setPendingOnSuccess(null);
      setSavedData(null);
    }
  };

  const handleCancel = () => {
    setConfirmOpen(false);
  };

  return (
    <>
      <Toolbar>
        <SaveButton label="Enregistrer" onClick={handleOpen} type="button" />
      </Toolbar>

      <Dialog open={confirmOpen} onClose={handleCancel}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>{message}</DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="secondary">
            Annuler
          </Button>
          <Button onClick={handleConfirm} color="primary" autoFocus>
            Confirmer
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={successOpen} onClose={handleSuccessClose}>
        <DialogTitle>Succès</DialogTitle>
        <DialogContent>{successMessage}</DialogContent>
        <DialogActions>
          <Button onClick={handleSuccessClose} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ConfirmSaveToolbar;
