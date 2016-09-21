/*eslint-env node, mocha*/
const { expect } = require('chai');
const sinon      = require('sinon');
const Kvasir     = require('../index');

const TEST_NAME  = 'test';
let testDomain   = null;

describe('kvasir', function() {

  beforeEach(() => testDomain = Kvasir(TEST_NAME));

  it('should be a function with an arity of one', () => {

    expect(Kvasir).to.be.a('function');
    expect(Kvasir.length).to.eql(1);

  });


  it('should return a domain object', () => {

    const domain = Kvasir('test');

    expect(domain.find).to.be.a('function');
    expect(domain.findOne).to.be.a('function');
    expect(domain.findById).to.be.a('function');
    expect(domain.save).to.be.a('function');

  });


  describe('::find', function() {

    it('should call the given driver with the name and terms', () => {

      const driver = { find: sinon.stub().returns(42) };
      const terms  = { foo: 'bar' };
      const actual = testDomain.find(driver, terms);

      expect(actual).to.eql(42);
      expect(driver.find.calledOnce).to.be.true;
      expect(driver.find.calledWith(TEST_NAME, terms)).to.be.true;
    });

  });


  describe('::findOne', function() {

    it('should call the given driver with the name and terms', () => {

      const driver = { findOne: sinon.stub().returns(42) };
      const terms  = { foo: 'bar' };
      const actual = testDomain.findOne(driver, terms);

      expect(actual).to.eql(42);
      expect(driver.findOne.calledOnce).to.be.true;
      expect(driver.findOne.calledWith(TEST_NAME, terms)).to.be.true;
    });

  });


  describe('::findById', function() {

    it('should call the given driver with the name and terms', () => {

      const driver = { findById: sinon.stub().returns(42) };
      const terms  = 42;
      const actual = testDomain.findById(driver, terms);

      expect(actual).to.eql(42);
      expect(driver.findById.calledOnce).to.be.true;
      expect(driver.findById.calledWith(TEST_NAME, terms)).to.be.true;
    });

  });


  describe('::save', function() {

    it('should call the insert method when current is null', () => {

      const driver = { create: sinon.stub().returns(42) };
      const terms  = { foo: 'bar' };
      const actual = testDomain.save(driver, terms);

      expect(actual).to.eql(42);
      expect(driver.create.calledOnce).to.be.true;
      expect(driver.create.calledWith(TEST_NAME, terms)).to.be.true;

    });

    it('should call the update method when current is not null', () => {

      const driver  = { update: sinon.stub().returns(42) };
      const request = { foo: 'bar' };
      const current = { id: 123 };
      const actual  = testDomain.save(driver, request, current);

      expect(actual).to.eql(42);
      expect(driver.update.calledOnce).to.be.true;
      expect(driver.update.calledWith(TEST_NAME, request, current)).to.be.true;

    });

       

  });

});
