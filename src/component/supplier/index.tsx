"use client";
import useDevices from "@/hook/useDevices";
import { MAX_WIDTH_APP } from "@/constant/css";
import { Box, Button, Container, Grid, Icon, Pagination, TextField, Typography, useTheme } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { ChangeEvent, SetStateAction, useState } from "react";
import { FilterSupplierDto, PaginationDto, SupplierDto } from "@/interface/common";
import FilterComponent from "./Filter";
import SortComponent from "./SortComponent";
import Image from "next/image";
import { LocationOnOutlined } from "@mui/icons-material";
import ChatIcon from "@/assets/icons/chat.svg";
import { useQuery } from "@tanstack/react-query";
import { getAllSupplier } from "@/api/supplier";
import { SUPPLIER_KEY } from "@/constant/queryKey";

const Supplier = ({ params }: { params: { slug: string } }) => {
  const { isMobile } = useDevices();
  const theme = useTheme();
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword");

  const [filter, setFilter] = useState<FilterSupplierDto>({
    keyword: "",
    category_ids: [],
    countries: [],
  });
  const [sortOrder, setSortOrder] = useState<string>("");
  const [pagination, setPagination] = useState<PaginationDto>({ page: 1, limit: 5 });

  const { data: supplierData, isLoading } = useQuery({
    queryKey: [SUPPLIER_KEY, pagination],
    queryFn: async () =>
      await getAllSupplier({ page: pagination.page, limit: pagination.limit }).then((response) => {
        setPagination({ ...pagination, totalPage: response.data.metadata.total_page });
        return response.data;
      }),
  });
  console.log("TTTTTTTTTTTTTTTTTTTTTTT", supplierData);
  console.log(params, "RRRRRRRRRRRRRRRRRRRRRRRRRRR", filter);
  console.log(params, "SSSSSSSSSSSSSSSSSSSSSSSSSSS", sortOrder);

  return (
    <Grid
      container
      sx={{
        mx: "auto",
        mt: "184px",
        p: isMobile ? "20px!important" : "0 88px!important",
        maxWidth: `${MAX_WIDTH_APP}!important`,
        fontFamily: theme.fontFamily.secondary,
      }}
    >
      <Grid component={Box} container xs={12} display={"flex"} justifyContent={"space-between"}>
        <Typography>aadad</Typography>
        <SortComponent sortOrder={sortOrder} setSortOrder={setSortOrder} />
      </Grid>
      <Grid component={Box} item xs={3}>
        <FilterComponent filter={filter} setFilter={setFilter} categoryData={supplierData?.categories} countryData={supplierData?.countries} />
      </Grid>
      <Grid component={Box} item xs={9} sx={{ paddingLeft: 3 }}>
        <Box display={"flex"} flexDirection={"column"} justifyContent={"start"} alignItems={"center"} width={"100%"}>
          <Grid container spacing={10} width={"100%"} marginLeft={0} mt={0}>
            {supplierData?.companies?.map((supplier: SupplierDto) => (
              <Grid
                component={Box}
                key={supplier?.id}
                width={"100%"}
                height={"100%"}
                display={"flex"}
                bgcolor={"common.white"}
                p={"16px"}
                mb={3}
                borderRadius={"10px"}
                border={`1px solid ${theme.blue[100]}`}
              >
                <Grid item xs={1.5} display={"flex"} justifyContent={"left"} alignItems={"center"}>
                  <Box width={88} height={88} position={"absolute"}>
                    <Image
                      src={"https://vietnamnomad.com/wp-content/uploads/2020/04/Best-places-to-visit-in-Vietnam-in-2021-Ha-Long-Bay-1024x640.jpg"}
                      alt="product"
                      fill
                      objectFit="fill"
                      className="rounded-lg"
                    />
                    {/* <Image src={supplier.image} alt="product" fill objectFit="fill" className="rounded-lg" /> */}
                  </Box>
                </Grid>

                <Grid item xs={7}>
                  <Typography
                    color={theme.black[200]}
                    fontWeight={theme.fontWeight.medium}
                    fontFamily={theme.fontFamily.secondary}
                    fontSize={16}
                    sx={{
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 2,
                      overflow: "hidden",
                      mb: 1,
                    }}
                  >
                    {supplier.company_name}
                  </Typography>
                  <Box>
                    <Typography
                      color={theme.black[400]}
                      fontStyle={"italic"}
                      fontSize={14}
                      // mt={2}
                      // mb={1}
                      fontWeight={theme.fontWeight.regular}
                      fontFamily={theme.fontFamily.secondary}
                    >
                      {supplier.main_category}
                    </Typography>
                    <Typography
                      color={theme.black[200]}
                      fontWeight={theme.fontWeight.regular}
                      fontFamily={theme.fontFamily.secondary}
                      fontSize={14}
                      sx={{
                        display: "flex",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 2,
                        overflow: "hidden",
                        mb: 1,
                      }}
                    >
                      <Icon component={LocationOnOutlined} sx={{ color: theme.palette.primary.main }} width={24} height={24} />
                      {supplier.country}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={3.5} display={"flex"} justifyContent={"flex-end"} height={"fit-content"}>
                  <Button sx={{ border: `1px solid ${theme.palette.primary.main}`, borderRadius: 2, marginRight: 1, width: 93, height: 42 }}>
                    <Image src={ChatIcon} alt="" width={20} height={20} /> Chat
                  </Button>
                  <Button
                    sx={{
                      bgcolor: `${theme.palette.primary.main} !important`,
                      color: "white",
                      fontWeight: theme.fontWeight.regular,
                      fontSize: 14,
                      borderRadius: 2,
                      width: 118,
                      height: 42,
                    }}
                  >
                    View details
                  </Button>
                </Grid>
              </Grid>
            ))}
          </Grid>
          <Pagination
            count={supplierData?.metadata.total_page}
            color="primary"
            shape="rounded"
            sx={{
              justifyContent: "center",
              mt: "20px",
              "& .Mui-selected": {
                borderRadius: "8px",
              },
            }}
            onChange={(event, page) => { setPagination({ ...pagination, page: page }) }}
          />
        </Box>
      </Grid>
      {/* <RelevantCategoryFilter />
      {keyword && (
        <Typography fontFamily={theme.fontFamily.secondary} mb={"20px"}>
          {`Showing ${data?.total}+ products for "${keyword}"`}
        </Typography>
      )}
      {!keyword && (
        <Typography fontFamily={theme.fontFamily.secondary} mb={"20px"}>
          {`Showing ${data?.total}+ products recommendations`}
        </Typography>
      )}
      <Box display={"flex"}>
        <Box bgcolor={theme.blue[100]} p={"24px"} borderRadius={"16px"} height={"fit-content"} mr={"10px"}>
          <Typography fontFamily={theme.fontFamily.secondary} color={theme.black[200]} fontWeight={theme.fontWeight.bold} mb={"24px"}>
            Filter
          </Typography>
          <>
            <Box display={"flex"} flexDirection={"column"} alignItems={"start"} mb={"24px"}>
              <Typography fontSize={14} fontFamily={theme.fontFamily.secondary} fontWeight={theme.fontWeight.bold} whiteSpace={"nowrap"} mb={"16px"}>
                Matching Products Categories
              </Typography>
              {data?.categories &&
                Object.entries(data?.categories).map(([id, name]) => {
                  return (
                    <Box display={"flex"} gap={1} key={id}>
                      <CheckboxComponent id={id} handleOnCheck={handleOnCheckCategory} checked={categoryIdCheckedList.includes(id)} />
                      <Typography
                        sx={{
                          fontFamily: theme.fontFamily.secondary,
                          fontSize: 14,
                        }}
                      >
                        {name}
                      </Typography>
                    </Box>
                  );
                })}
              <Box component={"button"} fontFamily={theme.fontFamily.secondary} fontSize={14} color={theme.palette.primary.main}>
                Show more
              </Box>
            </Box>
            <Box display={"flex"} flexDirection={"column"} alignItems={"start"} mb={"24px"}>
              <Typography fontSize={14} fontFamily={theme.fontFamily.secondary} fontWeight={theme.fontWeight.bold} whiteSpace={"nowrap"} mb={"16px"}>
                Suppliers Country
              </Typography>
              {data?.countries &&
                data?.countries.map((country) => {
                  return (
                    <Box display={"flex"} gap={1} key={country}>
                      <CheckboxComponent id={country} handleOnCheck={handleOnCheckCountry} checked={countryCheckedList.includes(country)} />
                      <Typography
                        sx={{
                          fontFamily: theme.fontFamily.secondary,
                          fontSize: 14,
                        }}
                      >
                        {country}
                      </Typography>
                    </Box>
                  );
                })}
              <Box component={"button"} fontFamily={theme.fontFamily.secondary} fontSize={14} color={theme.palette.primary.main}>
                Show more
              </Box>
            </Box>
            <Box display={"flex"} flexDirection={"column"} alignItems={"start"} mb={"24px"}>
              <Typography fontSize={14} fontFamily={theme.fontFamily.secondary} fontWeight={theme.fontWeight.bold} whiteSpace={"nowrap"} mb={"10px"}>
                Price
              </Typography>
              <Box display={"flex"} alignItems={"center"}>
                <TextField
                  value={priceFilter.from_price}
                  type="number"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setPriceFilter({
                      from_price: e.target.value,
                      to_price: priceFilter.to_price,
                    })
                  }
                  sx={{
                    width: "100px",
                    bgcolor: "white",
                    fontFamily: theme.fontFamily.secondary,
                    borderRadius: "8px",
                    border: `1px solid ${theme.palette.grey[50]}`,
                    input: {
                      padding: "12px 16px",
                    },
                  }}
                  placeholder="From"
                  inputProps={{
                    min: 0,
                    inputMode: "numeric",
                    pattern: "[0-9]*",
                  }}
                />
                <Box mx={"16px"} width={"23px"} height={"1px"} bgcolor={theme.palette.grey[500]} />
                <TextField
                  type="number"
                  value={priceFilter.to_price}
                  sx={{
                    width: "100px",
                    bgcolor: "white",
                    fontFamily: theme.fontFamily.secondary,
                    borderRadius: "8px",
                    border: `1px solid ${theme.palette.grey[50]}`,
                    input: {
                      padding: "12px 16px",
                    },
                  }}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setPriceFilter({
                      from_price: priceFilter.from_price,
                      to_price: e.target.value,
                    })
                  }
                  placeholder="To"
                  inputProps={{
                    min: 0,
                    inputMode: "numeric",
                    pattern: "[0-9]*",
                  }}
                />
              </Box>
            </Box>
            <Box display={"flex"} flexDirection={"column"} alignItems={"start"} width={"100%"} mb={"24px"}>
              <Typography fontSize={14} fontFamily={theme.fontFamily.secondary} fontWeight={theme.fontWeight.bold} whiteSpace={"nowrap"} mb={"10px"}>
                Minimum Order Quantity
              </Typography>
              <TextField
                value={moq}
                type="number"
                onChange={(e: ChangeEvent<HTMLInputElement>) => setMoq(e.target.value)}
                sx={{
                  width: "100%",
                  bgcolor: "white",
                  fontFamily: theme.fontFamily.secondary,
                  borderRadius: "8px",
                  border: `1px solid ${theme.palette.grey[50]}`,
                  input: {
                    padding: "10px 16px",
                  },
                }}
                inputProps={{
                  min: 0,
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                }}
              />
            </Box>
            <Box width={"100%"}>
              <Box
                onClick={handleClearAll}
                component={"button"}
                sx={{
                  p: "20px 14px",
                  textAlign: "start",
                  color: theme.palette.primary.main,
                  fontFamily: theme.fontFamily.secondary,
                  width: "45%",
                  fontWeight: theme.fontWeight.medium,
                  fontSize: 14,
                }}
              >
                Clear All
              </Box>
              <Button
                onClick={handleApply}
                sx={{
                  p: "10px 14px!important",
                  borderRadius: "6px",
                  bgcolor: `${theme.blue[500]}!important`,
                  color: "common.white",
                  fontFamily: theme.fontFamily.secondary,
                  width: "55%",
                  fontWeight: theme.fontWeight.medium,
                  fontSize: 14,
                }}
              >
                Apply
              </Button>
            </Box>
          </>
        </Box>
        {data?.products && data?.products?.length > 0 ? <ProductList data={data?.products} /> : <NotFound caseValue={1} />}
      </Box> */}
    </Grid>
  );
};

export default Supplier;
