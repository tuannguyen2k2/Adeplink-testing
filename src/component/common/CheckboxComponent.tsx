import "./CheckboxComponent.css";

interface CheckboxComponentProps {
  id: string;
}
const CheckboxComponent = ({ id }: CheckboxComponentProps) => {
  return (
    <div className="checkbox-wrapper-19">
      <input type="checkbox" id={id} />
      <label htmlFor={id} className="check-box" />
    </div>
  );
};

export default CheckboxComponent;
