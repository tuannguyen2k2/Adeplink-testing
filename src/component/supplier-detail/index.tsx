"use client";
import { MAX_WIDTH_APP } from "@/constant/css";
import {
  Box,
  Container,
  Pagination,
  Rating,
  Typography,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import SupplierBanner from "@/assets/images/supplier-background.png";
import SupplierInfo from "./SupplierInfo";
import { RatingOption, SortOption } from "@/constant/enum";
import { useQuery } from "@tanstack/react-query";
import { SUPPLIER_KEY, SUPPLIER_REVIEW_KEY } from "@/constant/queryKey";
import { getSupplierReview } from "@/api/supplier";
import React, { useRef, useState } from "react";
import { PaginationDto, RatingFilter } from "@/interface/common";
import ProductOfSupplierList from "./ProductOfSupplierList";
import { getSupplierDetailBySlug } from "@/api/supplier/api";
import { PRODUCT_PATH_URL } from "@/constant/pathUrl";
import Link from "next/link";
import moment from "moment";
import { convertImage } from "@/utils";
import NoImage from "@/assets/images/no-image.png";
import { useDraggable } from "react-use-draggable-scroll";
import ReviewComponentSkeleton from "../common/skeleton/ReviewComponentSkeleton";

const SupplierDetail = ({ params }: { params: { slug: string } }) => {
  // const ref = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  // const { events } = useDraggable(ref);

  const theme = useTheme();
  const [filterReview, setFilterReview] = useState<string>(RatingOption.All);

  const [reviewFilter, setReviewFilter] = useState<
    PaginationDto & RatingFilter
  >({ star: null, with_media: null, page: 1, limit: 10, totalPage: 0 });

  const { data: supplierData, isLoading: isLoadingData } = useQuery({
    queryKey: [SUPPLIER_KEY, params.slug],
    queryFn: async () =>
      await getSupplierDetailBySlug(params.slug).then(
        (response) => response.data
      ),
  });

  const { data: reviewData, isLoading: isLoadingReview } = useQuery({
    queryKey: [SUPPLIER_REVIEW_KEY, reviewFilter, params],
    queryFn: async () =>
      await getSupplierReview(supplierData.company.slug, reviewFilter).then(
        (response) => {
          setReviewFilter({
            ...reviewFilter,
            totalPage: response.data.review.metadata.total_page,
          });
          return response.data;
        }
      ),
  });

  const handleChangeFilter = (option: string) => {
    setFilterReview(option);
    setReviewFilter({ ...reviewFilter, with_media: false, star: null });
    switch (option) {
      case RatingOption.All: {
        setReviewFilter({ ...reviewFilter, with_media: false, star: null });
        break;
      }
      case RatingOption.With_photo_video: {
        setReviewFilter({ ...reviewFilter, with_media: true, star: null });
        break;
      }
      case RatingOption.start_5: {
        setReviewFilter({ ...reviewFilter, star: 5 });
        break;
      }
      case RatingOption.start_4: {
        setReviewFilter({ ...reviewFilter, star: 4 });
        break;
      }
      case RatingOption.start_3: {
        setReviewFilter({ ...reviewFilter, star: 3 });
        break;
      }
      case RatingOption.start_2: {
        setReviewFilter({ ...reviewFilter, star: 2 });
        break;
      }
      case RatingOption.start_1: {
        setReviewFilter({ ...reviewFilter, star: 1 });
        break;
      }
    }
  };

  return (
    <Container
      sx={{
        mt: "184px",
        p: { xs: "20px!important", sm: "0 88px!important" },
        maxWidth: `${MAX_WIDTH_APP}!important`,
        fontFamily: theme.fontFamily.secondary,
      }}
    >
      <Box
        width={"100%"}
        height={160}
        mb={"32px"}
        border={`1px solid ${theme.blue[100]}`}
        borderRadius={"16px"}
      >
        <Image
          src={SupplierBanner}
          alt="supplier banner"
          style={{ borderRadius: "16px", width: "100%", height: "100%" }}
        />
      </Box>
      <SupplierInfo data={supplierData} />
      <Box
        width={"100%"}
        p={"16px"}
        border={`1px solid ${theme.blue[100]}`}
        boxShadow={theme.boxShadow[100]}
        borderRadius={"16px"}
        mt={"32px"}
      >
        <Typography
          sx={{
            color: theme.palette.primary.main,
            fontWeight: theme.fontWeight.semiBold,
            bgcolor: theme.blue[100],
            fontFamily: theme.fontFamily.secondary,
            p: "8px 16px",
            borderRadius: "8px",
            mb: "16px",
          }}
        >
          Photos
        </Typography>
        <Box display={"flex"} justifyContent={"space-between"}>
          {Array(5)
            .fill(null)
            .map((_, index) => {
              return (
                <Box width={224} height={224} position={"relative"} key={index}>
                  <Image
                    src={
                      "https://th.bing.com/th/id/OIP.Zfeg2aQarGBA5op6udDRXAHaEc?w=1000&h=600&rs=1&pid=ImgDetMain"
                    }
                    alt={""}
                    fill
                    objectFit="fill"
                    className="rounded-lg"
                  />
                </Box>
              );
            })}
        </Box>
      </Box>
      <Box
        width={"100%"}
        p={"16px"}
        border={`1px solid ${theme.blue[100]}`}
        boxShadow={theme.boxShadow[100]}
        borderRadius={"16px"}
        mt={"32px"}
      >
        <Typography
          sx={{
            color: theme.palette.primary.main,
            fontWeight: theme.fontWeight.semiBold,
            fontFamily: theme.fontFamily.secondary,
            p: "8px 16px 4px 10px",
            mb: "16px",
            borderBottom: `2px solid ${theme.blue[1000]}`,
          }}
        >
          Reviews and rating
        </Typography>
        {isLoadingReview || !reviewData ? (
          <>
            {Array.from(Array(2)).map((_, id) => (
              <ReviewComponentSkeleton key={id} />
            ))}
          </>
        ) : (
          <React.Fragment>
            <Box
              sx={{
                display: "flex",
                border: "1px solid #F0F6FF",
                borderRadius: "8px",
                padding: "16px",
              }}
            >
              <Box sx={{}}>
                <Box
                  sx={{
                    display: "flex",
                    color: theme.blue[500],
                    alignItems: "baseline",
                  }}
                >
                  <Typography
                    sx={{ fontWeight: theme.fontWeight.bold, fontSize: 24 }}
                  >
                    {reviewData?.average}
                  </Typography>
                  <Typography>&nbsp;out of 5</Typography>
                </Box>
                <Rating
                  precision={0.1}
                  sx={{ color: theme.yellow[100] }}
                  value={reviewData?.average}
                  readOnly
                />
              </Box>
              {/* <Box sx={{ display: "flex", overflowX: "hidden", ml: 3 }} {...events} ref={ref}> */}
              <Box sx={{ display: "flex", overflowX: "scrool", ml: 3 }}>
                {Object.entries(RatingOption)
                  .filter(([key, value]) => {
                    if (
                      key !== RatingOption.All &&
                      value !== RatingOption.With_photo_video
                    ) {
                      const starCount = Number(key.replace("start_", ""));
                      return reviewData?.company_star[starCount] > 0;
                    }
                    return key;
                  })
                  .map(([key, value]) => {
                    if (key === RatingOption.All) {
                      return { label: value, value: reviewData.total };
                    } else if (value === RatingOption.With_photo_video) {
                      return { label: value, value: reviewData.with_media };
                    } else {
                      const starCount = Number(key.replace("start_", ""));
                      const count = reviewData.company_star[starCount];
                      return { label: value, value: count };
                    }
                  })
                  .map((option, id) => {
                    return (
                      <Box
                        key={id}
                        height={42}
                        sx={(theme) => ({
                          display: "flex",
                          alignItems: "center",
                          border: 1,
                          mr: 1,
                          fontSize: 14,
                          borderRadius: "4px",
                          borderColor:
                            filterReview === option.label
                              ? theme.palette.primary.main
                              : "#F0F6FF",
                        })}
                        onClick={() => handleChangeFilter(option.label)}
                      >
                        <Typography
                          sx={{
                            textWrap: "nowrap",
                            px: "16px",
                            "&:hover": {
                              cursor: "pointer",
                            },
                          }}
                        >
                          {`${option.label} (${option.value})`}
                        </Typography>
                      </Box>
                    );
                  })}
              </Box>
            </Box>
            {reviewData ? (
              reviewData.review.products.map((item: any, id: number) => (
                <Box
                  key={id}
                  sx={{
                    border: "1px solid #F0F6FF",
                    borderRadius: "8px",
                    padding: "16px",
                    mt: 2,
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: theme.fontWeight.semiBold,
                      fontFamily: theme.fontFamily.secondary,
                    }}
                    fontSize={14}
                  >
                    {item.user}
                  </Typography>
                  <Rating
                    sx={{ color: theme.yellow[100], mt: 1.5 }}
                    value={item.vote_score}
                    readOnly
                  />
                  <Typography
                    sx={{
                      fontWeight: theme.fontWeight.regular,
                      color: theme.palette.grey[400],
                      fontSize: 14,
                    }}
                  >
                    {moment(item.created_at).format("Do MMMM YYYY")}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      fontFamily: theme.fontFamily.secondary,
                      mt: 1,
                    }}
                  >
                    <Typography
                      sx={{ color: theme.palette.grey[400], fontSize: 14 }}
                    >
                      Product:&nbsp;
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: theme.fontWeight.semiBold,
                        color: theme.blue[500],
                        fontSize: 14,
                      }}
                    >
                      <Link
                        href={`${PRODUCT_PATH_URL.PRODUCT_DETAIL}/${item.product_slug}`}
                      >
                        {item.product_name}
                      </Link>
                    </Typography>
                  </Box>

                  <Typography
                    sx={{
                      mt: 2,
                      fontFamily: theme.fontFamily.secondary,
                      fontWeight: theme.fontWeight.regular,
                      fontSize: 14,
                      color: theme.black[200],
                    }}
                  >
                    {item.comment}
                  </Typography>
                  <Box sx={{ display: "flex", mt: 1 }}>
                    {item.images.map((item: string, id: number) => (
                      <Box
                        key={id}
                        sx={{
                          width: "72px",
                          height: "72px",
                          mr: 2,
                          position: "relative",
                        }}
                      >
                        <Image
                          src={convertImage(item) || NoImage}
                          alt=""
                          fill
                          objectFit="fill"
                          className="rounded-lg"
                        />
                      </Box>
                    ))}
                  </Box>
                  {item.supplierResponse && (
                    <Box
                      sx={{
                        bgcolor: theme.blue[100],
                        borderRadius: "8px",
                        p: "10px",
                        mt: 2,
                      }}
                    >
                      <Typography
                        sx={{
                          fontFamily: theme.fontFamily.secondary,
                          fontWeight: theme.fontWeight.medium,
                          fontSize: 16,
                          color: theme.blue[500],
                        }}
                      >
                        Supplier’s Response
                      </Typography>
                      <Box
                        sx={{
                          fontFamily: theme.fontFamily.secondary,
                          fontWeight: theme.fontWeight.regular,
                          fontSize: 14,
                          color: theme.black[200],
                        }}
                      >
                        {item.supplierResponse}
                      </Box>
                    </Box>
                  )}
                </Box>
              ))
            ) : (
              <div>null</div>
            )}
            {Number(reviewFilter?.totalPage) > 1 && (
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Pagination
                  page={reviewFilter.page}
                  count={reviewFilter.totalPage}
                  shape="rounded"
                  onChange={(event, page) => {
                    setReviewFilter({ ...reviewFilter, page: page });
                  }}
                  sx={{
                    "& .Mui-selected": {
                      borderRadius: "8px",
                      bgcolor: theme.palette.primary.main,
                      color: "white",
                    },
                  }}
                />
              </Box>
            )}
          </React.Fragment>
        )}
      </Box>

      <ProductOfSupplierList listCategory={supplierData?.category} />
    </Container>
  );
};

export default SupplierDetail;
