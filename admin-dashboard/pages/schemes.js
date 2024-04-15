// framework
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// components
import SchemeCard from "../components/SchemeCard";
// import isAuth from "../components/isAuth";

function Schemes() {
  const [schemes, setSchemes] = useState([]);
  const [editState, setEditState] = useState(false);

  const router = useRouter();

  useEffect(() => {
    async function getSchemes() {
      try {
        const res = await fetch(`http://127.0.0.1:8000/scheme`);

        const schemeData = await res.json();
        setSchemes(schemeData);
      } catch (e) {
        console.log(e);
      }
    }

    getSchemes();
  }, []);

  return (
    <div className="text-base">
      <div>
        {/* Header */}
        <div className="w-screen h-auto flex flex-row justify-between items-center px-20 pt-10 pb-10 text-black">
          <div className="font-bold text-3xl">Schemes Overview</div>
          {/* Add Scheme Button */}
          {editState ? (
            <div className="flex justify-end gap-3">
              <button
                className="bg-dark-green hover:bg-darker-green rounded-md hover:bg-dark-green-700 text-white py-2 px-4"
                onClick={() => router.push("/addscheme")}
              >
                Add Scheme
              </button>
              <button
                className="bg-dark-green hover:bg-darker-green rounded-md hover:bg-dark-green-700 text-white py-2 px-4"
                onClick={() => setEditState(false)}
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="flex justify-end gap-3">
              <button
                className="bg-dark-green hover:bg-darker-green rounded-md hover:bg-dark-green-700 text-white py-2 px-4"
                onClick={() => setEditState(true)}
              >
                Edit
              </button>{" "}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-y-5 ">
          <div className="flex flex-row flex-wrap px-20 justify-between gap-y-7 mb-12">
            {schemes.map((i) => (
              <SchemeCard
                key={i.scheme_name}
                scheme_name={i.scheme_name}
                scheme_img={i.scheme_admin_img_path}
                questions={i.questions.length}
                scheme_button={true}
                editState={editState}
                schemes={schemes}
                setSchemes={setSchemes}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Schemes;
