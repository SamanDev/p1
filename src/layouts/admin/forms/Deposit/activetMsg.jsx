import React, { useState } from "react";
import { Button, Message, Icon } from "semantic-ui-react";
import { resendActivationLink } from "../../../../services/auth";
import { MyToast } from "../../../../utils/myAlert";
import { Alert } from "../../../../utils/alerts";
const depositArea = (prop) => {
  const [loading, setLoading] = useState(false);
  const onSubmit = async () => {
    setLoading(true);
    try {
      const res = await resendActivationLink();
      if (res.status == 200) {
        setLoading(false);
      }
    } catch (error) {
      Alert("متاسفم...!", "متاسفانه مشکلی از سمت سرور رخ داده", "error");
    }
  };
  return (
    <>
      <Message color="red" compact className="mymessage" size="mini" icon>
        <Icon
          circular
          inverted
          color="black"
          name="mail outline"
          style={{ fontSize: 20 }}
        />

        <Message.Content className="farsi">
          برای استفاده از این سرویس ابتدا باید ایمیل خود را تایید نمایید.
        </Message.Content>
      </Message>
      <Button
        fluid
        style={{ margin: "10px 0" }}
        className="farsi"
        color="red"
        disabled={loading}
        loading={loading}
        onClick={() => onSubmit()}
      >
        ارسال لینک تایید
      </Button>
    </>
  );
};

export default depositArea;
