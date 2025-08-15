import { useGetList, SelectInput } from "react-admin";

const UniteInput = (props) => {
  const { data, isPending } = useGetList("unities");

  return (
    <SelectInput
      {...props}
      choices={data}
      optionText="description"
      optionValue="id" // sends { id: value }
      isPending={isPending}
      label="Unité"
    />
  );
};

export default UniteInput;
