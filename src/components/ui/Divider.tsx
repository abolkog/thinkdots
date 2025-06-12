type DividerProps = {
  label: string;
};

export default function Divider({ label }: DividerProps) {
  return (
    <div className="relative">
      <div aria-hidden="true" className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-400" />
      </div>
      <div className="relative flex justify-center my-10">
        <span className="bg-gray-400 px-2 text-sm font-semibold text-black">{label}</span>
      </div>
    </div>
  );
}
