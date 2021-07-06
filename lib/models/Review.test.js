const Review = require('./Review');

describe('Review Model', () => {
  it('requires a rating', () => {
    const review = new Review();
    const { errors } = review.validateSync();

    expect(errors.rating.message).toEqual('Path `rating` is required.');
  });

  it('requires a rating more than -1', () => {
    const review = new Review({ rating: -1 });
    const { errors } = review.validateSync();

    expect(errors.rating.message).toEqual('Path `rating` (-1) is less than minimum allowed value (0).');
  });

  it('requires a rating less than 5', () => {
    const review = new Review({ rating: 6 });
    const { errors } = review.validateSync();

    expect(errors.rating.message).toEqual('Path `rating` (6) is more than maximum allowed value (5).');
  });

  it('requires a reviewer', () => {
    const review = new Review();
    const { errors } = review.validateSync();

    expect(errors.reviewer.message).toEqual('Path `reviewer` is required.');
  });

  it('requires a review', () => {
    const review = new Review();
    const { errors } = review.validateSync();

    expect(errors.review.message).toEqual('Path `review` is required.');
  });

  it('requires a review less than 140 characters', () => {
    const review = new Review({ review: ('a').repeat(141) });
    const { errors } = review.validateSync();

    expect(errors.review.message).toEqual('Path `review` (`aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`) is longer than the maximum allowed length (140).');
  });

  it('requires a film id', () => {
    const review = new Review();
    const { errors } = review.validateSync();

    expect(errors.film.message).toEqual('Path `film` is required.');
  });
});
