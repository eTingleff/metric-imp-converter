const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', () => {
  test('ConvertHandler.getNum should correctly read a whole number input', (done) => {
    const input = '17gal';
    assert.equal(convertHandler.getNum(input), 17);
    done();
  });

  test('ConvertHandler.getNum should correctly read a decimal number input', (done) => {
    const input = '17.66km';
    assert.equal(convertHandler.getNum(input), 17.66);
    done();
  });

  test('ConvertHandler.getNum should correctly read a fractional input', (done) => {
    const input = '2/7kg';
    const actual = convertHandler.getNum(input);
    const expected = 0.285;
    const delta = 0.01;
    assert.approximately(actual, expected, delta);
    done();
  });

  test('ConvertHandler.getNum should correctly read a fractional input with a decimal', (done) => {
    const input = '3.33/10L';
    const actual = convertHandler.getNum(input);
    const expected = 0.333;
    const delta = 0.01;
    assert.approximately(actual, expected, delta);
    done();
  });

  test('ConvertHandler.getNum should correctly return an error on a double-fraction', (done) => {
    const input = '1/2/3mi';
    const result = convertHandler.getNum(input);
    assert.instanceOf(result, Error)
    assert.equal(result.message, 'invalid input number');
    done();
  });

  test('ConvertHandler.getNum should correctly default to a numerical input of 1 when no numerical input is provided', (done) => {
    const input = 'kg';
    assert.equal(convertHandler.getNum(input), 1);
    done();
  });

  test('ConvertHandler.getUnit should correctly read input unit "gal"', (done) => {
    assert.equal(convertHandler.getUnit('10gal'), 'gal');
    assert.equal(convertHandler.getUnit('1/3.5gal'), 'gal');
    done();
  });

  test('ConvertHandler.getUnit should correctly read input unit "L"', (done) => {
    assert.equal(convertHandler.getUnit('10l'), 'L');
    assert.equal(convertHandler.getUnit('10L'), 'L');
    assert.equal(convertHandler.getUnit('10liters'), 'L');
    done();
  });

  test('ConvertHandler.getUnit should correctly read input unit "lbs"', (done) => {
    assert.equal(convertHandler.getUnit('10lbs'), 'lbs');
    done();
  });

  test('ConvertHandler.getUnit should correctly read input unit "kg"', (done) => {
    assert.equal(convertHandler.getUnit('10kg'), 'kg');
    assert.equal(convertHandler.getUnit('1kilogram'), 'kg');
    assert.equal(convertHandler.getUnit('10kilograms'), 'kg');
    done();
  });

  test('ConvertHandler.getUnit should correctly read input unit "mi"', (done) => {
    assert.equal(convertHandler.getUnit('10mi'), 'mi');
    assert.equal(convertHandler.getUnit('1mile'), 'mi');
    assert.equal(convertHandler.getUnit('10miles'), 'mi');
    done();
  });

  test('ConvertHandler.getUnit should correctly read input unit "km"', (done) => {
    assert.equal(convertHandler.getUnit('10km'), 'km');
    assert.equal(convertHandler.getUnit('1kilometer'), 'km');
    assert.equal(convertHandler.getUnit('10kilometers'), 'km');
    done();
  });

  test('ConvertHandler.getUnit should correctly return an error for an invalid input unit', (done) => {
    const inputArray = ['5mm', '5kmmi', '5Lgalkglbskmmi'];
    inputArray.forEach((input) => {
      const result = convertHandler.getUnit(input);
      assert.instanceOf(result, Error)
      assert.equal(result.message, 'Invalid input unit');
    });
    done();
  });

  test('ConvertHandler.getReturnUnit should return the correct return unit for each valid input unit', (done) => {
    const imperialUnits = ['gal', 'lbs', 'mi'];
    const metricUnits = ['L', 'kg', 'km'];
    imperialUnits.forEach((unit, index) => {
      assert.equal(convertHandler.getReturnUnit(unit), metricUnits[index]);
    });
    metricUnits.forEach((unit, index) => {
      assert.equal(convertHandler.getReturnUnit(unit), imperialUnits[index]);
    });
    done();
  });

  test('ConvertHandler.spellOutUnit should correctly return the spelled-out string unit for each valid input unit', (done) => {
    const units = ['gal', 'L', 'lbs', 'kg', 'mi', 'km'];
    const fullStrings = ['gallon', 'liter', 'pound', 'kilogram', 'mile', 'kilometer'];
    units.forEach((unit, index) => {
      assert.equal(convertHandler.spellOutUnit(unit), fullStrings[index]);
    });
    done();
  });

  test('ConvertHandler should correctly convert gal to L', (done) => {
    assert.approximately(convertHandler.convert(6, 'gal'), 22.71247, 0.01);
    done();
  });

  test('ConvertHandler should correctly convert L to gal', (done) => {
    assert.approximately(convertHandler.convert(6, 'L'), 1.585032, 0.01);
    done();
  });

  test('ConvertHandler should correctly convert mi to km', (done) => {
    assert.approximately(convertHandler.convert(6, 'mi'), 9.656064, 0.01);
    done();
  });

  test('ConvertHandler should correctly convert km to mi', (done) => {
    assert.approximately(convertHandler.convert(6, 'km'), 3.728227, 0.01);
    done();
  });

  test('ConvertHandler should correctly convert lbs to kg', (done) => {
    assert.approximately(convertHandler.convert(6, 'lbs'), 2.721554, 0.01);
    done();
  });

  test('ConvertHandler should correctly convert kg to lbs', (done) => {
    assert.approximately(convertHandler.convert(6, 'kg'), 13.22774, 0.01);
    done();
  });
});