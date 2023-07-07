export default function ButtonSvg({ Icon, children }) {
  return (
    <>
      <div className="flex flex-row w-full rounded-full py-2 px-4 bg-rose-300 items-center max-w-fit">
        <Icon/>
        <p className="text-xl font-semibold text-center">
          {children}
        </p>
      </div>
    </>
  );
}
