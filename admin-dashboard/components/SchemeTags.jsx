import { useEffect, useState } from "react";

export default function SchemeTags({
  schemes,
  allSchemes,
  user_id,
  updateTeamMembers,
  editState,
}) {
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState([...schemes].sort());

  useEffect(() => {
    setChecked([...schemes].sort());
  }, [schemes]);

  // update backend
  useEffect(() => {
    const updateSchemeBackend = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:8000/scheme/${user_id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id: user_id, schemesList: checked }),
        });
      } catch (e) {
        console.log(e);
      }
    };

    updateSchemeBackend();
    updateTeamMembers();
  }, [checked]);

  const handleCheckboxChange = async (event) => {
    const isChecked = event.target.checked;
    const schemeName = event.target.value;

    // update state
    if (isChecked) {
      setChecked([...checked, schemeName].sort());
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
      {checked.map((name, idx) => (
        <SchemeTag key={idx} schemeName={name} />
      ))}

      {/* Add new schemes */}

      {editState ? (
        <div className="relative">
          <button
            className={`flex justify-center items-center bg-light-blue px-2 py-1 text-dark-blue rounded-t-lg ${
              open ? "rounded-b-none" : "rounded-b-lg"
            }`}
            onClick={() => setOpen(!open)}
          >
            + Add Scheme
          </button>

          {/* dropdown options */}
          {open ? (
            <div className="z-10 bg-light-blue absolute top-6 rounded-b-lg w-full p-2">
              <ul className="space-y-3">
                {allSchemes.map((scheme) => (
                  <li key={scheme} className="flex items-center w-full gap-2">
                    <input
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
      ) : null}
    </div>
  );
}
