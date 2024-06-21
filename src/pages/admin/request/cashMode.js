import React, { Component } from "react";
import { Form, Radio } from "semantic-ui-react";

class RadioExampleRadioGroup extends Component {
  state = { value: this.props.formik.values.mode };

  handleChange = (e, { value }) => {
    console.log(this.props);
    this.setState({ value });
    this.props.formik.setFieldValue("mode", value);
  };

  render() {
    return (
      <Form>
        <Form.Field>
          Mode: <b>{this.state.value}</b>
        </Form.Field>
        <Form.Field>
          <Radio
            label="Cart to Cart"
            name="radioGroup"
            value="CartToCart"
            checked={this.state.value === "CartToCart"}
            onChange={this.handleChange}
          />
        </Form.Field>
        <Form.Field>
          <Radio
            label="Visa Gift Code"
            name="radioGroup"
            value="VisaGiftCode"
            checked={this.state.value === "VisaGiftCode"}
            onChange={this.handleChange}
          />
        </Form.Field>
      </Form>
    );
  }
}
export default (props) => {
  return <RadioExampleRadioGroup {...props} />;
};
