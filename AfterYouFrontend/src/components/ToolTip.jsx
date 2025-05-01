// Tooltip.jsx
import React from 'react';
import '../style/ToolTip.css';
const Tooltip = ({ text, position }) => {
  return (
    <div className={`tooltip tooltip-${position}`}>
      {text}
    </div>
  );
};

export default Tooltip;
