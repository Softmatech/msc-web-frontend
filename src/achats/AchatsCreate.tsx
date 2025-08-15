import { Box, Grid, TextField as MuiTextField } from "@mui/material";
import {
  Create,
  DateInput,
  SelectInput,
  required,
  TextInput,
  useRedirect,
  TabbedForm,
  ReferenceInput,
  AutocompleteInput,
  ArrayInput,
  SimpleFormIterator,
  FormDataConsumer,
  useGetList,
  TextField,
} from "react-admin";
import ConfirmSaveToolbar from "../tools/ConfirmSaveToolbar";
import FournisseurInput from "../tools/Components/FournisseurInput";
import SymboleInput from "../tools/Components/SymboleInput";
import ProduitInput from "../tools/Components/ProduitInput";
import NumberOnlyInput from "../tools/Components/NumberOnlyInput";
import DecimalInput from "../tools/Components/DecimalInput";
import UniteInput from "../tools/Components/UniteInput";
import { useEffect, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";

const typeAchats = [
  { id: "Cash", name: "Cash" },
  { id: "Credit", name: "Credit" },
];

export const handleMultiplication = (a, b) => a * b;

const EffectifWatcher = () => {
  const { setValue } = useFormContext();
  const details = useWatch({ name: "detailleAchats" }) || [];

  useEffect(() => {
    const grandTotal = details.reduce((sum, row) => {
      const q = Number(row?.quantite || 0);
      const p = Number(row?.prixUnitaire || 0);
      return sum + q * p;
    }, 0);

    // Push the value into the form state
    setValue("effectif", grandTotal, {
      shouldValidate: true,
      shouldDirty: true,
    });
  }, [details, setValue]);

  return null; // no UI
};

const AchatCreate = () => {
  const redirect = useRedirect();
  const [prixUnitaire, SetPrixUnitaire] = useState("0.00");
  const [quantite, SetQuantite] = useState("0");
  // const [subTotal, SetSubTotal] = useState("0.00");

  // Fetch the list of products once
  const { data: produitsList = [] } = useGetList("produits");

  const onSuccess = (data) => {
    redirect(`/achats/${data.id}/show`);
  };

  // useEffect(() => {
  //   SetSubTotal(handleMultiplication(quantite, prixUnitaire));
  // }, [quantite, prixUnitaire]);

  // console.log("SUB------->> " + subTotal);

  return (
    <Create mutationOptions={{ onSuccess }}>
      <TabbedForm
        label="Achat"
        toolbar={
          <ConfirmSaveToolbar
            message="Voulez-vous créer un achat avec les informations ci-dessous"
            successMessage="Achat enregistré avec succès !"
            onSuccess={(data) => onSuccess(data)}
          />
        }
      >
        <TabbedForm.Tab label="ACHAT">
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <TextInput
                source="legende"
                label="Légende"
                defaultValue="AHT"
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={3}>
              <DateInput
                source="dates"
                label="Date"
                defaultValue={new Date()}
              />
            </Grid>
            <Grid item xs={3}>
              <SelectInput
                source="typeAchat"
                label="Type d'achat"
                choices={typeAchats}
                validate={required()}
              />
            </Grid>
            <Grid item xs={3}>
              <FournisseurInput />
            </Grid>
            <Grid item xs={3}>
              <TextInput
                source="effectif"
                label="Effectif"
                InputProps={{ readOnly: true }}
                format={(v) => Number(v ?? 0).toFixed(2)}
              />
            </Grid>
            {/* This computes and updates 'effectif' whenever rows change */}
            <EffectifWatcher />
            <Grid item xs={3}>
              <SymboleInput />
            </Grid>
            <Grid item xs={3}>
              <ReferenceInput
                source="utilisateur"
                reference="users"
                label="Utilisateur"
              >
                <AutocompleteInput optionText="username" />
              </ReferenceInput>
            </Grid>
          </Grid>

          <ArrayInput source="detailleAchats">
            <SimpleFormIterator>
              <Grid container spacing={2}>
                {/* Product selection */}
                <Grid item xs={3}>
                  <ProduitInput source="produit" />
                </Grid>

                {/* EPC auto-filled */}
                <Grid item xs={3}>
                  <FormDataConsumer>
                    {({ scopedFormData = {} }) => {
                      const selectedProduit = produitsList.find(
                        (p) => p.id === scopedFormData.produit,
                      );
                      return (
                        <MuiTextField
                          label="EPC"
                          value={selectedProduit?.epc || ""}
                          variant="outlined"
                          size="small"
                          fullWidth
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                      );
                    }}
                  </FormDataConsumer>
                </Grid>
                {/* Quantity */}
                <Grid item xs={2}>
                  <NumberOnlyInput source="quantite" label="Quantité" />
                </Grid>

                {/* Unité */}
                <Grid item xs={2}>
                  <UniteInput source="unite" />
                </Grid>

                {/* Unit price */}
                <Grid item xs={2}>
                  <DecimalInput source="prixUnitaire" label="Prix unitaire" />
                </Grid>

                {/* Total auto-calculated */}
                <Grid item xs={2}>
                  <FormDataConsumer>
                    {({ scopedFormData = {} }) => {
                      const q = Number(scopedFormData.quantite || 0);
                      const p = Number(scopedFormData.prixUnitaire || 0);
                      const total = q * p;
                      return (
                        <MuiTextField
                          label="Sous Total"
                          value={total}
                          variant="outlined"
                          size="small"
                          fullWidth
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                      );
                    }}
                  </FormDataConsumer>
                </Grid>
              </Grid>
            </SimpleFormIterator>
          </ArrayInput>
        </TabbedForm.Tab>
      </TabbedForm>
    </Create>
  );
};

export default AchatCreate;
