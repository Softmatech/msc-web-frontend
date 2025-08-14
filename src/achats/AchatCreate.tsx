import { Grid } from "@mui/material";
import {
  Create,
  DateInput,
  SelectInput,
  required,
  TextInput,
  minLength,
  maxLength,
  email,
  useNotify,
  useRedirect,
  TabbedForm,
  Form,
  AutocompleteInput,
} from "react-admin";
import ConfirmSaveToolbar from "../tools/ConfirmSaveToolbar";

// const sexes = [
//   { id: "Masculin", name: "Masculin" },
//   { id: "Feminin", name: "Feminin" },
// ];

// const documentTypes = [
//   { id: "Passport", name: "Passport" },
//   { id: "Carte_identification", name: "Carte_identification" },
//   { id: "Permis_de_conduire", name: "Permis_de_conduire" }, //Permis_de_conduire
//   { id: "Autre", name: "Autre" },
// ];

// const adressTitle = [
//   { id: "Propriétaire", name: "Propriétaire" },
//   { id: "Locataire", name: "Locataire" },
//   { id: "Autre", name: "Autre" },
// ];

// const profesionnalStatus = [
//   //Actif,Retraité, Chomeur, Elève_Etudiant, Autre
//   { id: "Actif", name: "Actif" },
//   { id: "Retraité", name: "Retraité" },
//   { id: "Chomeur", name: "Chomeur" },
//   { id: "Elève_Etudiant", name: "Elève_Etudiant" },
//   { id: "Autre", name: "Autre" },
// ];

// const revenueSource = [
//   //Salaire, Retraité, XFer_Etr, Autre
//   { id: "Salaire", name: "Salaire" },
//   { id: "Retraité", name: "Retraité" },
//   { id: "XFer_Etr", name: "XFer_Etr" },
//   { id: "Autre", name: "Autre" },
// ];
const validateName = [required(), minLength(3), maxLength(15)];
const validateEmail = email();
// const validateAge = [number(), minValue(18)];
// const validateZipCode = regex(/^\d{5}$/, "Must be a valid Zip Code");
// const validateSexe = (value: any) => {
//   if (!value) {
//     return "Please select a sex";
//   }
// };
// const validateDocumentType = [
//   required(),
//   choices(documentTypes, "Please choose one of the values"),
// ];
const AchatCreate = () => {
  const notify = useNotify();
  const redirect = useRedirect();

  const onSuccess = (data: any) => {
    redirect(`/persons/${data.id}/show`);
  };

  return (
    <Create mutationOptions={{ onSuccess }}>
      {/* <SimpleForm warnWhenUnsavedChanges> */}
      <TabbedForm
        toolbar={
          <ConfirmSaveToolbar
            message={`Voulez-vous de creer un compte avec les informations ci-dessous`}
            successMessage="Personne enregistrée avec succès !"
            onSuccess={(data) => {
              onSuccess(data);
            }}
          />
        }
      >
        <Form>
          <Grid container>
            <Grid item xs={6}>
              <TextInput source="typeachat" />
            </Grid>
            <Grid item xs={6}>
              <TextInput source="fournisseur" />
            </Grid>
            <Grid item xs={12}>
              <AutocompleteInput source="devise" />
            </Grid>
            <Grid item xs={12}>
              {/* <SaveButton /> */}
            </Grid>
          </Grid>
        </Form>
      </TabbedForm>
      {/* </SimpleForm> */}
    </Create>
  );
};
export default AchatCreate;
