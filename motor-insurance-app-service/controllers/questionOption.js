import QuestionOption from "../models/QuestionOption.js";

export const createQuestionOption = async (req, res, next) => {
  const newQuestionOption = new QuestionOption(req.body);
  try {
    const savedQuestionOption = await newQuestionOption.save();
    res.status(200).json(savedQuestionOption);
  } catch (error) {
    next(error);
  }
};
export const updateQuestionOption = async (req, res, next) => {
  try {
    const updatedQuestionOption = await QuestionOption.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedQuestionOption);
  } catch (error) {
    next(error);
  }
};
export const deleteQuestionOption = async (req, res, next) => {
  try {
    await QuestionOption.findByIdAndDelete(req.params.id);
    res.status(200).json("QuestionOption has been deleted!");
  } catch (error) {
    next(error);
  }
};

export const getQuestionOption = async (req, res, next) => {
  try {
    const QuestionOption = await QuestionOption.findById(req.params.id);
    res.status(200).json(QuestionOption);
  } catch (error) {
    next(error);
  }
};

export const getQuestionOptions = async (req, res, next) => {
  try {
    const QuestionOptions = await QuestionOption.find()
      .populate("parentQuestion")
      .select("name parentQuestion nextQuestion description");

    res.status(200).json(QuestionOptions);
  } catch (error) {
    next(error);
  }
};

export const getQuestionOptionsByparentId = async (req, res, next) => {
  try {
    const QuestionOptions = await QuestionOption.find({
      parentQuestion: req.params.id,
    })
      .populate("parentQuestion")
      .select("name parentQuestion nextQuestion description");

    res.status(200).json(QuestionOptions);
  } catch (error) {
    next(error);
  }
};

export const getQuestionOptionsWithNoParent = async (req, res, next) => {
  try {
    const QuestionOptions = await QuestionOption.find({
      nextQuestion: null,
    })
      .populate("parentQuestion")
      .select("name parentQuestion nextQuestion description");

    res.status(200).json(QuestionOptions);
  } catch (error) {
    next(error);
  }
};

//export default createQuestionOption;
