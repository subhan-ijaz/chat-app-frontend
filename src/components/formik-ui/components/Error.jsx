const Error = ({ children }) => {
  return (
    <h6 className="bg-red-400 text-white px-3 py-[2px] tracking-wide rounded-full text-sm absolute bottom-[100px]">
      {children}
    </h6>
  );
};

export default Error;
