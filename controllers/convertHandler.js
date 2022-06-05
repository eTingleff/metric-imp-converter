const GAL_REGEX = 'gal(lons?)?$';
const LITER_REGEX = 'l(iters?)?$';
const LBS_REGEX = '(lbs|pounds?)$';
const KG_REGEX = '(kg|kilograms?)$';
const MI_REGEX = 'mi(les?)?$';
const KM_REGEX = '(km|kilometers?)$';
const NUM_REGEX = '^[0-9]*\\.?[0-9]*\\/?[0-9]*\\.?[0-9]*';

class ConvertHandler {

  getNum(input) {
    let result = 1;
    const unitsRegex =
      new RegExp(
        `(${GAL_REGEX}|${LITER_REGEX}|${LBS_REGEX}|${KG_REGEX}|${MI_REGEX}|${KM_REGEX})`,
        'i'
      );

    const partsArr = input.split(unitsRegex);
    const numRegex = new RegExp(NUM_REGEX);

    if (partsArr[0] && numRegex.test(partsArr[0])) {
      const numStr = partsArr[0];
      const fractionRegex = /\//g;
      if (fractionRegex.test(numStr)) {
        let fractionArr = numStr.split('/');
        if (fractionArr.length && fractionArr.length !== 2) {

          return new Error('invalid input number');
        }

        result = parseFloat(fractionArr[0], 10) / parseFloat(fractionArr[1], 10);
      } else {
        result = parseFloat(numStr, 10);
      }
    }

    return result;
  };

  getUnit(input) {
    let result;
    const galRegex = new RegExp(`${NUM_REGEX}[^a-z]*${GAL_REGEX}`, 'i');
    const literRegex = new RegExp(`${NUM_REGEX}[^a-z]*${LITER_REGEX}`, 'i');
    const lbsRegex = new RegExp(`${NUM_REGEX}[^a-z]*${LBS_REGEX}`, 'i');
    const kgRegex = new RegExp(`${NUM_REGEX}[^a-z]*${KG_REGEX}`, 'i');
    const miRegex = new RegExp(`${NUM_REGEX}[^a-z]*${MI_REGEX}`, 'i');
    const kmRegex = new RegExp(`${NUM_REGEX}[^a-z]*${KM_REGEX}`, 'i');

    if (galRegex.test(input)) {
      result = 'gal';
    } else if (literRegex.test(input)) {
      result = 'L';
    } else if (lbsRegex.test(input)) {
      result = 'lbs';
    } else if (kgRegex.test(input)) {
      result = 'kg';
    } else if (miRegex.test(input)) {
      result = 'mi';
    } else if (kmRegex.test(input)) {
      result = 'km';
    } else {
      return new Error('Invalid input unit');
    }

    return result;
  };

  getReturnUnit(initUnit) {
    let result;
    switch (initUnit) {
      case 'gal': {
        result = 'L';
        break;
      }
      case 'L': {
        result = 'gal';
        break;
      }
      case 'lbs': {
        result = 'kg';
        break;
      }
      case 'kg': {
        result = 'lbs';
        break;
      }
      case 'mi': {
        result = 'km';
        break;
      }
      case 'km': {
        result = 'mi';
        break;
      }
      default: {
        result = new Error('invalid input unit');
      }
    }

    return result;
  };

  spellOutUnit(unit) {
    let result;
    switch (unit) {
      case 'gal': {
        result = 'gallon';
        break;
      }
      case 'L': {
        result = 'liter';
        break;
      }
      case 'lbs': {
        result = 'pound';
        break;
      }
      case 'kg': {
        result = 'kilogram';
        break;
      }
      case 'mi': {
        result = 'mile';
        break;
      }
      case 'km': {
        result = 'kilometer';
      }
    }

    return result;
  };

  convert(initNum, initUnit) {
    let result;
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    if (initUnit === 'gal' || initUnit === 'L') {
      result = initUnit === 'gal'
        ? initNum * galToL
        : initNum / galToL;
    } else if (initUnit === 'lbs' || initUnit === 'kg') {
      result = initUnit === 'lbs'
        ? initNum * lbsToKg
        : initNum / lbsToKg;
    } else if (initUnit === 'mi' || initUnit === 'km') {
      result = initUnit === 'mi'
        ? initNum * miToKm
        : initNum / miToKm;
    }

    return result;
  };

  getString(initNum, initUnit, returnNum, returnUnit) {
    let input = `${initNum} ${this.spellOutUnit(initUnit)}${initNum === 1 ? '' : 's'}`;
    let output = `${returnNum} ${this.spellOutUnit(returnUnit)}${returnNum === 1 ? '' : 's'}`;
    let result = `${input} converts to ${output}`;

    return result;
  };
}

module.exports = ConvertHandler;
