import React, { useState, useRef, useEffect } from "react";
import { Tooltip, useMediaQuery, Zoom } from "@mui/material";

export default function WithTooltip({ tooltipContent, children }) {
  const [open, setOpen] = useState(false);
  const tooltipRef = useRef(null);
  const closeTimeout = useRef(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const startCloseTimeout = (time) => {
    // Start a timeout to auto-close the tooltip after 1 second
    let timeout;
    if (time) {
      timeout = time;
    } else {
      timeout = 1000;
    }

    closeTimeout.current = setTimeout(() => {
      if (!tooltipRef.current.contains(document.activeElement)) {
        handleTooltipClose();
      }
    }, timeout); // 1 second delay
  };

  const handleTooltipOpen = () => {
    setOpen(true);
    startCloseTimeout();
  };

  const handleTooltipClose = () => {
    clearTimeout(closeTimeout.current);
    setOpen(false);
  };

  const handleMouseEnterTooltip = () => {
    // Clear the timeout when mouse enters the tooltip content
    clearTimeout(closeTimeout.current);
  };

  const handleMouseLeaveTooltip = () => {
    // Start the close timeout when mouse leaves the tooltip content
    startCloseTimeout(500);
  };

  // Clean up the timeout when the component unmounts
  useEffect(() => {
    return () => clearTimeout(closeTimeout.current);
  }, []);

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      handleTooltipOpen();
    }
  };

  return (
    <div>
      <div onClick={handleTooltipOpen} onKeyDown={handleKeyDown} tabIndex={0}>
        {
          children /** This is the component on which you are displaying the popover */
        }
      </div>
      <Tooltip
        title={
          /** The tooltipContent is what is displayed inside the popover box */
          <div
            ref={tooltipRef}
            onMouseEnter={handleMouseEnterTooltip}
            onMouseLeave={handleMouseLeaveTooltip}
            style={{ width: isMobile ? "350px" : "650px" }}
          >
            {tooltipContent}
          </div>
        }
        open={open}
        onClose={handleTooltipClose}
        TransitionComponent={Zoom}
        arrow
        PopperProps={{ sx: { zIndex: 0 } }}
        componentsProps={{
          tooltip: { sx: { bgcolor: "transparent", boxShadow: "none" } },
        }}
        disableFocusListener
        disableHoverListener
        disableTouchListener
        placement="bottom-start"
      >
        <div />
      </Tooltip>
    </div>
  );
}
