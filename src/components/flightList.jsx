export const FlightList = ({
  itm,
  idx = 0,
  button = true,
  id = "",
  onSelect = () => {},
  hover = false,
  onBooking = () => {},
}) => {
  console.log(itm);
  return (
    <>
      <tr
        key={itm?._id || ""}
        className={hover ? `cursor-pointer` : ""}
        onClick={() => onSelect(id)}
      >
        <td>
          <div className={`mb-3 ${idx == 0 ? "mt-3" : ""} text-center`}>
            {itm?.logo ? (
              <img
                className="inline-block"
                src={itm?.logo}
                style={{
                  height: "25px",
                  width: "60px",
                  objectFit: "contain",
                }}
                alt={itm?.airline}
                title={itm?.airline}
              />
            ) : (
              <span
                style={{
                  fontSize: "13px",
                }}
              >
                {itm?.airline}
              </span>
            )}
          </div>
        </td>
        <td className={`text-center pb-3 ${idx == 0 ? "pt-3" : ""}`}>
          <span>{itm?.origin_city}</span>
          <span style={{ fontSize: "12px" }} className="block -mt-2">
            ({itm?.from_time})
          </span>
        </td>

        <td
          className={`text-center pl-10 w-[60%] pb-3 ${idx == 0 ? "pt-3" : ""}`}
        >
          <span style={{ fontSize: "11px" }} className={` text-gray-500`}>
            {itm?.number_of_connections > 0 ? (
              <>{itm?.number_of_connections} connecting flight</>
            ) : (
              <>Direct flight</>
            )}
          </span>
          <div className="border-b border-b-gray-300"></div>
          <span
            style={{ fontSize: "11px" }}
            className="
                          text-gray-500"
          >
            {itm?.total_travel_time}
          </span>
        </td>
        <td className={`text-center pb-3 ${idx == 0 ? "pt-3" : ""}`}>
          {itm?.destination_city}
          <span style={{ fontSize: "12px" }} className="block -mt-2">
            ({itm?.to_time})
          </span>
        </td>
        {button && (
          <>
            <td className={`text-center pb-3 ${idx == 0 ? "pt-3" : ""}`}>
              {itm?.price}
            </td>

            <td>
              <button
                onClick={() => onBooking(itm?._id)}
                className="bg-green-500 text-white px-4 py-1 hover:bg-green-800 rounded-full"
              >
                Select
              </button>
            </td>
          </>
        )}
      </tr>
    </>
  );
};
