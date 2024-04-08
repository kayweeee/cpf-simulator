import SchemeTags from "../components/SchemeTags";

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

  return (
    <div className=" w-screen bg-light-green flex items-center justify-center p-4">
      <div className="bg-white min-w-full rounded-md p-6">
        Team members
        {/* Search bars */}
        <div className="flex flex-row">
          <input type="text" placeholder="Search by Name or Email" />
          <button className="text-white bg-dark-green ">Edit</button>
        </div>
        {/* Table */}
        <table className=" w-full table-auto border border-collapse border-slate-200">
          <thead>
            <tr>
              <th className={`${tableCellStyle}`}>Name</th>
              <th className={`${tableCellStyle}`}>Email</th>
              <th className={`${tableCellStyle}`}>Schemes</th>
            </tr>
          </thead>

          <tbody>
            {teamMembers.map((i) => (
              <tr>
                <td className={`${tableCellStyle}`}>{i.name}</td>
                <td className={`${tableCellStyle}`}>{i.email}</td>
                <td className={`${tableCellStyle}`}>
                  <SchemeTags schemes={i.schemes} allSchemes={allSchemes} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
