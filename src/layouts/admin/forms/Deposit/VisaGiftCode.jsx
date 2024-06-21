import React, { useState } from "react";
import DepositButton from "../../input/DepositButton";

import FormikControl from "../../../../components/form/FormikControl";
import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Alert } from "../../../../utils/alerts";
import { cashierService } from "../../../../services/cashier";
import MyMsg from "../../../../utils/MsgDesc";
const initialValues = {
  voucherCode: "",
};
const validationSchema = Yup.object({
  voucherCode: Yup.string()
    .required("لطفا این فیلد را وارد کنید.")
    .min(8, "لطفا این فیلد را درست وارد کنید."),
});
const onSubmit = async (values, submitMethods, navigate, prop) => {
  try {
    const res = await cashierService(values, "visaGiftCodeVoucher", "");
    if (res.status == 200) {
      Alert("Done", res.data?.message, "success");
    } else {
      Alert("متاسفم...!", res.data, "error");
    }
    submitMethods.setSubmitting(false);
  } catch (error) {
    submitMethods.setSubmitting(false);

    Alert("متاسفم...!", error.response.data, "error");
  }
};

const depositArea = (prop) => {
  const [depMode, setDepMode] = useState(false);
  const navigate = useNavigate();
  const loginToken = prop.loginToken;
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, submitMethods) =>
        onSubmit(values, submitMethods, navigate, prop)
      }
      validationSchema={validationSchema}
    >
      {(formik) => {
        return (
          <Form>
            {loginToken?.level >= 7 && (
              <>
                <MyMsg
                  icon="num"
                  num=""
                  color="yellow"
                  size="mini"
                  text={
                    <>
                      <p>
                        برای استفاده از این سرویس کافیست ویزا گیفت کد تهیه
                        نمایید.
                      </p>
                      <p>
                        برای راحتی شما عزیزان چند سایت فروشنده ویزا گیفت کد در
                        زیر معرفی شده است.
                      </p>
                      <p>
                        {" "}
                        شما براحتی می توانید با استفاده از درگاه آنلاین سایت های
                        فروشنده تا سقف 50 میلیون تومان گیفت کد خریداری کرده و با
                        وارد کردن کد دریافت شده از فروشنده در سایت بلافاصله چیپ
                        دریافت کنید.
                      </p>
                      <p>نیاز به احراز هویت فقط برای اولین خرید</p>
                    </>
                  }
                />
                <MyMsg
                  icon="num"
                  num=""
                  color="red"
                  size="mini"
                  text={
                    <>
                      <p>
                        فروشنده شماره یک:{" "}
                        <a
                          href="http://asanarz.net"
                          target="_blank"
                          className="pull-left"
                          style={{ fontSize: 15 }}
                        >
                          AsanArz.Net
                        </a>
                      </p>
                    </>
                  }
                />
              </>
            )}

            <FormikControl
              formik={formik}
              control="input"
              type="text"
              name="voucherCode"
              label="Visa Gift Code"
              labelcolor={prop.labelcolor}
              size={prop.size}
              autoComplete="off"
            />
            <DepositButton
              {...prop}
              disabled={formik.isSubmitting}
              loading={formik.isSubmitting}
            />
          </Form>
        );
      }}
    </Formik>
  );
};

export default depositArea;
