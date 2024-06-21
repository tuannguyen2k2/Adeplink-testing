import {
  useDeleteCartItem,
  useGetCart,
  useUpdateCartItem,
} from "@/api/cart/query";
import NoImage from "@/assets/images/no-image.png";
import {
  CartType,
  ImageType,
  PriceProductDetailType,
  ProductCartType,
  SupplierCartType,
  VariantCartType,
} from "@/interface/common";
import { convertImage } from "@/utils";
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";
import CheckboxComponent from "../CheckboxComponent";
import QuantityComponent from "../QuantityComponent";
import { useDispatch, useSelector } from "react-redux";
import { setCart, setSupplierContact } from "@/store/slice/appSlice";
import { cartSelector, supplierContactSelector } from "@/store/selector";
import { useRouter } from "next-nprogress-bar";
import { PRODUCT_PATH_URL } from "@/constant/pathUrl";
type CartItemType = {
  isVariant?: boolean;
  data: {
    id: string;
    name: string;
    min_order: number;
    price: number;
    image?: string;
    subtotal: number;
    quantity: number;
    slug?: string;
    is_tick: boolean;
    range_price?: PriceProductDetailType[];
    variant?: VariantCartType[] | null;
  };
  handleOnCheck: (e: ChangeEvent<HTMLInputElement>) => void;
  productId: string;
  supplierId: string;
  productSubTotal: number;
  rangePrice: PriceProductDetailType[];
};
const CartItem = ({
  isVariant,
  data,
  handleOnCheck,
  productId,
  productSubTotal,
  rangePrice,
  supplierId,
}: CartItemType) => {
  const theme = useTheme();
  const [quantity, setQuantity] = useState(data.quantity);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { getCart, data: cartData, isSuccess: getCartSuccess } = useGetCart();
  const { updateCartItem } = useUpdateCartItem();
  const dispatch = useDispatch();
  const [priceUnit, setPriceUnit] = useState<number>(0);
  const router = useRouter();
  const cart = useSelector(cartSelector);
  const supplierContact = useSelector(supplierContactSelector);
  useEffect(() => {
    cartData && dispatch(setCart(cartData));
  }, [cartData, getCartSuccess]);

  useEffect(() => {
    let totalItemChecked = 0;
    cart?.items.forEach((supplier) => {
      if (supplier.id == supplierId) {
        supplier.product.forEach((product) => {
          if (product.id == productId) {
            if (product.variant) {
              product.variant.forEach((variant) => {
                if (variant.is_tick) {
                  totalItemChecked += variant.quantity;
                }
              });
            } else if (product.is_tick) {
              totalItemChecked += product.quantity;
            }
          }
        });
      }
    });
    let hasRange = false;

    rangePrice.length > 0 &&
      rangePrice.map((range) => {
        if (
          +range.min_amount <= totalItemChecked &&
          +range.max_amount >= totalItemChecked
        ) {
          hasRange = true;
          setPriceUnit(+range.price);
        }
      });

    if (!hasRange) {
      setPriceUnit(0);
    }
  }, [cart]);

  const handleUpdateCart = ({ quantity }: { quantity: number }) => {
    if (isVariant) {
      if (cart) {
        const updatedCartData: CartType = {
          ...cart,
          items: cart.items.map((supplier) => ({
            ...supplier,
            product: supplier.product.map((product) => ({
              ...product,
              variant:
                product.variant &&
                product.variant.map((variant) => {
                  if (variant.id === data.id) {
                    let price = 0;
                    rangePrice.map((range) => {
                      if (
                        +range.min_amount <= quantity &&
                        +range.max_amount >= quantity
                      ) {
                        price = +range.price;
                      }
                    });
                    return {
                      ...variant,
                      quantity,
                      price,
                    };
                  }
                  return variant;
                }),
            })),
          })),
        };
        dispatch(setCart({ ...updatedCartData }));
      }
    } else {
      if (cart) {
        const updatedCartData: CartType = {
          ...cart,
          items: cart.items.map((supplier) => ({
            ...supplier,
            product: supplier.product.map((product) => {
              if (product.id == data.id) {
                let price = 0;
                rangePrice.map((range) => {
                  if (
                    +range.min_amount <= quantity &&
                    +range.max_amount >= quantity
                  ) {
                    price = +range.price;
                  }
                });
                return {
                  ...product,
                  quantity,
                  price,
                };
              } else {
                return product;
              }
            }),
          })),
        };
        dispatch(setCart({ ...updatedCartData }));
      }
    }
  };
  const handleIncreaseQuantity = () => {
    if (quantity) {
      setQuantity(quantity + 1);
      updateQuantity(quantity + 1);
    }
  };
  const handleDecreaseQuantity = () => {
    if (quantity) {
      setQuantity(quantity - 1);
      updateQuantity(quantity - 1);
    }
  };
  const updateQuantity = (newQuantity: number) => {
    handleUpdateCart({ quantity: newQuantity });
    if (isVariant) {
      updateCartItem({
        product_id: productId,
        variant_id: data.id,
        quantity: newQuantity,
        min_order: data.min_order,
        price: rangePrice,
      });
    } else {
      updateCartItem({
        product_id: productId,
        quantity: newQuantity,
        min_order: data.min_order,
        price: rangePrice,
      });
    }
  };

  const handleOnChangeQuantityInput = (e: ChangeEvent<HTMLInputElement>) => {
    setQuantity(parseInt(e.target.value));
    updateQuantity(parseInt(e.target.value));
  };

  const handleDeleteCartItem = () => {
    if (isVariant) {
      deleteCartItem({ product_id: productId, variant_id: data.id });
    } else {
      deleteCartItem({ product_id: productId });
    }
    getCart();
  };

  const calculateSubTotalPrice = (price: number) => {
    if (price * data.quantity === 0) {
      return "Contact";
    } else {
      return (price * data.quantity).toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    }
  };

  const calculatePriceUnit = (price: number) => {
    if (price == 0) {
      return (
        <Typography
          fontWeight={theme.fontWeight.medium}
          fontFamily={theme.fontFamily.secondary}
          fontSize={14}
        >
          Contact for best prices
        </Typography>
      );
    } else {
      return (
        <Box display={"flex"}>
          <Typography
            fontWeight={theme.fontWeight.medium}
            fontFamily={theme.fontFamily.secondary}
            fontSize={14}
          >
            {price.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </Typography>
          <Typography fontFamily={theme.fontFamily.secondary} fontSize={14}>
            / unit
          </Typography>
        </Box>
      );
    }
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
          defaultChecked={data.is_tick}
        />
        {!isVariant && (
          <Box width={100} height={100} ml={"20px"} mr={"14px"}>
            <Image
              src={convertImage(data.image) || NoImage}
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
          <Box
            component={"button"}
            textAlign={"start"}
            onClick={() =>
              !isVariant &&
              data.slug &&
              router.push(`${PRODUCT_PATH_URL.PRODUCT_DETAIL}/${data.slug}`)
            }
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
          </Box>
          <Box>
            {(isVariant || !data.variant) && (
              <>{calculatePriceUnit(data.is_tick ? priceUnit : data.price)}</>
            )}
            {!isVariant && (
              <Box display={"flex"} gap={"8px"}>
                <Typography
                  fontFamily={theme.fontFamily.secondary}
                  fontSize={14}
                >
                  MOQ: {data.min_order}
                </Typography>
                <Box
                  component={"button"}
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
                    setAnchorEl(event.currentTarget)
                  }
                  // onMouseLeave={() => setAnchorEl(null)}
                >
                  <IoIosInformationCircleOutline color="#0B7ECA" size={18} />
                </Box>
                <Menu
                  id="range-price-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={() => setAnchorEl(null)}
                  disableScrollLock
                  MenuListProps={{ sx: { p: "10px" } }}
                >
                  <Typography
                    sx={{
                      fontWeight: theme.fontWeight.medium,
                      fontFamily: theme.fontFamily.secondary,
                      fontSize: 12,
                      display: "flex",
                      gap: "4px",
                      justifyContent: "center",
                      width: "100%",
                      mb: "6px",
                    }}
                  >
                    <IoIosInformationCircleOutline color="#0B7ECA" size={18} />
                    Price by quantity
                  </Typography>
                  {data.range_price?.map((item, index) => {
                    return (
                      <MenuItem key={index} sx={{ pointerEvents: "none" }}>
                        <Box
                          width={"100%"}
                          display={"flex"}
                          justifyContent={"space-between"}
                          gap={"60px"}
                        >
                          <Typography
                            fontFamily={theme.fontFamily.secondary}
                            color={
                              +item.price == priceUnit
                                ? theme.palette.primary.main
                                : "black"
                            }
                          >{`${item.min_amount}-${item.max_amount}`}</Typography>
                          <Typography
                            fontFamily={theme.fontFamily.secondary}
                            color={
                              +item.price == priceUnit
                                ? theme.palette.primary.main
                                : "black"
                            }
                          >{`$${item.price}`}</Typography>
                        </Box>
                      </MenuItem>
                    );
                  })}
                </Menu>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
      <Box display={"flex"} alignItems={"center"}>
        {(isVariant || !data.variant) && (
          <Box width={129} height={42} ml={"60px"}>
            <QuantityComponent
              quantity={quantity}
              handleDecreaseQuantity={handleDecreaseQuantity}
              handleIncreaseQuantity={handleIncreaseQuantity}
              handleOnChangeQuantityInput={handleOnChangeQuantityInput}
            />
          </Box>
        )}

        {(isVariant || !data.variant) && (
          <Typography
            fontFamily={theme.fontFamily.secondary}
            fontWeight={theme.fontWeight.medium}
            color={theme.palette.primary.main}
            ml={"20px"}
            minWidth={"134px"}
            textAlign={"end"}
          >
            {calculateSubTotalPrice(data.is_tick ? priceUnit : data.price)}
          </Typography>
        )}

        <IconButton onClick={handleDeleteCartItem} sx={{ ml: "10px" }}>
          <IoCloseOutline color="#0B7ECA" size={20} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default CartItem;
