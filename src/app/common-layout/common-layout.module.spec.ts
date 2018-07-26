import { CommonLayoutModule } from './common-layout.module';

describe('CommonLayoutModule', () => {
  let commonLayoutModule: CommonLayoutModule;

  beforeEach(() => {
    commonLayoutModule = new CommonLayoutModule();
  });

  it('should create an instance', () => {
    expect(commonLayoutModule).toBeTruthy();
  });
});
