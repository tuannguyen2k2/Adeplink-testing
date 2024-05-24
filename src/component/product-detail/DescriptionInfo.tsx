import React from "react";
import { useTheme, Tab, Tabs, Typography, Box } from "@mui/material";
import TabDescription from "./product-description/TabDescription";
import TabSpecification from "./product-description/TabSpecification";
import TabRatingReview from "./product-description/TabRatingReview";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const CustomTabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} {...other}>
      {value === index && (
        <Box sx={{ mt: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const DescriptionInfo = () => {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  return (
    <Box sx={{ width: "50%" }}>
      <Box sx={{ borderBottom: 2, borderColor: theme.blue[1000] }}>
        <Tabs
          value={value}
          onChange={(event: React.SyntheticEvent, newValue: number) => setValue(newValue)}
          TabIndicatorProps={{
            style: { display: "none", fontWeight: theme.fontWeight.semiBold, color: theme.blue[500] },
          }}
          sx={{ ".Mui-selected": {fontWeight: theme.fontWeight.semiBold}, display: 'flex', justifyContent: 'start' }}     
        >
          <Tab
            label="Description"
            sx={{
              width: 120,
              textTransform: "none",
              fontSize: 16,
              color: theme.blue[500],
              fontWeight: theme.fontWeight.regular,
              "&:hover": { backgroundColor: theme.blue[100], color: theme.palette.primary.main, fontWeight: theme.fontWeight.semiBold },
            }}
          />
          <Tab
            label="Specification"
            sx={{
              width: 140,
              textTransform: "none",
              fontSize: 16,
              color: theme.blue[500],
              fontWeight: theme.fontWeight.regular,
              "&:hover": { backgroundColor: theme.blue[100], color: theme.palette.primary.main, fontWeight: theme.fontWeight.semiBold },
            }}
          />
          <Tab
            label="Rating & Reviews"
            sx={{
              width: 180,
              textTransform: "none",
              fontSize: 16,
              color: theme.blue[500],
              fontWeight: theme.fontWeight.regular,
              "&:hover": { backgroundColor: theme.blue[100], color: theme.palette.primary.main, fontWeight: theme.fontWeight.semiBold },
            }}
          />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <TabDescription/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <TabSpecification/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <TabRatingReview/>
      </CustomTabPanel>
    </Box>
  );
};

export default DescriptionInfo;
