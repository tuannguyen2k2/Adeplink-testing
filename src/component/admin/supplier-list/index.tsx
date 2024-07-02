import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Divider,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";

import CSelect from "../select";
import CDatePicker from "../date-picker";
import CSearch from "../search";
import CTable from "../table";
import { useMemo, useState } from "react";
import { FilterSupplierDto, IOption } from "@/interface/common";
import { useQuery } from "@tanstack/react-query";
import { getSearchSupplier } from "@/api/supplier";
import { SUPPLIER_KEY } from "@/constant/queryKey";
import CPagination from "../table/pagination";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MenuRow from "../menu-row";
import Link from "next/link";
import { ADMIN_PATH_SUPPLIERS_PENDING_URL } from "@/constant/pathUrl";
import CAutocompleteAdmin from "../autocomplete";

const columns = [
  { field: "company_name", headerName: "Company", width: 150, sortable: false },
  { field: "fullName", headerName: "Full name", width: 150, sortable: false },
  {
    field: "main_category",
    headerName: "Main category",
    width: 150,
    sortable: false,
  },
  { field: "email", headerName: "Email Address", width: 250, sortable: false },
  { field: "phone", headerName: "Phone number", width: 180, sortable: false },
  {
    field: "country",
    headerName: "Country/Region",
    width: 150,
    sortable: false,
  },
  { field: "createdOn", headerName: "Created on", width: 150, sortable: false },
  {
    field: "status",
    headerName: "Status",
    width: 150,
    sortable: false,
    renderCell: (params: any) => (
      <>
        {params.value && (
          <span
            style={{
              color: params.value === "Active" ? "#00B69B" : "#979797",
              backgroundColor:
                params.value === "Active" ? "#D9F7E8" : "#E2E2E2",
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
  {
    field: "",
    width: 50,
    sortable: false,
    renderCell: (params: any) => <MenuRow />,
  },
];

const SupplierListPage = () => {
  const theme = useTheme();

  const [expanded, setExpanded] = useState(true);

  const [page, setPage] = useState<number>(1);

  const [filter, setFilter] = useState<FilterSupplierDto>({
    keyword: "",
    category_ids: [],
    countries: [],
  });
  const sortOrder = "";
  const { data: supplierData } = useQuery({
    queryKey: [SUPPLIER_KEY, page, filter, sortOrder],
    queryFn: async () =>
      await getSearchSupplier(filter, sortOrder, {
        page: page,
        limit: 10,
      }).then((response) => {
        return response.data;
      }),
  });

  const categories: IOption[] = useMemo(() => {
    if (supplierData?.categories) {
      return Object.entries(supplierData?.categories).map(([value, label]) => ({
        value,
        label,
      }));
    } else {
      return [];
    }
  }, [supplierData?.categories]);

  const countries: IOption[] = useMemo(() => {
    if (supplierData?.countries) {
      return supplierData?.countries.map((country) => ({
        value: country,
        label: country,
      }));
    } else {
      return [];
    }
  }, [supplierData?.countries]);

  const handelSearch = (q: string) => {
    setFilter({ ...filter, keyword: q });
  };

  const handelCategory = (value: string) => {
    if (value) {
      setFilter({ ...filter, category_ids: [value] });
    } else {
      setFilter({ ...filter, category_ids: [] });
    }
  };

  const handelCountry = (value: string) => {
    if (value) {
      setFilter({ ...filter, countries: [value] });
    } else {
      setFilter({ ...filter, countries: [] });
    }
  };

  const handleExpansion = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  return (
    <Box>
      <Accordion
        sx={{
          padding: "16px",
          borderRadius: "16px",
          border: "1px solid #E6EFFB",
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
            Suppliers list
          </Typography>
        </AccordionSummary>

        <AccordionDetails>
          <Divider
            sx={{
              borderColor: theme.blue[600],
            }}
          />
          <Grid container paddingY={2} spacing={4}>
            <Grid item xs={4}>
              <CAutocompleteAdmin
                label="Main category"
                onChange={handelCategory}
                options={categories}
              />
            </Grid>
            <Grid item xs={4}>
              <CAutocompleteAdmin
                label="Country/Region"
                onChange={handelCountry}
                options={countries}
              />
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
        </AccordionDetails>
      </Accordion>

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
            border: `1px solid ${theme.blue[600]}`,
            padding: "11px 16px",
            fontFamily: theme.fontFamily.secondary,
          }}
        >
          Export
        </Button>
        <Box sx={{ display: "flex", gap: "18px" }}>
          <Link href={ADMIN_PATH_SUPPLIERS_PENDING_URL}>
            <Box
              sx={{
                borderRadius: "8px",
                border: `1px solid ${theme.blue[600]}`,
                padding: "11px 16px",
                display: "flex",
                gap: "8px",
              }}
            >
              <Typography
                fontFamily={theme.fontFamily.secondary}
                color={theme.palette.primary.main}
                fontSize={14}
              >
                Pending Supplier Approvals
              </Typography>
              <Typography
                fontFamily={theme.fontFamily.secondary}
                color={theme.palette.primary.main}
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
          </Link>
          <CSearch
            width="300px"
            border={`1px solid ${theme.blue[600]}`}
            onChange={handelSearch}
          />
        </Box>
      </Box>

      <CTable
        rows={supplierData?.companies || []}
        columns={columns}
        checkboxSelection
      />
      <CPagination
        onChangePage={setPage}
        totalData={supplierData?.metadata?.total_data || 0}
        currentPage={supplierData?.metadata?.current_page || 1}
        totalPage={supplierData?.metadata?.total_page || 0}
      />
    </Box>
  );
};

export default SupplierListPage;
