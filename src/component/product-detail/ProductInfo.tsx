import { Box } from "@mui/material";
import SliderProduct from "./slider";
import ProductCharacteristics from "./product-characteristics";
import {
  ImageType,
  ProductDetailDto,
  ProductDto,
  TemporaryCartType,
} from "@/interface/common";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

const ProductInfo = ({
  data,
}: {
  data?: ProductDetailDto;
}) => {
  const [imagesSlider, setImagesSlider] = useState<ImageType[]>();
  useEffect(() => {
    setImagesSlider(data?.image);
  }, [data]);
  return (
    <Box mb={"32px"} display={"flex"} gap={"20px"}>
      <SliderProduct images={imagesSlider} />
      <ProductCharacteristics
        data={data}
        setImagesSlider={setImagesSlider}
      />
    </Box>
  );
};

export default ProductInfo;
