import React from "react";
import { Table, Input } from "semantic-ui-react";
import CheckboxToggle from "./toggle";
import CurrencyInput from "react-currency-input-field";
import CartFormat from "../../../utils/CartFormat";
var moment = require("moment");
const headerRow = ["Name", "Value"];
function capitalizeTxt(txt, obj) {
  if (txt.indexOf("-") > -1) {
    return (
      <td key={obj.id}>
        <CartFormat row={obj} />
      </td>
    );
  } else {
    return (
      txt.replace("header", "").charAt(0).toUpperCase() +
      txt.replace("header", "").slice(1)
    ); //or if you want lowercase the rest txt.slice(1).toLowerCase();
  }
}

function getList(obj) {
  return obj[0];
}
const TableExampleWarningShorthand = (prop) => {
  function isDate(
    name,
    myDate,
    user,
    x,
    setActiveIndex,
    getwaysList,
    removeTabData,
    addTabData
  ) {
    var res = (
      <Input size="mini">
        <CurrencyInput
          id={"bonus" + name}
          name={name}
          onValueChange={(value, name) =>
            prop.updateUserObj(name, value, user, x)
          }
          defaultValue={myDate}
          allowDecimals={true}
          decimalsLimit={2}
        />
      </Input>
    );
    if (name == "header") {
      res = null;
    }
    if (name == "id") {
      res = <Input size="mini" disabled name={name} defaultValue={myDate} />;
    }
    if (
      name == "referUrl" ||
      name == "instagram" ||
      name == "telegramSupport" ||
      name == "telegramChanel"
    ) {
      res = (
        <Input
          size="mini"
          id={"bonus" + name}
          name={name}
          onChange={(value, name) => prop.updateUserObj(name, value, user, x)}
          defaultValue={myDate}
        />
      );
    }
    return res;
  }
  const renderBodyRow = ({ name, value, user, x, card }, i) => ({
    key: `row-${name + i}`,
    cells: [
      capitalizeTxt(name, card) || (
        <td key={`statusrow-${name + i}`}>
          <h1>{capitalizeTxt(value)}</h1>
        </td>
      ),
      typeof value == "boolean"
        ? {
            key: `statusrow-${name + i}`,
            content: (
              <span style={{ float: "right", height: 20 }}>
                <CheckboxToggle
                  check={value}
                  user={user}
                  userkey={name}
                  childid={getList(prop.data)[i].id}
                  onChange={prop.updateUserObj}
                />
              </span>
            ),
          }
        : {
            key: `statusrow-${i}`,
            width: 14,

            content: isDate(
              name,
              value,
              user,
              x,
              prop.setActiveIndex,
              prop.getwaysList,
              prop.removeTabData,
              prop.addTabData
            ),
          },
    ],
  });

  return (
    <Table
      striped
      color="red"
      unstackable
      renderBodyRow={renderBodyRow}
      className="farsi-inline"
      tableData={
        prop.data[0] || [
          { name: undefined, value: undefined, user: undefined, x: undefined },
        ]
      }
    />
  );
};

export default TableExampleWarningShorthand;
