export const Header = ({
  children,
}: {
  children?: JSX.Element | JSX.Element[];
}) => {
  return <div className="h-44 w-full bg-emerald-500 -z-10 m-0">{children}</div>;
};
