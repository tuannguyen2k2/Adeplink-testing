import { Box, Typography, useTheme } from "@mui/material";
import CheckboxComponent from "../CheckboxComponent";
import Image from "next/image";
import QuantityComponent from "../QuantityComponent";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";

const CartItem = () => {
    const theme = useTheme();
  return (
    <Box display={"flex"} alignItems={"center"} my={"20px"}>
      <CheckboxComponent
        id=""
        handleOnCheck={() => console.log("hêlo")}
        checked
      />
      <Box width={100} height={100} mx={"20px"}>
        <Image
          src={
            "https://vietnamnomad.com/wp-content/uploads/2020/04/Best-places-to-visit-in-Vietnam-in-2021-Ha-Long-Bay-1024x640.jpg"
          }
          alt="product"
          width={100}
          height={100}
          style={{ height: "100%", maxWidth: "100px" }}
          className="rounded-lg"
        />
      </Box>
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"space-between"}
        height={100}
      >
        <Typography
          sx={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
            overflow: "hidden",
            fontWeight: theme.fontWeight.medium,
          }}
        >
          Free Customize Air Fragrance Freshening Luxury Home Decor New Perfume
          Fragrance Oil Stick Glass Reed Diffuser
        </Typography>
        <Box>
          <Box display={"flex"}>
            <Typography
              fontWeight={theme.fontWeight.medium}
              fontFamily={theme.fontFamily.secondary}
              fontSize={14}
            >
              $9
            </Typography>
            <Typography fontFamily={theme.fontFamily.secondary} fontSize={14}>
              / unit
            </Typography>
          </Box>
          <Box display={"flex"} gap={"8px"}>
            <Typography fontFamily={theme.fontFamily.secondary} fontSize={14}>
              MOQ: 1000
            </Typography>
            <Box component={"button"}>
              <IoIosInformationCircleOutline color="#0B7ECA" size={18} />
            </Box>
          </Box>
        </Box>
      </Box>
      <Box width={129} height={42} ml={"60px"}>
        <QuantityComponent
          quantity={1000}
          handleDecreaseQuantity={() => console.log("hi")}
          handleIncreaseQuantity={() => console.log("bla")}
          handleOnChangeQuantityInput={() => console.log("bla")}
        />
      </Box>
      <Typography
        fontFamily={theme.fontFamily.secondary}
        fontWeight={theme.fontWeight.medium}
        color={theme.palette.primary.main}
        ml={"34px"}
        mr={"16px"}
        minWidth={"80px"}
        textAlign={"center"}
      >
        $99900
      </Typography>
      <Box>
        <IoCloseOutline color="#0B7ECA" size={20} />
      </Box>
    </Box>
  );
};

export default CartItem;
