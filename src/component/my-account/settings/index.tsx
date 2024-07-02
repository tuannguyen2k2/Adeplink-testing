"use client";

import { CInput } from "@/component/common/input";
import {
  Box,
  Button,
  Divider,
  Grid,
  Icon,
  InputAdornment,
  Typography,
  useTheme,
} from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import ChangeEmail from "./changeEmail";
import EmailVerification from "./emailVerification";
import { useSendOTP, useVerifyOTP } from "@/api/auth/query";
import {
  useChangeEmail,
  useChangePassword,
  useVerifyChangeEmail,
} from "@/api/user/query";
import TextFieldComponent from "@/component/common/TextFieldComponent";
import { SubmitHandler, useForm } from "react-hook-form";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { ValidatePasswordForm } from "@/component/common/ValidatePasswordForm";
import {
  CheckSpecial,
  checkLength,
  checkNumber,
  checkUpper,
} from "@/constant/regex";
import { ChangePasswordFormType } from "@/interface/common";
import { useSnackbar } from "notistack";

const Settings = () => {
  const theme = useTheme();
  const [emailInput, setEmailInput] = useState("");
  const [validated, setValidated] = useState({
    upperValidated: false,
    numberValidated: false,
    specialValidated: false,
    lengthValidated: false,
  });

  const [showValidateEmail, setShowValidateEmail] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    clearErrors,
    watch,
    setError,
    getValues,
    setValue,
  } = useForm<ChangePasswordFormType>({
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState<{
    old_password: boolean;
    new_password: boolean;
    confirmed_password: boolean;
  }>({
    old_password: false,
    new_password: false,
    confirmed_password: false,
  });
  const [showValidatePassword, setShowValidatePassword] = useState(false);
  const [isOtpError, setIsOtpError] = useState(false);
  const [isValidateOtp, setIsValidateOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const { changeEmail } = useChangeEmail();
  const { enqueueSnackbar } = useSnackbar();
  const {
    changePassword,
    isSuccess: changePasswordSuccess,
    error: changePasswordError,
  } = useChangePassword();
  const {
    verifyChangeEmail,
    isSuccess: isVerifySuccess,
    error: verifyOTPError,
  } = useVerifyChangeEmail();
  const handleSubmitOTP = async () => {
    try {
      verifyChangeEmail({ email: emailInput, otp: otp as string });
    } catch {
      setIsOtpError(true);
    }
  };
  const handleResendCode = () => {
    changeEmail(emailInput);
    setIsOtpError(false);
  };

  useEffect(() => {
    setShowValidateEmail(false);
  }, [isVerifySuccess]);

  const handleClickButtonVerify = () => {
    changeEmail(emailInput);
    setShowValidateEmail(true);
  };
  useEffect(() => {
    if (changePasswordSuccess) {
      enqueueSnackbar("Your password has been changed successfully", { variant: "success" });
    } else if (changePasswordError) {
      const codeError = (changePasswordError as any)?.response?.data?.code;
      if (codeError == "7004") {
        enqueueSnackbar("Current password is incorrect", { variant: "error" });
      } else if (codeError == "7014") {
        enqueueSnackbar(
          "New password is the same as current password",
          { variant: "error" }
        );
      }
    }
  }, [changePasswordSuccess, changePasswordError]);

  const handleValidatePassword = (value: string) => {
    setValidated({
      ...validated,
      upperValidated: checkUpper.test(value),
      numberValidated: checkNumber.test(value),
      specialValidated: CheckSpecial.test(value),
      lengthValidated: checkLength.test(value),
    });
  };
  const onSubmit: SubmitHandler<ChangePasswordFormType> = async (data) => {
    changePassword(data);
  };
  return (
    <Box>
      <Box
        sx={{
          backgroundColor: "#FFFFFF",
          border: "1px solid #F0F6FF",
          borderRadius: "16px",
          width: "100%",
          height: "100%",
          padding: "24px 16px",
        }}
      >
        <Typography
          fontFamily={theme.fontFamily.secondary}
          color={theme.black[200]}
          fontSize={16}
          fontWeight={theme.fontWeight.semiBold}
        >
          Account Email Address
        </Typography>

        <Divider
          sx={{
            borderColor: theme.blue[600],
            marginTop: "8px",
            marginBottom: "24px",
          }}
        />
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <CInput
              endAdornment={
                <InputAdornment position="end">
                  <Box
                    component={"button"}
                    onClick={() => setOpen(true)}
                    fontFamily={theme.fontFamily.secondary}
                    fontSize={14}
                    color={theme.palette.primary.main}
                    fontWeight={theme.fontWeight.medium}
                  >
                    Change
                  </Box>
                </InputAdornment>
              }
              fullWidth
              required
              label=" Business email"
              placeholder="anhmai@aivision.com"
            />
          </Grid>
        </Grid>

        <Divider
          sx={{
            borderColor: theme.blue[600],
            marginTop: "24px",
            marginBottom: "24px",
          }}
        />

        <Typography
          fontFamily={theme.fontFamily.secondary}
          color={theme.black[200]}
          fontSize={16}
          fontWeight={theme.fontWeight.semiBold}
          sx={{
            marginTop: "24px",
          }}
        >
          Update password
        </Typography>

        <Divider
          sx={{
            borderColor: theme.blue[600],
            marginTop: "8px",
            marginBottom: "24px",
          }}
        />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextFieldComponent
                label="Current password"
                placeholder="********"
                error={errors.old_password}
                name="old_password"
                vertical
                type={showPassword.old_password ? "text" : "password"}
                required
                rules={{
                  required: "Current password is a required field",
                }}
                register={register}
                onChange={(
                  e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                ) => {
                  setValue("old_password", e.target.value);
                }}
                endAdornment={
                  <Icon
                    titleAccess={
                      showPassword.old_password
                        ? "Hide password"
                        : "Show password"
                    }
                    fontSize="small"
                    sx={{ cursor: "pointer" }}
                    component={
                      showPassword.old_password ? Visibility : VisibilityOff
                    }
                    onClick={() =>
                      setShowPassword({
                        ...showPassword,
                        old_password: !showPassword.old_password,
                      })
                    }
                  />
                }
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ mt: "8px" }}>
            <Grid item xs={12} md={6}>
              <Tooltip
                title={<ValidatePasswordForm validated={validated} />}
                placement="bottom"
                open={showValidatePassword}
                sx={{ width: "100%" }}
                slotProps={{
                  tooltip: {
                    sx: {
                      backgroundColor: "white",
                      boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                    },
                  },
                }}
              >
                <TextFieldComponent
                  label="New password"
                  placeholder="********"
                  error={errors.new_password}
                  name="new_password"
                  vertical
                  required
                  type={showPassword.new_password ? "text" : "password"}
                  rules={{
                    required: "New password is a required field",
                  }}
                  register={register}
                  onFocus={() => setShowValidatePassword(true)}
                  onBlur={() => setShowValidatePassword(false)}
                  onChange={(
                    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                  ) => {
                    handleValidatePassword(e.target.value);
                    setValue("new_password", e.target.value);
                    if (
                      watch("confirmed_password") !== watch("new_password") &&
                      getValues("confirmed_password") !== ""
                    ) {
                      setError("confirmed_password", {
                        message: "The two passwords do not match",
                      });
                    } else {
                      setError("confirmed_password", {});
                    }
                  }}
                  endAdornment={
                    <Icon
                      titleAccess={
                        showPassword.new_password
                          ? "Hide password"
                          : "Show password"
                      }
                      fontSize="small"
                      sx={{ cursor: "pointer" }}
                      component={
                        showPassword.new_password ? Visibility : VisibilityOff
                      }
                      onClick={() =>
                        setShowPassword({
                          ...showPassword,
                          new_password: !showPassword.new_password,
                        })
                      }
                    />
                  }
                />
              </Tooltip>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextFieldComponent
                label="Confirm new password"
                placeholder="********"
                error={errors.confirmed_password}
                name="confirmed_password"
                vertical
                required
                type={showPassword.confirmed_password ? "text" : "password"}
                rules={{
                  required: "Confirm new password is a required field",
                }}
                register={register}
                onChange={(
                  e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                ) => {
                  setValue("confirmed_password", e.target.value);
                  if (watch("confirmed_password") !== watch("new_password")) {
                    setError("confirmed_password", {
                      message: "The two passwords do not match",
                    });
                  } else {
                    setError("confirmed_password", {});
                  }
                }}
                endAdornment={
                  <Icon
                    titleAccess={
                      showPassword.confirmed_password
                        ? "Hide password"
                        : "Show password"
                    }
                    fontSize="small"
                    component={
                      showPassword.confirmed_password
                        ? Visibility
                        : VisibilityOff
                    }
                    sx={{ cursor: "pointer" }}
                    onClick={() =>
                      setShowPassword({
                        ...showPassword,
                        confirmed_password: !showPassword.confirmed_password,
                      })
                    }
                  />
                }
              />
            </Grid>
          </Grid>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "24px",
            }}
          >
            <Button
              type="submit"
              sx={{
                backgroundColor: theme.palette.primary.main,
                color: "#ffffff",
                "&:hover": {
                  backgroundColor: theme.palette.primary.main,
                },
                borderRadius: "8px",
                padding: "12px 16px",
                fontSize: "14px",
                lineHeight: "18px",
                fontFamily: theme.fontFamily.secondary,
                fontWeight: theme.fontWeight.medium,
              }}
            >
              Save
            </Button>
          </Box>
        </form>
      </Box>
      <ChangeEmail
        open={open}
        onClose={() => setOpen(false)}
        handleClickButtonVerify={handleClickButtonVerify}
        emailInput={emailInput}
        setEmailInput={setEmailInput}
      />
      <EmailVerification
        setShowValidateEmail={setShowValidateEmail}
        otp={otp}
        setOtp={setOtp}
        open={showValidateEmail}
        email={emailInput}
        isOtpError={isOtpError}
        isValidateOtp={isValidateOtp}
        handleResendCode={handleResendCode}
        handleSubmitOTP={handleSubmitOTP}
        setIsValidateOtp={setIsValidateOtp}
        onClose={() => {
          setShowValidateEmail(false);
          setIsOtpError(false);
        }}
      />
    </Box>
  );
};

export default Settings;
