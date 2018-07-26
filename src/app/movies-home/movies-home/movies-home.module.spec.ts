import { MoviesHomeModule } from './movies-home.module';

describe('MoviesHomeModule', () => {
  let moviesHomeModule: MoviesHomeModule;

  beforeEach(() => {
    moviesHomeModule = new MoviesHomeModule();
  });

  it('should create an instance', () => {
    expect(moviesHomeModule).toBeTruthy();
  });
});
