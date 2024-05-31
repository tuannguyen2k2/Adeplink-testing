"use client";
import React, { useEffect, useRef, useState } from "react";
import { RatingOption, RatingType } from "@/constant/enum";
import { PaginationDto, RatingFilter } from "@/interface/common";
import { useGetRatingByProductId } from "@/api/product/query";
import { Box, Pagination, Rating, Typography, useTheme } from "@mui/material";
import { useDraggable } from "react-use-draggable-scroll";
import moment from "moment";
import Image from "next/image";
import { convertImage } from "@/utils";
import NoImage from "@/assets/images/no-image.png";
import { useQuery, useQueryErrorResetBoundary } from "@tanstack/react-query";
import { getRatingByProductId } from "@/api/product/api";
import { PRODUCT_REVIEW_KEY } from "@/constant/queryKey";
import ReviewComponentSkeleton from "@/component/common/skeleton/ReviewComponentSkeleton";
import Draggable from 'react-draggable';

const TabRatingReview = ({ productId }: { productId: string }) => {
  // const ref = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  // const { events } = useDraggable(ref, {
  //   isMounted: true,
  // });

  const theme = useTheme();
  // const { getRatingByProduct, data: reviewData } = useGetRatingByProductId();
  const [reviewFilter, setReviewFilter] = useState<PaginationDto & RatingFilter>({ star: null, with_media: null, page: 1, limit: 10, totalPage: 0 });
  const [filterReview, setFilterReview] = useState<string>(RatingOption.All);

  // useEffect(() => {
  //   getRatingByProduct("22d3ed7f-c156-4156-9d1b-8c527b6e2903", reviewFilter.star ? Number(reviewFilter.star) : undefined);
  // }, []);

  const { data: reviewData, isLoading } = useQuery({
    queryKey: [PRODUCT_REVIEW_KEY, reviewFilter],
    queryFn: async () =>
      await getRatingByProductId(productId, reviewFilter.star ? Number(reviewFilter.star) : undefined).then((response) => {
      // await getRatingByProductId("22d3ed7f-c156-4156-9d1b-8c527b6e2903", reviewFilter.star ? Number(reviewFilter.star) : undefined).then((response) => {
        return response;
      }),
  });

  if (isLoading || !reviewData) return Array.from(Array(1)).map((_, id) => <ReviewComponentSkeleton key={id} />);

  const handleChangeFilter = (option: string) => {
    setFilterReview(option);
    setReviewFilter({ ...reviewFilter, with_media: null, star: null });
    switch (option) {
      case RatingOption.All: {
        setReviewFilter({ ...reviewFilter, with_media: false, star: null });
        break;
      }
      case RatingOption.With_photo_video: {
        setReviewFilter({ ...reviewFilter, with_media: true });
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

  if (isLoading || !reviewData) return Array.from(Array(1)).map((_, id) => <ReviewComponentSkeleton key={id} />);

  return (
    <>{reviewData?.product_vote !== null && reviewData.product_user_vote_list.length > 0 ? <React.Fragment>
      <Box
        sx={{
          display: "flex",
          border: "1px solid #F0F6FF",
          borderRadius: "8px",
          padding: "16px",
        }}
      >
        <Box>
          <Box sx={{ display: "flex", color: theme.blue[500], alignItems: "baseline" }}>
            <Typography sx={{ fontWeight: theme.fontWeight.bold, fontSize: 24 }}>{reviewData?.product_vote?.vote_average_score}</Typography>
            <Typography>&nbsp;out of 5</Typography>
          </Box>
          <Rating precision={0.1} sx={{ color: theme.yellow[100] }} value={reviewData?.product_vote?.vote_average_score} readOnly />
        </Box>

        {/* <Box sx={{ display: "flex", overflowX: "hidden", ml: 3 }} {...events} ref={ref}> */}
        <Box sx={{ display: "flex", overflowX: "scroll", ml: 3 }}>
          {Object.entries(RatingOption)
            .filter(([key, value]) => {
              switch (value) {
                case RatingOption.All: {
                  return key;
                }
                case RatingOption.With_photo_video: {
                  return key;
                }
                case RatingOption.start_5: {
                  if (Number(reviewData?.product_vote.vote_five_star_count)) return key;
                }
                case RatingOption.start_4: {
                  if (Number(reviewData?.product_vote.vote_four_star_count)) return key;
                }
                case RatingOption.start_3: {
                  if (Number(reviewData?.product_vote.vote_three_star_count)) return key;
                }
                case RatingOption.start_2: {
                  if (Number(reviewData?.product_vote.vote_two_star_count)) return key;
                }
                case RatingOption.start_1: {
                  if (Number(reviewData?.product_vote.vote_one_star_count)) return key;
                }
              }
            })
            .map(([key, value]) => {
              switch (value) {
                case RatingOption.All: {
                  return { label: value, value: reviewData?.product_vote.vote_count };
                }
                case RatingOption.With_photo_video: {
                  return { label: value, value: reviewData?.product_vote.vote_count };
                }
                case RatingOption.start_5: {
                  return { label: value, value: reviewData?.product_vote.vote_five_star_count };
                }
                case RatingOption.start_4: {
                  return { label: value, value: reviewData?.product_vote.vote_four_star_count };
                }
                case RatingOption.start_3: {
                  return { label: value, value: reviewData?.product_vote.vote_three_star_count };
                }
                case RatingOption.start_2: {
                  return { label: value, value: reviewData?.product_vote.vote_two_star_count };
                }
                case RatingOption.start_1: {
                  return { label: value, value: reviewData?.product_vote.vote_one_star_count };
                }
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
                    borderColor: filterReview === option.label ? theme.palette.primary.main : "#F0F6FF",
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
                    {`${option?.label} (${option?.value})`}
                  </Typography>
                </Box>
              );
            })}
        </Box>
      </Box>
      {reviewData?.product_user_vote_list.map((item: any, id: number) => (
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
          <Rating sx={{ color: theme.yellow[100], mt: 1.5 }} value={item.vote_score} readOnly />
          <Typography
            sx={{
              fontWeight: theme.fontWeight.regular,
              color: theme.palette.grey[400],
              fontSize: 14,
            }}
          >
            {moment(item.created_at).format("Do MMMM YYYY")}
          </Typography>
          <Typography sx={{ mt: 2, fontFamily: theme.fontFamily.secondary, fontWeight: theme.fontWeight.regular, fontSize: 14, color: theme.black[200] }}>
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
                <Image src={convertImage(item) || NoImage} alt="" fill objectFit="fill" className="rounded-lg" />
              </Box>
            ))}
          </Box>
          {item.supplierResponse && (
            <Box sx={{ bgcolor: theme.blue[100], borderRadius: "8px", p: "10px", mt: 2 }}>
              <Typography sx={{ fontFamily: theme.fontFamily.secondary, fontWeight: theme.fontWeight.medium, fontSize: 16, color: theme.blue[500] }}>
                Supplier’s Response
              </Typography>
              <Box sx={{ fontFamily: theme.fontFamily.secondary, fontWeight: theme.fontWeight.regular, fontSize: 14, color: theme.black[200] }}>{item.supplierResponse}</Box>
            </Box>
          )}
        </Box>
      ))}
      {Number(reviewFilter?.totalPage) > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Pagination
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
    </React.Fragment>  : <div>null</div> }</>
  );
};

export default TabRatingReview;
