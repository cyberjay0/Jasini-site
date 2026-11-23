export function SectionHead({ index, title, id, note }: { index: string; title: string; id: string; note: string }) {
  return (
    <div className="ko-section-head">
      <div className="ko-rule" aria-hidden="true" />
      <div className="ko-section-row">
        <span className="ko-section-index">({index})</span>
        <h2 id={id} tabIndex={-1}>
          <span className="ko-line">
            <span>{title}</span>
          </span>
        </h2>
        <p>{note}</p>
      </div>
    </div>
  );
}
