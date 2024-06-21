import CheckboxComponent from "@/component/common/CheckboxComponent";
import { Box, Pagination, TablePaginationProps, useTheme } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridPagination,
  gridPageCountSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";
import MuiPagination from "@mui/material/Pagination";
import { PiSquareLight } from "react-icons/pi";
import { LiaCheckSquareSolid } from "react-icons/lia";
import CPagination from "./pagination";

// const CustomPagination = (props: any) => {
//   return <GridPagination ActionsComponent={CPagination} {...props} />;
// };

interface ICTableProps {
  columns: GridColDef[];
  rows: [] | any;
  checkboxSelection?: boolean;
  onRowClick?: (id: string | number) => void;
}

const CTable = ({
  columns,
  rows,
  checkboxSelection,

  onRowClick,
}: ICTableProps) => {
  const theme = useTheme();

  return (
    <Box sx={{ width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection={checkboxSelection}
        disableColumnMenu
        hideFooter={true}
        onRowClick={(params) => {
          onRowClick && onRowClick(params?.id);
        }}
        pagination
        // slots={{
        //   pagination: CustomPagination,
        // }}
        slotProps={{
          baseCheckbox: {
            checkedIcon: <LiaCheckSquareSolid color="#0C71B9" />,
            icon: <PiSquareLight color="#0C71B9" />,
          },
        }}
        sx={{
          fontFamily: theme.fontFamily.secondary,
          "& .MuiDataGrid-columnHeader, ": {
            backgroundColor: "#F0F6FF",
          },
          "& .MuiDataGrid-topContainer": {
            "& .MuiDataGrid-filler": {
              backgroundColor: "#F0F6FF",
            },
          },

          "& .MuiDataGrid-columnHeaderTitle, & .MuiDataGrid-columnHeaderTitleContainerContent":
            {
              fontWeight: 600,
              //   textAlign: "center",
              width: "100%",
              color: "#0B7ECA",
            },
          "& .MuiDataGrid-virtualScrollerRenderZone": {
            "& .MuiDataGrid-row": {
              backgroundColor: "#FFFFFF",
            },
          },
          "& .MuiDataGrid-row": {
            backgroundColor: "#FFFFFF",
          },
          "& .MuiCheckbox-root": {
            "& .PrivateSwitchBase-input": {
              borderColor: "#0C71B9",
              color: "#0C71B9",
            },
          },
          "& .MuiDataGrid-cell": {
            borderTopColor: "#F0F6FF",
          },
          "& .MuiSvgIcon-root": {
            color: "#0C71B9",
            borderRadius: "10px",
            width: "18px",
            height: "18px",
          },
          "& .MuiDataGrid-columnHeaderTitleContainerContent": {
            width: "auto",
          },
          borderWidth: "0px",
          backgroundColor: "#ffff",
          "& .MuiDataGrid-footerContainer ": {
            backgroundColor: "#ffff",
          },
        }}
      />
      <CPagination />
    </Box>
  );
};

export default CTable;
