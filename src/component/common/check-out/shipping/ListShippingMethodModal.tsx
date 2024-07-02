import { Box, Divider, Radio, Typography, useTheme } from "@mui/material";
import { Modal } from "antd";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import boatIcon from "@/assets/icons/boat.svg";
import planeIcon from "@/assets/icons/air_plane.svg";
import landIcon from "@/assets/icons/land_freight.svg";
type ListShippingMethodModalType = {
  openListShippingMethodModal: boolean;
  setOpenListShippingMethodModal: Dispatch<SetStateAction<boolean>>;
  methodChecked: {
    method: number;
    item: number;
  };
  setMethodChecked: Dispatch<
    SetStateAction<{
      method: number;
      item: number;
    }>
  >;
};

const shippingMethod = [
  {
    icon: boatIcon,
    name: "Sea Freight",
  },
  {
    icon: planeIcon,
    name: "Air Freight",
  },
  {
    icon: landIcon,
    name: "Land Freight",
  },
];

const ListShippingMethodModal = ({
  openListShippingMethodModal,
  setOpenListShippingMethodModal,
  methodChecked,
  setMethodChecked
}: ListShippingMethodModalType) => {
  const theme = useTheme();
  return (
    <Modal
      open={openListShippingMethodModal}
      onCancel={() => setOpenListShippingMethodModal(false)}
      footer={false}
      closeIcon={null}
      style={{ left: -250 }}
    >
      <Box width={675}>
        <Typography
          fontFamily={theme.fontFamily.secondary}
          fontSize={20}
          fontWeight={theme.fontWeight.semiBold}
        >
          Shipping method
        </Typography>
        <Divider
          sx={{
            width: "100%",
            borderColor: theme.blue[100],
            mt: "8px",
            mb: "24px",
          }}
        />
        {shippingMethod.map((item, indexMethod) => {
          return (
            <Box
              display={"flex"}
              flexDirection={"column"}
              gap={"16px"}
              key={indexMethod}
            >
              <Box display={"flex"} gap={"10px"} alignItems={"center"}>
                <Image src={item.icon} alt="boat_icon" width={24} height={24} />
                <Typography
                  fontSize={14}
                  fontFamily={theme.fontFamily.secondary}
                  fontWeight={theme.fontWeight.semiBold}
                >
                  {item.name}
                </Typography>
              </Box>
              {Array(3)
                .fill(null)
                .map((_, index) => {
                  return (
                    <Box
                      key={index}
                      display={"flex"}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                      border={
                        methodChecked.method == indexMethod &&
                        methodChecked.item == index
                          ? `1px solid ${theme.palette.primary.main}`
                          : "1px solid transparent"
                      }
                      p={"10px"}
                      borderRadius={"8px"}
                    >
                      <Box display={"flex"} alignItems={"center"} gap={"21px"}>
                        <Radio
                          size="small"
                          checked={
                            methodChecked.method == indexMethod &&
                            methodChecked.item == index
                          }
                          onClick={() =>
                            setMethodChecked({
                              method: indexMethod,
                              item: index,
                            })
                          }
                        />
                        <Box
                          display={"flex"}
                          flexDirection={"column"}
                          gap={"8px"}
                        >
                          <Box display={"flex"} gap={"16px"}>
                            <Typography
                              fontFamily={theme.fontFamily.secondary}
                              fontWeight={theme.fontWeight.medium}
                              fontSize={14}
                            >
                              {"FedEx (Standard)"}
                            </Typography>
                          </Box>
                          <Typography
                            fontFamily={theme.fontFamily.secondary}
                            fontSize={14}
                          >
                            Estimated delivery by&nbsp;
                            <Typography
                              fontFamily={theme.fontFamily.secondary}
                              component={"strong"}
                              fontWeight={theme.fontWeight.semiBold}
                              fontSize={14}
                            >
                              Jul 4
                            </Typography>
                          </Typography>
                        </Box>
                      </Box>
                      <Typography fontFamily={theme.fontFamily.secondary}>
                        {(100).toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </Typography>
                    </Box>
                  );
                })}
              <Box>
                <Box
                  component={"button"}
                  color={theme.palette.primary.main}
                  fontSize={14}
                  fontFamily={theme.fontFamily.secondary}
                  width={"fit-content"}
                >
                  Show more
                </Box>
                {indexMethod !== shippingMethod.length - 1 && (
                  <Divider
                    sx={{
                      width: "100%",
                      borderColor: theme.blue[100],
                      my: "10px",
                    }}
                  />
                )}
              </Box>
            </Box>
          );
        })}
      </Box>
    </Modal>
  );
};

export default ListShippingMethodModal;
