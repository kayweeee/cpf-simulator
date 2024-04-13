// framework
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
//components
import SchemeTags from "../components/SchemeTags";
import SchemeFilter from "../components/SchemeFilter";
import SearchBar from "../components/SearchBar";
// icons
import { FaRegTrashCan } from "react-icons/fa6";

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

export default function MyTeam({ teamMembers, allSchemes }) {
  const tableCellStyle = `text-start py-2 px-3 border`;
  const router = useRouter();

  const [allTeamMembers, setAllTeamMembers] = useState(teamMembers);
  const [displayMembers, setDisplayMembers] = useState(teamMembers);
  // edit state?
  const [editState, setEditState] = useState(false);
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
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className=" w-screen bg-light-green flex items-center justify-center p-4">
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
                className="text-white bg-dark-green px-4 rounded-md "
                onClick={() => router.push("/addprofile")}
              >
                Add new profile
              </button>
              <button
                className="text-white bg-dark-green px-4 rounded-md "
                onClick={() => setEditState(false)}
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              className="text-white bg-dark-green px-4 rounded-md "
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
                        onClick={() => handleDelete(i.uuid)}
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
