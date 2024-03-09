import { Dialog } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
export const ModalStatus = ({ open, onClose = () => {}, status }) => {
  return (
    <>
      <Dialog open={open}>
        <div className="bg-white px-8 py-4 rounded-lg text-center">
          <CheckCircleIcon
            sx={{
              fontSize: "80px",
              color: status == "delete" ? "red" : "#26b25b",
            }}
          />
          <span className="block mt-4">
            Your booking{" "}
            {status == "add"
              ? "added"
              : status == "update"
              ? "updated"
              : "deleted"}{" "}
            successfully!
          </span>
          <div className="text-center">
            <button
              onClick={() => onClose()}
              className="px-4 py-2 rounded-md mt-4 bg-blue-500 hover:bg-blue-800 text-white"
            >
              OK
            </button>
          </div>
        </div>
      </Dialog>
    </>
  );
};
