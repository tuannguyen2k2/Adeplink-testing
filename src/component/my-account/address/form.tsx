import { Box, Grid } from "@mui/material";
import LabelForm from "./label";
import { CInput } from "@/component/common/input";
import { CAutocomplete } from "@/component/common/autocomplete";

const AddressForm = () => {
  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={2}>
          <LabelForm label="Company name" required />
        </Grid>
        <Grid item xs={12} md={10}>
          <CInput fullWidth placeholder="AIVision" />
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <LabelForm label="First name" required />
            </Grid>
            <Grid item xs={12} md={8}>
              <CInput fullWidth placeholder="AIVision" />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <LabelForm label="Last name" required />
            </Grid>
            <Grid item xs={12} md={8}>
              <CInput fullWidth placeholder="AIVision" />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <LabelForm label="Phone number" required />
            </Grid>
            <Grid item xs={12} md={8}>
              <CInput fullWidth placeholder="+84 89378937490" type="number" />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <LabelForm label="Email address" />
            </Grid>
            <Grid item xs={12} md={8}>
              <CInput fullWidth placeholder="anh.mai@aivision.vn" />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} md={2}>
          <LabelForm label="Address line 1" required />
        </Grid>
        <Grid item xs={12} md={10}>
          <CInput
            fullWidth
            placeholder="202 Le Lai, Pham Ngu Lao Ward, District 1, HCMC"
          />
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} md={2}>
          <LabelForm label="Address line 2 (optional)" />
        </Grid>
        <Grid item xs={12} md={10}>
          <CInput
            fullWidth
            placeholder="Pham Ngu Lao Ward, District 1, HCMCC"
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <LabelForm label="Country" required />
            </Grid>
            <Grid item xs={12} md={8}>
              <CAutocomplete placeholder="Vietnam" />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <LabelForm label="State/Province" required />
            </Grid>
            <Grid item xs={12} md={8}>
              <CAutocomplete placeholder="Ho Chi Minh City" />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <LabelForm label="City/Town" required />
            </Grid>
            <Grid item xs={12} md={8}>
              <CAutocomplete placeholder="Ward 1" />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <LabelForm label="ZIP/Postal code" required />
            </Grid>
            <Grid item xs={12} md={8}>
              <CInput fullWidth placeholder="700000" />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddressForm;
