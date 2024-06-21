import React from "react";
import { Icon, Image, Statistic } from "semantic-ui-react";
import CountUp from "../../utils/CountUp";
const StatisticExampleEvenlyDivided = () => {
  var today = new Date();
  var year = today.getYear() - 114;
  return (
    <Statistic.Group widths="three" inverted size="tiny">
      <Statistic color="red" inverted>
        <Statistic.Value>
          +<CountUp balance={16000} set={true} />
        </Statistic.Value>
        <Statistic.Label className="farsi">بازیکن</Statistic.Label>
      </Statistic>

      <Statistic color="violet" inverted size="tiny">
        <Statistic.Value className="farsi">
          <CountUp balance={year} set={true} /> سال
        </Statistic.Value>
        <Statistic.Label className="farsi">سابقه فعالیت</Statistic.Label>
      </Statistic>

      <Statistic>
        <Statistic.Value className="farsi">
          <Icon name="gift" color="yellow" />
        </Statistic.Value>
        <Statistic.Label className="farsi">جوایز میلیاردی</Statistic.Label>
      </Statistic>
    </Statistic.Group>
  );
};

export default StatisticExampleEvenlyDivided;
