import { CAutocomplete } from "@/component/common/autocomplete";
import { CInput } from "@/component/common/input";
import {
  Box,
  Button,
  Divider,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
  useTheme,
} from "@mui/material";
import { FaCircleDot, FaRegCircle } from "react-icons/fa6";

const ProfileForm = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        padding: "24px 16px",
        width: "100%",
      }}
    >
      <Typography
        fontFamily={theme.fontFamily.secondary}
        color={theme.black[200]}
        fontSize={16}
        fontWeight={theme.fontWeight.semiBold}
      >
        Personal Details
      </Typography>
      <Divider
        sx={{
          borderColor: theme.blue[600],
          marginTop: "8px",
          marginBottom: "24px",
        }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <CInput
              label="Full name"
              required
              //   error
              //   helperText="email is a required field"
              placeholder="Anh Mai"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CInput
              label="Job Title"
              fullWidth
              placeholder="Business Analyst"
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <CInput
              label="Phone Number"
              required
              placeholder="8482928292222222"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CAutocomplete
              options={[]}
              value={null}
              label="Country/Region"
              required
              placeholder="Vietnam"
            />
          </Grid>
        </Grid>
      </Box>
      <Box>
        <Typography
          color={theme.black.main}
          fontFamily={theme.fontFamily.secondary}
          fontWeight={theme.fontWeight.medium}
          fontSize={14}
          marginBottom={"8px"}
        >
          Gender
        </Typography>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="female"
          name="radio-buttons-group"
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "16px",
            "& .MuiFormControlLabel-root": {
              width: "max-content",
            },
          }}
        >
          <FormControlLabel
            value="male"
            sx={{
              "& .MuiTypography-root": {
                fontSize: "14px",
                fontFamily: theme.fontFamily.secondary,
                fontWeight: theme.fontWeight.regular,
                color: theme.black.main,
              },
            }}
            control={
              <Radio
                checkedIcon={
                  <FaCircleDot color={theme.palette.primary.main} size={16} />
                }
                icon={
                  <FaRegCircle color={theme.palette.primary.main} size={16} />
                }
              />
            }
            label="Male"
          />
          <FormControlLabel
            value="female"
            sx={{
              "& .MuiTypography-root": {
                fontSize: "14px",
                fontFamily: theme.fontFamily.secondary,
                fontWeight: theme.fontWeight.regular,
                color: theme.black.main,
              },
            }}
            control={
              <Radio
                checkedIcon={
                  <FaCircleDot color={theme.palette.primary.main} size={16} />
                }
                icon={
                  <FaRegCircle color={theme.palette.primary.main} size={16} />
                }
              />
            }
            label="Female"
          />
        </RadioGroup>
      </Box>
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
        marginTop={"24px"}
      >
        Company Details
      </Typography>
      <Divider
        sx={{
          borderColor: theme.blue[600],
          marginTop: "8px",
          marginBottom: "24px",
        }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <CInput
              label="Company name"
              required
              placeholder="Anh Mai"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CAutocomplete
              options={[]}
              value={null}
              label="Country/Region"
              placeholder="Vietnam"
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <CInput label="Telephone" placeholder="848292829" fullWidth />
          </Grid>
          <Grid item xs={12} md={6}>
            <CInput
              label="Website"
              fullWidth
              placeholder="example@domain.comt"
            />
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "24px",
        }}
      >
        <Button
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: "#ffffff",
            "&:hover": {
              backgroundColor: theme.palette.primary.main,
            },
            borderRadius: "8px",
            padding: "12px 16px",
            fontSize: "14px",
            fontFamily: theme.fontFamily.secondary,
            fontWeight: theme.fontWeight.medium,
          }}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default ProfileForm;
