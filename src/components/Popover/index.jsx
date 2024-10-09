import { useState } from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";

export default function BasicPopover({ children, content }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <button className="flex items-center" type="button" onClick={handleClick}>
        {children}
      </button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Typography sx={{ p: 2 }}>{content}</Typography>
      </Popover>
    </div>
  );
}
