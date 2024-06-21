import { TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { HiOutlineCalendar } from "react-icons/hi";

const CDatePicker = () => {
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
          border: "1px solid #E6EFFB",
          "& .MuiIconButton-root": {
            color: "#0B7ECA",
            fontSize: "20px",
          },
        }}
        slots={{ openPickerIcon: HiOutlineCalendar }}
      />
    </>
  );
};

export default CDatePicker;
