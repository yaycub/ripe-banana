const mongoose = require('mongoose');
const Studio = require('./Studio');

describe('Studio Model', () => {
  it('has a required name', () => {
    const studio = new Studio();
    const { errors } = studio.validateSync();
    
    expect(errors.name.message).toEqual('Path `name` is required.');
  });

  it('has an address field', () => {
    const studio = new Studio({
      name: 'MGM',
      address: {
        city: 'LA',
        state: 'California',
        country: 'USA'
      }
    });

    expect(studio.toJSON()).toEqual({
      _id: expect.any(mongoose.Types.ObjectId),
      name: 'MGM',
      address: {
        city: 'LA',
        state: 'California',
        country: 'USA'
      }
    });
  });
});
