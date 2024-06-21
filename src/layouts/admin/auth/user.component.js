import React, { useState, useEffect } from "react";
import { Button, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { haveAdmin, haveModerator } from "../../../const";
import MenuLoader from "../../../utils/menuLoader";
import Balance from "./userbalance";
import { publicUserInfo } from "../../../services/public";

const depositArea = (prop) => {
  const [data, setData] = useState([]);
  const loginToken = prop.loginToken;

  const [loading, setLoading] = useState(true);
  const handleGetReports = async () => {
    try {
      setLoading(true);
      const res = await publicUserInfo(prop.username);
      if (res.status === 200) {
        setData(res.data);
        setLoading(false);
      }
    } catch (error) {
      //console.log(error.message);
    } finally {
    }
  };

  useEffect(() => {
    handleGetReports();
  }, []);

  var totalReward = 0;
  if (loading) {
    return (
      <>
        <Segment
          inverted
          padded="very"
          className="fadeoutend"
          style={{
            paddingBottom: 50,
            boxShadow: "0 40px 50px rgba(81,88,95,.6549019607843137)",
          }}
        >
          <MenuLoader />
        </Segment>
      </>
    );
  } else {
    return (
      <>
        <Segment
          inverted
          style={{
            paddingBottom: 100,
            boxShadow: "0 40px 50px rgba(81,88,95,.6549019607843137)",
            lineHeight: "130%",
          }}
        >
          {!loginToken?.logout && (
            <>
              {(haveAdmin(loginToken?.roles) ||
                haveModerator(loginToken?.roles)) && (
                <Button
                  as={Link}
                  to={"/admin/" + data.username}
                  target="_blank"
                  color="red"
                >
                  Open Profile
                </Button>
              )}
            </>
          )}

          <Balance data={data} {...prop} />
        </Segment>
      </>
    );
  }
};

export default depositArea;
