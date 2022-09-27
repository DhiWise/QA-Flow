import React from "react";
import ModalProvider from "react-modal";

import { Column, Img, Grid, Row, Text, Button } from "components";
import { getAnswers } from "service/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";

const PopupModal = (props) => {
  const [apiData, setapiData] = React.useState();
  React.useEffect(() => {
    callApi();
  }, []);

  function callApi() {
    const req = { params: { questionID: props?.questionID } };

    getAnswers(req)
      .then((res) => {
        setapiData(res);

        toast.success("Success");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Something bad happened");
      });
  }

  return (
    <>
      <ModalProvider
        appElement={document.getElementById("root")}
        className="m-[auto] w-[67%]"
        overlayClassName="bg-gray_900_a2 fixed flex h-[100%] inset-y-[0] w-[100%]"
        {...props}
      >
        <div className="m-[auto] max-h-[97vh] overflow-y-auto">
          <Column
            className="bg-white_A700 lg:mb-[414px] xl:mb-[474px] 2xl:mb-[533px] 3xl:mb-[639px] lg:p-[31px] xl:p-[35px] 2xl:p-[40px] 3xl:p-[48px] rounded-radius16 w-[100%]"
            compid="7:4573"
            comptype="Column"
          >
            <Img
              src="images/img_close.svg"
              className="common-pointer lg:h-[13px] xl:h-[15px] 2xl:h-[17px] 3xl:h-[20px] 3xl:ml-[1036px] lg:ml-[671px] xl:ml-[767px] 2xl:ml-[863px] lg:w-[12px] xl:w-[14px] 2xl:w-[16px] 3xl:w-[19px]"
              compid="I7:4715;120:5117"
              comptype="Image"
              onClick={props.onRequestClose}
              alt="close"
            />
            <Text
              className="lg:mt-[21px] xl:ml-[260px] xl:mt-[24px] 2xl:mt-[28px] 3xl:mt-[33px] not-italic text-bluegray_900 w-[auto]"
              compid="7:3969"
              as="h3"
              variant="h3"
              comptype="Text"
            >
              Answers to the questions with their links.
            </Text>
            <Grid
              className="lg:gap-[24px] xl:gap-[28px] 2xl:gap-[32px] 3xl:gap-[38px] grid grid-cols-2 mx-[auto] lg:my-[30px] xl:my-[34px] 2xl:my-[39px] 3xl:my-[46px] w-[94%]"
              compid="248"
              comptype="Grid"
            >
              {apiData?.items?.map((apiDataItemsEle, index) => {
                return (
                  <React.Fragment key={`apiDataItemsEle${index}`}>
                    <Column
                      className="bg-white_A700 border border-bluegray_100 border-solid lg:p-[18px] xl:p-[21px] 2xl:p-[24px] 3xl:p-[28px] rounded-radius8 w-[100%]"
                      compid="7:4577"
                      comptype="Column"
                    >
                      <Row
                        className="items-center w-[100%]"
                        compid="236"
                        comptype="Row"
                      >
                        <Img
                          src={apiDataItemsEle?.owner?.profile_image}
                          className="EllipseOne w-[25%]"
                          compid="7:4600"
                          comptype="Image"
                          alt="Image"
                        />
                        <Column
                          className="lg:ml-[12px] xl:ml-[14px] 2xl:ml-[16px] 3xl:ml-[19px] w-[auto]"
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
                            {apiDataItemsEle?.owner?.["display_name"]}
                          </Text>
                          <Row
                            className="justify-evenly lg:mt-[13px] xl:mt-[15px] 2xl:mt-[17px] 3xl:mt-[20px] w-[100%]"
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
                              {apiDataItemsEle?.owner?.reputation}
                            </Text>
                          </Row>
                          <Button
                            className="font-normal lg:mt-[15px] xl:mt-[17px] 2xl:mt-[20px] 3xl:mt-[24px] not-italic lg:text-[10px] xl:text-[12px] 2xl:text-[14px] 3xl:text-[16px] text-center w-[auto]"
                            compid="7:3993"
                            comptype="Button"
                            variant="OutlineDeeporange300"
                          >
                            <a
                              href={apiDataItemsEle?.owner?.link}
                              target="_blank"
                            >
                              Profile Link
                            </a>
                          </Button>
                        </Column>
                      </Row>
                      <Row
                        className="lg:mt-[12px] xl:mt-[14px] 2xl:mt-[16px] 3xl:mt-[19px] py-[3px] w-[auto]"
                        compid="7:4579"
                        comptype="Row"
                      >
                        <Text
                          className="mt-[3px] not-italic text-bluegray_700 w-[auto]"
                          compid="7:4581"
                          as="h4"
                          variant="h4"
                          comptype="Text"
                        >
                          Accepted :
                        </Text>
                        {apiDataItemsEle?.is_accepted ? (
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
                          className="3xl:ml-[102px] lg:ml-[66px] xl:ml-[75px] 2xl:ml-[85px] my-[1px] not-italic text-bluegray_700 w-[auto]"
                          compid="7:4584"
                          as="h4"
                          variant="h4"
                          comptype="Text"
                        >
                          Score :
                        </Text>
                        <Text
                          className="flex items-center ml-[4px] my-[1px] not-italic text-bluegray_700 w-[auto]"
                          compid="7:4585"
                          as="h4"
                          variant="h4"
                          comptype="Text"
                        >
                          {apiDataItemsEle?.["score"]}
                        </Text>
                      </Row>
                      <Row
                        className="lg:mt-[12px] xl:mt-[14px] 2xl:mt-[16px] 3xl:mt-[19px] py-[2px] w-[100%]"
                        compid="7:4586"
                        comptype="Row"
                      >
                        <Text
                          className="my-[1px] not-italic text-bluegray_700 w-[auto]"
                          compid="7:4588"
                          as="h4"
                          variant="h4"
                          comptype="Text"
                        >
                          Created at :
                        </Text>
                        <Text
                          className="ml-[4px] my-[2px] not-italic text-bluegray_700 w-[auto]"
                          compid="7:4589"
                          as="h4"
                          variant="h4"
                          comptype="Text"
                        >
                          {moment
                            .unix(apiDataItemsEle?.["creation_date"])
                            .format("DD/MM/YYYY")}
                        </Text>
                        <Text
                          className="lg:ml-[19px] xl:ml-[10px] 2xl:ml-[25px] 3xl:ml-[30px] mt-[4px] not-italic text-bluegray_700 w-[auto]"
                          compid="7:4591"
                          as="h4"
                          variant="h4"
                          comptype="Text"
                        >
                          Last Activity :
                        </Text>
                        <Text
                          className="ml-[4px] my-[2px] not-italic text-bluegray_700 w-[auto]"
                          compid="7:4592"
                          as="h4"
                          variant="h4"
                          comptype="Text"
                        >
                          {moment
                            .unix(apiDataItemsEle?.["last_activity_date"])
                            .format("DD/MM/YYYY")}
                        </Text>
                      </Row>
                      <Button
                        className="font-normal lg:mt-[15px] xl:mt-[17px] 2xl:mt-[20px] 3xl:mt-[24px] not-italic lg:text-[10px] xl:text-[12px] 2xl:text-[14px] 3xl:text-[16px] text-center w-[auto]"
                        compid="7:3993"
                        comptype="Button"
                        variant="OutlineDeeporange300"
                      >
                        <a
                          href={`https://stackoverflow.com/a/${apiDataItemsEle?.answer_id}`}
                          target="_blank"
                        >
                          Go to Answer
                        </a>
                      </Button>
                    </Column>
                  </React.Fragment>
                );
              })}
            </Grid>
          </Column>
        </div>
      </ModalProvider>
      <ToastContainer />
    </>
  );
};

export { PopupModal };
