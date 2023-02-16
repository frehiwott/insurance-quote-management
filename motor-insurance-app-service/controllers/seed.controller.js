import Question from "../models/NewQuestion.js";
import InsuranceType from "../models/InsuranceType.js";
import QuestionOption from "../models/QuestionOption.js";

export const seedQuestionToDB = async (selectedQuestion) => {
  // grab the insurance type from the db
  let insuranceType = await InsuranceType.findOne({
    type: selectedQuestion?.insuranceType,
  });

  // save the parent question according the specified modal
  const newQuestion = new Question({
    name: selectedQuestion?.name,
    controlType: selectedQuestion?.controlType,
    isFirst: selectedQuestion?.isFirst,
    insuranceType: insuranceType?.id ? insuranceType?.id : null,
    description: selectedQuestion?.description
  });

  try {
    // save question
    const savedQuestion = await newQuestion.save();

    // iterate over the questions
    selectedQuestion.children.map(async (question, index) => {
      // find next question info
      let findNextQuestion = await Question.findOne({
        name: question?.nextQuestion,
      });

      // set parent and next question id
      question.nextQuestion = findNextQuestion?.id
        ? findNextQuestion?.id
        : null;
      question.parentQuestion = newQuestion?.id;

      // create question options
      const newOption = new QuestionOption(question);
      const createdOption = await newOption.save(question);

      return createdOption;

      // }
    });
    return true;
  } catch (error) {
  }
};

export const seedInsuranceType = async (selectedInsuranceType) => {
  // save the parent question according the specified modal
  const newInsuranceType = new InsuranceType({
    name: selectedInsuranceType?.name,
    type: selectedInsuranceType?.type,
  });

  try {
    // save question
    const savedInsurance = await newInsuranceType.save();

    return true;
  } catch (error) {
  }
};
