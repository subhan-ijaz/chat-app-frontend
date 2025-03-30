const Text = ({ children, align }) => {
  return (
    <p
      className={`text-zinc-700 text-${align} text-sm sm:text-base lg:text-lg font-light leading-tight`}
    >
      {children}
    </p>
  );
};

export default Text;
