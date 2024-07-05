import { RatingRoundingPipe } from './rating-rounding.pipe';

describe('RatingRoundingPipe', () => {
  it('create an instance', () => {
    const pipe = new RatingRoundingPipe();
    expect(pipe).toBeTruthy();
  });
});
