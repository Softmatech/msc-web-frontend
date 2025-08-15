import { TextInput } from "react-admin";

const DecimalInput = (props) => (
  <TextInput
    {...props}
    parse={(value) => {
      if (!value) return "";
      // Keep digits and at most one dot
      const match = value.match(/^\d*\.?\d*$/);
      return match
        ? match[0]
        : value.replace(/[^0-9.]/g, "").replace(/(\..*?)\..*/g, "$1");
    }}
  />
);

export default DecimalInput;
