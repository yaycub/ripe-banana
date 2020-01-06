const mongoose = require('mongoose');
const Film = require('./Film');

describe('Film Model', () => {
  it('requires a title', () => {
    const film = new Film();
    const { errors } = film.validateSync();

    expect(errors.title.message).toEqual('Path `title` is required.');
  });

  it('requires a studio', () => {
    const film = new Film();
    const { errors } = film.validateSync();

    expect(errors.studio.message).toEqual('Path `studio` is required.');
  });

  it('requires a released path', () => {
    const film = new Film();
    const { errors } = film.validateSync();

    expect(errors.released.message).toEqual('Path `released` is required.');
  });
});
