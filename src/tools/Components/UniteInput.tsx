import { useGetList, SelectInput } from "react-admin";

const UniteInput = (props) => {
  const { data = [], isPending } = useGetList("unities");

  return (
    <SelectInput
      {...props}
      choices={data}
      optionText="description"
      optionValue="id" // store the product ID, not EPC
      isLoading={isPending}
      label="Unité"
    />
  );
};

export default UniteInput;
