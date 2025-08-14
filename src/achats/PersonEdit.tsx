import { Grid } from "@mui/material";
import {
  ArrayInput,
  choices,
  DateInput,
  Edit,
  email,
  maxLength,
  minLength,
  minValue,
  number,
  regex,
  required,
  SelectInput,
  SimpleFormIterator,
  TabbedForm,
  TextInput,
  useGetList,
  useNotify,
  useRedirect,
} from "react-admin";

const sexes = [
  { id: "Masculin", name: "Masculin" },
  { id: "Feminin", name: "Feminin" },
];

const documentTypes = [
  { id: "Passport", name: "Passport" },
  { id: "Carte electorale", name: "Carte electorale" },
  { id: "Carte_identification", name: "Carte_identification" },
  { id: "Autre", name: "Autre" },
];

const adressTitle = [
  { id: "Propriétaire", name: "Propriétaire" },
  { id: "Location", name: "Location" },
  { id: "Autre", name: "Autre" },
];

const profesionnalStatus = [
  //Actif,Retraité, Chomeur, Elève_Etudiant, Autre
  { id: "Actif", name: "Actif" },
  { id: "Retraité", name: "Retraité" },
  { id: "Chomeur", name: "Chomeur" },
  { id: "Elève_Etudiant", name: "Elève_Etudiant" },
  { id: "Autre", name: "Autre" },
];

const revenueSource = [
  //Salaire, Retraité, XFer_Etr, Autre
  { id: "Salaire", name: "Salaire" },
  { id: "Retraité", name: "Retraité" },
  { id: "XFer_Etr", name: "XFer_Etr" },
  { id: "Autre", name: "Autre" },
];

const validateName = [required(), minLength(3), maxLength(15)];
const validateEmail = email();
const validateAge = [number(), minValue(18)];
const validateZipCode = regex(/^\d{5}$/, "Must be a valid Zip Code");
const validateSexe = (value: any) => {
  if (!value) {
    return "Please select a sex";
  }
};
const validateDocumentType = [
  required(),
  choices(documentTypes, "Please choose one of the values"),
];

const PersonEdit = () => (
  <Edit>
    <TabbedForm>
      <TabbedForm.Tab label="Renseignements Personnels">
        <Grid container spacing={1}>
          <Grid item xs={3}>
            <TextInput
              source="firstName"
              label="Prenom"
              validate={validateName}
            />
          </Grid>
          <Grid item xs={3}>
            <TextInput source="lastName" label="Nom" validate={validateName} />
          </Grid>

          <Grid item xs={3}>
            <SelectInput
              source="sexe"
              choices={sexes}
              validate={[required("Veuillez selectionner un sexe SVP")]}
            />
          </Grid>
          <Grid item xs={3}>
            <TextInput
              source="motherName"
              label="Nom de jeune fille de la mère"
            />
          </Grid>
          <Grid item xs={3}>
            <DateInput
              source="birthDate"
              label="Date de Naissance"
              validate={required()}
            />
          </Grid>
          <Grid item xs={3}>
            <TextInput
              source="birthPlace"
              label="Ville/Pays de Naissance"
              validate={required()}
            />
          </Grid>
          <Grid item xs={3}>
            <TextInput
              source="nationalite"
              label="Nationalité"
              validate={required()}
            />
          </Grid>
          <Grid item xs={3}>
            <TextInput source="livingCountry" label="Lieu de residence" />
          </Grid>
        </Grid>
      </TabbedForm.Tab>
      <TabbedForm.Tab label="Pièce d'identité et statut">
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <SelectInput
              source="documentType"
              label="Type de Document"
              choices={documentTypes}
              validate={[
                required("Veuillez selectionner un type de document SVP!"),
              ]}
              optionText={`id`}
            />
          </Grid>
          <Grid item xs={3}>
            <TextInput
              source="documentId"
              label="Numéro d'identité"
              validate={required()}
            />
          </Grid>
          <Grid item xs={3}>
            <TextInput
              source="matrimonialStatus"
              label="Statut Matrimoniale"
              validate={required()}
            />
          </Grid>
          <Grid item xs={3}>
            <TextInput source="nomConjoint" label="Nom du Conjoint" />
          </Grid>
        </Grid>
      </TabbedForm.Tab>
      <TabbedForm.Tab label="Adresse">
        <Grid container spacing={1}>
          <Grid item xs={2}>
            <SelectInput
              source="adressTitle"
              label="Etes-vous"
              choices={adressTitle}
              validate={[
                required("Veuillez selectionner un type de propriété SVP!"),
              ]}
              optionText={`id`}
            />
          </Grid>
          <Grid item xs={1}>
            <TextInput
              source="spentTime"
              label="Depuis combien de temps"
              validate={required()}
            />
          </Grid>
          <Grid item xs={3}>
            <TextInput source="adress" label="Addresse" />
          </Grid>

          <Grid item xs={3}>
            <TextInput source="postalCode" label="Code Postal" />
          </Grid>
          <Grid item xs={3}>
            <TextInput
              source="email"
              label="Courrier"
              validate={validateEmail}
            />
          </Grid>
          <Grid item xs={3}>
            <ArrayInput source="phoneNumbers" label="Numero de Telephone(s)">
              <SimpleFormIterator inline={false}>
                <TextInput
                  source="phoneNumber"
                  helperText={false}
                  label="Numero"
                />
              </SimpleFormIterator>
            </ArrayInput>
          </Grid>
        </Grid>
      </TabbedForm.Tab>
      <TabbedForm.Tab label="Statut professionnel">
        <Grid container spacing={1}>
          <Grid item xs={3}>
            <SelectInput
              source="profesionnalStatus"
              choices={profesionnalStatus}
            />
          </Grid>
          <Grid item xs={3}>
            <TextInput source="actualProfession" label="Profession Actuel" />
          </Grid>
          <Grid item xs={3}>
            <SelectInput source="revenueSource" choices={revenueSource} />
          </Grid>
        </Grid>
      </TabbedForm.Tab>

      <TabbedForm.Tab label="Contact">
        <Grid container spacing={1}>
          <Grid item xs={3}>
            <TextInput source="contactName" label="Contact" />
          </Grid>
        </Grid>
      </TabbedForm.Tab>
    </TabbedForm>
  </Edit>
);
export default PersonEdit;
