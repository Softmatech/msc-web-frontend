import React from "react";
import {
  Show,
  SimpleShowLayout,
  TextField,
  ArrayField,
  Datagrid,
} from "react-admin";
import AmountComponents from "../tools/AmountComponents";

const AchatsShow: React.FC = (props) => {
  return (
    <Show {...props}>
      <SimpleShowLayout>
        {/* Main Achat info */}
        <TextField source="id" label="ID" />
        <TextField source="legende" label="Légende" />
        <TextField source="typeAchat" label="Type Achat" />
        <TextField source="dates" label="Date" />
        <AmountComponents
          amountLabel="Montant"
          _source="effectif"
          currency="symbole"
        />

        {/* Nested DetailleAchats */}
        <ArrayField source="detailleAchats" label="Détails Achat">
          <Datagrid>
            <TextField source="produit" label="Produit" />
            <TextField source="quantite" label="Quantité" />
            <TextField source="unite" label="Unité" />
            <AmountComponents
              amountLabel="Prix"
              _source="prix"
              currency="symbole"
            />
            <AmountComponents
              amountLabel="Sous Totale"
              _source="subtotal"
              currency="symbole"
            />
            <TextField source="statut" label="Statut" />
          </Datagrid>
        </ArrayField>
      </SimpleShowLayout>
    </Show>
  );
};

export default AchatsShow;
