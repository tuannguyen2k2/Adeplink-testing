import Supplier from "@/component/supplier";

const SupplierPage = ({ params }: { params: { slug: string } }) => {
  return <Supplier params={params} />;
};

export default SupplierPage;
