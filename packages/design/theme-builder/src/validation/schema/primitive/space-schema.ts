import { z } from 'zod';
import { createPixelSchema, createTokenSchema } from '../shared.js';

function createSpaceSchema(name: string) {
  return createTokenSchema({
    type: 'dimension',
    valueSchema: createPixelSchema('space'),
    name,
  });
}

export const spaceSchema = z
  .object(
    {
      0: createSpaceSchema('0'),
      px: createSpaceSchema('px'),
      '0-5': createSpaceSchema('0.5'),
      1: createSpaceSchema('1'),
      '1-5': createSpaceSchema('1.5'),
      2: createSpaceSchema('2'),
      '2-5': createSpaceSchema('2.5'),
      3: createSpaceSchema('3'),
      '3-5': createSpaceSchema('3.5'),
      4: createSpaceSchema('4'),
      5: createSpaceSchema('5'),
      6: createSpaceSchema('6'),
      7: createSpaceSchema('7'),
      8: createSpaceSchema('8'),
      9: createSpaceSchema('9'),
      10: createSpaceSchema('10'),
      11: createSpaceSchema('11'),
      12: createSpaceSchema('12'),
      13: createSpaceSchema('13'),
      14: createSpaceSchema('14'),
      16: createSpaceSchema('16'),
      18: createSpaceSchema('18'),
      19: createSpaceSchema('19'),
      20: createSpaceSchema('20'),
      24: createSpaceSchema('24'),
      28: createSpaceSchema('28'),
      30: createSpaceSchema('30'),
      32: createSpaceSchema('32'),
      36: createSpaceSchema('36'),
      40: createSpaceSchema('40'),
      44: createSpaceSchema('44'),
      48: createSpaceSchema('48'),
      52: createSpaceSchema('52'),
      56: createSpaceSchema('56'),
      60: createSpaceSchema('60'),
      64: createSpaceSchema('64'),
      70: createSpaceSchema('70'),
      72: createSpaceSchema('72'),
      80: createSpaceSchema('80'),
      86: createSpaceSchema('86'),
      94: createSpaceSchema('94'),
      96: createSpaceSchema('96'),
      100: createSpaceSchema('100'),
      105: createSpaceSchema('105'),
      120: createSpaceSchema('120'),
      135: createSpaceSchema('135'),
      192: createSpaceSchema('192'),
      160: createSpaceSchema('160'),
      240: createSpaceSchema('240'),
    },
    {
      required_error: 'space is required.',
    },
  )
  .strict();
