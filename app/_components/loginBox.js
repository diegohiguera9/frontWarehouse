import { useState } from "react";

export default function LoginBox({
  Icon,
  children,
  PlaceHolder,
  Type,
  setState,
  inputId,
  value
}) {
  const [hasFocus, setFocus] = useState(false);
  return (
    <>
      <div
        className={
          hasFocus
            ? "flex flex-row w-full shadow-lg border-b-4 border-transparent rounded-md"
            : "flex flex-row w-full border-b-4 rounded-md"
        }
      >
        <Icon />
        <div className="px-4 grow">
          <p className="text-xs font-semibold text-left w-full text-slate-400">
            {children}
          </p>
          <input
            className="w-full py-2 text-gray-700 focus:outline-none"
            id={inputId}
            type={Type}
            placeholder={PlaceHolder}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            onChange={(e) => setState(e.target.value)}
            value={value}
          />
        </div>
      </div>
    </>
  );
}
