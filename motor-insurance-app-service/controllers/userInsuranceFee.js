import InsuranceCompany from "../models/InsuranceCompany.js";
import InsuranceCompanyRating from "../models/InsuranceCompanyRating.js";
import UserInsuranceFee from "../models/userInsuranceFee.js";
import UserMotorDetail from "../models/UserMotorDetail.js";
import { registerUser } from "../external-api/user-management.api.js";

export const createUserInsuranceFee = async (req, res, next) => {
  // first create user info
  let body = req?.body;

  try {
    // restructure user info
    let userInfo = {
      user_type: body?.user_type,
      email: body?.email,
      username: body?.username,
      password: body?.password,
      roles: body?.roles,
      is_active: body?.is_active,
    };

    // set the returned data to user like toke and other info
    let user = await registerUser(userInfo);


    let motorDetailInfo = {
      model: body?.model,
      price: body?.price,
      dateOfManufacturing: body?.dateOfManufacturing,
      user_id: user?._id,
    };

    let userMotor = new UserMotorDetail(motorDetailInfo);

    // create user motor detail
    let motorDetail = userMotor.save();

    // using the insurance company id and the question id , fetch the rate
    let insuranceRate = await InsuranceCompanyRating.findOne({
      question: body?.questionid,
      insuranceCompany: body?.companyId,
    });

    // write some logic to handle validation

    //  create insurance fee which has been associated with the user
    let insuranceFee = {
      motorDetailId: motorDetail?._id,
      insuranceCompany: body?.companyId,
      questionId: body?.questionId,
      fee: insuranceRate * body?.price,
    };

    const newUserInsuranceFee = new UserInsuranceFee(insuranceFee);

    const savedUserInsuranceFee = await newUserInsuranceFee.save();
    res.status(200).json(savedUserInsuranceFee);
  } catch (error) {
    res.status(409).json("User not found");
    // next(error);
  }
};

export const getUserInsuranceFee = async (req, res, next) => {
  try {
    // insurance companies
    const insuranceCompanies = await InsuranceCompany.find();
    let questionId = req.params.questionId;
    let motorPrice = req.params.motorPrice;


    let insuranceCompaniesFee = [];

    // iterate over the insurance compnaies
    for (let i = 0; i < insuranceCompanies?.length; i++) {
      // fetch insurance company rating using question id and insurance company id
      let insuranceRating = await InsuranceCompanyRating.findOne({
        insuranceCompany: insuranceCompanies[i]?.id,
        question: questionId,
      });

      // fetch user deta

      let insuranceCompany = insuranceCompanies[i];

      console.log(
        "insurance company ...",
        motorPrice,
        insuranceRating?.rate * motorPrice
      );
      insuranceCompaniesFee.push({
        companyId: insuranceCompany?.id,
        name: insuranceCompany?.name,
        establishedDate: insuranceCompany?.establishedDate,
        renewedDate: insuranceCompany?.renewedDate,
        phone: insuranceCompany?.phone,
        email: insuranceCompany?.email,
        rate: insuranceRating?.rate,
        fee: insuranceRating?.rate * motorPrice,
        questionId: questionId,
      });
    }

    // const QuestionOption = await QuestionOption.findById(req.params.id);
    res.status(200).json(insuranceCompaniesFee);
  } catch (error) {
    next(error);
  }
};