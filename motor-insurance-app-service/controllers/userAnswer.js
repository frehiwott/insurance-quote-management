import UserAnswer from '../models/UserAnswer.js';

export const createUserAnswer = async (req, res, next) => {
  const newUserAnswer = new UserAnswer(req.body);
  try {
    const savedUserAnswer = await newUserAnswer.save();
    res.status(200).json(savedUserAnswer);
  } catch (error) {
    next(error);
  }
};
export const updateUserAnswer = async (req, res, next) => {
  try {
    const updatedUserAnswer = await UserAnswer.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUserAnswer);
  } catch (error) {
    next(error);
  }
};
export const deleteUserAnswer = async (req, res, next) => {
  try {
    await UserAnswer.findByIdAndDelete(req.params.id);
    res.status(200).json('UserAnswer has been deleted!');
  } catch (error) {
    next(error);
  }
};

export const getUserAnswer = async (req, res, next) => {
  try {
    const question = await UserAnswer.findById(req.params.id);
    res.status(200).json(question);
  } catch (error) {
    next(error);
  }
};

export const getUserAnswers = async (req, res, next) => {
  try {
    const questions = await UserAnswer.find();

    res.status(200).json(questions);
  } catch (error) {
    next(error);
  }
};

//export default createUserAnswer;
