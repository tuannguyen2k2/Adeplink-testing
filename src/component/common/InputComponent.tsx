
type InputComponentProps = {
    title: string;
    children: any;
    className: string;
    error: string | undefined;
  };
  
export const InputComponent = ({
  title,
  children,
  className,
  error,
}: InputComponentProps) => (
  <div className={`my-1 h-[5rem] ${className} `}>
    <h4 className="mb-1">
      <span className="text-red-500 mr-1">*</span>
      <span className="font-medium">{title}</span>
    </h4>
    <div className="border-[1px] border-solid border-gray-400 rounded-lg w-full px-3 py-2">
      {children}
    </div>
    {error && (
      <div className="text-red-500 text-[13px] font-medium">{error}</div>
    )}
  </div>
);
