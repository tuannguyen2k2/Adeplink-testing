"use client";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Chip,
  Divider,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CAutocomplete from "../autocomplete";
import CDatePicker from "../date-picker";
import CSearch from "../search";
import CTable from "../table";
import CPagination from "../table/pagination";
import Link from "next/link";
import { FaAngleLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "company", headerName: "Company", width: 150 },
  { field: "fullName", headerName: "Full name", width: 150 },
  { field: "mainCategory", headerName: "Main category", width: 150 },
  { field: "email", headerName: "Email Address", width: 250 },
  { field: "phoneNumber", headerName: "Phone number", width: 150 },
  { field: "countryRegion", headerName: "Country/Region", width: 150 },
  { field: "submittedOn", headerName: "Submitted on", width: 150 },
  {
    field: "status",
    headerName: "Status",
    width: 130,
    renderCell: (params: any) => (
      <>
        {params.value && (
          <span
            style={{
              color: params.value === "Pending" ? "#F3C02C" : "#DC2626",
              backgroundColor:
                params.value === "Pending" ? "#FCF3C9" : "#FEE2E2",
              padding: "5px 10px",
              borderRadius: "5px",
              fontWeight: 500,
              fontSize: "12px",
            }}
          >
            {params.value}
          </span>
        )}
      </>
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
    phoneNumber: "8432123456789",
    countryRegion: "Vietnam",
    submittedOn: "30/04/2024",
    status: "Pending",
  },
  {
    id: 2,
    company: "AIVision",
    fullName: "Anh Mai",
    mainCategory: "Agriculture",
    email: "anhmai@aivision.com",
    phoneNumber: "8432123456789",
    countryRegion: "Vietnam",
    submittedOn: "30/04/2024",
    status: "Pending",
  },
  {
    id: 3,
    company: "AIVision",
    fullName: "Anh Mai",
    mainCategory: "Agriculture",
    email: "anhmai@aivision.com",
    phoneNumber: "8432123456789",
    countryRegion: "Vietnam",
    submittedOn: "30/04/2024",
    status: "Pending",
  },
  {
    id: 4,
    company: "AIVision",
    fullName: "Anh Mai",
    mainCategory: "Agriculture",
    email: "anhmai@aivision.com",
    phoneNumber: "8432123456789",
    countryRegion: "Vietnam",
    submittedOn: "30/04/2024",
    status: "Pending",
  },
  {
    id: 5,
    company: "AIVision",
    fullName: "Anh Mai",
    mainCategory: "Agriculture",
    email: "anhmai@aivision.com",
    phoneNumber: "8432123456789",
    countryRegion: "Vietnam",
    submittedOn: "30/04/2024",
    status: "Pending",
  },
  {
    id: 6,
    company: "AIVision",
    fullName: "Anh Mai",
    mainCategory: "Agriculture",
    email: "anhmai@aivision.com",
    phoneNumber: "8432123456789",
    countryRegion: "Vietnam",
    submittedOn: "30/04/2024",
    status: "Pending",
  },
  {
    id: 7,
    company: "AIVision",
    fullName: "Anh Mai",
    mainCategory: "Agriculture",
    email: "anhmai@aivision.com",
    phoneNumber: "8432123456789",
    countryRegion: "Vietnam",
    submittedOn: "30/04/2024",
    status: "Rejected",
  },
  {
    id: 8,
    company: "AIVision",
    fullName: "Anh Mai",
    mainCategory: "Agriculture",
    email: "anhmai@aivision.com",
    phoneNumber: "8432123456789",
    countryRegion: "Vietnam",
    submittedOn: "30/04/2024",
    status: "Rejected",
  },
  {
    id: 9,
    company: "AIVision",
    fullName: "Anh Mai",
    mainCategory: "Agriculture",
    email: "anhmai@aivision.com",
    phoneNumber: "8432123456789",
    countryRegion: "Vietnam",
    submittedOn: "30/04/2024",
    status: "Rejected",
  },
  {
    id: 10,
    company: "AIVision",
    fullName: "Anh Mai",
    mainCategory: "Agriculture",
    email: "anhmai@aivision.com",
    phoneNumber: "8432123456789",
    countryRegion: "Vietnam",
    submittedOn: "30/04/2024",
    status: "Rejected",
  },
];

const ApprovingSupplierPage = () => {
  const theme = useTheme();

  const [page, setPage] = useState<number>(1);

  const [expanded, setExpanded] = useState(true);

  const handleExpansion = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <Box width={"100%"}>
      <Box sx={{ width: "min-content", marginBottom: "12px" }}>
        <div onClick={handleBack} className=" cursor-pointer">
          <Box
            sx={{
              display: "flex",
              width: "min-content",
              gap: "8px",
              alignItems: "center",
            }}
          >
            <FaAngleLeft color={theme.palette.primary.main} />

            <Typography
              fontWeight={theme.fontWeight.medium}
              fontFamily={theme.fontFamily.secondary}
              fontSize={14}
              color={theme.palette.primary.main}
            >
              Back
            </Typography>
          </Box>
        </div>
      </Box>

      <Accordion
        sx={{
          padding: "16px",
          borderRadius: "16px",
          border: `1px solid ${theme.blue[600]}`,
          backgroundColor: "#ffffff",
          boxShadow: "none",

          "&:first-of-type": {
            borderTopLeftRadius: "16px",
            borderTopRightRadius: "16px",
          },
          "&:last-of-type": {
            borderBottomLeftRadius: "16px",
            borderBottomRightRadius: "16px",
          },
          "&::before": {
            height: "0px",
          },
        }}
        expanded={expanded}
        onChange={handleExpansion}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography
            fontWeight={theme.fontWeight.bold}
            fontFamily={theme.fontFamily.secondary}
            fontSize={24}
            color={"#181F28"}
          >
            Pending Supplier Approvals
          </Typography>
        </AccordionSummary>

        <AccordionDetails>
          <Divider
            sx={{
              borderColor: theme.blue[600],
            }}
          />

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
        </AccordionDetails>
      </Accordion>

      <Box
        sx={{
          display: "flex",
          marginY: "24px",
          justifyContent: "flex-end",
          gap: "16px",
        }}
      >
        <Button
          sx={{
            borderRadius: "8px",
            padding: "11px 16px",
            fontFamily: theme.fontFamily.secondary,
            backgroundColor: `${theme.palette.primary.main}!important`,
            color: "#ffffff",
          }}
        >
          Export
        </Button>
        <Button
          sx={{
            borderRadius: "8px",
            padding: "11px 16px",
            fontFamily: theme.fontFamily.secondary,
            border: "1px solid #DC2626",
            color: theme.red[300],
          }}
        >
          Reject
        </Button>
        <CSearch
          width="300px"
          border={`1px solid ${theme.blue[600]}`}
          onChange={() => {}}
        />
      </Box>

      <CTable rows={rows || []} columns={columns} checkboxSelection />
      <CPagination
        onChangePage={setPage}
        totalData={1478}
        currentPage={1}
        totalPage={10}
      />
    </Box>
  );
};

export default ApprovingSupplierPage;
