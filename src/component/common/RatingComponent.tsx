import { RatingOption, RatingType } from "@/constant/enum";
import { Box, Pagination, Rating, Typography, useTheme } from "@mui/material";
import moment from "moment";
import Image from "next/image";
import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import NoImage from "@/assets/images/no-image.png";
import { useDraggable } from "react-use-draggable-scroll";
import Link from "next/link";
import { convertImage } from "@/utils";
import { PRODUCT_PATH_URL } from "@/constant/pathUrl";
import { PaginationDto, ProductRatingDto, RatingFilter } from "@/interface/common";

type RatingComponentProps = {
  type: string;
  data: ProductRatingDto | any;
  filter: PaginationDto & RatingFilter;
  setFilter: Dispatch<SetStateAction<PaginationDto & RatingFilter>>;
};

const RatingComponent = ({ type, data, filter, setFilter }: RatingComponentProps) => {
  const ref = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(ref);
  const theme = useTheme();
  const [filterReview, setFilterReview] = useState<string>(RatingOption.All);

  const handleChangeFilter = (option: string) => {
    setFilterReview(option);
    setFilter({ ...filter, with_media: null, star: null });
    switch (option) {
      case RatingOption.All: {
        setFilter({ ...filter, with_media: false, star: null });
        break;
      }
      case RatingOption.With_photo_video: {
        setFilter({ ...filter, with_media: true });
        break;
      }
      case RatingOption.start_5: {
        setFilter({ ...filter, star: 5 });
        break;
      }
      case RatingOption.start_4: {
        setFilter({ ...filter, star: 4 });
        break;
      }
      case RatingOption.start_3: {
        setFilter({ ...filter, star: 3 });
        break;
      }
      case RatingOption.start_2: {
        setFilter({ ...filter, star: 2 });
        break;
      }
      case RatingOption.start_1: {
        setFilter({ ...filter, star: 1 });
        break;
      }
    }
  };

console.log('DDDDDDDDDDDDDDDDDDDDDDDD', data)

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
            <Typography sx={{ fontWeight: theme.fontWeight.bold, fontSize: 24 }}>{data?.average}</Typography>
            <Typography>&nbsp;out of 5</Typography>
          </Box>
          <Rating precision={0.1} sx={{ color: theme.yellow[100] }} value={data?.average} readOnly />
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
                return data?.company_star[starCount] > 0;
              }
            })
            .map(([key, value]) => {
              const starCount = Number(key.replace('start_', ''));
              const count = data?.company_star[starCount];
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
      {data?.review.products.map((item: any, id: number) => (
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
          {type === RatingType.SUPPLIER && (
            <Box sx={{ display: "flex", fontFamily: theme.fontFamily.secondary, mt: 1 }}>
              <Typography sx={{ color: theme.palette.grey[400], fontSize: 14 }}>Product:&nbsp;</Typography>
              <Typography sx={{ fontWeight: theme.fontWeight.semiBold, color: theme.blue[500], fontSize: 14 }}>
                <Link href={`${PRODUCT_PATH_URL.PRODUCT_DETAIL}/${item.product_slug}`}>{item.product_name}</Link>
              </Typography>
            </Box>
          )}
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
      )) : <div>null</div>}
      {Number(filter?.totalPage) > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Pagination
            count={filter.totalPage}
            shape="rounded"
            onChange={(event, page) => {
              setFilter({ ...filter, page: page });
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

export default RatingComponent;
