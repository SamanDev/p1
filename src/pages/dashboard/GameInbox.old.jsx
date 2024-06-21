import React from "react";

import { Link } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import { gameDataMain } from "../../const";
import GameBox from "../../utils/GameBox";

const GameInbox = (prop) => {
  return (
    <>
      <Grid centered reversed="computer tablet mobile" columns="equal">
        <Grid.Row columns={3}>
          <Grid.Column
            mobile={9}
            tablet={6}
            computer={6}
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
            tablet={6}
            computer={6}
            as={Link}
            to={"/games/" + gameDataMain[1]}
            id={"open" + gameDataMain[1]}
            only="tablet computer"
          >
            <GameBox
              game={gameDataMain[1]}
              trigger="boomerang"
              height="130px"
              stroke="10"
            />
          </Grid.Column>
          <Grid.Column
            computer={4}
            tablet={4}
            mobile={7}
            onClick={() => {
              prop.openPanel(".games");
            }}
          >
            <GameBox game="more" height="130px" />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
};

export default GameInbox;
