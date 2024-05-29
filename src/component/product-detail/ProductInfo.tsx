import { Box } from "@mui/material";
import SliderProduct from "./slider";
import ProductCharacteristics from "./product-characteristics";
import { ProductDetailDto, ProductDto } from "@/interface/common";

const ProductInfo = ({ data }: { data?: ProductDetailDto }) => {
  return (
    <Box mb={"32px"} display={"flex"} gap={"20px"}>
      <SliderProduct images={data?.image}/>
      <ProductCharacteristics data={data}/>
    </Box>
  );
};

export default ProductInfo;
