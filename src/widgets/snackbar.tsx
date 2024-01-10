import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";

export default function SimpleSnackbar({
  open,
  message = "This is an error message!",
  onClose,
}: {
  open: boolean;
  onClose: () => void;
  message?: string;
}) {
  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={open}
        onClose={onClose}
        autoHideDuration={4000}
        message="Note archived"
        key="bottomRight"
      >
        <Alert variant="filled" severity="error">
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
