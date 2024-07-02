import { useTheme } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { HiOutlineCalendar } from "react-icons/hi";

const CDatePicker = () => {
  const theme = useTheme();

  return (
    <>
      <DatePicker
        value={null}
        //   onChange={onChange}
        //   views={views}
        //   format={format || "DD/MM/YYYY"}
        //   inputRef={ref}
        //   shouldDisableDate={shouldDisableDate}
        //   disablePast={disablePast}
        defaultValue={dayjs(new Date())}
        sx={{
          "& .MuiInputBase-input": {
            padding: "10px",
          },
          borderRadius: "8px",
          border: `1px solid ${theme.blue[600]}`,
          "& .MuiIconButton-root": {
            color: theme.palette.primary.main,
            fontSize: "20px",
          },
        }}
        slots={{ openPickerIcon: HiOutlineCalendar }}
      />
    </>
  );
};

export default CDatePicker;
