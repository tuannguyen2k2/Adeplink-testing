import { useClickOutside } from "@/hook/useClickOutside";
import Product2 from "@/assets/images/product2.jpg";
import { Box, Button, Checkbox, Collapse, List, ListItemButton, ListItemText, TextField, Typography, useTheme } from "@mui/material";
import { ChangeEvent, FC, MouseEventHandler, ReactNode, SetStateAction, useRef, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { MdArrowBackIos, MdArrowForwardIos, MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import SliderContent from "../common/SliderContent";
import { FilterSupplierDto } from "@/interface/common";
import CheckboxComponent from "../common/CheckboxComponent";

interface ArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: MouseEventHandler<HTMLDivElement>;
}
const PrevArrow: FC<ArrowProps> = ({ className, style, onClick }) => {
  return (
    <Box className={className} style={style} onClick={onClick}>
      <MdArrowBackIos size={36} color="#0C71BA" />
    </Box>
  );
};

const NextArrow: FC<ArrowProps> = ({ className, style, onClick }) => {
  return (
    <Box className={className} style={style} onClick={onClick}>
      <MdArrowForwardIos size={36} color="#0C71BA" />
    </Box>
  );
};

type FilterComponentPropsType = {
  filter: FilterSupplierDto;
  setFilter: React.Dispatch<SetStateAction<FilterSupplierDto>>;
  categoryData: any;
  countryData: any;
};

const FilterComponent = ({ filter, setFilter, categoryData, countryData }: FilterComponentPropsType) => {
  const theme = useTheme();
  const [isFocusInput, setIsFocusInput] = useState<boolean>(false);
  const [isShowMoreCategory, setShowMoreCategory] = useState(false);
  const [isShowMoreCountry, setShowMoreCountry] = useState(false);

  const searchBoxRef = useRef<HTMLElement | null>(null);
  const handleClickOutSide = () => {
    setIsFocusInput(false);
  };
  useClickOutside(searchBoxRef, handleClickOutSide);

  const handleFocusInput = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setIsFocusInput(true);
  };

  const handleSelectCategory = (event: any, categoryId: string) => {
    if (event.target.checked) {
      const newValue = { ...filter, category_ids: [...(filter.category_ids as string[]), categoryId] };
      setFilter(newValue);
    } else {
      const newValue = { ...filter, category_ids: filter.category_ids?.filter((item) => item !== categoryId) };
      setFilter(newValue);
    }
  };

  const handleSelectCountry = (event: any, country: string) => {
    if (event.target.checked) {
      const newValue = { ...filter, countries: [...(filter.countries as string[]), country] };
      setFilter(newValue);
    } else {
      const newValue = { ...filter, countries: filter.countries?.filter((item) => item !== country) };
      setFilter(newValue);
    }
  };

  if (!categoryData || !countryData) return <div>Loading...</div>;

  return (
    <Box width={"100%"} p={"24px"} mb={"20px"} border={`1px solid ${theme.blue[100]}`} borderRadius={"16px"} sx={{ backgroundColor: theme.blue[100] }}>
      <Typography fontFamily={theme.fontFamily.secondary} fontWeight={theme.fontWeight.bold} fontSize={24} mb={"16px"}>
        Filters
      </Typography>
      <Box ref={searchBoxRef} mb={"16px"}>
        <Typography fontFamily={theme.fontFamily.secondary} fontWeight={theme.fontWeight.bold} fontSize={14} color={"#434447"}>
          Matching Categories
        </Typography>
        <Box>
          {Object.entries(categoryData)
            .slice(0, isShowMoreCategory ? -1 : 5)
            .map(([id, name]) => (
              <Box key={id} sx={{ display: "flex" }}>
                <CheckboxComponent id={id} handleOnCheck={(event) => handleSelectCategory(event, name as string)} checked={!!filter.category_ids?.includes(name as string)} />
                <Typography sx={{ fontSize: 14, color: "#0C0C0C", marginLeft: 1 }}>{name as string}</Typography>
              </Box>
            ))}
          {categoryData.length > 5 && (
            <Box
              component={"button"}
              fontFamily={theme.fontFamily.secondary}
              fontSize={14}
              color={theme.palette.primary.main}
              onClick={() => setShowMoreCategory(!isShowMoreCategory)}
            >
              {isShowMoreCategory ? "Show Less" : "Show More"}
            </Box>
          )}
        </Box>
      </Box>
      <Box ref={searchBoxRef} mb={"16px"}>
        <Typography fontFamily={theme.fontFamily.secondary} fontWeight={theme.fontWeight.bold} fontSize={14} color={"#434447"}>
          Country
        </Typography>
        <Box>
          {countryData?.slice(0, isShowMoreCountry ? -1 : 5).map((item: string) => (
            <Box key={item} sx={{ display: "flex" }}>
              <CheckboxComponent id={item} handleOnCheck={(event) => handleSelectCountry(event, item)} checked={!!filter.countries?.includes(item)} />
              <Typography sx={{ fontSize: 14, color: "#0C0C0C", marginLeft: 1 }}>{item}</Typography>
            </Box>
          ))}
          {countryData.length > 5 && (
            <Box
              component={"button"}
              fontFamily={theme.fontFamily.secondary}
              fontSize={14}
              color={theme.palette.primary.main}
              onClick={() => setShowMoreCountry(!isShowMoreCountry)}
            >
              {isShowMoreCountry ? "Show Less" : "Show More"}
            </Box>
          )}
        </Box>
      </Box>
      <Box
        component={"button"}
        display={"flex"}
        width={"100%"}
        justifyContent={"center"}
        fontFamily={theme.fontFamily.secondary}
        fontSize={14}
        fontWeight={theme.fontWeight.medium}
        color={theme.palette.primary.main}
        onClick={() => setFilter({ category_ids: [], countries: [] })}
      >
        <Typography>Clear All</Typography>
      </Box>
    </Box>
  );
};

export default FilterComponent;
