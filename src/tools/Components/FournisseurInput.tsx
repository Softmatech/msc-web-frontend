import { useGetList, SelectInput, required } from "react-admin";

const FournisseurInput = () => {
  const { data, isPending } = useGetList("persons/fournisseurs");
  // data is an array of { id: 123, code: 'FR', name: 'France' }
  return (
    <SelectInput
      source="fournisseur.id" // <- matches your backend field
      choices={data || []}
      optionText="nom"
      optionValue="id"
      isLoading={isPending}
      label="Fournisseur"
      validate={required()}
    />
  );
};

export default FournisseurInput;
