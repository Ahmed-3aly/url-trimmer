import { generatorService } from '../services';
import { generatorServiceExceptions as XCS } from '../services';

const f = generatorService.generate;

function tester(
  length: number,
) {
  const prefix = `"${length}"`;
  let suffix = '';
  if (length < 1) {
    suffix = 'should throw too short exception!';
    it(
      prefix + suffix,
      () => { expect(() => f(length)).toThrow(XCS.tooShort); }
    );
    return;
  }
  if (length > 24) {
    suffix = 'should throw too long exception!';
    it(
      prefix + suffix,
      () => { expect(() => f(length)).toThrow(XCS.tooLong); }
    );
  }
  else {
    suffix = 'should match length!';
    it(
      prefix + suffix,
      () => { expect(f(length)).toHaveLength(length) }
    );
  }
}

tester(0);
tester(25);
tester(8);
tester(16);
tester(24);
