import { jasiniGlyphs } from "./jasini-glyphs";

export type PlacedGlyph = { key: string; d: string; x: number };

/**
 * Lays out the JASINI outline paths left to right.
 * Units are font units (2000 per em); y runs from 0 (cap top) to capHeight (baseline).
 */
export function layoutWord(trackingEm = -0.02) {
  const { unitsPerEm, capHeight, glyphs } = jasiniGlyphs;
  const tracking = trackingEm * unitsPerEm;
  let x = 0;
  const placed: PlacedGlyph[] = glyphs.map((glyph, index) => {
    const item = { key: `${glyph.char}${index}`, d: glyph.d, x };
    x += glyph.advance + tracking;
    return item;
  });
  const last = glyphs[glyphs.length - 1];
  const minX = glyphs[0].bounds[0];
  const maxX = placed[placed.length - 1].x + last.bounds[2];
  return { placed, minX, maxX, capHeight };
}
