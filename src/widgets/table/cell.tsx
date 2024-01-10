import Box from "@mui/material/Box";
import { ReactNode } from "react";

export const Cell = 
  ({ children, onClick }: { children: ReactNode; onClick: () => void }) => {
    return (
      <Box
        onClick={onClick}
        sx={{
          padding: "5px",
          height: "30px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: children ? "#fca5a5" : "#bbf7d0",
          borderRadius: "3px",
        }}
      >
        {children}
      </Box>
    );
  };
