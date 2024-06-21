type InputComponentProps = {
  title: string;
  children: any;
  className: string;
  error: string | undefined;
  notRequire?: boolean;
};

export const InputComponent = ({
  title,
  children,
  className,
  error,
  notRequire,
}: InputComponentProps) => {
  return (
    <div className={`my-1 h-[5rem] font-sans font-medium ${className} `}>
      <h4 className="mb-1">
        {!notRequire && <span className="text-red-500 mr-1">*</span>}
        <span style={{ whiteSpace: "nowrap" }}>{title}</span>
      </h4>
      <div
        style={{ fontWeight: "400" }}
        className="border-[1px] border-solid border-gray-400 rounded-lg w-full px-3 py-2"
      >
        {children}
      </div>
      {error && (
        <div className="text-red-500 text-[13px] font-medium">{error}</div>
      )}
    </div>
  );
};
