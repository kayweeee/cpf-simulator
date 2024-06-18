// framework
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// components
import SchemeCard from "../components/SchemeCard";
import isAuth from "../components/isAuth";
import DeleteModal from "../components/DeleteModal";

export const getServerSideProps = async () => {
  try {
    const res = await fetch("https://d17ygk7qno65io.cloudfront.net/scheme", {
      method: "GET",
    });

    const schemeData = await res.json();

    return { props: { initialSchemes: schemeData } };
  } catch (e) {
    console.error(e);
    return { props: { initialSchemes: [] } };
  }
};

function Schemes({ initialSchemes }) {
  const [schemes, setSchemes] = useState(initialSchemes);
  const [editState, setEditState] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  const router = useRouter();

  const handleDelete = async (scheme_name) => {
    try {
      const res = await fetch(`https://d17ygk7qno65io.cloudfront.net/scheme/${scheme_name}`, {
        method: "DELETE",
      });
      setSchemes(schemes.filter((i) => i.scheme_name != scheme_name));
      setDeleteId("");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="text-base">
      <div>
        {/* Header */}
        <div className="w-screen h-auto flex flex-row justify-between items-center px-20 pt-10 pb-10 text-black">
          <div className="font-bold text-3xl">Schemes Overview</div>
          {/* Add Scheme and Edit Buttons */}
          {schemes.length > 0 && (
            <div className="flex justify-end gap-3">
              {editState ? (
                <>
                  <button
                    className="bg-dark-green hover:bg-darker-green rounded-md text-white py-2 px-4"
                    onClick={() => router.push("/addscheme")}
                  >
                    Add Scheme
                  </button>
                  <button
                    className="bg-dark-green hover:bg-darker-green rounded-md text-white py-2 px-4"
                    onClick={() => setEditState(false)}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  className="bg-dark-green hover:bg-darker-green rounded-md text-white py-2 px-4"
                  onClick={() => setEditState(true)}
                >
                  Edit
                </button>
              )}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-y-5">
          <div className="flex flex-row flex-wrap px-20 justify-between gap-y-7 mb-12">
            {schemes.length > 0 ? (
              schemes.map((scheme) => (
                <SchemeCard
                  key={scheme.scheme_name}
                  scheme_name={scheme.scheme_name}
                  scheme_img={scheme.scheme_admin_img_path}
                  questions={scheme.questions.length}
                  scheme_button={true}
                  editState={editState}
                  schemes={schemes}
                  setSchemes={setSchemes}
                />
              ))
            ) : (
              <div className="w-full flex flex-col items-center justify-center text-center py-20">
                <div className="text-xl font-semibold text-gray-600 mb-4">
                  No Scheme Found
                </div>
                <button
                  className="bg-dark-green hover:bg-darker-green rounded-md text-white py-2 px-4"
                  onClick={() => router.push("/addscheme")}
                >
                  Add Scheme
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default isAuth(Schemes);
