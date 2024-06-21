import React, { useEffect, useState, useContext } from "react";
import { Button, Form } from "semantic-ui-react";

import Swal from "sweetalert2";

import { notification } from "../../../services/admin";

function Admin(prop) {
  const [cashUser, setCashUser] = React.useState(prop.user?.username);
  const [cashLoad, setCashLoad] = React.useState(false);

  const [notMessage, setNotMessage] = React.useState("");

  const setNotMessageVal = (e) => {
    setNotMessage(e.target.value);
  };
  const sendNot = (e, data) => {
    if (notMessage == "") {
      return false;
    }
    setCashLoad(true);
    notification(cashUser, cashUser + " عزیز", notMessage, "").then(
      (response) => {
        if (response) {
          Swal.fire({
            title: "Success",
            text: "Saved",
            icon: "success",
            showCancelButton: false,
            confirmButtonText: `Ok`,
          }).then(() => {
            setCashLoad(false);
          });
        }
      }
    );
  };
  return (
    <>
      <Form>
        <Form.Field>
          <label>UserName: {cashUser}</label>
        </Form.Field>

        <Form.Field>
          <label>Meessage</label>
          <input value={notMessage} onChange={setNotMessageVal} />
        </Form.Field>
        <Button
          type="submit"
          loading={cashLoad}
          disabled={cashLoad}
          color="red"
          fluid
          onClick={sendNot}
          style={{ marginTop: 20 }}
        >
          Send
        </Button>
      </Form>
    </>
  );
}

export default Admin;
