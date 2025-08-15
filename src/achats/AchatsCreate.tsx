import { Grid } from "@mui/material";
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
  NumberInput,
  SimpleFormIterator,
  FormDataConsumer,
  useGetList,
  TextField,
  NumberField,
} from "react-admin";
import ConfirmSaveToolbar from "../tools/ConfirmSaveToolbar";
import FournisseurInput from "../tools/Components/FournisseurInput";
import SymboleInput from "../tools/Components/SymboleInput";
import ProduitInput from "../tools/Components/ProduitInput";

const typeAchats = [
  { id: "Cash", name: "Cash" },
  { id: "Credit", name: "Credit" },
];

const AchatCreate = () => {
  const redirect = useRedirect();

  // Fetch the list of products once
  const { data: produitsList = [] } = useGetList("produits");

  const onSuccess = (data) => {
    redirect(`/achats/${data.id}/show`);
  };

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
              <TextInput source="effectif" label="Effectif" disabled />
            </Grid>
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

          {/* Array of detailleAchats */}
          <ArrayInput source="detailleAchats">
            <SimpleFormIterator>
              <Grid container spacing={2}>
                {/* Product selection */}
                <Grid item xs={3}>
                  <ProduitInput source="produit" />
                </Grid>

                {/* EPC auto-filled from selected product */}
                <Grid item xs={3}>
                  <FormDataConsumer>
                    {({ scopedFormData }) => {
                      const selectedProduit = produitsList.find(
                        (p) => p.id === scopedFormData?.produit,
                      );
                      return (
                        <TextField
                          source="epc"
                          label="EPC"
                          record={{ epc: selectedProduit?.epc || "" }}
                        />
                      );
                    }}
                  </FormDataConsumer>
                </Grid>

                {/* Quantity */}
                <Grid item xs={2}>
                  <TextInput source="quantite" label="Quantité" />
                </Grid>

                {/* Unit price */}
                <Grid item xs={2}>
                  <TextInput source="prixUnitaire" label="Prix unitaire" />
                </Grid>

                {/* Total auto-calculated */}
                <Grid item xs={2}>
                  <FormDataConsumer>
                    {({ scopedFormData }) => {
                      const total =
                        (scopedFormData?.quantite || 0) *
                        (scopedFormData?.prixUnitaire || 0);
                      return (
                        <TextInput
                          source="total"
                          label="Sous Total"
                          value={{ total }}
                          disabled
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
