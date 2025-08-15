import { useFormContext } from "react-hook-form";
import { FormDataConsumer } from "react-admin";
import { TextField as MuiTextField, InputAdornment } from "@mui/material";

export const SubtotalField = ({
  source,
  rowIndex,
}: {
  source: string;
  rowIndex: number;
}) => {
  const { getValues, setValue } = useFormContext();
  const row = getValues(`detailleAchats.${rowIndex}`) || {};
  const q = Number(row.quantite || 0);
  const p = Number(row.prix || 0);
  const subtotalValue = q * p;

  // Persist the subtotal in the form
  setValue(`detailleAchats.${rowIndex}.subtotal`, subtotalValue, {
    shouldValidate: true,
    shouldDirty: true,
  });

  // Format with thousand separators
  const subtotalFormatted = subtotalValue.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  // Get symbol from parent form
  const symbol = getValues("devises") || "";

  return (
    <MuiTextField
      label="Sous Total"
      value={subtotalFormatted}
      variant="outlined"
      size="small"
      fullWidth
      InputProps={{
        readOnly: true,
        endAdornment: (
          <InputAdornment position="end">
            <span style={{ fontWeight: "bold" }}>{symbol}</span>
          </InputAdornment>
        ),
      }}
    />
  );
};
