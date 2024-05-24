import { Box } from "@mui/material";
import SliderProduct from "./slider";
import ProductCharacteristics from "./product-characteristics";
import { ProductDto } from "@/interface/common";

const ProductInfo = ({ data }: { data?: ProductDto }) => {
  return (
    <Box mb={"32px"} display={"flex"} gap={"20px"}>
      <SliderProduct />
      <ProductCharacteristics data={data}/>
    </Box>
  );
};

export default ProductInfo;
