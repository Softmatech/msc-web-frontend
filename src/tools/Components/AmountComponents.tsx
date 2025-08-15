import { Stack } from "@mui/material";
import { Labeled, NumberField, TextField } from "react-admin";

const AmountComponents = ({
  amountLabel,
  _source,
  currency,
  backgroundColor = "#CBCCD3",
  color = "black",
}) => {
  return (
    <Labeled label={amountLabel}>
      <Stack direction="row" alignItems="center" gap={0.5}>
        <NumberField
          options={{
            style: "decimal", // Not "currency"
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }}
          sx={{
            backgroundColor: backgroundColor,
            color: { color },
            fontWeight: "bold",
            borderRadius: "5%",
            paddingLeft: "5px",
            paddingRight: "5px",
          }}
          source={_source}
          label={amountLabel}
        />
        <TextField
          source={currency}
          sx={{
            backgroundColor: backgroundColor,
            color: color,
            fontWeight: "bold",
            borderRadius: "5%",
            paddingLeft: "5px",
            paddingRight: "5px",
          }}
        />
      </Stack>
    </Labeled>
  );
};

export default AmountComponents;
