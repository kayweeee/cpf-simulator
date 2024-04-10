import SchemeTags from "../components/SchemeTags";
import { IoMdSearch } from "react-icons/io";

import SchemeFilter from "../components/SchemeFilter";
import { useEffect, useState } from "react";

export const getServerSideProps = async () => {
  // get all team members
  const res = await fetch("http://127.0.0.1:8000/user", { method: "GET" });

  const teamMembers = await res.json();

  // get all schemes
  const res2 = await fetch("http://127.0.0.1:8000/scheme", { method: "GET" });

  const allSchemes = await res2.json();

  return { props: { teamMembers, allSchemes } };
};

export default function MyTeam({ teamMembers, allSchemes }) {
  const tableCellStyle = `text-start py-2 px-3 border`;
  const [allTeamMembers, setAllTeamMembers] = useState(teamMembers);
  const [displayMembers, setDisplayMembers] = useState(teamMembers);
  const [schemeFilter, setSchemeFilter] = useState("All");

  useEffect(() => {
    if (schemeFilter === "All") {
      setDisplayMembers(allTeamMembers);
    } else {
      setDisplayMembers(
        allTeamMembers.filter((member) => member.schemes.includes(schemeFilter))
      );
    }
  }, [schemeFilter]);

  const updateTeamMembers = async () => {
    // get all team members
    const res = await fetch("http://127.0.0.1:8000/user", { method: "GET" });

    const teamMembers = await res.json();

    setAllTeamMembers(teamMembers);
  };

  return (
    <div className=" w-screen bg-light-green flex items-center justify-center p-4">
      <div className="bg-white min-w-full rounded-md p-6">
        <p className="font-bold">Team members</p>
        {/* Search bars */}
        <div className="flex flex-row justify-between">
          <div className="flex flex-row gap-3">
            <input
              className="bg-light-gray pl-3 pr-14 rounded-md py-1 "
              type="text"
              placeholder="Search by Name or Email"
            />
            <SchemeFilter
              schemeFilter={schemeFilter}
              setSchemeFilter={setSchemeFilter}
              allSchemes={allSchemes}
            />
          </div>
          <button className="text-white bg-dark-green px-4 rounded-md ">
            Edit
          </button>
        </div>

        {/* Table */}
        <table className=" w-full table-auto border border-collapse border-slate-200 mt-2">
          <thead>
            <tr>
              <th className={`${tableCellStyle} bg-dark-grey`}>Name</th>
              <th className={`${tableCellStyle} bg-dark-grey`}>Email</th>
              <th className={`${tableCellStyle} bg-dark-grey`}>Schemes</th>
            </tr>
          </thead>
          <tbody>
            {displayMembers.map((i, idx) => (
              <tr key={idx}>
                <td className={`${tableCellStyle}`}>{i.name}</td>
                <td className={`${tableCellStyle}`}>{i.email}</td>
                <td className={`${tableCellStyle}`}>
                  <SchemeTags
                    schemes={i.schemes}
                    allSchemes={allSchemes}
                    user_id={i.uuid}
                    updateTeamMembers={updateTeamMembers}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
