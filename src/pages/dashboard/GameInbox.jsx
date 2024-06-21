import React from "react";

import { Link } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import { gameDataMain } from "../../const";
import GameBox from "../../utils/GameBox";

const GameInbox = (prop) => {
  return (
    <>
      <Grid
        centered
        reversed="computer tablet mobile"
        columns="equal"
        style={{ zIndex: 10, position: "relative" }}
      >
        <Grid.Row columns={2}>
          <Grid.Column
            mobile={8}
            tablet={8}
            computer={8}
            as={Link}
            to={"/games/" + gameDataMain[0]}
            id={"open" + gameDataMain[0]}
          >
            <GameBox
              game={gameDataMain[0]}
              trigger="loop"
              height="130px"
              stroke="10"
            />
          </Grid.Column>
          <Grid.Column
            mobile={8}
            tablet={8}
            computer={8}
            as={Link}
            to={"/games/" + gameDataMain[1]}
            id={"open" + gameDataMain[1]}
            only="tablet computer"
          >
            <GameBox
              game={gameDataMain[1]}
              trigger="loop"
              height="130px"
              stroke="10"
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
};

export default GameInbox;
