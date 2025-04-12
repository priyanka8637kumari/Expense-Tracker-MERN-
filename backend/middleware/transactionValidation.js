import Joi from "joi";

const createValidation = (req, res, next) => {
  const schema = Joi.object({
    userId: Joi.string().required(),
    //transactionId: Joi.string().required(),
    text: Joi.string().required(),
    amount: Joi.number().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

const updateValidation = (req, res, next) => {
  const schema = Joi.object({
    userId: Joi.string().required(),
    transactionId: Joi.string().required(),
    text: Joi.string().required(),
    amount: Joi.number().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

export { createValidation, updateValidation };
