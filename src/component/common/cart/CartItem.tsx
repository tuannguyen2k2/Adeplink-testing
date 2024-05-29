import { Box, Typography, useTheme } from "@mui/material";
import CheckboxComponent from "../CheckboxComponent";
import Image from "next/image";
import QuantityComponent from "../QuantityComponent";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";
import { ChangeEvent, useState } from "react";

const CartItem = ({ isVariant }: { isVariant?: boolean }) => {
  const theme = useTheme();
  const [quantity, setQuantity] = useState(1000);
  const [checked, setChecked] = useState(false);
  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  const handleDecreaseQuantity = () => {
    setQuantity(quantity - 1);
  };

  const handleOnChangeQuantityInput = (e: ChangeEvent<HTMLInputElement>) => {
    setQuantity(parseInt(e.target.value));
  };
  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      my={"20px"}
      pl={isVariant ? "80px" : "0"}
    >
      <CheckboxComponent
        id="1"
        handleOnCheck={() => setChecked(!checked)}
        checked={checked}
      />
      {!isVariant && (
        <Box width={100} height={100} ml={"20px"} mr={"14px"}>
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
      )}
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"space-between"}
        height={100}
        pl={isVariant ? "52px" : "0"}
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
          quantity={quantity}
          handleDecreaseQuantity={handleDecreaseQuantity}
          handleIncreaseQuantity={handleIncreaseQuantity}
          handleOnChangeQuantityInput={handleOnChangeQuantityInput}
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
