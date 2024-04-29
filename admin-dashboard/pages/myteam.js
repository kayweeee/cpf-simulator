// framework
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
//components
import SchemeTags from "../components/SchemeTags";
import SchemeFilter from "../components/SchemeFilter";
import SearchBar from "../components/SearchBar";
import isAuth from "../components/isAuth";
// icons
import { FaRegTrashCan } from "react-icons/fa6";
import DeleteModal from "../components/DeleteModal";

export const getServerSideProps = async () => {
  // get all team members
  const res = await fetch("http://127.0.0.1:8000/user", { method: "GET" });

  const teamMembers = await res.json();

  // get all schemes
  const res2 = await fetch("http://127.0.0.1:8000/distinct/scheme", {
    method: "GET",
  });

  const allSchemes = await res2.json();

  return { props: { teamMembers, allSchemes } };
};

function MyTeam({ teamMembers, allSchemes }) {
  const router = useRouter();

  // styles
  const tableCellStyle = `text-start py-2 px-3 border`;

  // states
  const [allTeamMembers, setAllTeamMembers] = useState(teamMembers);
  const [displayMembers, setDisplayMembers] = useState(teamMembers);
  const [editState, setEditState] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  // for filtering
  const [schemeFilter, setSchemeFilter] = useState("All");
  const [search, setSearch] = useState("");

  // for filtering
  useEffect(() => {
    if (schemeFilter === "All") {
      setDisplayMembers(allTeamMembers);
    } else {
      setDisplayMembers(
        allTeamMembers.filter((member) => member.schemes.includes(schemeFilter))
      );
    }

    if (search !== "") {
      setDisplayMembers((prevDisplayMembers) =>
        prevDisplayMembers.filter(
          (member) =>
            member.name.toLowerCase().includes(search) ||
            member.email.toLowerCase().includes(search)
        )
      );
    } else {
      setDisplayMembers((prevDisplayMembers) => prevDisplayMembers);
    }
  }, [schemeFilter, search]);

  const updateTeamMembers = async () => {
    // get all team members
    const res = await fetch("http://127.0.0.1:8000/user", { method: "GET" });

    const teamMembers = await res.json();

    setAllTeamMembers(teamMembers);
  };

  async function handleDelete(user_id) {
    try {
      const res = await fetch(`http://127.0.0.1:8000/user/${user_id}`, {
        method: "DELETE",
        body: JSON.stringify({ user_id: user_id }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res) {
        setAllTeamMembers(
          allTeamMembers.filter((member) => member.uuid !== user_id)
        );
        setDisplayMembers(
          displayMembers.filter((member) => member.uuid !== user_id)
        );
      }
      // close modal
      setDeleteId("");
    } catch (e) {
      console.log(e);
    }
  }

  function handleNav(id) {
    router.push(`/${id}/profile`, undefined, { shallow: true });
  }

  return (
    <div className=" w-screen bg-light-green flex items-center justify-center p-4 relative">
      {/* for delete modal */}
      {deleteId == "" ? null : (
        <>
          <DeleteModal
            id={deleteId}
            setId={setDeleteId}
            text={allTeamMembers
              .filter((member) => member.uuid == deleteId)
              .map((i) => i.name)}
            handleDelete={handleDelete}
          />
          <div className="w-screen bg-gray-500/50 h-screen absolute z-30" />
        </>
      )}

      {/* page content */}
      <div className="bg-white min-w-full rounded-md p-6">
        <p className="font-bold">Team members</p>
        {/* Search bars */}
        <div className="flex flex-row justify-between">
          <div className="flex flex-row gap-3">
            <SearchBar setSearch={setSearch} />
            <SchemeFilter
              schemeFilter={schemeFilter}
              setSchemeFilter={setSchemeFilter}
              allSchemes={allSchemes}
            />
          </div>
          {editState ? (
            <div className="flex flex-row gap-2">
              <button
                className="text-white bg-dark-green hover:bg-darker-green px-4 rounded-md "
                onClick={() => router.push("/addprofile")}
              >
                Add new profile
              </button>
              <button
                className="text-white bg-dark-green hover:bg-darker-green px-4 rounded-md "
                onClick={() => setEditState(false)}
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              className="text-white bg-dark-green hover:bg-darker-green px-4 rounded-md "
              onClick={() => setEditState(true)}
            >
              Edit
            </button>
          )}
        </div>

        {/* Table */}
        <table className=" w-full table-fixed border border-collapse border-slate-200 mt-2">
          <thead>
            <tr>
              <th className={`${tableCellStyle} bg-dark-grey `}>Name</th>
              <th className={`${tableCellStyle} bg-dark-grey`}>Email</th>
              <th className={`${tableCellStyle} bg-dark-grey w-1/6`}>Access</th>

              <th className={`${tableCellStyle} bg-dark-grey w-1/3`}>
                Schemes
              </th>
              <th className="w-[0px] p-0" />
            </tr>
          </thead>
          <tbody>
            {displayMembers.map((i, idx) => (
              <tr
                className=" hover:bg-light-gray hover:cursor-pointer"
                key={idx}
              >
                <td
                  className={`${tableCellStyle} hover:underline hover:underline-offset-2`}
                  onClick={() => handleNav(i.uuid)}
                >
                  {i.name}
                </td>
                <td className={`${tableCellStyle}`}>{i.email}</td>
                <td className={`${tableCellStyle}`}>{i.access_rights}</td>
                <td className={`${tableCellStyle}`}>
                  <SchemeTags
                    schemes={i.schemes}
                    allSchemes={allSchemes}
                    user_id={i.uuid}
                    updateTeamMembers={updateTeamMembers}
                    editState={editState}
                  />
                </td>
                <td>
                  {editState ? (
                    <button className="flex items-center">
                      <FaRegTrashCan
                        className=" text-red-500 ml-0.5"
                        onClick={() => setDeleteId(i.uuid)}
                      />
                    </button>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default isAuth(MyTeam);
