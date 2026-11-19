export const eselonMapping = (eselonName: string): string | null => {
  if (eselonName?.toUpperCase().includes('LAUT')) return 'Direktorat Jenderal Perhubungan Laut';
  if (eselonName?.toUpperCase().includes('DARAT')) return 'Direktorat Jenderal Perhubungan Darat';
  if (eselonName?.toUpperCase().includes('UDARA')) return 'Direktorat Jenderal Perhubungan Udara';
  if (eselonName?.toUpperCase().includes('PERKERETAAPIAN')) return 'Direktorat Jenderal Perkeretaapian';
  return eselonName;
};

export const matraMapping = (eselonName: string): string | null => {
  const upper = eselonName?.toUpperCase() ?? '';

  if (upper.includes('LAUT')) return 'LAUT';
  if (upper.includes('DARAT')) return 'DARAT';
  if (upper.includes('UDARA')) return 'UDARA';
  if (upper.includes('PERKERETAAPIAN')) return 'PERKERETAAPIAN';

  return eselonName;
};
