import ProductDetail from "@/component/product-detail";

const ProductDetailPage = ({ params }: { params: { slug: string } }) => {
  return <ProductDetail slug={params.slug[0]} />;
};

export default ProductDetailPage;
