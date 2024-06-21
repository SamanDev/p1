import React from "react";
import { Form, TextArea } from "semantic-ui-react";

const TextAreaExampleMinHeight = (prop) => (
  <Form>
    <TextArea {...prop} style={{ minHeight: 100 }} />
  </Form>
);

export default TextAreaExampleMinHeight;
