import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function CircularIndeterminate() {
  return (
    <Box sx={{ display: "flex", marginLeft: "10px" }}>
      <CircularProgress size={22} className="!text-white" />
    </Box>
  );
}
