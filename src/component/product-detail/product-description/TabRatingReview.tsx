"use client";
import React, { useEffect, useRef, useState } from "react";
import RatingComponent from "@/component/common/RatingComponent";
import { RatingOption, RatingType } from "@/constant/enum";
import { PaginationDto, RatingFilter } from "@/interface/common";
import { useGetRatingByProductId } from "@/api/product/query";
import { Box, Pagination, Rating, Typography, useTheme } from "@mui/material";
import { useDraggable } from "react-use-draggable-scroll";
import moment from "moment";
import Image from "next/image";
import { convertImage } from "@/utils";
import NoImage from "@/assets/images/no-image.png";

const TabRatingReview = ({ productId }: { productId: string }) => {
  const ref = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(ref);
  const theme = useTheme();
  const { getRatingByProduct, data: reviewData } = useGetRatingByProductId();
  const [reviewFilter, setReviewFilter] = useState<PaginationDto & RatingFilter>({ star: null, with_media: null, page: 1, limit: 10, totalPage: 0 });
  const [filterReview, setFilterReview] = useState<string>(RatingOption.All);

  // useEffect(() => {
    getRatingByProduct("22d3ed7f-c156-4156-9d1b-8c527b6e2903");
  // }, []);

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

  console.log("IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII", reviewData);
  return (
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
            <Typography sx={{ fontWeight: theme.fontWeight.bold, fontSize: 24 }}>4.1</Typography>
            <Typography>&nbsp;out of 5</Typography>
          </Box>
          <Rating precision={0.1} sx={{ color: theme.yellow[100] }} value={4.1} readOnly />
        </Box>
        <Box sx={{ display: "flex", overflowX: "hidden", ml: 3 }} {...events} ref={ref}>
          {/* <Box sx={{ display: "flex", overflowX: "scrool", ml: 3 }}>  dòng này để backup nếu muốn scrool  */}
          {/* {
        Object.entries(RatingOption).filter(([key, value]) => {
          if (key === RatingOption.All || key === RatingOption.With_photo_video) {
            return key;
          }
          const starCount = Number(key.replace("start_", ""));
          if (typeof starCount === "number") {
            return data.company_star[starCount] > 0;
          }
        })
        .map(([key, value]) => {
          const starCount = Number(key.replace('start_', ''));
          const count = data.company_star[starCount];
          return `${value} (${count})`;
        }).map((option) => (
          <div key={option}>{option}</div>
        ))
      } */}
          {Object.values(RatingOption).map((item, id) => (
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
                borderColor: filterReview === item ? theme.palette.primary.main : "#F0F6FF",
              })}
              onClick={() => handleChangeFilter(item)}
            >
              <Typography
                sx={{
                  textWrap: "nowrap",
                  px: "16px",
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
              >{`${item} (45)`}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
      {/* {reviewData ? (
        reviewData?.review.products.map((item: any, id: number) => (
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
        ))
      ) : (
        <div>null</div>
      )} */}
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
    </React.Fragment>
  );
};

export default TabRatingReview;
