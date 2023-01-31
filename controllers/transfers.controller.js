const Transfer = require('../models/transfer.model');
const User = require('../models/user.model');

exports.transferAmount = async (req, res) => {
  try {
    const { amount, accountNumber, senderUserId } = req.body;

    const userRx = await User.findOne({
      where: {
        status: true,
        accountNumber: accountNumber,
      },
    });

    const receiverUserId = userRx.id;

    const userTx = await User.findOne({
      where: {
        status: true,
        id: senderUserId,
      },
    });

    if (amount > userTx.amount) {
      return res.status(400).json({
        status: 'error',
        message: 'error amount',
      });
    }

    if (receiverUserId === senderUserId) {
      return res.status(400).json({
        status: 'error',
        message: 'error amount',
      });
    }

    const newAmountUserMakeTransfer = userTx.amount - senderUserId.amount;

    const newAmountUserReceiver = userRx.amount + senderUserId.amount;

    await userTx.update({
      amount: newAmountUserMakeTransfer,
    });

    await userRx.update({
      amount: newAmountUserReceiver,
    });

    await Transfer.create({
      amount,
      senderUserId,
      receiverUserId,
    });

    res.status(201).json({
      status: 'success',
      message: 'ROUTE - POST desde el controlador',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};
