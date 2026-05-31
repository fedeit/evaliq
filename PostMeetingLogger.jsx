// Post-Meeting Logger — lightweight rating + action-item form,
// pre-populated from the brief's coaching questions.

const Stars = ({ value, onChange }) => (
  <div className="stars">
    {[1,2,3,4,5].map(n => (
      <button key={n} className={n <= value ? 'on' : ''}
              onClick={() => onChange(n)} type="button">
        <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26"/></svg>
      </button>
    ))}
  </div>
);

const PostMeetingLogger = ({ a, onBack, onSave }) => {
  const [rating, setRating] = React.useState(4);
  const [outcome, setOutcome] = React.useState('on-track');
  const [notes, setNotes] = React.useState(
    "Maya confirmed the network-team handoff is the main bottleneck. Agreed to shadow Priya for the next two escalations. Asked about Tier 3 path; suggested completing the change-mgmt cert this quarter as a concrete first step."
  );
  const [actionItems, setActionItems] = React.useState([
    { text: "Schedule shadow sessions with Priya", owner: 'Maya', due: '2026-05-13' },
    { text: "Loop in network-team lead on INC-44219 / 44402 / 44587", owner: 'Sam', due: '2026-05-06' },
    { text: "Add change-mgmt cert to Q2 development plan", owner: 'Maya', due: '2026-05-20' },
  ]);

  return (
    <main className="main" style={{ maxWidth: 760 }}>
      <div className="page-head">
        <div>
          <div className="row" style={{ marginBottom: 6 }}>
            <Pill kind="neutral" dot={false}>Post-meeting</Pill>
            <span style={{ fontSize: 12, color: 'var(--fg-muted)' }}>Pre-filled from this morning's brief · auto-saves</span>
          </div>
          <h1 className="page-title">Log {a.name.split(' ')[0]}'s 1:1</h1>
          <p className="page-sub">Today, 10:00 — 10:32 · 32 min · in person</p>
        </div>
      </div>

      <div className="card card-pad-lg">
        <div className="field">
          <label>How did the conversation go?</label>
          <div className="row" style={{ alignItems: 'center', gap: 12 }}>
            <Stars value={rating} onChange={setRating} />
            <span style={{ fontSize: 12, color: 'var(--fg-muted)' }}>
              {rating >= 4 ? 'Productive · clear outcomes' : rating >= 3 ? 'OK · some progress' : 'Difficult · follow up'}
            </span>
          </div>
        </div>

        <div className="field">
          <label>Outcome tag</label>
          <div className="row" style={{ gap: 6 }}>
            {[
              { id: 'on-track', l: 'On track' },
              { id: 'needs-improvement', l: 'Needs improvement' },
              { id: 'exceptional', l: 'Exceptional' },
            ].map(o => (
              <button key={o.id} type="button"
                onClick={() => setOutcome(o.id)}
                className="btn"
                style={{
                  background: outcome === o.id ? 'var(--indigo-50)' : 'white',
                  color: outcome === o.id ? 'var(--indigo-700)' : 'var(--fg-secondary)',
                  border: '1px solid ' + (outcome === o.id ? 'var(--indigo-200)' : 'var(--border-default)'),
                }}>{o.l}</button>
            ))}
          </div>
        </div>

        <div className="field">
          <label>Notes</label>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={5} />
          <span style={{ fontSize: 11, color: 'var(--fg-muted)' }}>Will appear in the next prep brief and seed the HR write-up at review time.</span>
        </div>

        <div className="field">
          <label>Action items</label>
          {actionItems.map((it, i) => (
            <div key={i} className="row" style={{ padding: '10px 0', borderBottom: '1px solid var(--border-subtle)' }}>
              <Icons.CheckCircle />
              <span style={{ flex: 1, fontSize: 13 }}>{it.text}</span>
              <span style={{ fontSize: 11, color: 'var(--fg-muted)', fontFamily: 'var(--font-mono)' }}>{it.owner} · {it.due}</span>
            </div>
          ))}
          <button className="btn btn-ghost" style={{ marginTop: 8 }} type="button"><Icons.Plus />Add action item</button>
        </div>

        <div className="row" style={{ marginTop: 24, paddingTop: 16, borderTop: '1px solid var(--border-default)' }}>
          <span style={{ fontSize: 12, color: 'var(--fg-muted)' }}>Saved · 2 sec ago</span>
          <div style={{ marginLeft: 'auto' }} className="row">
            <button className="btn btn-secondary" type="button">Add to HR file</button>
            <button className="btn btn-primary" type="button" onClick={onSave}><Icons.Check />Done</button>
          </div>
        </div>
      </div>
    </main>
  );
};

window.PostMeetingLogger = PostMeetingLogger;
