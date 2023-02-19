import MotorInsuranceDocument from "../models/MotorInsuranceDocument.js";
import UserMotorDetail from "../models/UserMotorDetail.js";

export const createMotorInsuranceDocument = async (req, res, next) => {
  console.log("under req is ", req, "file is ", req.files);

  const { motorDetailId } = req.body;

  //   check if the user is logged in .. extract the user-id from the token

  // check if motor detail id is not null
  if (!motorDetailId)
    return res.status(400).json({ message: `Motor Detail Id is required` });

  // fetch motor detail information
  const motorDetail = await UserMotorDetail.findById(motorDetailId);

  if (!motorDetail) return res.sendStatus(409);

  // fetch motor detail id
  const newInsuranceDocument = new MotorInsuranceDocument({
    ownershipCertificate: req.files["ownershipCertificate"][0]?.path,
    salesAgreement: req.files["salesAgreement"][0]?.path,
    drivingLicense: req.files["drivingLicense"][0]?.path,
    motorDetailId: motorDetail?._id,
  });
  try {
    const savedInsuranceDocument = await newInsuranceDocument.save();
    res.status(200).json(savedInsuranceDocument);
  } catch (error) {
    next(error);
  }
};
