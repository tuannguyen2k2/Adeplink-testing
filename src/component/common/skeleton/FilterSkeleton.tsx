import { Box, Skeleton } from "@mui/material";

const FilterSkeleton = () => {
  return (
    <>
      {Array.from(Array(4)).map((_, id) => (
        <Box key={id} display={"flex"} sx={{ mb: 2 }}>
          <Skeleton
            variant="rectangular"
            animation="wave"
            width={18}
            height={18}
            sx={{ borderRadius: 1 }}
          />
          <Skeleton
            variant="rectangular"
            animation="wave"
            width={140}
            height={18}
            sx={{ ml: 1, borderRadius: 1 }}
          />
        </Box>
      ))}
    </>
  );
};

export default FilterSkeleton;
