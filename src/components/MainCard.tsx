export const MainCard = ({
  children,
}: {
  children: JSX.Element | JSX.Element[] | null;
}) => {
  return (
    <div className="w-full absolute top-36 bg-white min-h-min rounded-t-3xl px-6 py-12 rounded-b-3xl">
      {children}
    </div>
  );
};
