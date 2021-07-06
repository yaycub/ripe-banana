const mongoose = require('mongoose');
const Actor = require('./Actor');

describe('Actor Model', () => {
  it('requires a name', () => {
    const actor = new Actor();
    const { errors } = actor.validateSync();

    expect(errors.name.message).toEqual('Path `name` is required.');
  });

  it('has a name, dob, and pob', () => {
    const actor = new Actor({
      name: 'Actor Person',
      dob: new Date('1945-12-12'),
      pob: 'A place'
    });

    expect(actor.toJSON()).toEqual({
      _id: expect.any(mongoose.Types.ObjectId),
      name: 'Actor Person',
      dob: new Date('1945-12-12'),
      pob: 'A place'
    });
  });
});
