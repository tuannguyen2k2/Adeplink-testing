import SupplierDetail from "@/component/supplier-detail";

const SupplierDetailPage = ({ params }: { params: { slug: string } }) => {
  return <SupplierDetail params={params} />;
};

export default SupplierDetailPage;
