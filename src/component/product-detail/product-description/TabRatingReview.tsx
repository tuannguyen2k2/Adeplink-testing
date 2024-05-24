import React, { useState } from "react";
import { Box, Rating, Typography, useTheme } from "@mui/material";
import moment from "moment";
import Image from "next/image";

const reviewData = [
  {
    id: 1,
    user: "User 1",
    ratingValue: 4,
    ratingContent:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    date: "19/05/2024",
    image: [
      {
        url: "https://th.bing.com/th/id/OIP.4nipAL-jO0_Emngf7okS3AHaF7?rs=1&pid=ImgDetMain",
      },
      {
        url: "https://th.bing.com/th/id/OIP.4nipAL-jO0_Emngf7okS3AHaF7?rs=1&pid=ImgDetMain",
      },
      {
        url: "https://th.bing.com/th/id/OIP.4nipAL-jO0_Emngf7okS3AHaF7?rs=1&pid=ImgDetMain",
      },
      {
        url: "https://th.bing.com/th/id/OIP.4nipAL-jO0_Emngf7okS3AHaF7?rs=1&pid=ImgDetMain",
      },
      {
        url: "https://th.bing.com/th/id/OIP.4nipAL-jO0_Emngf7okS3AHaF7?rs=1&pid=ImgDetMain",
      },
    ],
  },
  {
    id: 1,
    user: "User 2",
    ratingValue: 5,
    ratingContent:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    date: "19/05/2024",
    image: [
      {
        url: "https://th.bing.com/th/id/OIP.4nipAL-jO0_Emngf7okS3AHaF7?rs=1&pid=ImgDetMain",
      },
      {
        url: "https://th.bing.com/th/id/OIP.4nipAL-jO0_Emngf7okS3AHaF7?rs=1&pid=ImgDetMain",
      },
      {
        url: "https://th.bing.com/th/id/OIP.4nipAL-jO0_Emngf7okS3AHaF7?rs=1&pid=ImgDetMain",
      },
      {
        url: "https://th.bing.com/th/id/OIP.4nipAL-jO0_Emngf7okS3AHaF7?rs=1&pid=ImgDetMain",
      },
    ],
  },
  {
    id: 1,
    user: "User 3",
    ratingValue: 4,
    ratingContent:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    date: "19/05/2024",
    image: [
      {
        url: "https://th.bing.com/th/id/OIP.4nipAL-jO0_Emngf7okS3AHaF7?rs=1&pid=ImgDetMain",
      },
      {
        url: "https://th.bing.com/th/id/OIP.4nipAL-jO0_Emngf7okS3AHaF7?rs=1&pid=ImgDetMain",
      },
      {
        url: "https://th.bing.com/th/id/OIP.4nipAL-jO0_Emngf7okS3AHaF7?rs=1&pid=ImgDetMain",
      },
    ],
  },
  {
    id: 1,
    user: "User 4",
    ratingValue: 3,
    ratingContent:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    date: "19/05/2024",
    image: [
      {
        url: "https://th.bing.com/th/id/OIP.4nipAL-jO0_Emngf7okS3AHaF7?rs=1&pid=ImgDetMain",
      },
      {
        url: "https://th.bing.com/th/id/OIP.4nipAL-jO0_Emngf7okS3AHaF7?rs=1&pid=ImgDetMain",
      },
      {
        url: "https://th.bing.com/th/id/OIP.4nipAL-jO0_Emngf7okS3AHaF7?rs=1&pid=ImgDetMain",
      },
      {
        url: "https://th.bing.com/th/id/OIP.4nipAL-jO0_Emngf7okS3AHaF7?rs=1&pid=ImgDetMain",
      },
      {
        url: "https://th.bing.com/th/id/OIP.4nipAL-jO0_Emngf7okS3AHaF7?rs=1&pid=ImgDetMain",
      },
    ],
  },
];

const TabRatingReview = () => {
  const [filterReview, setFilterReview] = useState("All");
  const theme = useTheme();
  const ratingOption = [
    { id: "All", title: "All", value: 100 },
    { id: "photo-video", title: "With photos/videos", value: 45 },
    { id: "5-start", title: "5 starts", value: 12 },
    { id: "4-start", title: "4 starts", value: 23 },
    { id: "3-start", title: "3 starts", value: 34 },
    { id: "2-start", title: "2 starts", value: 45 },
    { id: "1-start", title: "1 starts", value: 56 },
  ];
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
            <Typography
              sx={{ fontWeight: theme.fontWeight.bold, fontSize: 24 }}
            >
              4.1
            </Typography>
            <Typography>&nbsp;out of 5</Typography>
          </Box>
          <Rating
            precision={0.1}
            sx={{ color: theme.yellow[100] }}
            value={4.3}
            readOnly
          />
        </Box>
        <Box sx={{ display: "flex", overflowX: "scroll", ml: 3 }}>
          {ratingOption.map((item) => (
            <Box
              key={item.id}
              height={42}
              sx={(theme) => ({
                display: "flex",
                alignItems: "center",
                border: 1,
                mr: 1,
                fontSize: 14,
                borderRadius: "4px",
                borderColor:
                  filterReview === item.id
                    ? theme.palette.primary.main
                    : "#F0F6FF",
              })}
              onClick={() => setFilterReview(item.id)}
            >
              <Typography
                sx={{ textWrap: "nowrap", px: "16px" }}
              >{`${item.title} (${item.value})`}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
      {reviewData.map((item, id) => (
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
            value={4.3}
            readOnly
          />
          <Typography
            sx={{
              fontWeight: theme.fontWeight.regular,
              color: theme.palette.grey[400],
            }}
          >
            {moment("12/25/1995").format("Do MMMM YYYY")}
          </Typography>
          <Typography sx={{ mt: 2 }}>{item.ratingContent}</Typography>
          <Box sx={{ display: "flex" }}>
            {item.image.map((item, id) => (
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
                  src={item.url}
                  alt=""
                  fill
                  objectFit="fill"
                  className="rounded-lg"
                />
              </Box>
            ))}
          </Box>
        </Box>
      ))}
    </React.Fragment>
  );
};

export default TabRatingReview;
