const User = require('../models/user.model');

exports.register = async (req, res) => {
  try {
    const { name, accountNumber, password } = req.body;
    const newUser = await User.create({
      name: name.toLowerCase(),
      accountNumber: Math.floor(Math.random() * 100000),
      password,
      amount: 1000,
    });

    res.status(201).json({
      status: 'success',
      message: 'The product was created Successfully',
      newUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { password, accountNumber } = req.body;

    const login = await User.findOne({
      where: {
        status: true,
        accountNumber,
        password: password,
      },
    });

    if (!login) {
      return res.status(404).json({
        status: 'error',
        message: 'The user was not found',
      });
    }
    return res.status(200).json({
      status: 'Success',
      message: 'Users was found successfully',
      login,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};
