import { useDeleteCartItem, useGetCart } from "@/api/cart/query";
import NoImage from "@/assets/images/no-image.png";
import {
  ImageType,
  ProductCartType,
  SupplierCartType,
} from "@/interface/common";
import { convertImage } from "@/utils";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";
import CheckboxComponent from "../CheckboxComponent";
import QuantityComponent from "../QuantityComponent";
import { useDispatch } from "react-redux";
import { setCart } from "@/store/slice/appSlice";
type CartItemType = {
  isVariant?: boolean;
  data: {
    id: string;
    name: string;
    min_order: number;
    price: number;
    image?: ImageType;
    subtotal: number;
    quantity?: number;
  };
  handleOnCheck: (e: ChangeEvent<HTMLInputElement>) => void;
  productId: string;
};
const CartItem = ({
  isVariant,
  data,
  handleOnCheck,
  productId,
}: CartItemType) => {
  const theme = useTheme();
  const [quantity, setQuantity] = useState(data.quantity);
  const [checked, setChecked] = useState(false);
  const { getCart, data: cartData, isSuccess: getCartSuccess } = useGetCart();
  const dispatch = useDispatch();
  useEffect(() => {
    cartData && dispatch(setCart(cartData));
  }, [cartData, getCartSuccess]);
  const handleIncreaseQuantity = () => {
    quantity && setQuantity(quantity + 1);
  };
  const handleDecreaseQuantity = () => {
    quantity && setQuantity(quantity - 1);
  };

  const handleOnChangeQuantityInput = (e: ChangeEvent<HTMLInputElement>) => {
    setQuantity(parseInt(e.target.value));
  };

  const handleDeleteCartItem = () => {
    deleteCartItem({ product_id: productId, variant_id: data.id });
    getCart();
  };

  const { deleteCartItem } = useDeleteCartItem();
  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      my={"20px"}
      pl={isVariant ? "80px" : "0"}
      justifyContent={"space-between"}
    >
      <Box display={"flex"} alignItems={"center"}>
        <CheckboxComponent
          id={data.id}
          handleOnCheck={(e: ChangeEvent<HTMLInputElement>) => handleOnCheck(e)}
        />
        {!isVariant && (
          <Box width={100} height={100} ml={"20px"} mr={"14px"}>
            <Image
              src={convertImage(data.image?.image_url) || NoImage}
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
          height={isVariant ? "fit-content" : "100px"}
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
            {data.name}
          </Typography>
          <Box>
            {isVariant && (
              <>
                {data.price > 0 ? (
                  <Box display={"flex"}>
                    <Typography
                      fontWeight={theme.fontWeight.medium}
                      fontFamily={theme.fontFamily.secondary}
                      fontSize={14}
                    >
                      $9
                    </Typography>
                    <Typography
                      fontFamily={theme.fontFamily.secondary}
                      fontSize={14}
                    >
                      / unit
                    </Typography>
                  </Box>
                ) : (
                  <Typography
                    fontWeight={theme.fontWeight.medium}
                    fontFamily={theme.fontFamily.secondary}
                    fontSize={14}
                  >
                    Contact for best prices
                  </Typography>
                )}
              </>
            )}
            {!isVariant && (
              <Box display={"flex"} gap={"8px"}>
                <Typography
                  fontFamily={theme.fontFamily.secondary}
                  fontSize={14}
                >
                  MOQ: {data.min_order}
                </Typography>
                <Box component={"button"}>
                  <IoIosInformationCircleOutline color="#0B7ECA" size={18} />
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
      <Box display={"flex"} alignItems={"center"}>
        {isVariant && (
          <Box width={129} height={42} ml={"60px"}>
            <QuantityComponent
              quantity={quantity}
              handleDecreaseQuantity={handleDecreaseQuantity}
              handleIncreaseQuantity={handleIncreaseQuantity}
              handleOnChangeQuantityInput={handleOnChangeQuantityInput}
            />
          </Box>
        )}

        <Typography
          fontFamily={theme.fontFamily.secondary}
          fontWeight={theme.fontWeight.medium}
          color={theme.palette.primary.main}
          ml={"34px"}
          minWidth={"80px"}
          textAlign={"center"}
        >
          {data.subtotal === 0
            ? "Contact"
            : data.subtotal.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
        </Typography>

        <IconButton onClick={handleDeleteCartItem}>
          <IoCloseOutline color="#0B7ECA" size={20} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default CartItem;
