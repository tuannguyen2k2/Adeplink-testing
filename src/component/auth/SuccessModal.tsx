"use client";
import { useCountdown } from "@/hook/useCountdown";
import { Modal } from "antd";
import Link from "next/link";
import { useRouter } from "next-nprogress-bar";
import React, { useEffect } from "react";
import { HOME_PATH_URL } from "@/constant/pathUrl";

type SuccessModalType = {
  showSuccessModal: boolean;
  title: JSX.Element;
};

const SuccessModal = ({ showSuccessModal, title }: SuccessModalType) => {
  const router = useRouter();
  const { remaining, handleRunCountDown } = useCountdown(5, () =>
    router.replace(HOME_PATH_URL)
  );
  useEffect(() => {
    handleRunCountDown();
  }, []);
  return (
    <Modal open={showSuccessModal} footer={false}>
      {title}
      <div className="text-center font-semibold text-xl my-3 font-sans">
        {remaining}s
      </div>

      <div className="flex justify-center">
        <Link
          href={HOME_PATH_URL}
          className=" text-white bg-[#0C71BA] mt-5 px-14 py-2 rounded-lg font-semibold font-sans hover:text-[#ededed]"
        >
          Go to Homepage now
        </Link>
      </div>
    </Modal>
  );
};

export default SuccessModal;
