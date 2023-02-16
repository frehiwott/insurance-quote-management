import Question from "../models/NewQuestion.js";
import QuestionOption from "../models/QuestionOption.js";

export const createQuestion = async (req, res, next) => {
  const newQuestion = new Question(req.body);
  try {
    const savedQuestion = await newQuestion.save();
    res.status(200).json(savedQuestion);
  } catch (error) {
    next(error);
  }
};
export const updateQuestion = async (req, res, next) => {
  try {
    const updatedQuestion = await Question.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedQuestion);
  } catch (error) {
    next(error);
  }
};
export const deleteQuestion = async (req, res, next) => {
  try {
    await Question.findByIdAndDelete(req.params.id);
    res.status(200).json("Question has been deleted!");
  } catch (error) {
    next(error);
  }
};

export const getQuestion = async (req, res, next) => {
  try {
    const question = await Question.findById(req.params.id);

    // iterate over questions and associate questions options
    let newQuestions = {};

    let questionOptions = await QuestionOption.find({
      parentQuestion: question?._id,
    });
    newQuestions = {
      name: question?.name,
      _id: question?._id,
      controlType: question?.controlType,
      btnNext: question?.btnNext,
      insuranceType: question?.insuranceType,
      description: question?.description,
      choices: questionOptions,
    };
    res.status(200).json(newQuestions);
  } catch (error) {
    next(error);
  }
};

export const getQuestions = async (req, res, next) => {
  try {
    let questions = await Question.find()
      .populate("insuranceType")
      .select("name controlType insuranceType description btnNext");

    // iterate over questions and associate questions options
    let newQuestions = [];

    for (let i = 0; i < questions?.length; i++) {
      let questionOptions = await QuestionOption.find({
        parentQuestion: questions[i]?._id,
      });
      newQuestions.push({
        name: questions[i]?.name,
        _id: questions[i]?._id,
        controlType: questions[i]?.controlType,
        btnNext: questions[i]?.btnNext,
        insuranceType: questions[i]?.insuranceType,
        description: questions[i]?.description,
        choices: questionOptions,
      });
    }

    // const questionsOptions = await QuestionOption.find({parentQuestion: })

    res.status(200).json(newQuestions);
  } catch (error) {
    next(error);
  }
};

export const getTheFirstQuestion = async (req, res, next) => {
  try {
    let question = await Question.findOne({ isFirst: true })
      .populate("insuranceType")
      .select("name controlType insuranceType description btnNext");

    // iterate over questions and associate questions options
    let newQuestions = {};

    let questionOptions = await QuestionOption.find({
      parentQuestion: question?._id,
    });
    newQuestions = {
      name: question?.name,
      _id: question?._id,
      controlType: question?.controlType,
      btnNext: question?.btnNext,
      insuranceType: question?.insuranceType,
      description: question?.description,
      choices: questionOptions,
    };

    // const questionsOptions = await QuestionOption.find({parentQuestion: })

    res.status(200).json(newQuestions);
  } catch (error) {
    next(error);
  }
};

export const getTheFirstQuestionByInsuranceType = async (req, res, next) => {
  try {
    let question = await Question.findOne({
      isFirst: true,
      insuranceType: req.params.insuranceType,
    })
      .populate("insuranceType")
      .select("name controlType insuranceType description btnNext");

    // iterate over questions and associate questions options
    let newQuestions = {};

    let questionOptions = await QuestionOption.find({
      parentQuestion: question?._id,
    });
    newQuestions = {
      name: question?.name,
      _id: question?._id,
      controlType: question?.controlType,
      btnNext: question?.btnNext,
      insuranceType: question?.insuranceType,
      description: question?.description,
      choices: questionOptions,
    };

    // const questionsOptions = await QuestionOption.find({parentQuestion: })

    res.status(200).json(newQuestions);
  } catch (error) {
    next(error);
  }
};

//export default createQuestion;
