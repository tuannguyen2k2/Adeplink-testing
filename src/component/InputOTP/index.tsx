import React, { useRef, useState } from "react";

type InputProps = {
  length?: number;
  onComplete: any;
  //   onComplete: (pin: string) => void;
  onSubmit?: any
};

const InputOTP = ({ length = 6, onComplete, onSubmit }: InputProps) => {
  const inputRef = useRef<HTMLInputElement[]>(Array(length).fill(null));

  const [OTP, setOTP] = useState<string[]>(Array(length).fill(""));

  const handleTextChange = (input: string, index: number) => {
    const newPin = [...OTP];
    newPin[index] = input;
    setOTP(newPin);

    if (input.length === 1 && index < length - 1) {
      inputRef.current[index + 1]?.focus();
    }

    if (input.length === 0 && index > 0) {
      inputRef.current[index - 1]?.focus();
    }

    if (newPin.every((digit) => digit !== "")) {
      onComplete(newPin.join(""));
    }
    onSubmit = () => {
      if (newPin.every((digit) => digit !== "")) {
        onComplete(newPin.join(""));
      }
    }
  };

  return (
    <div className={"flex justify-between"}>
      {Array.from({ length }, (_, index) => (
        <input
          key={index}
          size={1.5}
          type="text"
          maxLength={1}
          placeholder="*"
          value={OTP[index]}
          onChange={(e) => handleTextChange(e.target.value, index)}
          ref={(ref) => (inputRef.current[index] = ref as any)}
          className=" border-gray-400 rounded-md focus:outline-none flex justify-center items-center text-xl font-semibold text-center "
          style={{ marginRight: index === length - 1 ? "0" : "10px", backgroundColor: '#DFDFDF', width: 50, height: 50}}
        />
      ))}
    </div>
  );
};
export default InputOTP;
