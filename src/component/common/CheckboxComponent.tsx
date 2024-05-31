import { ChangeEvent } from "react";
import "./CheckboxComponent.css";

interface CheckboxComponentProps {
  id: string;
  handleOnCheck: (e: ChangeEvent<HTMLInputElement>, id: string) => void;
  checked?: boolean;
}
const CheckboxComponent = ({ id, handleOnCheck,checked }: CheckboxComponentProps) => {
  return (
    <div className="checkbox-wrapper-19">
      <input
        type="checkbox"
        id={id}
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleOnCheck(e, id)}
        checked={checked}
      />
      <label htmlFor={id} className="check-box" />
    </div>
  );
};

export default CheckboxComponent;
