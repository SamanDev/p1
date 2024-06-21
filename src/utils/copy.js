import React, { useState, useEffect } from "react";
import { Popup, Label } from "semantic-ui-react";
import Swal from "sweetalert2";
import { CopyToClipboard } from "react-copy-to-clipboard";
const Toast = Swal.mixin({
  toast: false,
  position: "center",
  showConfirmButton: false,
  timer: 1000,
  timerProgressBar: false,
});

function copyText(prop) {
  const [item, setItem] = useState(prop.text);
  const [myID, setMyID] = useState(prop.myid);
  const [alter, setAlter] = useState(prop.alter);
  const [size, setSize] = useState(prop.size);
  const [copy, setCopy] = useState(false);

  const copyDo = () => {
    setCopy(true);

    setTimeout(() => {
      setCopy(false);
    }, 3000);
  };

  useEffect(() => {
    setItem(prop.text);
  }, [prop.text]);
  useEffect(() => {
    setMyID(prop.myid);
  }, [prop.myid]);
  useEffect(() => {
    setSize(prop.size);
  }, [prop.size]);
  useEffect(() => {
    setAlter(prop.alter);
  }, [prop.alter]);
  if (item) {
    return (
      <CopyToClipboard text={item} onCopy={() => copyDo()}>
        <Label
          color={copy ? "green" : prop.color}
          style={{
            width: "100%",
            textAlign: "center",
            marginBottom: 5,
            cursor: "pointer",
          }}
        >
          {item}
          {alter && <Label.Detail>{alter}</Label.Detail>}
        </Label>
      </CopyToClipboard>
    );
  } else {
    return (
      <Popup
        content="Copy to Clipboard"
        {...prop}
        position="top center"
        trigger={
          <div
            {...prop}
            style={{ paddingLeft: 0, paddingRight: 0, paddingBottom: 0 }}
            onClick={() => copyDo(myID)}
          >
            {myID}
          </div>
        }
      />
    );
  }
}

export default copyText;
