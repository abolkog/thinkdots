type LoaderProps = React.PropsWithChildren & {
  active?: boolean;
};

export default function Loader({ children, active = false }: LoaderProps) {
  if (!active) {
    return <>{children}</>;
  }
  return (
    <div className="flex space-x-2 justify-center items-center mt-10">
      <span className="sr-only">Loading...</span>
      <div className="h-4 w-4 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="h-4 w-4 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="h-4 w-4 bg-blue-400 rounded-full animate-bounce"></div>
    </div>
  );
}
