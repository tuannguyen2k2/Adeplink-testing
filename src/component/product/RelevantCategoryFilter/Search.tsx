import { useGetProductByCategory } from "@/api/product/query";
import { PRODUCT_PATH_URL } from "@/constant/pathUrl";
import { useClickOutside } from "@/hook/useClickOutside";
import useDebounce from "@/hook/useDebounce";
import { Box, CircularProgress, TextField, useTheme } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { makeStyles } from "@mui/styles";
import SearchResult from "@/component/header/search/SearchResult";
import { getCateUrl } from "@/utils";
import { useRouter } from "next-nprogress-bar";
const useStyles = makeStyles(() => ({
  spinner: {
    marginRight: "20px",
    animation: "$spin 1s infinite linear",
  },
  "@keyframes spin": {
    "0%": {
      transform: "rotate(0deg)",
    },
    "100%": {
      transform: "rotate(360deg)",
    },
  },
}));

const Search = () => {
  const classes = useStyles();
  const theme = useTheme();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [valueInput, setValueInput] = useState<string>("");
  const debouncedValue = useDebounce(valueInput, 500);
  const cate_name = searchParams.get("cate_name");
  const cate_level1_id = searchParams.get("cate_level1_id");
  const cate_level2_id = searchParams.get("cate_level2_id");
  const cate_level3_id = searchParams.get("cate_level3_id");
  const [isFocusInput, setIsFocusInput] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const {
    getProductByCategory,
    isSuccess,
    data: productByCategory,
  } = useGetProductByCategory();
  const handleClickOutSide = () => {
    setIsFocusInput(false);
  };

  const searchBoxRef = useRef<HTMLElement | null>(null);
  useClickOutside(searchBoxRef, handleClickOutSide);

  const handleFocusInput = (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setIsFocusInput(true);
  };

  const handleOnChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    if (searchValue.startsWith(" ")) {
      return;
    }
    setValueInput(searchValue);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (valueInput === "") {
        return;
      }
      e.preventDefault();
      const searchValue = {
        keyword: valueInput,
        id: null,
      };
      router.push(
        `${
          PRODUCT_PATH_URL.PRODUCT_LIST
        }?keyword_by_category=${valueInput}&${getCateUrl()}`
      );
    }
  };
  useEffect(() => {
    if (isSuccess) {
      setLoading(false);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (debouncedValue == "") {
      return;
    }
    setLoading(true);
    getProductByCategory({
      keyword: debouncedValue,
      product_category_id: cate_level3_id ?? cate_level2_id ?? cate_level1_id,
      limit: "5",
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  return (
    <Box
      width={"40%"}
      borderRadius={"8px"}
      display={"flex"}
      ref={searchBoxRef}
      alignItems={"center"}
      position={"relative"}
      mb={"16px"}
      px={"16px"}
      border={
        isFocusInput
          ? `1px solid ${theme.palette.primary.main}`
          : `1px solid ${theme.palette.grey[100]}`
      }
    >
      <IoMdSearch size={24} color={"#0C71B9"} />
      <TextField
        sx={{
          width: "100%",
          "& .MuiOutlinedInput-root": {
            fontFamily: theme.fontFamily.secondary,
          },
        }}
        placeholder={`Search in ${cate_name}`}
        onKeyDown={handleKeyDown}
        onFocus={(e) => handleFocusInput(e)}
        onChange={handleOnChangeInput}
        InputProps={{
          sx: {
            input: {
              "&::placeholder": {
                color: theme.palette.grey[400],
              },
              padding: "12px 0 12px 10px",
            },
          },
        }}
      />
      {loading && (
        <CircularProgress
          className={classes.spinner}
          size={16}
          color="primary"
        />
      )}
      {isFocusInput && (
        <SearchResult
          selectedSearchOption="product"
          debouncedValue={debouncedValue}
          data={
            debouncedValue !== "" && productByCategory
              ? productByCategory?.products.map((product) => ({
                  name: product.name,
                  slug: product.slug,
                }))
              : undefined
          }
          setIsFocusInput={setIsFocusInput}
        />
      )}
    </Box>
  );
};

export default Search;
