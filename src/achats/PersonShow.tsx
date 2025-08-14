import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  Show,
  SimpleShowLayout,
  Datagrid,
  TabbedShowLayout,
  DateField,
  ArrayField,
  ChipField,
  TextField,
} from "react-admin";
import { RouteComponentProps, useParams } from "react-router-dom";
import AmountComponents from "../cash_operations/AmountComponents";

// Define the component props
interface PersonShowProps extends RouteComponentProps {}

const PersonShow: React.FC<PersonShowProps> = (props) => {
  const { id } = useParams<{ id: string }>(); // Get the person ID from the URL params
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // You can perform any additional logic here if necessary, e.g. loading status.
    setLoading(false);
  }, []);

  return (
    <Show {...props}>
      <SimpleShowLayout>
        <TabbedShowLayout>
          <TabbedShowLayout.Tab label="Renseignements Personnels">
            {/* <Grid container spacing={1}> */}
            <Grid item xs={3}>
              <TextField source="firstName" label="Prenom" />
            </Grid>
            <Grid item xs={3}>
              <TextField source="lastName" label="Nom" />
            </Grid>

            <Grid item xs={3}>
              <TextField
                source="sexe"
                // choices={sexes}
                // validate={[required("Veuillez selectionner un sexe SVP")]}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                source="motherName"
                label="Nom de jeune fille de la mère"
              />
            </Grid>
            <Grid item xs={3}>
              <DateField
                source="birthDate"
                label="Date de Naissance"
                // validate={required()}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                source="birthPlace"
                label="Ville/Pays de Naissance"
                // validate={required()}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                source="nationalite"
                label="Nationalité"
                // validate={required()}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField source="livingCountry" label="Lieu de residence" />
            </Grid>
            {/* </Grid> */}
          </TabbedShowLayout.Tab>
          <TabbedShowLayout.Tab label="Pièce d'identité et statut">
            {/* <Grid container spacing={2}> */}
            <Grid item xs={3}>
              <TextField
                source="documentType"
                label="Type de Document"
                // choices={documentTypes}
                // validate={[
                //   required("Veuillez selectionner un type de document SVP!"),
                // ]}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                source="documentId"
                label="Numéro d'identité"
                // validate={required()}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                source="matrimonialStatus"
                label="Statut Matrimoniale"
                // validate={required()}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField source="nomConjoint" label="Nom du Conjoint" />
            </Grid>
            {/* </Grid> */}
          </TabbedShowLayout.Tab>
          <TabbedShowLayout.Tab label="Adresse">
            {/* <Grid container spacing={1}> */}
            <Grid item xs={2}>
              <TextField
                source="adressTitle"
                label="Etes-vous"
                // choices={adressTitle}
                // validate={[
                //   required("Veuillez selectionner un type de propriété SVP!"),
                // ]}
              />
            </Grid>
            <Grid item xs={1}>
              <TextField
                source="spentTime"
                label="Depuis combien de temps"
                // validate={required()}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField source="adress" label="Addresse" />
            </Grid>

            <Grid item xs={3}>
              <TextField source="postalCode" label="Code Postal" />
            </Grid>
            <Grid item xs={3}>
              <TextField
                source="email"
                label="Courrier"
                // validate={validateEmail}
              />
            </Grid>
            <Grid item xs={3}>
              <ArrayField source="phoneNumbers" label="Numero de Telephone(s)">
                <Datagrid bulkActionButtons={false} sx={{ width: "15%" }}>
                  <ChipField
                    source="phoneNumber"
                    // helperText={false}
                    label="Numero"
                    sx={{
                      backgroundColor: "black",
                      color: "white",
                      fontWeight: "bold",
                    }}
                  />
                </Datagrid>
              </ArrayField>
            </Grid>
            {/* </Grid> */}
          </TabbedShowLayout.Tab>
          <TabbedShowLayout.Tab label="Statut professionnel">
            <Grid container spacing={1}>
              <Grid item xs={3}>
                <TextField
                  source="profesionnalStatus"
                  // choices={profesionnalStatus}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  source="actualProfession"
                  label="Profession Actuel"
                />
              </Grid>
              <Grid item xs={3}>
                <TextField source="revenueSource" />
              </Grid>
            </Grid>
          </TabbedShowLayout.Tab>

          <TabbedShowLayout.Tab label="Contact">
            <Grid item xs={8}>
              <ArrayField
                source="personAContacterList"
                label="Numero de Telephone(s)"
              >
                <Datagrid bulkActionButtons={false}>
                  <ChipField
                    source="nomContact"
                    label="Nom du Contact"
                    sx={{
                      backgroundColor: "black",
                      color: "white",
                      fontWeight: "bold",
                    }}
                  />
                  <TextField source="adressContact" label="Adresse" />
                  <TextField source="phoneNumber" label="Numero de téléphone" />
                </Datagrid>
              </ArrayField>
            </Grid>
          </TabbedShowLayout.Tab>

          <TabbedShowLayout.Tab label="Compte lié(s)">
            <ArrayField
              source="accounts"
              // label="Numero de Compte(s)"
              emptyText="Pas de numero de compte(s)"
              label=""
            >
              {/* <Grid container spacing={2}> */}
              <Grid item xs={8}>
                <Datagrid bulkActionButtons={false}>
                  <ChipField
                    source="accountNumber"
                    label="Numero"
                    sx={{
                      backgroundColor: "black",
                      color: "white",
                      fontWeight: "bold",
                    }}
                  />
                  <TextField source="accountName" label="Description" />
                  <TextField source="accountTypeOne" label="Type" />
                  <AmountComponents
                    amountLabel={`Montant`}
                    _source={`accountBalance`}
                    currency={`currency`}
                  />
                </Datagrid>
              </Grid>
              {/* </Grid> */}
            </ArrayField>
          </TabbedShowLayout.Tab>
        </TabbedShowLayout>
      </SimpleShowLayout>
    </Show>
  );
};

export default PersonShow;
