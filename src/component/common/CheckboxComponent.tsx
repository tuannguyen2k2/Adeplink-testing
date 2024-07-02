import { ChangeEvent } from "react";
import "./CheckboxComponent.css";
import { RegisterOptions, UseFormRegisterReturn } from "react-hook-form";

interface CheckboxComponentProps {
  id: string;
  handleOnCheck: (e: ChangeEvent<HTMLInputElement>, id: string) => void;
  checked?: boolean;
  defaultChecked?: boolean;
  rules?: RegisterOptions<any, string>;
  register?: (
    name: any,
    options?: RegisterOptions<any, any>
  ) => UseFormRegisterReturn<any>;
}
const CheckboxComponent = ({
  id,
  handleOnCheck,
  checked,
  defaultChecked,
  rules,
  register,
}: CheckboxComponentProps) => {
  if(!register){
    return (
      <div className="checkbox-wrapper-19">
        <input
          type="checkbox"
          id={id}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleOnCheck(e, id)}
          checked={checked}
          defaultChecked={defaultChecked}
        
        />
        <label htmlFor={id} className="check-box" />
      </div>
    );
  }
  return (
    <div className="checkbox-wrapper-19">
      <input
        type="checkbox"
        id={id}
        {...register(id, rules)}
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleOnCheck(e, id)}
        checked={checked}
        defaultChecked={defaultChecked}
      
      />
      <label htmlFor={id} className="check-box" />
    </div>
  );
};

export default CheckboxComponent;
