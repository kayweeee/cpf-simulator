import { useState } from "react";

export default function SchemeTags({ schemes, allSchemes }) {
  const [open, setOpen] = useState(true);

  const [checked, setChecked] = useState([...schemes]);

  const handleCheckboxChange = (event) => {
    const isChecked = event.target.checked;
    const schemeName = event.target.value;

    if (isChecked) {
      setChecked([...checked, schemeName]);
    } else {
      setChecked(checked.filter((name) => name !== schemeName));
    }
  };

  const SchemeTag = ({ schemeName }) => {
    return (
      <div className="flex justify-center items-center bg-light-blue px-2 py-1 rounded-lg text-dark-blue">
        {schemeName}
      </div>
    );
  };

  return (
    <div className="flex flex-row flex-wrap px-2 py-1 gap-2">
      {checked.map((name) => (
        <SchemeTag schemeName={name} />
      ))}

      {/* Add new schemes */}
      <div className="relative">
        <button
          className={`flex justify-center items-center bg-light-blue px-2 py-1 text-dark-blue rounded-t-lg ${
            open ? "rounded-b-none" : "rounded-b-lg"
          }`}
          onClick={() => setOpen(!open)}
        >
          + Add Scheme
        </button>
        {open ? (
          <div className="bg-light-blue absolute top-6 rounded-b-lg w-full p-2">
            <ul className="space-y-3">
              {allSchemes.map((scheme) => (
                <li className="flex items-center w-full gap-2">
                  <input
                    id={scheme}
                    type="checkbox"
                    value={scheme}
                    className="w-4 h-4"
                    checked={checked.includes(scheme)}
                    onChange={handleCheckboxChange}
                  />
                  <label>{scheme}</label>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
}
