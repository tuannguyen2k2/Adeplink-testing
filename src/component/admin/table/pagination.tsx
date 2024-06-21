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

const CPagination = () => {
  const theme = useTheme();
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
          color={"#0C0C0C"}
          fontWeight={theme.fontWeight.regular}
          fontSize={14}
        >
          Showing 1-10 of 1478
        </Typography>
      </Box>
      {/* <Box maxWidth={216}> */}
      <Pagination
        count={14}
        page={1}
        onChange={(event, newPage) => {
          console.log(event, newPage);
        }}
        sx={{
          "& .MuiButtonBase-root.MuiPaginationItem-root.Mui-selected": {
            backgroundColor: "#0B7ECA",
            color: "#ffffff",
            borderRadius: "8px",

            "&:hover": {
              backgroundColor: "#0B7ECA",
            },
          },
        }}
      />
      {/* </Box> */}
    </Box>
  );
};

export default CPagination;
