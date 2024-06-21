import { Box } from "@mui/material";
import ProductCharacteristics from "./product-characteristics";
import {
  ImageType,
  ProductDetailDto,
  ProductDto,
  TemporaryCartType,
} from "@/interface/common";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import ProductCharacteristicsSkeleton from "./product-characteristics/ProductCharacteristicsSkeleton";
import SliderProduct from "./Slider";

const ProductInfo = ({ data }: { data?: ProductDetailDto }) => {
  const [imagesSlider, setImagesSlider] = useState<ImageType[]>();
  useEffect(() => {
    setImagesSlider(data?.image);
  }, [data]);
  return (
    <Box mb={"32px"} display={"flex"} gap={"20px"}>
      <SliderProduct images={imagesSlider} />
      {data ? (
        <ProductCharacteristics data={data} setImagesSlider={setImagesSlider} />
      ) : (
        <ProductCharacteristicsSkeleton />
      )}
    </Box>
  );
};

export default ProductInfo;
