export default function Footer() {
  // api call for scheme names
  const scheme_names = ["Retirement", "Housing", "Medisave"];

  return (
    <div className="bg-dark-green text-white w-screen h-1/5 text-xs flex flex-row justify-between px-16 py-5">
      <div>CCU’s Training Simulator</div>
      <div className="flex flex-row w-1/3 justify-between">
        <div>
          <div className="font-bold pb-5">Schemes</div>
          <div className="flex flex-col gap-y-1">
            {scheme_names.map((i, idx) => (
              <p key={idx}>{i}</p>
            ))}
          </div>
        </div>
        <div>
          <div className="font-bold pb-5">Products</div>
          <div className="flex flex-col gap-y-1">
            <p>Home</p>
            <p>Schemes</p>
            <p>FAQ</p>
          </div>
        </div>
      </div>
    </div>
  );
}
