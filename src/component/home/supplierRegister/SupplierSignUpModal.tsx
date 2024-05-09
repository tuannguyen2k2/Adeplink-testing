import { countryData } from "@/constant";
import { SignupForm } from "@/model/form/AuthForm";
import { Autocomplete, Box, TextField, Typography } from "@mui/material";
import { Modal } from "antd";
import { useForm } from "react-hook-form";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

type SupplierSignUpModalType = {
  openSupplierSignUpModal: boolean;
};

const SupplierSignUpModal = ({
  openSupplierSignUpModal,
}: SupplierSignUpModalType) => {
  const { register, handleSubmit, formState, setValue, watch, getValues } =
    useForm<SignupForm>();
  return (
    <Modal open={openSupplierSignUpModal} footer={false}>
      <Box py={"40px"} px={"44px"} width={"fit-content"}>
        <Typography
          fontSize={30}
          whiteSpace={"nowrap"}
          className="font-bold  text-center font-sans"
        >
          Welcome to{" "}
          <span className="text-[#0C71BA] whitespace-nowrap">
            Supplier Center
          </span>
        </Typography>
        <Box
          whiteSpace={"nowrap"}
          className="text-center font-medium font-sans text-[16px] mt-1"
        >
          Just fulfill the form below and get your own Dashboard.
        </Box>
        <form>
          <h4 className="mb-1">
            <span className="text-red-500 mr-1">*</span>
            <span className="font-medium">Country/Region</span>
          </h4>
          <div className="mb-2">
            <Autocomplete
              className="col-span-12 border-[1px] border-solid border-gray-400 rounded-lg"
              options={countryData}
              size="small"
              renderInput={(params) => <TextField {...params} label="" />}
              popupIcon={<MdOutlineKeyboardArrowDown size={18} color="black" />}
              {...register("country", {
                required: "Country required",
              })}
              onChange={(e, value) => setValue("country", value as string)}
            />
            {formState.errors.country?.message && (
              <div className="text-red-500 w-full font-medium text-[13px]">
                {formState.errors.country.message}
              </div>
            )}
          </div>
        </form>
      </Box>
    </Modal>
  );
};

export default SupplierSignUpModal;
