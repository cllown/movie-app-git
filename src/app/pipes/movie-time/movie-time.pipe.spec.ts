import { MovieTimePipe } from './movie-time.pipe';

describe('MovieTimePipe', () => {
  it('create an instance', () => {
    const pipe = new MovieTimePipe();
    expect(pipe).toBeTruthy();
  });
});
