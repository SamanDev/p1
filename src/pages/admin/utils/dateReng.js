import React, { useState } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

const Report = (prop) => {
  const [state, setState] = useState([
    {
      startDate: prop.startDate,
      endDate: prop.endDate,
      key: "selection",
    },
  ]);
  const handleChange = (selectedRows) => {
    prop.setStartDate(selectedRows.startDate);
    prop.setEndDate(selectedRows.endDate);
    prop.setFilterOk(true);
    setState([selectedRows]);
  };
  return (
    <DateRangePicker
      onChange={(item) => handleChange(item.selection)}
      showSelectionPreview={true}
      moveRangeOnFirstSelection={false}
      months={2}
      ranges={state}
      direction="horizontal"
    />
  );
};

export default Report;
