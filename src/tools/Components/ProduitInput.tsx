import { useGetList, SelectInput } from "react-admin";

const ProduitInput = (props) => {
  const { data = [], isPending } = useGetList("produits");

  return (
    <SelectInput
      {...props}
      choices={data}
      optionText="description"
      optionValue="id" // store the product ID, not EPC
      isLoading={isPending}
      label="Produit"
    />
  );
};

export default ProduitInput;
