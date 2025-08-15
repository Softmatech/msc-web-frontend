import { useGetList, SelectInput } from "react-admin";

const SymboleInput = () => {
  const { data, isPending } = useGetList("devises");
  // data is an array of { id: 123, code: 'FR', name: 'France' }
  return (
    <SelectInput
      source="devises"
      choices={data}
      optionText="deviseName"
      optionValue="symbole"
      isPending={isPending}
      label="Devise"
    />
  );
};

export default SymboleInput;
