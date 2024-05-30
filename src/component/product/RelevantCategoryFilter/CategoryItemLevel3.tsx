import { Box, Typography, useTheme } from "@mui/material";
import Image from "next/image";
import Product2 from "@/assets/images/product2.jpg";
import { CategoriesHierarchyDto } from "@/interface/common";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import { PRODUCT_PATH_URL } from "@/constant/pathUrl";
import { convertImage } from "@/utils";
import { useRouter } from "next-nprogress-bar";
import NoImage from "@/assets/images/no-image.png";
const CategoryItemLevel3 = ({
  categoryLevel3,
}: {
  categoryLevel3: CategoriesHierarchyDto;
}) => {
  const theme = useTheme();
  const searchParams = useSearchParams();
  const router = useRouter();
  const locale = Cookies.get("NEXT_LOCALE");
  const cate_level1_id = searchParams.get("cate_level1_id");
  const cate_level3_id = searchParams.get("cate_level3_id");

  const [categoryLevel3Selected, setCategoryLevel3Selected] = useState<
    string | null
  >(cate_level3_id);

  useEffect(() => {
    setCategoryLevel3Selected(cate_level3_id);
  }, [cate_level3_id]);

  return (
    <Box
      width={"100%"}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
    >
      <Box
        component={"button"}
        width={"90%"}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        sx={{ cursor: "pointer" }}
        onClick={() =>
          router.push(
            `${
              PRODUCT_PATH_URL.PRODUCT_LIST
            }?cate_level1_id=${cate_level1_id}&cate_level2_id=${
              categoryLevel3.parent_category_id
            }&cate_level3_id=${
              categoryLevel3.id
            }&cate_name=${encodeURIComponent(categoryLevel3?.name)}`
          )
        }
      >
        <Box width={88} height={88} >
          <Image
            src={convertImage(categoryLevel3.image) ?? NoImage}
            alt=""
            width={88}
            height={88}
            style={{ height: "100%", borderRadius: "8px" }}
          />
        </Box>
        <Typography
          mt={"10px"}
          fontSize={14}
          fontFamily={theme.fontFamily.secondary}
          sx={{
            px: "8px",
            bgcolor:
              categoryLevel3Selected === categoryLevel3.id
                ? theme.blue[700]
                : "transparent",
            color:
              categoryLevel3Selected === categoryLevel3.id
                ? theme.blue[500]
                : "black",
            fontWeight:
              categoryLevel3Selected === categoryLevel3.id
                ? theme.fontWeight.semiBold
                : theme.fontWeight.regular,
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
            overflow: "hidden",
          }}
        >
          {categoryLevel3.name}
        </Typography>
      </Box>
    </Box>
  );
};

export default CategoryItemLevel3;
