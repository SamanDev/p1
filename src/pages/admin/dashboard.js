import React, { useEffect, useState } from 'react'
import { ButtonGroup, Button, GridRow, GridColumn, Grid, Menu, Segment, Header } from 'semantic-ui-react'
import Chart from "./utils/ChartPie";
import UserList from "./utils/UserList";
import RunnerList from "./utils/runnerList";
import WinnerList from "./utils/winnerList";
import ChartIncome from "./utils/ChartPieIncome";
const GridExampleTextAlignmentCenter = (prop) => {
  const [data, setData] = useState([1, 0]);
  const [load, setLoad] = useState(false);
  const handlePerRowsChange = (newPerPage) => {
    setData(newPerPage);

  };

  return (
    <Segment inverted>
      <ButtonGroup style={{ display: 'none' }}>
        <Button onClick={() => { handlePerRowsChange([1, 0]) }} >One</Button>
        <Button onClick={() => { handlePerRowsChange([2, 1]) }}>Two</Button>
        <Button onClick={() => { setLoad(!load) }}>Three</Button>
      </ButtonGroup>
      <Grid textAlign='center' columns={3}>
        <GridRow>
          <GridColumn>
            <Header as='h2' attached='top' inverted color='green'>
              Deposits
            </Header>
            <Segment color='green' attached>
              <Chart mode="Deposit" day={data[0]} />



              <Chart mode="Deposit" day={data[1]} />
            </Segment>
          </GridColumn>
          <GridColumn>
            <Header as='h2' attached='top' inverted color='red'>
              Cashouts
            </Header>
            <Segment color='red' attached>

              <Chart mode="Cashout" day={data[0]} />



              <Chart mode="Cashout" day={data[1]} /></Segment>
          </GridColumn>
          <GridColumn>
            <Header as='h2' attached='top' inverted color='pink'>
              PokerRakes
            </Header>
            <Segment color='pink' attached>

              <ChartIncome mode="Income" day={data[0]} />



              <ChartIncome mode="Income" day={data[1]} /></Segment>
          </GridColumn>
        </GridRow>
      </Grid>
      <Grid textAlign='center' columns={3}>
        <GridRow>
          <GridColumn>
            <Header as='h2' attached='top' inverted color='blue'>
              Leaders
            </Header>
            <Segment inverted size='tiny' attached className="leadr" style={{height:300}}>
              <UserList  {...prop} />
            </Segment>
          </GridColumn>
          <GridColumn>
            <Header as='h2' attached='top' inverted color='teal' onClick={() => prop.addMainTabData("Runner")}>
              Runners
            </Header>
            <Segment  attached inverted  className="leadr" style={{height:300}}>
            <RunnerList  {...prop} search="refer"
              searchValue={"Runner"} />
             </Segment>
          </GridColumn>
          <GridColumn>
            <Header as='h2' attached='top' inverted color='purple'  onClick={() => prop.addMainTabData("Winners")}>
            WinnerList
            </Header>
            <Segment  attached inverted  className="leadr" style={{height:300}}>
            <WinnerList  {...prop} search="refer"
              searchValue={"Runner"} />
             </Segment>
            
          </GridColumn>
        </GridRow>
      </Grid>
      </Segment>
  )
}

export default GridExampleTextAlignmentCenter