import { TextInput } from "react-admin";

const NumberOnlyInput = (props) => (
  <TextInput
    {...props}
    parse={(value) => value?.replace(/\D/g, "")} // removes all non-digits
  />
);

export default NumberOnlyInput;
