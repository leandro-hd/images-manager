const yup = require("yup");
const { User } = require("../models");

class RegisterController {
  async create(req, res) {
    const { name, email, password } = req.body;

    const schema = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().email().required(),
      password: yup.string().required()
    })

    try {
      await schema.validate(req.body, { abortEarly: false })
    } catch (err) {
      return res.status(401).json(err);
    }

    const user = await User.findOne({ where: { email }})

    if (user) {
      return res.status(401).json({ message: "User exists!"});
    }

    await User.create(req.body);

    return res.status(200).json(req.body);
  }
}

module.exports = new RegisterController();