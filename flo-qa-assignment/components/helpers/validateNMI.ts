/**
 * Valid NMI prefixes
 */
export type nmiPrefix =
  | 'NEM'
  | 'ACT'
  | 'NSW'
  | 'NT'
  | 'QLD'
  | 'SA'
  | 'TAS'
  | 'VIC'
  | 'WA';
export const nmiPrefixes: nmiPrefix[] = [
  'NEM',
  'ACT',
  'NSW',
  'NT',
  'QLD',
  'SA',
  'TAS',
  'VIC',
  'WA',
];

/**
 * Validates an Australian National Metering Identifier (NMI)
 */
export const validateNMI = (nmi?: string) => {
  if (!nmi) {
    throw new Error('missing NMI');
  }

  const pattern = /^(NEM|ACT|NSW|NT|QLD|SA|TAS|VIC|WA)\d{7,8}$/;
  if (!pattern.test(nmi)) {
    throw new Error(`invalid NMI`);
  }

  return true;
};
