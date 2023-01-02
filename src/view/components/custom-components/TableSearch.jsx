import { Input } from "antd";
import React from "react";

const TableSearch = ({
  setTableData,
  data,

  /**
   * array of string or object represents column for the string and mapping
   * converted data
   *
   * ex:
   * ['name', 'status']
   * ['name', {column: column-name, mapped:{origin: originData, mapped: mappedData}}]
   */
  filteredColumn,
}) => {
  const userSearch = async (input) => {
    if (input == "") return setTableData(await data);
    const filteredData = await data.filter((d) => {
      const filtered = { ...d };
      let result = false;

      if (!filteredColumn) {
        const result = Object.entries(filtered).reduce((result, current) => {
          if (current[0] == "id") {
            return result;
          }

          let comparator = false;
          if (typeof current[1] == "string")
            comparator = current[1].toLowerCase().match(input.toLowerCase());
          else comparator = current[1] == input;

          return result || comparator;
        }, false);

        return result;
      }

      filteredColumn.forEach((c) => {
        if (typeof filtered[c] == "string")
          result =
            result || filtered[c].toLowerCase().match(input.toLowerCase());
        else if (typeof c == "object") {
          Object.keys(c.mapped).forEach((key) => {
            if (filtered[c.column] == key) filtered[c.column] = c.mapped[key];
          });

          if (typeof filtered[c.column] == "string")
            result =
              result ||
              filtered[c.column].toLowerCase().match(input.toLowerCase());
          else result = result || filtered[c] == input;
        } else result = result || filtered[c] == input;
      });

      return result;
    });
    setTableData(filteredData);
  };

  return (
    <Input
      placeholder="Search..."
      style={{ height: "35px" }}
      onChange={(value) => userSearch(value.target.value)}
    />
  );
};

export default TableSearch;
