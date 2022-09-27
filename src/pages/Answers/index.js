import React from "react";
import * as yup from "yup";

import { Column, Img, Row, Text, Input, Button, Line, Grid } from "components";
import { useNavigate } from "react-router-dom";
import {
  getUsersdetails,
  getUserAnswers,
  getMultiplequestions,
} from "service/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useForm from "hooks/useForm";
import moment from "moment";
import { AnswerModal } from "modals/Answers_Popup";

const AnswersPage = () => {
  const [apiData, setapiData] = React.useState();
  const [apiData2, setapiData2] = React.useState();
  const [questionID, setquestionID] = React.useState();
  const [answersIds, setanswersIds] = React.useState();
  const [idsofQuestions, setIdsofQuestions] = React.useState();
  const [isOpenPopupModal, setPopupModal] = React.useState(false);
  const [userName, setuserName] = React.useState();

  const navigate = useNavigate();

  const formValidationSchema = yup.object().shape({
    username: yup.string().required("Username is required!"),
  });
  const form = useForm(
    { username: "" },
    {
      validate: true,
      validateSchema: formValidationSchema,
      validationOnChange: true,
    }
  );

  function callApi(data) {
    const req = {
      params: {
        inname: data?.username,
      },
    };
    getUsersdetails(req)
      .then((res) => {
        setapiData(res);
        setuserName(data?.username);

        callApi1(
          res?.items
            ?.map((user) => {
              if (res?.items?.length > 1) {
                if (data?.username === user?.display_name) {
                  return user?.user_id;
                }
              } else return user?.user_id;
            })
            .filter((x) => x !== undefined)
        );
      })
      .catch((err) => {
        console.error(err);
        toast.error("Something bad happened.");
      });
  }

  function callApi1(data) {
    const req = {
      params: {
        userId: data[0],
      },
    };

    getUserAnswers(req)
      .then((res) => {
        setIdsofQuestions(res?.items?.map((question) => question?.question_id));
        setanswersIds(res?.items?.map((answer) => answer?.answer_id));
      })
      .catch((err) => {
        console.error(err);
        toast.error("Something bad happened");
      });
  }
  React.useEffect(() => {
    callApi2();
  }, [idsofQuestions]);

  function callApi2() {
    const req = {
      params: {
        questionID: idsofQuestions?.join(";"),
      },
    };

    getMultiplequestions(req)
      .then((res) => {
        setapiData2(res);

        toast.success("Success");
      })
      .catch((err) => {
        console.error(err);
      });
  }
  function handleNavigate() {
    navigate("/");
  }
  function handleOpenPopupModal(question_ID) {
    setquestionID(question_ID);
    setPopupModal(true);
  }
  function handleClosePopupModal() {
    setPopupModal(false);
  }
  let count = 0;
  apiData?.items?.map((user) =>
    apiData?.items?.length > 1
      ? userName === user?.display_name && (count += 1)
      : (count = 1)
  );
  return (
    <>
      <Column
        className="bg-gray_50 font-sourcesanspro justify-end mx-[auto] lg:pt-[37px] xl:pt-[42px] 2xl:pt-[48px] 3xl:pt-[57px] w-[100%]"
        compid="7:4181"
        comptype="Column"
      >
        <Img
          src="images/img_group.jpg"
          className="lg:h-[33px] xl:h-[38px] 2xl:h-[43px] 3xl:h-[51px] 3xl:ml-[103px] lg:ml-[66px] xl:ml-[76px] 2xl:ml-[86px] xl:mr-[1012px] 2xl:mr-[1138px] 3xl:mr-[1366px] lg:mr-[885px] w-[15%]"
          compid="7:4183"
          comptype="Image"
          alt="Group"
        />
        <Column
          className="items-center lg:mt-[56px] xl:mt-[64px] 2xl:mt-[72px] 3xl:mt-[86px] w-[100%]"
          compid="234"
          comptype="Column"
        >
          <Row
            className="items-end justify-center pt-[3px] w-[43%]"
            compid="7:4187"
            comptype="Row"
          >
            <Column className="w-[70%]" compid="7:4188" comptype="Column">
              <Text
                className="not-italic text-bluegray_900 w-[auto]"
                compid="7:4189"
                as="h1"
                variant="h1"
                comptype="Text"
              >
                Enter Stack Overflow Username
              </Text>
              <Input
                className="font-normal not-italic p-[0] lg:text-[14px] xl:text-[16px] 2xl:text-[18px] 3xl:text-[21px] placeholder:text-bluegray_200 text-bluegray_200 w-[100%]"
                wrapClassName="2xl:mt-[18px] 3xl:mt-[21px] lg:mt-[14px] w-[94%] xl:mt-[16px]"
                compid="I7:4190;122:21290"
                type="text"
                comptype="EditText"
                name="InputField"
                placeholder="Enter Username"
                onChange={(e) => {
                  form.handleChange("username", e.target.value);
                }}
                errors={form?.errors?.username}
                value={form?.values?.username}
              ></Input>
            </Column>
            <Button
              className="common-pointer font-normal lg:mt-[32px] xl:mt-[37px] 2xl:mt-[42px] 3xl:mt-[50px] not-italic lg:text-[14px] xl:text-[16px] 2xl:text-[18px] 3xl:text-[21px] text-center w-[30%]"
              compid="7:4191"
              comptype="Button"
              onClick={() => {
                form.handleSubmit(callApi);
              }}
              size="md"
              variant="FillYellow900"
            >
              Submit
            </Button>
          </Row>
          <Row
            className="justify-center lg:mt-[52px] xl:mt-[59px] 2xl:mt-[67px] 3xl:mt-[80px] w-[13%]"
            compid="7:4192"
            comptype="Row"
          >
            <Text
              className="common-pointer mt-[2px] not-italic text-bluegray_400 w-[auto]"
              compid="7:4194"
              as="h2"
              variant="h2"
              comptype="Text"
              onClick={handleNavigate}
            >
              Questions
            </Text>
            <Column
              className="items-center lg:ml-[17px] xl:ml-[19px] 2xl:ml-[22px] 3xl:ml-[26px] w-[49%]"
              compid="218"
              comptype="Column"
            >
              <Text
                className="not-italic text-yellow_900 w-[auto]"
                compid="7:4195"
                as="h2"
                variant="h2"
                comptype="Text"
              >
                Answers
              </Text>
              <Line
                className="bg-yellow_900 h-[2px] lg:mt-[12px] xl:mt-[14px] 2xl:mt-[16px] 3xl:mt-[19px] w-[100%]"
                compid="7:4193"
                comptype="Line"
              />
            </Column>
          </Row>
          <Text
            className="lg:mt-[21px] xl:mt-[24px] 2xl:mt-[28px] 3xl:mt-[33px] not-italic text-bluegray_900 w-[auto]"
            compid="7:3969"
            as="h4"
            variant="h4"
            comptype="Text"
          >
            {count > 1
              ? `There are ${count} people found with the same username. Displaying the first one.`
              : apiData?.items?.map((user) =>
                  apiData?.items?.length > 1
                    ? userName === user?.display_name &&
                      `These are the Questions answered by "${user?.display_name}".`
                    : `These are the Questions answered by "${user?.display_name}".`
                )}
          </Text>
          <Grid
            className="lg:gap-[21px] xl:gap-[24px] 2xl:gap-[28px] 3xl:gap-[33px] grid grid-cols-2 lg:mt-[30px] xl:mt-[34px] 2xl:mt-[39px] 3xl:mt-[46px] w-[81%]"
            compid="226"
            comptype="Grid"
          >
            {apiData2?.items?.map((apiData1ItemsEle, index) => {
              return (
                <React.Fragment key={`apiData1ItemsEle${index}`}>
                  <Column
                    className="bg-white_A700 justify-end lg:p-[18px] xl:p-[21px] 2xl:p-[24px] 3xl:p-[28px] rounded-radius8 w-[100%]"
                    compid="7:3972"
                    comptype="Column"
                  >
                    <Text
                      className="mt-[3px] text-bluegray_900 w-[auto]"
                      compid="7:3974"
                      as="h3"
                      variant="h3"
                      comptype="Text"
                    >
                      <div
                        dangerouslySetInnerHTML={{
                          __html: apiData1ItemsEle?.title,
                        }}
                      />
                    </Text>
                    <Row
                      className="lg:mt-[15px] xl:mt-[17px] 2xl:mt-[20px] 3xl:mt-[24px] py-[3px] w-[100%]"
                      compid="7:3983"
                      comptype="Row"
                    >
                      <Text
                        className="my-[1px] not-italic text-bluegray_700 w-[auto]"
                        compid="7:3985"
                        as="h4"
                        variant="h4"
                        comptype="Text"
                      >
                        Created at :
                      </Text>
                      <Text
                        className="ml-[4px] mt-[3px] not-italic text-bluegray_700 w-[auto]"
                        compid="7:3986"
                        as="h4"
                        variant="h4"
                        comptype="Text"
                      >
                        {moment
                          .unix(apiData1ItemsEle?.["creation_date"])
                          .format("DD/MM/YYYY")}
                      </Text>
                      <Text
                        className="3xl:ml-[100px] lg:ml-[5px] xl:ml-[55px] 2xl:ml-[84px] my-[1px] not-italic text-bluegray_700 w-[auto]"
                        compid="7:3988"
                        as="h4"
                        variant="h4"
                        comptype="Text"
                      >
                        Answered :
                      </Text>
                      {apiData1ItemsEle?.["is_answered"] ? (
                        <Text
                          className="ml-[3px] my-[1px] not-italic text-green_600 w-[auto]"
                          compid="7:3989"
                          as="h4"
                          variant="h4"
                          comptype="Text"
                        >
                          Yes
                        </Text>
                      ) : (
                        <Text
                          className="ml-[3px] my-[1px] not-italic text-red-600 w-[auto]"
                          compid="7:3989"
                          as="h4"
                          variant="h4"
                          comptype="Text"
                        >
                          No
                        </Text>
                      )}
                      <Text
                        className="lg:ml-[64px] xl:ml-[73px] 2xl:ml-[83px] 3xl:ml-[99px] my-[1px] not-italic text-bluegray_700 w-[auto]"
                        compid="7:3991"
                        as="h4"
                        variant="h4"
                        comptype="Text"
                      >
                        View Count :
                      </Text>
                      <Text
                        className="flex items-center ml-[4px] my-[1px] not-italic text-bluegray_700 w-[auto]"
                        compid="7:3992"
                        as="h4"
                        variant="h4"
                        comptype="Text"
                      >
                        {apiData1ItemsEle?.["view_count"]}
                      </Text>
                    </Row>
                    <Row
                      className="lg:mt-[12px] xl:mt-[14px] 2xl:mt-[16px] 3xl:mt-[19px] py-[4px] w-[100%]"
                      compid="7:3976"
                      comptype="Row"
                    >
                      <Text
                        className="my-[1px] not-italic text-bluegray_700 w-[auto]"
                        compid="7:3978"
                        as="h4"
                        variant="h4"
                        comptype="Text"
                      >
                        Answer Count :
                      </Text>
                      <Text
                        className="ml-[4px] mt-[1px] not-italic text-bluegray_700 w-[auto]"
                        compid="7:3979"
                        as="h4"
                        variant="h4"
                        comptype="Text"
                      >
                        {apiData1ItemsEle?.["answer_count"]}
                      </Text>
                      <Text
                        className="lg:ml-[275px] xl:ml-[245px] 2xl:ml-[354px] 3xl:ml-[425px] my-[1px] not-italic text-bluegray_700 w-[auto]"
                        compid="7:3981"
                        as="h4"
                        variant="h4"
                        comptype="Text"
                      >
                        Score :
                      </Text>
                      <Text
                        className="ml-[4px] mt-[1px] not-italic text-bluegray_700 w-[auto]"
                        compid="7:3982"
                        as="h4"
                        variant="h4"
                        comptype="Text"
                      >
                        {apiData1ItemsEle?.["score"]}
                      </Text>
                    </Row>
                    <Text
                      className="mt-[13px] mb-[15px] text-bluegray_900 w-[auto]"
                      compid="7:3974"
                      as="h3"
                      variant="h3"
                      comptype="Text"
                    >
                      User Details
                    </Text>
                    <Row className="w-[100%]" compid="236" comptype="Row">
                      <Img
                        src={apiData1ItemsEle?.owner?.profile_image}
                        className="EllipseOne w-[15%]"
                        compid="7:4600"
                        comptype="Image"
                        alt="Image"
                      />
                      <Column
                        className="lg:ml-[12px] xl:ml-[35px] 2xl:ml-[16px] 3xl:ml-[19px] w-[auto]"
                        compid="235"
                        comptype="Column"
                      >
                        <Text
                          className="text-bluegray_900 w-[auto]"
                          compid="7:4595"
                          as="h3"
                          variant="h3"
                          comptype="Text"
                        >
                          {apiData1ItemsEle?.owner?.["display_name"]}
                        </Text>
                        <Row
                          className="justify-evenly lg:mt-[3px] xl:mt-[5px] 2xl:mt-[17px] 3xl:mt-[20px] w-[100%]"
                          compid="7:4596"
                          comptype="Row"
                        >
                          <Text
                            className="mt-[1px] not-italic text-bluegray_700 w-[auto]"
                            compid="7:4597"
                            as="h4"
                            variant="h4"
                            comptype="Text"
                          >
                            Reputation :
                          </Text>
                          <Text
                            className="mb-[1px] not-italic text-bluegray_700 w-[auto]"
                            compid="7:4598"
                            as="h4"
                            variant="h4"
                            comptype="Text"
                          >
                            {apiData1ItemsEle?.owner?.reputation}
                          </Text>
                        </Row>
                      </Column>
                      <Button
                        className="font-normal lg:mt-[5px] ml-[25px] xl:mt-[5px] 2xl:mt-[20px] 3xl:mt-[24px] not-italic lg:text-[10px] xl:text-[12px] 2xl:text-[14px] 3xl:text-[16px] text-center h-[50%] w-[auto]"
                        compid="7:3993"
                        comptype="Button"
                        variant="OutlineDeeporange300"
                      >
                        <a href={apiData1ItemsEle?.owner?.link} target="_blank">
                          Profile Link
                        </a>
                      </Button>
                    </Row>
                    <Row
                      className="lg:mt-[12px xl:mt-[14px] 2xl:mt-[16px] 3xl:mt-[19px] py-[4px] w-[100%]"
                      compid="7:3976"
                      comptype="Row"
                    >
                      <Button
                        className="font-normal lg:mt-[15px] xl:mt-[17px] 2xl:mt-[20px] 3xl:mt-[24px] not-italic lg:text-[10px] xl:text-[12px] 2xl:text-[14px] 3xl:text-[16px] text-center w-[auto]"
                        compid="7:3993"
                        comptype="Button"
                        variant="OutlineDeeporange300"
                      >
                        <a href={apiData1ItemsEle?.["link"]} target="_blank">
                          Stack Overflow Link
                        </a>
                      </Button>
                      <Button
                        className="font-normal ml-[10px] lg:mt-[15px] xl:mt-[17px] 2xl:mt-[20px] 3xl:mt-[24px] not-italic lg:text-[10px] xl:text-[12px] 2xl:text-[14px] 3xl:text-[16px] text-center w-[20%]"
                        compid="7:3993"
                        comptype="Button"
                        variant="OutlineDeeporange300"
                        onClick={() =>
                          handleOpenPopupModal(apiData1ItemsEle?.question_id)
                        }
                      >
                        Show Answer
                      </Button>
                    </Row>
                    <Text
                      className="lg:mt-[17px] xl:mt-[10px] 2xl:mt-[23px] 3xl:mt-[27px] not-italic text-bluegray_900 w-[auto]"
                      compid="7:3995"
                      as="h3"
                      variant="h3"
                      comptype="Text"
                    >
                      Tags
                    </Text>
                    <Row
                      className="font-gilroy items-center mr-[auto] 2xl:mt-[10px] 3xl:mt-[12px] lg:mt-[7px] xl:mt-[8px] w-[80%]"
                      compid="7:3996"
                      comptype="Row"
                    >
                      {apiData1ItemsEle?.tags?.map((tag) => {
                        return (
                          <Button
                            className="font-medium lg:ml-[12px] xl:ml-[14px] 2xl:ml-[16px] 3xl:ml-[19px] lg:text-[10px] xl:text-[12px] 2xl:text-[14px] 3xl:text-[16px] text-center w-[auto]"
                            compid="7:3997"
                            comptype="Button"
                          >
                            {tag}
                          </Button>
                        );
                      })}
                    </Row>
                  </Column>
                </React.Fragment>
              );
            })}
          </Grid>
          <footer
            className="bg-gray_901 3xl:mt-[103px] lg:mt-[66px] xl:mt-[76px] 2xl:mt-[86px] w-[100%]"
            compid="7:4142"
            comptype="Footer"
          >
            <Column
              className="items-center m-[50px] w-[88%]"
              compid="219"
              comptype="Column"
            >
              <Row
                className="justify-between w-[100%]"
                compid="223"
                comptype="Row"
              >
                <Img
                  src="images/img_group_bluegray_50.jpg"
                  className="lg:h-[33px] xl:h-[38px] 2xl:h-[43px] 3xl:h-[51px] w-[17%]"
                  compid="7:4145"
                  comptype="Image"
                  alt="Group One"
                />
                <Column
                  className="mt-[4px] pb-[4px] w-[10%]"
                  compid="7:4149"
                  comptype="Column"
                >
                  <Text
                    className="text-white_A700 uppercase w-[auto]"
                    compid="7:4150"
                    as="h3"
                    variant="h3"
                    comptype="Text"
                  >
                    Products
                  </Text>
                  <Text
                    className="lg:mt-[17px] xl:mt-[20px] 2xl:mt-[23px] 3xl:mt-[27px] not-italic text-bluegray_50 w-[auto]"
                    compid="7:4152"
                    as="h4"
                    variant="h4"
                    comptype="Text"
                  >
                    Teams
                  </Text>
                  <Text
                    className="lg:mt-[14px] xl:mt-[16px] 2xl:mt-[19px] 3xl:mt-[22px] not-italic text-bluegray_50 w-[auto]"
                    compid="7:4153"
                    as="h4"
                    variant="h4"
                    comptype="Text"
                  >
                    Advertising
                  </Text>
                  <Text
                    className="lg:mt-[12px] xl:mt-[14px] 2xl:mt-[16px] 3xl:mt-[19px] not-italic text-bluegray_50 w-[auto]"
                    compid="7:4154"
                    as="h4"
                    variant="h4"
                    comptype="Text"
                  >
                    Collectives
                  </Text>
                  <Text
                    className="lg:mt-[14px] xl:mt-[16px] 2xl:mt-[18px] 3xl:mt-[21px] not-italic text-bluegray_50 w-[auto]"
                    compid="7:4155"
                    as="h4"
                    variant="h4"
                    comptype="Text"
                  >
                    Talent
                  </Text>
                </Column>
                <Column
                  className="mt-[4px] pb-[4px] w-[10%]"
                  compid="7:4156"
                  comptype="Column"
                >
                  <Text
                    className="text-white_A700 uppercase w-[auto]"
                    compid="7:4157"
                    as="h3"
                    variant="h3"
                    comptype="Text"
                  >
                    Company
                  </Text>
                  <Text
                    className="lg:mt-[17px] xl:mt-[20px] 2xl:mt-[23px] 3xl:mt-[27px] not-italic text-bluegray_50 w-[auto]"
                    compid="7:4159"
                    as="h4"
                    variant="h4"
                    comptype="Text"
                  >
                    About
                  </Text>
                  <Text
                    className="lg:mt-[14px] xl:mt-[16px] 2xl:mt-[18px] 3xl:mt-[21px] not-italic text-bluegray_50 w-[auto]"
                    compid="7:4160"
                    as="h4"
                    variant="h4"
                    comptype="Text"
                  >
                    Press
                  </Text>
                  <Text
                    className="lg:mt-[13px] xl:mt-[15px] 2xl:mt-[17px] 3xl:mt-[20px] not-italic text-bluegray_50 w-[auto]"
                    compid="7:4161"
                    as="h4"
                    variant="h4"
                    comptype="Text"
                  >
                    Work Here
                  </Text>
                  <Text
                    className="lg:mt-[14px] xl:mt-[16px] 2xl:mt-[19px] 3xl:mt-[22px] not-italic text-bluegray_50 w-[auto]"
                    compid="7:4162"
                    as="h4"
                    variant="h4"
                    comptype="Text"
                  >
                    Legal
                  </Text>
                  <Text
                    className="lg:mt-[13px] xl:mt-[15px] 2xl:mt-[17px] 3xl:mt-[20px] not-italic text-bluegray_50 w-[auto]"
                    compid="7:4163"
                    as="h4"
                    variant="h4"
                    comptype="Text"
                  >
                    Privacy Policy
                  </Text>
                  <Text
                    className="lg:mt-[12px] xl:mt-[14px] 2xl:mt-[16px] 3xl:mt-[19px] not-italic text-bluegray_50 w-[auto]"
                    compid="7:4164"
                    as="h4"
                    variant="h4"
                    comptype="Text"
                  >
                    Terms of Service
                  </Text>
                </Column>
                <Column
                  className="mt-[4px] pb-[4px] w-[21%]"
                  compid="7:4165"
                  comptype="Column"
                >
                  <Text
                    className="text-white_A700 uppercase w-[auto]"
                    compid="7:4166"
                    as="h3"
                    variant="h3"
                    comptype="Text"
                  >
                    Stack Exchange Network
                  </Text>
                  <Text
                    className="lg:mt-[18px] xl:mt-[21px] 2xl:mt-[24px] 3xl:mt-[28px] not-italic text-bluegray_50 w-[auto]"
                    compid="7:4168"
                    as="h4"
                    variant="h4"
                    comptype="Text"
                  >
                    Technology
                  </Text>
                  <Text
                    className="lg:mt-[12px] xl:mt-[14px] 2xl:mt-[16px] 3xl:mt-[19px] not-italic text-bluegray_50 w-[auto]"
                    compid="7:4169"
                    as="h4"
                    variant="h4"
                    comptype="Text"
                  >
                    Culture & Recreation
                  </Text>
                  <Text
                    className="lg:mt-[13px] xl:mt-[15px] 2xl:mt-[17px] 3xl:mt-[20px] not-italic text-bluegray_50 w-[auto]"
                    compid="7:4170"
                    as="h4"
                    variant="h4"
                    comptype="Text"
                  >
                    Life and Arts
                  </Text>
                  <Text
                    className="lg:mt-[14px] xl:mt-[16px] 2xl:mt-[18px] 3xl:mt-[21px] not-italic text-bluegray_50 w-[auto]"
                    compid="7:4171"
                    as="h4"
                    variant="h4"
                    comptype="Text"
                  >
                    Science
                  </Text>
                  <Text
                    className="lg:mt-[13px] xl:mt-[15px] 2xl:mt-[17px] 3xl:mt-[20px] not-italic text-bluegray_50 w-[auto]"
                    compid="7:4172"
                    as="h4"
                    variant="h4"
                    comptype="Text"
                  >
                    Professional
                  </Text>
                  <Text
                    className="lg:mt-[14px] xl:mt-[16px] 2xl:mt-[18px] 3xl:mt-[21px] not-italic text-bluegray_50 w-[auto]"
                    compid="7:4173"
                    as="h4"
                    variant="h4"
                    comptype="Text"
                  >
                    Business
                  </Text>
                </Column>
              </Row>
              <Row
                className="items-end justify-center lg:mt-[33px] xl:mt-[38px] 2xl:mt-[43px] 3xl:mt-[51px] w-[17%]"
                compid="7:4174"
                comptype="Row"
              >
                <Text
                  className="my-[4px] not-italic text-white_A700 w-[auto]"
                  compid="7:4175"
                  as="h4"
                  variant="h4"
                  comptype="Text"
                >
                  Made with
                </Text>
                <Img
                  src="images/img_favorite.svg"
                  className="lg:h-[20px] xl:h-[23px] 2xl:h-[26px] 3xl:h-[31px] 3xl:ml-[10px] lg:ml-[7px] xl:ml-[8px] lg:mr-[7px] xl:mr-[8px] 2xl:ml-[9px] w-[13%]"
                  compid="7:4180"
                  comptype="Image"
                  alt="favorite"
                />
                <Text
                  className="mb-[4px] mt-[4px] 3xl:ml-[10px] 2xl:ml-[9px] 2xl:mt-[6px] 3xl:mt-[7px] not-italic text-white_A700 w-[auto]"
                  compid="7:4176"
                  as="h4"
                  variant="h4"
                  comptype="Text"
                >
                  Using DhiWise
                </Text>
              </Row>
            </Column>
          </footer>
        </Column>
      </Column>

      <ToastContainer />
      {isOpenPopupModal ? (
        <AnswerModal
          answerIds={answersIds}
          questionsIds={idsofQuestions}
          questionID={questionID}
          isOpen={isOpenPopupModal}
          onRequestClose={handleClosePopupModal}
        />
      ) : null}
    </>
  );
};

export default AnswersPage;
