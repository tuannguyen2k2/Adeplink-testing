"use client";
import useDevices from "@/hook/useDevices";
import { MAX_WIDTH_APP } from "@/constant/css";
import {
  Box,
  Button,
  Icon,
  Pagination,
  Typography,
  useTheme,
} from "@mui/material";
import { useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import {
  FilterSupplierDto,
  PaginationDto,
  SupplierDto,
} from "@/interface/common";
import FilterComponent from "./Filter";
import SortComponent from "./SortComponent";
import Image from "next/image";
import { LocationOnOutlined } from "@mui/icons-material";
import ChatIcon from "@/assets/icons/chat.svg";
import { useQuery } from "@tanstack/react-query";
import { getSearchSupplier } from "@/api/supplier";
import { SUPPLIER_KEY } from "@/constant/queryKey";
import NoImage from "@/assets/images/no-image.png";
import { SortOption } from "@/constant/enum";
import { useRouter } from "next-nprogress-bar";
import { SUPPLIER_PATH_URL } from "@/constant/pathUrl";
import SupplierItemSkeleton from "../common/skeleton/SupplierItemSkeleton";
import NotFound from "./NotFound";
import { convertImage } from "@/utils";
import { useGetSearchSupplier } from "@/api/supplier/query";

const Supplier = () => {
  const { isMobile } = useDevices();
  const theme = useTheme();
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword");
  const router = useRouter();
  const page = searchParams.get("page");
  const LIMIT = 10;
  const { getSearchSupplier, data: supplierData } = useGetSearchSupplier();
  const [filter, setFilter] = useState<FilterSupplierDto>({
    keyword: keyword ? keyword : "",
    category_ids: [],
    countries: [],
  });
  const [sortOrder, setSortOrder] = useState<string>(
    SortOption.Newest as string
  );
  useEffect(() => {
    getSearchSupplier({ limit: LIMIT, page: 1, is_newest: true });
  }, []);

  useEffect(() => {
    if (page)
      getSearchSupplier({
        limit: LIMIT,
        page: +page,
        keyword: filter.keyword,
        category_ids: filter.category_ids,
        countries: filter.countries,
        is_newest: sortOrder === SortOption.Newest,
        is_sorted: sortOrder === SortOption.A_to_Z,
      });
  }, [page, filter, sortOrder]);

  const handleChangePage = (event: ChangeEvent<unknown>, page: number) => {
    const updatedSearchParams = new URLSearchParams(searchParams.toString());
    updatedSearchParams.set("page", page.toString());
    router.push(
      `${SUPPLIER_PATH_URL.SUPPLIER_LIST}?${updatedSearchParams.toString()}`
    );
  };
  return (
    <Box
      sx={{
        mx: "auto",
        mt: "184px",
        p: isMobile ? "20px!important" : "0 88px!important",
        maxWidth: `${MAX_WIDTH_APP}!important`,
        fontFamily: theme.fontFamily.secondary,
      }}
    >
      <Box display={"flex"} justifyContent={"space-between"}>
        <Typography>
          {keyword &&
            `Showing ${supplierData?.metadata.total_data} suppliers for “${keyword}”`}
        </Typography>
        <SortComponent sortOrder={sortOrder} setSortOrder={setSortOrder} />
      </Box>
      <Box sx={{ display: "flex" }}>
        <Box sx={{ width: 300 }}>
          <FilterComponent
            filter={filter}
            setFilter={setFilter}
            categoryData={supplierData?.categories as Object}
            countryData={supplierData?.countries as string[]}
          />
        </Box>
        <Box sx={{ paddingLeft: 3, width: "100%" }}>
          {!supplierData ? (
            Array.from(Array(3)).map((_, id) => (
              <SupplierItemSkeleton key={id} />
            ))
          ) : (
            <>
              <Box width={"100%"} marginLeft={0} mt={0}>
                {supplierData?.companies.length > 0 ? (
                  supplierData?.companies?.map((supplier: SupplierDto) => (
                    <Box
                      key={supplier?.id}
                      width={"100%"}
                      height={"100%"}
                      display={"flex"}
                      bgcolor={"common.white"}
                      justifyContent={"space-between"}
                      p={"16px"}
                      mb={3}
                      borderRadius={"10px"}
                      border={`1px solid ${theme.blue[100]}`}
                    >
                      <Box sx={{ display: "flex" }}>
                        <Box
                          width={88}
                          height={88}
                          position={"relative"}
                          component={"button"}
                          onClick={() =>
                            router.push(
                              `${SUPPLIER_PATH_URL.SUPPLIER_DETAIL}/${supplier.slug}`
                            )
                          }
                        >
                          <Image
                            src={convertImage(supplier.image) ?? NoImage}
                            alt="product"
                            fill
                            objectFit="fill"
                            className="rounded-lg"
                          />
                        </Box>

                        <Box
                          sx={{ ml: 2, textAlign: "start" }}
                          component={"button"}
                          onClick={() =>
                            router.push(
                              `${SUPPLIER_PATH_URL.SUPPLIER_DETAIL}/${supplier.slug}`
                            )
                          }
                        >
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
                              <Icon
                                component={LocationOnOutlined}
                                sx={{ color: theme.palette.primary.main }}
                                width={24}
                                height={24}
                              />
                              {supplier.country}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                      <Box
                        display={"flex"}
                        justifyContent={"flex-end"}
                        height={"fit-content"}
                      >
                        <Button
                          sx={{
                            border: `1px solid ${theme.palette.primary.main}`,
                            borderRadius: 2,
                            marginRight: 1,
                            width: 93,
                            height: 42,
                          }}
                        >
                          <Image src={ChatIcon} alt="" width={20} height={20} />{" "}
                          Chat
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
                          onClick={() =>
                            router.push(
                              `${SUPPLIER_PATH_URL.SUPPLIER_DETAIL}/${supplier.slug}`
                            )
                          }
                        >
                          View details
                        </Button>
                      </Box>
                    </Box>
                  ))
                ) : (
                  <NotFound caseValue={1} />
                )}
              </Box>

              {supplierData &&
                supplierData.metadata.total_page &&
                supplierData.metadata.total_page > 1 && (
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Pagination
                      count={supplierData?.metadata.total_page || 1}
                      color="primary"
                      shape="rounded"
                      page={page ? parseInt(page) : 1}
                      sx={{
                        justifyContent: "center",
                        mt: "20px",
                        "& .Mui-selected": {
                          borderRadius: "8px",
                        },
                      }}
                      onChange={(e: ChangeEvent<unknown>, page: number) =>
                        handleChangePage(e, page)
                      }
                    />
                  </Box>
                )}
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Supplier;
