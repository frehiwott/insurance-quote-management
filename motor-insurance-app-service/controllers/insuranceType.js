import InsuranceType from "../models/InsuranceType.js";
import NewQuestion from "../models/NewQuestion.js";

export const createInsuranceType = async (req, res, next) => {
  const newInsuranceType = new InsuranceType(req.body);
  try {
    const savedInsuranceType = await newInsuranceType.save();
    res.status(200).json(savedInsuranceType);
  } catch (error) {
    next(error);
  }
};

export const updateInsuranceType = async (req, res, next) => {
  try {
    const updatedInsuranceType = await InsuranceType.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedInsuranceType);
  } catch (error) {
    next(error);
  }
};
export const deleteInsuranceType = async (req, res, next) => {
  try {
    await InsuranceType.findByIdAndDelete(req.params.id);
    res.status(200).json("InsuranceType has been deleted!");
  } catch (error) {
    next(error);
  }
};

export const getInsuranceType = async (req, res, next) => {
  try {
    const InsuranceType = await InsuranceType.findById(req.params.id);
    res.status(200).json(InsuranceType);
  } catch (error) {
    next(error);
  }
};

export const getInsuranceTypes = async (req, res, next) => {

  console.log("under get insurance types ", )
  try {
    const InsuranceTypes = await InsuranceType.find();
    let types = [];

    console.log("insurance type ..", InsuranceTypes)

    // iterate over the insurance types and add questions count
    for(let i = 0; i < InsuranceTypes?.length; i++)
    {
      let id = InsuranceTypes[i]?._id;

      let questionCount = await NewQuestion.count({insuranceType: id});
      console.log("question count is ", questionCount)

      types.push({
        _id: InsuranceTypes[i]?._id,
        name: InsuranceTypes[i]?.name,
        type: InsuranceTypes[i]?.type,
        questionCount: questionCount
      })
    }

    res.status(200).json(types);
  } catch (error) {
    next(error);
  }
};

//export default createInsuranceType;
