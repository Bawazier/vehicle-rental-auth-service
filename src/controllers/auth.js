const {User} = require("../models");
const bcrypt = require("bcrypt");

module.exports = {
  register: async (req, res) => {
    try{
      const hashPassword = await bcrypt.hash(
        req.body.password,
        Number(process.env.SALT_ROUND)
      );
      const data = { ...req.body, password: hashPassword };
      const [user, created] = await User.findOrCreate({
        where: { email: data.email },
        defaults: data,
      });
      if(created){
        return res.status(200).json({
          success: true,
          message: "Success register",
          result: {name: user.name, email: user.email, phone: user.phone},
        });
      } else{
        return res.status(400).json({
          success: false,
          message: "Email already exists",
        });
      }
    }catch(error){
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },

  login: async (req, res) => {
    try{
      const userByEmail = await User.findOne({ where: { email: req.body.email } });

      if (!userByEmail) {
        return res.status(404).json({
          success: false,
          message: "Email not found",
        });
      }
      const comparePass = await bcrypt.compareSync(
        req.body.password,
        userByEmail.password
      );
      if (!comparePass) {
        return res.status(400).json({
          success: false,
          message: "Password not valid",
        });
      }
      return res.status(200).json({
        success: true,
        result: {
          id: userByEmail.id,
          fullname: userByEmail.fullname,
          email: userByEmail.email,
          role: userByEmail.role,
        },
      });
    }catch(error){
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
};