"use client";
import { useCountdown } from "@/hook/useCountdown";
import { Modal, ModalProps } from "antd";
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
    <Modal
      open={showSuccessModal}
      footer={false}
      closeIcon={null}
      className="modal-success"
    >
      {title}
      <div className="text-center font-semibold text-[16px] my-3 font-sans">
        {remaining}s
      </div>

      <div className="flex justify-center">
        <Link
          href={HOME_PATH_URL}
          className="text-white bg-[#0C71BA] rounded-lg font-semibold font-sans hover:text-[#ededed]"
          style={{ padding: "8px 100px", whiteSpace: "nowrap" }}
        >
          Go to Homepage now
        </Link>
      </div>
    </Modal>
  );
};

export default SuccessModal;
