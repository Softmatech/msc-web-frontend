import {
  Datagrid,
  DateField,
  DateInput,
  FunctionField,
  List,
  Pagination,
  TextField,
} from "react-admin";
import { Chip } from "@mui/material";
import AmountComponents from "../tools/AmountComponents";

// Filters
const AchatsFilters = [
  <DateInput key="dates" label="Date" source="dates" alwaysOn />,
];

const AchatsList = () => {
  return (
    <List
      resource="achats"
      filters={AchatsFilters}
      pagination={
        <Pagination rowsPerPageOptions={[10, 25, 50, 100, 500, 1000, 2000]} />
      }
      perPage={10}
    >
      <Datagrid bulkActionButtons={false}>
        <FunctionField
          label="Numéro"
          render={(record) =>
            record ? (
              <Chip
                label={`${record.legende}-${record.id}`}
                color="primary"
                size="small"
                sx={{
                  fontWeight: "bold",
                  fontSize: "0.8rem",
                }}
              />
            ) : (
              ""
            )
          }
        />
        <TextField source="typeAchat" label="Type Achat" />
        <DateField source="dates" label="Date" showTime />
        <AmountComponents
          amountLabel="Montant"
          _source="effectif"
          currency="symbole"
        />
      </Datagrid>
    </List>
  );
};

export default AchatsList;
