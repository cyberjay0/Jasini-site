/** Knockout style wordmark: every letter sits in its own mask so it can rise into place. */
export function SolidWordmark({ stamp }: { stamp?: string }) {
  return (
    <span className="ko-word" aria-hidden="true">
      {Array.from("JASINI", (letter, index) => (
        <span key={index} className="ko-glyph">
          <span className="ko-glyph-ink">{letter}</span>
        </span>
      ))}
      {stamp && <span className="ko-word-stamp">{stamp}</span>}
    </span>
  );
}
