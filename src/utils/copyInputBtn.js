import React, { useState } from "react";
import { Icon, Button } from "semantic-ui-react";
import { CopyToClipboard } from "react-copy-to-clipboard";

const depositArea = (prop) => {
  const [copy, setCopy] = useState(false);

  const copyDo = () => {
    setCopy(true);
    setTimeout(() => {
      setCopy(false);
    }, 3000);
  };

  return (
    <CopyToClipboard text={prop.text} onCopy={() => copyDo()}>
      <Button
        icon
        size="mini"
        color={copy ? "green" : "black"}
        type="button"
        className="farsi"
        style={{
          position: "absolute",
          zIndex: 3,
          marginTop: 1,
          marginLeft: 1,
        }}
      >
        {!copy ? (
          <>
            <Icon name="copy outline" /> کپی
          </>
        ) : (
          <>
            <Icon name="check" /> کپی
          </>
        )}
      </Button>
    </CopyToClipboard>
  );
};

export default depositArea;
