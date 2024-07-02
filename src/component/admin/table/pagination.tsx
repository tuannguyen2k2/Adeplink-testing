import {
  Box,
  Pagination,
  TablePaginationProps,
  Typography,
  useTheme,
} from "@mui/material";
import {
  gridPageCountSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";
import { useMemo } from "react";

const CPagination = ({
  onChangePage,
  totalData,
  currentPage,
  totalPage,
}: {
  onChangePage: (n: number) => void;
  totalData: number;
  currentPage: number;
  totalPage: number;
}) => {
  const theme = useTheme();

  const first = useMemo(() => {
    return (currentPage - 1) * 10 + 1;
  }, [currentPage]);

  const last = useMemo(() => {
    if (currentPage < totalPage) {
      return currentPage * 10;
    } else return currentPage * 10 > totalData ? totalData : currentPage * 10;
  }, [currentPage, totalData]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        marginTop: "24px",
        fontFamily: theme.fontFamily.secondary,
      }}
    >
      <Box>
        <Typography
          fontFamily={theme.fontFamily.secondary}
          color={theme.black[200]}
          fontWeight={theme.fontWeight.regular}
          fontSize={14}
        >
          Showing {first}-{last} of {totalData}
        </Typography>
      </Box>
      {/* <Box maxWidth={216}> */}
      <Pagination
        count={totalPage}
        page={currentPage}
        onChange={(event, newPage) => {
          onChangePage(newPage);
        }}
        sx={{
          "& .MuiButtonBase-root.MuiPaginationItem-root.Mui-selected": {
            backgroundColor: theme.palette.primary.main,
            color: "#ffffff",
            borderRadius: "8px",

            "&:hover": {
              backgroundColor: theme.palette.primary.main,
            },
          },
        }}
      />
      {/* </Box> */}
    </Box>
  );
};

export default CPagination;
