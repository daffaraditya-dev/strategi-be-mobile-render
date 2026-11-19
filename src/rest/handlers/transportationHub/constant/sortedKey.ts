import { Moda } from "@/type/produksi.titik.type";
import { SumType } from "@/type/produksi.type";

export const sortedKey: Record<Moda, SumType> = {
  asdp: { keyData: ['pnp'] },
  jalan: { keyData: ['jml_pnp_brgkt', 'jml_pnp_dtg'] },
  laut: { keyData: ['naik', 'turun'] },
  stasiun: { keyData: ['penumpang_berangkat_antarkota', 'penumpang_datang_antarkota'] },
  udara: { keyData: ['jml_pnp_dtg_dom', 'jml_pnp_brkt_dom'] },
  arteri: { keyData: ['jml_dari_jkt'] },
  toll: { keyData: ['jml_dari_jkt'] },
  terminalb: { keyData: ['jml_pnp_brgkt'] },
  ka: { keyData: ['naik'] },
  kai: { keyData: ['naik'] },
};