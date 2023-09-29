import InsuranceCompany from "../models/InsuranceCompany.js";
import InsuranceCompanyRating from "../models/InsuranceCompanyRating.js";
import UserInsuranceFee from "../models/UserInsuranceFee.js";
import UserMotorDetail from "../models/UserMotorDetail.js";
import {
  fetchRoleByName,
  fetchUserById,
  registerUser,
  signInUser,
} from "../external-api/user-management.api.js";
import { decodeJWTToken } from "../utils/verifyToken.js";
import MotorInsuranceDocument from "../models/MotorInsuranceDocument.js";

// create user insurance fee for new user
export const createUserInsuranceFee = async (req, res, next) => {
  // first create user info

  console.log("under create user insurance fee ..... ");
  let body = req?.body;

  try {
    let role = req?.body?.roles;

    // check if role is not null
    // if (!role) {
    //   console.log("after bodyy 3")
    //   let roleObject = await fetchRoleByName("USER");
    //   role = roleObject?.id;
    // }

    // console.log("body is ", body?.rate, body?.price);
    // return;

    // restructure user info
    let userInfo = {
      user_type: body?.user_type,
      email: body?.email,
      username: body?.username,
      password: body?.password,
      roles: role,
      is_active: body?.is_active,
      phoneNumber: body?.phoneNumber,
      // profile_picture: req?.file?.path
    };

    const data = new FormData();
    data.append("user_type", null);
    data.append("username", userInfo?.username);
    data.append("email", userInfo?.email);
    data.append("password", userInfo?.password);
    data.append("phoneNumber", userInfo?.phoneNumber);

    console.log("profile picture ", req?.body?.profile_picture)
    

    data.append("profilePicture", req?.body?.profile_picture);

    // set the returned data to user like toke and other info
    let user = await registerUser(data);

    console.log("user is ................ ", user)

    let motorDetailInfo = {
      model: body?.model,
      price: body?.price,
      dateOfManufacturing: body?.dateOfManufacturing,
      user_id: user?.id,
    };

    let userMotor = new UserMotorDetail(motorDetailInfo);

    // create user motor detail
    let motorDetail = userMotor.save();

    // using the insurance company id and the question id , fetch the rate
    // let insuranceRate = await InsuranceCompanyRating.findOne({
    //   question: body?.questionid,
    //   insuranceCompany: body?.companyId,
    // });

    // write some logic to handle validation

    // console.log("insurance rate is ... ", insuranceRate, body)

    //  create insurance fee which has been associated with the user

    let insuranceFee = {
      motorDetailId: motorDetail?.id,
      insuranceCompany: body?.companyId,
      questionId: body?.questionId,
      fee: body?.rate * body?.price,
      userId: user?.id
    };

    const newUserInsuranceFee = new UserInsuranceFee(insuranceFee);

    const savedUserInsuranceFee = await newUserInsuranceFee.save();

    let response = {
      user : user,
      insuranceFee: savedUserInsuranceFee
    }
    res.status(200).json(response);
  } catch (error) {
    console.log("error is is .... ", error);
    res.status(409).json("Insurance fee creation failed");
    // next(error);
  }
};


export const createUserInsuranceFeeById = async (req, res, next) => {
  // first create user info

  console.log("under create user insurance fee ..... ", req.files);
  let body = req?.body;

  try {
    
    let user = await fetchUserById(req.body?.userId)

    if(!user)
    {
      res.status(409).json("User could not be found");
      return;
    }
    let motorDetailInfo = {
      model: body?.model,
      price: body?.price,
      dateOfManufacturing: body?.dateOfManufacturing,
      user_id: body?.userId,
    };

    let userMotor = new UserMotorDetail(motorDetailInfo);

    // create user motor detail
    let motorDetail = await userMotor.save();

    console.log("motor detail id ", motorDetail)


    //  create insurance fee which has been associated with the user

    const newInsuranceDocument = new MotorInsuranceDocument({
      ownershipCertificate: req.files["ownershipCertificate"][0]?.path,
      salesAgreement: req.files["salesAgreement"][0]?.path,
      drivingLicense: req.files["drivingLicense"][0]?.path,
      motorDetailId: motorDetail?.id,
      insuranceCompany: body?.companyId,
    });

    const savedInsuranceDocument = await newInsuranceDocument.save();

    let insuranceFee = {
      motorDetailId: motorDetail?.id,
      insuranceCompany: body?.companyId,
      questionId: body?.questionId,
      fee: body?.rate * body?.price,
      userId: body?.userId
    };

    const newUserInsuranceFee = new UserInsuranceFee(insuranceFee);

    const savedUserInsuranceFee = await newUserInsuranceFee.save();

    let response = {
      user : user,
      insuranceFee: savedUserInsuranceFee
    }
    res.status(200).json(response);
  } catch (error) {
    console.log("error is is .... ", error);
    res.status(409).json("Insurance fee creation failed");
    // next(error);
  }
};

// create insurance fee when user is already logged in
export const createExistingUserInsuranceFee = async (req, res, next) => {
  // first create user info

  console.log("under create user insurance fee ..... ");
  let body = req?.body;

  try {
    let role = req?.body?.roles;

    // check if role is not null
    // if (!role) {
    //   console.log("after bodyy 3")
    //   let roleObject = await fetchRoleByName("USER");
    //   role = roleObject?.id;
    // }

    // console.log("body is ", body?.rate, body?.price);
    // return;

    // restructure user info
    let userInfo = {
      username: body?.username,
      password: body?.password,
    };

    // set the returned data to user like toke and other info
    let user = await signInUser(userInfo);

    console.log("user is .... ", user);

    let motorDetailInfo = {
      model: body?.model,
      price: body?.price,
      dateOfManufacturing: body?.dateOfManufacturing,
      user_id: user?._id,
    };

    let userMotor = new UserMotorDetail(motorDetailInfo);

    // create user motor detail
    let motorDetail = userMotor.save();

    //  create insurance fee which has been associated with the user

    let insuranceFee = {
      motorDetailId: motorDetail?._id,
      insuranceCompany: body?.companyId,
      questionId: body?.questionId,
      fee: body?.rate * body?.price,
    };

    const newUserInsuranceFee = new UserInsuranceFee(insuranceFee);

    const savedUserInsuranceFee = await newUserInsuranceFee.save();


    // return he user related info and saved user insurance fee
    let response = {
      user : user,
      insuranceFee: savedUserInsuranceFee
    }

    res.status(200).json(response);
  } catch (error) {
    console.log("error is is .... ", error);
    res.status(409).json("Insurance fee creation failed");
    // next(error);
  }
};

// create insurance fee for logged in user
export const createNewUserInsuranceFee = async (req, res, next) => {
  // use info
  let userInfo = decodeJWTToken(req.headers.authorization)?.UserInfo;

  // first create user info
  let body = req?.body;

  try {
    // fetch user by id
    let user = await fetchUserById(userInfo?.id);

    // if user is not found ...
    if (!user) {
      const error = new Error("User not found");
      error.code = response?.status;
      throw error;
    }

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
    // console.log("error is ", error, error._message, error.code)
    res.status(500).json(error._message);
    // next(error);
  }
};

export const getUserInsuranceFee = async (req, res, next) => {
  console.log("under get user nsurance")
  try {
    // insurance companies
    const insuranceCompanies = await InsuranceCompany.find();
    let questionId = req.params.questionId;
    let motorPrice = req.params.motorPrice;

    let insuranceCompaniesFee = [];

    // iterate over the insurance compnaies
    for (let i = 0; i < insuranceCompanies?.length; i++) {
      // fetch insurance company rating using question id and insurance company id
      console.log("insurance company id...", insuranceCompanies[i]?._id);
      let insuranceRating = await InsuranceCompanyRating.findOne({
        insuranceCompany: insuranceCompanies[i]?._id,
        question: questionId,
      });

      // fetch user deta

      let insuranceCompany = insuranceCompanies[i];

      console.log(
        "insurance company ...",
        motorPrice,
        insuranceRating,
        insuranceCompany,
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

export const getUserInsuranceFeeByUser = async (req, res, next) => {
  try {
    // insurance fees
    const insuranceFees = await UserInsuranceFee.find({
      userId: req.params.userId,
    }).populate("insuranceCompany").populate("motorDetailId");

    res.status(200).json(insuranceFees);
  } catch (error) {
    next(error);
  }
};

export const getAllUserInsuranceFees = async (req, res, next) => {
  try {
    // insurance fees
    const insuranceFees = await UserInsuranceFee.find().populate("motorDetailId");

    res.status(200).json(insuranceFees);
  } catch (error) {
    next(error);
  }
};
