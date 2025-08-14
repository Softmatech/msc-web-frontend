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
        <FunctionField
          label="Montant"
          render={(record) =>
            record ? (
              <Chip
                label={`${record.effectif} ${record.symbole}`}
                size="small"
                sx={{
                  fontWeight: "bold",
                  backgroundColor:
                    record.effectif > 0
                      ? "rgba(46, 125, 50, 0.1)" // light green
                      : "rgba(211, 47, 47, 0.1)", // light red
                  color: record.effectif > 0 ? "success.main" : "error.main",
                }}
              />
            ) : (
              ""
            )
          }
        />
      </Datagrid>
    </List>
  );
};

export default AchatsList;
