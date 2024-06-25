import { MovieTimeFormatingPipe } from './movie-time-formating.pipe';

describe('MovieTimeFormatingPipe', () => {
  it('create an instance', () => {
    const pipe = new MovieTimeFormatingPipe();
    expect(pipe).toBeTruthy();
  });
});
