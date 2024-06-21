import {
  Box,
  Button,
  Divider,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import { FaAngleUp } from "react-icons/fa6";
import CAutocomplete from "../autocomplete";
import CSelect from "../select";
import CDatePicker from "../date-picker";
import CSearch from "../search";
import CTable from "../table";

const columns = [
  { field: "company", headerName: "Company", width: 150 },
  { field: "fullName", headerName: "Full name", width: 150 },
  { field: "mainCategory", headerName: "Main category", width: 150 },
  { field: "email", headerName: "Email Address", width: 250 },
  { field: "phone", headerName: "Phone number", width: 180 },
  { field: "country", headerName: "Country/Region", width: 150 },
  { field: "createdOn", headerName: "Created on", width: 150 },
  {
    field: "status",
    headerName: "Status",
    width: 150,
    renderCell: (params: any) => (
      <span
        style={{
          color: params.value === "Active" ? "#00B69B" : "#979797",
          backgroundColor: params.value === "Active" ? "#D9F7E8" : "#E2E2E2",
          padding: "5px 10px",
          borderRadius: "5px",
          fontWeight: 500,
          fontSize: "12px",
        }}
      >
        {params.value}
      </span>
    ),
  },
];

const rows = [
  {
    id: 1,
    company: "AIVision",
    fullName: "Anh Mai",
    mainCategory: "Agriculture",
    email: "anhmai@aivision.com",
    phone: "84232123456789",
    country: "Vietnam",
    createdOn: "30/04/2024",
    status: "Active",
  },
  {
    id: 2,
    company: "AIVision",
    fullName: "Anh Mai",
    mainCategory: "Agriculture",
    email: "anhmai@aivision.com",
    phone: "84232123456789",
    country: "Vietnam",
    createdOn: "30/04/2024",
    status: "Active",
  },
  {
    id: 3,
    company: "AIVision",
    fullName: "Anh Mai",
    mainCategory: "Agriculture",
    email: "anhmai@aivision.com",
    phone: "84232123456789",
    country: "Vietnam",
    createdOn: "30/04/2024",
    status: "Active",
  },
  {
    id: 4,
    company: "AIVision",
    fullName: "Anh Mai",
    mainCategory: "Agriculture",
    email: "anhmai@aivision.com",
    phone: "84232123456789",
    country: "Vietnam",
    createdOn: "30/04/2024",
    status: "Active",
  },
  {
    id: 5,
    company: "AIVision",
    fullName: "Anh Mai",
    mainCategory: "Agriculture",
    email: "anhmai@aivision.com",
    phone: "84232123456789",
    country: "Vietnam",
    createdOn: "30/04/2024",
    status: "Active",
  },
  {
    id: 6,
    company: "AIVision",
    fullName: "Anh Mai",
    mainCategory: "Agriculture",
    email: "anhmai@aivision.com",
    phone: "84232123456789",
    country: "Vietnam",
    createdOn: "30/04/2024",
    status: "Active",
  },
  {
    id: 7,
    company: "AIVision",
    fullName: "Anh Mai",
    mainCategory: "Agriculture",
    email: "anhmai@aivision.com",
    phone: "84232123456789",
    country: "Vietnam",
    createdOn: "30/04/2024",
    status: "Deactive",
  },
  {
    id: 8,
    company: "AIVision",
    fullName: "Anh Mai",
    mainCategory: "Agriculture",
    email: "anhmai@aivision.com",
    phone: "84232123456789",
    country: "Vietnam",
    createdOn: "30/04/2024",
    status: "Deactive",
  },
  {
    id: 9,
    company: "AIVision",
    fullName: "Anh Mai",
    mainCategory: "Agriculture",
    email: "anhmai@aivision.com",
    phone: "84232123456789",
    country: "Vietnam",
    createdOn: "30/04/2024",
    status: "Deactive",
  },
  {
    id: 10,
    company: "AIVision",
    fullName: "Anh Mai",
    mainCategory: "Agriculture",
    email: "anhmai@aivision.com",
    phone: "84232123456789",
    country: "Vietnam",
    createdOn: "30/04/2024",
    status: "Deactive",
  },
];

const SupplierListPage = () => {
  const theme = useTheme();

  return (
    <Box>
      <Box
        sx={{
          padding: "16px",
          borderRadius: "16px",
          border: "1px solid #E6EFFB",
          backgroundColor: "#ffffff",
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography
            fontWeight={theme.fontWeight.bold}
            fontFamily={theme.fontFamily.secondary}
            fontSize={24}
            color={"#181F28"}
          >
            Suppliers list
          </Typography>
          <FaAngleUp size={24} />
        </Box>
        <Divider
          sx={{
            borderColor: "#E6EFFB",
          }}
        />
        <Grid container paddingY={2} spacing={4}>
          <Grid item xs={4}>
            <CAutocomplete label="Main category" />
          </Grid>
          <Grid item xs={4}>
            <CAutocomplete label="Country/Region" />
          </Grid>
          <Grid item xs={4}>
            <CSelect
              label="Status"
              options={[
                { value: 1, title: "Active" },
                { value: 2, title: "Deactive" },
              ]}
            />
          </Grid>
        </Grid>
        <Box>
          <Typography
            fontWeight={theme.fontWeight.medium}
            fontFamily={theme.fontFamily.secondary}
            fontSize={14}
          >
            Created on
          </Typography>
          <Box sx={{ display: "flex", gap: "16px" }}>
            <CDatePicker />
            <CDatePicker />
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          marginY: "24px",
          justifyContent: "space-between",
        }}
      >
        <Button
          sx={{
            borderRadius: "8px",
            border: "1px solid #E6EFFB",
            padding: "11px 16px",
            fontFamily: theme.fontFamily.secondary,
          }}
        >
          Export
        </Button>
        <Box sx={{ display: "flex", gap: "18px" }}>
          <Box
            sx={{
              borderRadius: "8px",
              border: "1px solid #E6EFFB",
              padding: "11px 16px",
              display: "flex",
              gap: "8px",
            }}
          >
            <Typography
              fontFamily={theme.fontFamily.secondary}
              color={"#0B7ECA"}
              fontSize={14}
            >
              Pending Supplier Approvals
            </Typography>
            <Typography
              fontFamily={theme.fontFamily.secondary}
              color={"#0B7ECA"}
              fontSize={14}
              sx={{
                backgroundColor: "#F0F6FF",
                width: "24px",
                height: "24px",
                borderRadius: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              11
            </Typography>
          </Box>
          <CSearch width="300px" border="1px solid #E6EFFB" />
        </Box>
      </Box>

      <CTable rows={rows} columns={columns} checkboxSelection />
    </Box>
  );
};

export default SupplierListPage;
