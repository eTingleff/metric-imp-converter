'use strict';

const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {

  let convertHandler = new ConvertHandler();

  app.get('/api/convert', (req, res) => {
    const { input } = req.query;
    const invalidInputs = [];

    if (!input.trim()) {

      return res.status(400).json({
        message: 'Input units are required',
      });
    }

    const combinedStr = input.trim();

    const initNum = convertHandler.getNum(combinedStr);
    const initUnit = convertHandler.getUnit(combinedStr);

    if (initNum instanceof Error || isNaN(initNum)) {
      invalidInputs.push('number');
    }

    if (initUnit instanceof Error) {
      invalidInputs.push('unit');
    }

    if (invalidInputs.length) {
      const response = {
        message: 'Invalid input',
        invalidInputs,
      };

      return res.status(400).json(response);
    }

    const returnNum = convertHandler.convert(initNum, initUnit);
    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const string = convertHandler.getString(
      initNum,
      initUnit,
      returnNum,
      returnUnit,
    );

    return res.status(200).json({
      initNum,
      initUnit,
      returnNum,
      returnUnit,
      string,
    });
  });
};
