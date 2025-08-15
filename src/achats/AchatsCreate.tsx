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
import FournisseurInput from "../tools/Components/FournisseurInput";

const typeAchats = [
  { id: "Cash", name: "Cash" },
  { id: "Credit", name: "Credit" },
];

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
    redirect(`/achats/${data.id}/show`);
  };

  return (
    <Create mutationOptions={{ onSuccess }}>
      {/* <SimpleForm warnWhenUnsavedChanges> */}
      <TabbedForm
        label="Achat"
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
        <TabbedForm.Tab label="ACHAT">
          <Grid container spacing={1}>
            <Grid item xs={3}>
              <SelectInput source="typeAchat" choices={typeAchats} />
            </Grid>
            <Grid item xs={3}>
              <FournisseurInput />
            </Grid>
            <Grid item xs={3}>
              <SelectInput source="symbole" />
            </Grid>
          </Grid>
        </TabbedForm.Tab>
      </TabbedForm>
      {/* </SimpleForm> */}
    </Create>
  );
};
export default AchatCreate;
