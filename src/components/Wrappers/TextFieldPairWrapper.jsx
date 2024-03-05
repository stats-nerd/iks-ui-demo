const TextFieldPairWrapper = ({ children }) => {
  return (
    <div className="w-full flex flex-col md:flex-row items-center justify-center gap-5">
      {children}
    </div>
  );
};

export default TextFieldPairWrapper;
