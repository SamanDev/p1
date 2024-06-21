import React, { Component } from "react";
import { Accordion, Icon, Label } from "semantic-ui-react";
import Comment from "./CashierList";
export default class AccordionExampleStandard extends Component {
  state = { activeIndex: -1 };

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  render() {
    const { activeIndex } = this.state;

    return (
      <Accordion inverted fluid className="mylist">
        <Accordion.Title
          active={activeIndex === 0}
          index={0}
          onClick={this.handleClick}
          style={{ padding: 0 }}
          className="cashlist"
        >
          <Label color="blue" size="mini">
            <Icon name="eye" className="cashlist" /> Info
          </Label>
        </Accordion.Title>
        <Accordion.Content className="cashlist" active={activeIndex === 0}>
          <Comment />
        </Accordion.Content>
      </Accordion>
    );
  }
}
