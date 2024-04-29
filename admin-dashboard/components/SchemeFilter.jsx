import { useState } from "react";
import { FaCaretDown } from "react-icons/fa";

export default function SchemeFilter({
  schemeFilter,
  setSchemeFilter,
  allSchemes,
}) {
  const [open, setOpen] = useState(false);
  const handleCheckboxChange = async (event) => {
    const inputValue = event.target.value;

    setSchemeFilter(inputValue);
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        className={`flex flex-row items-center justify-between bg-light-gray w-32 rounded-md py-1 px-3 ${
          open ? "rounded-b-none" : "rounded-b-lg"
        }`}
        onClick={() => setOpen(!open)}
      >
        <div>{schemeFilter}</div>
        <div>
          <FaCaretDown />
        </div>
      </button>
      {open ? (
        <div className="z-10 bg-light-gray absolute top-6 rounded-b-lg w-full p-4">
          <ul className="space-y-3">
            <li className="flex items-center w-full gap-2">
              <button
                value="All"
                className="w-4 h-4"
                onClick={handleCheckboxChange}
              >
                All
              </button>
            </li>
            {allSchemes.map((scheme) => (
              <li key={scheme} className="flex items-center w-full gap-2">
                <button
                  value={scheme}
                  className="w-4 h-4"
                  onClick={handleCheckboxChange}
                >
                  {scheme}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
