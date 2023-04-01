import MotorInsuranceDocument from "../models/MotorInsuranceDocument.js";
import UserMotorDetail from "../models/UserMotorDetail.js";
import { fetchUserById } from "../external-api/user-management.api.js";

export const createMotorInsuranceDocument = async (req, res, next) => {
  const { motorDetailId, insuranceCompany } = req.body;

  //   check if the user is logged in .. extract the user-id from the token

  // check if motor detail id is not null
  if (!motorDetailId)
    return res.status(400).json({ message: `Motor Detail Id is required` });

  // check if motor detail id is not null
  if (!insuranceCompany)
    return res
      .status(400)
      .json({ message: `Insurance Company Id is required` });

  // fetch motor detail information
  const motorDetail = await UserMotorDetail.findById(motorDetailId);

  if (!motorDetail) return res.sendStatus(409);

  // fetch motor detail id
  const newInsuranceDocument = new MotorInsuranceDocument({
    ownershipCertificate: req.files["ownershipCertificate"][0]?.path,
    salesAgreement: req.files["salesAgreement"][0]?.path,
    drivingLicense: req.files["drivingLicense"][0]?.path,
    motorDetailId: motorDetail?._id,
    insuranceCompany: insuranceCompany,
  });
  try {
    const savedInsuranceDocument = await newInsuranceDocument.save();
    res.status(200).json(savedInsuranceDocument);
  } catch (error) {
    next(error);
  }
};

export const getMotorInsuranceDocuments = async (req, res, next) => {
  try {
    const InsuranceDocs = await MotorInsuranceDocument.find().populate(
      "motorDetailId"
    );

    // iterate over

    res.status(200).json(InsuranceDocs);
  } catch (error) {
    next(error);
  }
};

export const getMotorInsuranceDocumentsByCompany = async (req, res, next) => {
  console.log("params are ", req.params.id);
  try {
    const InsuranceDocs = await MotorInsuranceDocument.find({
      insuranceCompany: req.params.id,
    }).populate("motorDetailId");

    let docs = []; // to keep track of insurance employees

    //  iterate over the result and populate user
    for (let i = 0; i < InsuranceDocs?.length; i++) {
      if (InsuranceDocs[i]?.motorDetailId?.user_id) {
        let user = await fetchUserById(
          InsuranceDocs[i]?.motorDetailId?.user_id
        );

        docs.push({
          user: user,
          motorDetailId: InsuranceDocs[i]?.motorDetailId,
          ownershipCertificate: InsuranceDocs[i]?.ownershipCertificate,
          salesAgreement: InsuranceDocs[i]?.salesAgreement,
          drivingLicense: InsuranceDocs[i]?.drivingLicense,
          status: InsuranceDocs[i]?.status,
          _id: InsuranceDocs[i]?._id,
        });
      }
    }

    console.log("InsuranceDocs ", InsuranceDocs);

    res.status(200).json(docs);

    // iterate over
  } catch (error) {
    next(error);
  }
};

export const getMotorInsuranceDocumentById = async (req, res, next) => {
  try {
    const InsuranceDocs = await MotorInsuranceDocument.findById(
      req.params.id
    ).populate("motorDetailId");

    // iterate over

    res.status(200).json(InsuranceDocs);
  } catch (error) {
    next(error);
  }
};
