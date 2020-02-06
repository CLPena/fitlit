const chai = require('chai');
const expect = chai.expect;
const Hydration = require('../src/Hydration');
const User = require('../src/User');

describe('Hydration', function() {
  let hydration;
  let user;

  beforeEach(function() {
    hydration = new Hydration(1, '2019/06/15', 37);
    user = new User({id: 1, name: 'Luisa Hane', address: '15195 Nakia Tunnel, Erdmanport VA 19901-1697', email: 'Diana.Hayes1@hotmail.com', strideLength: 4.3, dailyStepGoal: 10000, friends: [16, 4, 8]});
  });

  it('should be a function', function() {
    expect(Hydration).to.be.a('function');
  });

  it('should be an instance of Hydration', function() {
    expect(hydration).to.be.an.instanceof(Hydration);
  });

  describe('Hydration Records', function() {
    let hydration1;
    let hydration2;
    let hydration3;
    let hydration4;
    let hydration5;
    let hydration6;
    let hydration7;
    let hydration8;
    let hydration9;
    let hydration10;
    let hydration11;
    let hydration12;
    beforeEach(function() {
      hydration1 = new Hydration(1, "2019/06/15", 37);
      hydration2 = new Hydration(1, "2019/06/16", 75);
      hydration3 = new Hydration(1, "2019/06/17", 42);
      hydration4 = new Hydration(1, "2018/06/18", 49);
      hydration5 = new Hydration(1, "2019/06/19", 56);
      hydration6 = new Hydration(1, "2019/06/20", 34);
      hydration7 = new Hydration(1, "2019/06/21", 65);
      hydration8 = new Hydration(1, "2019/06/22", 77);
      hydration9 = new Hydration(1, "2019/06/23", 100);
      hydration10 = new Hydration(1, "2019/06/24", 67);
      hydration11 = new Hydration(1, "2019/06/25", 84);
      hydration12 = new Hydration(1, "2019/06/26", 49);
      hydration1.logHydration(user);
      hydration2.logHydration(user)
      hydration3.logHydration(user)
      hydration4.logHydration(user)
      hydration5.logHydration(user)
      hydration6.logHydration(user)
      hydration7.logHydration(user)
      hydration8.logHydration(user)
      hydration9.logHydration(user)
      hydration10.logHydration(user)
      hydration11.logHydration(user)
      hydration12.logHydration(user)
    })

    it('should calculate the average fluid ounces consumed daily for all time', function() {
      expect(hydration.calculateAvgHydration(user)).to.equal(61);
    });

    it('should find how many ounces were consumed on a given day', function() {
      expect(hydration.findDailyHydration(user, "2019/06/21")).to.equal(65);
    });

    it('find How many fluid ounces of water consumed each day over the course of a week (7 days)', function() {
      expect(hydration.findWeeklyHydration(user, "2019/06/25").length).to.equal(7);
      expect(hydration.findWeeklyHydration(user, "2019/06/26").length).to.equal(7);
    });
  });
});
