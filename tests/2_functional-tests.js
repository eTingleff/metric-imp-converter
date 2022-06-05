const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', () => {

  suite('Routing Tests', () => {

    suite('GET /api/convert => conversion object', () => {

      test('Convert with a valid input', (done) => {
        chai.request(server)
          .get('/api/convert')
          .query({ input: '10L' })
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body.initNum, 10);
            assert.equal(res.body.initUnit, 'L');
            assert.approximately(res.body.returnNum, 2.641721, 0.01);
            assert.equal(res.body.returnUnit, 'gal');
            assert.equal(res.body.string, '10 liters converts to 2.6417217685798895 gallons');
            done();
          });
      });

      test('Convert with an invalid input unit', (done) => {
        chai.request(server)
          .get('/api/convert')
          .query({ input: '32g' })
          .end((err, res) => {
            assert.equal(res.status, 400);
            assert.equal(res.body.message, 'Invalid input');
            assert.lengthOf(res.body.invalidInputs, 1)
            assert.equal(res.body.invalidInputs[0], 'unit')
            done();
          });
      });

      test('Convert with an invalid input number', (done) => {
        chai.request(server)
          .get('/api/convert')
          .query({ input: '1/2/3km' })
          .end((err, res) => {
            assert.equal(res.status, 400);
            assert.equal(res.body.message, 'Invalid input');
            assert.lengthOf(res.body.invalidInputs, 1);
            assert.equal(res.body.invalidInputs[0], 'number');
            done();
          });
      });

      test('Convert with an invalid input number and unit', (done) => {
        chai.request(server)
          .get('/api/convert')
          .query({ input: '1/2/3mm' })
          .end((err, res) => {
            assert.equal(res.status, 400);
            assert.equal(res.body.message, 'Invalid input');
            assert.lengthOf(res.body.invalidInputs, 2);
            assert.equal(res.body.invalidInputs[0], 'number');
            assert.equal(res.body.invalidInputs[1], 'unit');
            done();
          });
      });

      test('Convert with no provided input number', (done) => {
        chai.request(server)
          .get('/api/convert')
          .query({ input: 'gal' })
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body.initNum, 1);
            assert.equal(res.body.initUnit, 'gal');
            assert.approximately(res.body.returnNum, 3.785412, 0.01);
            assert.equal(res.body.returnUnit, 'L');
            assert.equal(res.body.string, '1 gallon converts to 3.78541 liters');
            done();
          });
      });

    });

  });

});
