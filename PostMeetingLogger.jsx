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

const OUTCOME_LABELS = {
  'on-track': 'On track',
  'needs-improvement': 'Needs improvement',
  'exceptional': 'Exceptional',
};

const EmailPreview = ({ a, rating, outcome, notes, actionItems }) => (
  <div style={{
    border: '1px solid var(--border-default)', borderRadius: 8,
    background: 'white', overflow: 'hidden', maxWidth: 600, marginTop: 24,
  }}>
    <div style={{
      padding: '12px 20px', borderBottom: '1px solid var(--border-subtle)',
      background: 'var(--bg-surface-2)',
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {[
          ['From', 'EvalIQ <noreply@evaliq.app>'],
          ['To', 'sam.hidalgo@stanford.edu'],
          ['Subject', `1:1 note saved — ${a.name} · May 1, 2026`],
        ].map(([k, v]) => (
          <div key={k} style={{ display: 'flex', gap: 12, fontSize: 12 }}>
            <span style={{ color: 'var(--fg-muted)', width: 48, flexShrink: 0 }}>{k}</span>
            <span style={{ color: 'var(--fg-primary)', fontFamily: k === 'Subject' ? 'var(--font-sans)' : 'var(--font-mono)', fontWeight: k === 'Subject' ? 500 : 400 }}>{v}</span>
          </div>
        ))}
      </div>
    </div>
    <div style={{ padding: '20px 24px' }}>
      <p style={{ fontSize: 13, color: 'var(--fg-secondary)', margin: '0 0 16px', lineHeight: 1.6 }}>
        Your 1:1 note with <strong style={{ color: 'var(--fg-primary)' }}>{a.name}</strong> has been saved and added to their profile. This summary will seed the next prep brief.
      </p>
      <div style={{ display: 'flex', gap: 16, padding: '12px 0', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)', marginBottom: 16 }}>
        <div>
          <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--fg-muted)', fontWeight: 600, marginBottom: 4 }}>Rating</div>
          <div style={{ fontSize: 13, color: 'var(--fg-primary)', fontWeight: 500 }}>{'★'.repeat(rating)}{'☆'.repeat(5 - rating)}</div>
        </div>
        <div style={{ width: 1, background: 'var(--border-subtle)' }} />
        <div>
          <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--fg-muted)', fontWeight: 600, marginBottom: 4 }}>Outcome</div>
          <div style={{ fontSize: 13, color: 'var(--fg-primary)', fontWeight: 500 }}>{OUTCOME_LABELS[outcome]}</div>
        </div>
        <div style={{ width: 1, background: 'var(--border-subtle)' }} />
        <div>
          <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--fg-muted)', fontWeight: 600, marginBottom: 4 }}>Action items</div>
          <div style={{ fontSize: 13, color: 'var(--fg-primary)', fontWeight: 500 }}>{actionItems.length}</div>
        </div>
      </div>
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--fg-muted)', fontWeight: 600, marginBottom: 8 }}>Notes</div>
        <p style={{ fontSize: 13, color: 'var(--slate-800)', lineHeight: 1.6, margin: 0 }}>{notes}</p>
      </div>
      <div>
        <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--fg-muted)', fontWeight: 600, marginBottom: 8 }}>Action items</div>
        {actionItems.map((it, i) => (
          <div key={i} style={{ display: 'flex', gap: 10, padding: '7px 0', borderBottom: '1px solid var(--border-subtle)', fontSize: 13 }}>
            <span style={{ color: 'var(--teal-700)', flexShrink: 0 }}>☐</span>
            <span style={{ flex: 1, color: 'var(--slate-800)' }}>{it.text}</span>
            <span style={{ color: 'var(--fg-muted)', fontFamily: 'var(--font-mono)', fontSize: 11 }}>{it.owner} · {it.due}</span>
          </div>
        ))}
      </div>
      <p style={{ fontSize: 11, color: 'var(--fg-muted)', marginTop: 20, marginBottom: 0, lineHeight: 1.5 }}>
        This note will appear in {a.name.split(' ')[0]}'s profile and be referenced in the next auto-generated prep brief. To edit it, open the profile in EvalIQ.
      </p>
    </div>
  </div>
);

const PostMeetingLogger = ({ a, onBack, onSave }) => {
  const COACHING_QS = [
    "Walk me through the network-team handoff on INC-44219. Where did the time go?",
    "What would have to be true for first-response p95 to land under 12 minutes next month?",
    "You mentioned Tier 3 as a 12-month goal — what's the first step you'd want this quarter?",
    "How are you feeling about workload right now, honestly?",
  ];

  const [rating, setRating] = React.useState(4);
  const [outcome, setOutcome] = React.useState('on-track');
  const [responses, setResponses] = React.useState({
    0: "Confirmed the bottleneck is the network-team handoff — takes 4–6 hours to get a reply on escalated tickets. Not a Maya issue.",
    1: "Thinks it's achievable if the handoff SLA is tightened. Will try flagging tickets directly in Slack instead of waiting on the queue.",
    2: "Interested in the change-mgmt cert this quarter. Wants to shadow Priya on two more escalations first to build confidence.",
    3: "Said 'honestly fine' — seemed genuine. Volume is up but she's managing. No burnout signals.",
  });
  const [notes, setNotes] = React.useState('');
  const [actionItems, setActionItems] = React.useState([
    { text: "Schedule shadow sessions with Priya", owner: 'Maya', due: '2026-05-13' },
    { text: "Loop in network-team lead on INC-44219 / 44402 / 44587", owner: 'Sam', due: '2026-05-06' },
    { text: "Add change-mgmt cert to Q2 development plan", owner: 'Maya', due: '2026-05-20' },
  ]);
  const [saved, setSaved] = React.useState(false);

  if (saved) return (
    <main className="main" style={{ maxWidth: 760 }}>
      <div className="page-head">
        <div>
          <h1 className="page-title">Note saved</h1>
          <p className="page-sub">Added to {a.name}'s profile · Summary sent to your inbox</p>
        </div>
        <button className="btn btn-secondary" onClick={onSave}>Back to team</button>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px',
                    background: 'var(--teal-50)', border: '1px solid var(--teal-100)',
                    borderRadius: 8, marginBottom: 8 }}>
        <Icons.CheckCircle size={16} style={{ color: 'var(--teal-700)', flexShrink: 0 }} />
        <span style={{ fontSize: 13, color: 'var(--teal-700)', fontWeight: 500 }}>
          Brief note saved to {a.name}'s profile. The next prep brief will incorporate this session.
        </span>
      </div>
      <div style={{ fontSize: 12, color: 'var(--fg-muted)', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
        <Icons.Mail size={12} /> Email sent to sam.hidalgo@stanford.edu
      </div>
      <EmailPreview a={a} rating={rating} outcome={outcome} notes={notes} actionItems={actionItems} />
    </main>
  );

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
          <label>Coaching questions — how did {a.name.split(' ')[0]} respond?</label>
          <span style={{ fontSize: 11, color: 'var(--fg-muted)', marginBottom: 8, display: 'block' }}>Pre-filled from this morning's brief. Edit or leave blank.</span>
          {COACHING_QS.map((q, i) => (
            <div key={i} style={{ marginBottom: 12, padding: '12px 16px', background: 'var(--bg-surface-2)',
                                  borderRadius: 8, border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--fg-primary)', marginBottom: 8, lineHeight: 1.4 }}>
                {i + 1}. {q}
              </div>
              <textarea
                placeholder="How did they respond? What did you learn?"
                value={responses[i] || ''}
                onChange={e => setResponses(r => ({ ...r, [i]: e.target.value }))}
                rows={2}
                style={{ width: '100%', fontSize: 13, padding: '7px 10px', borderRadius: 6,
                         border: '1px solid var(--border-default)', background: 'white',
                         fontFamily: 'var(--font-sans)', lineHeight: 1.5, resize: 'vertical',
                         outline: 'none', color: 'var(--fg-primary)' }}
              />
            </div>
          ))}
        </div>

        <div className="field">
          <label>Additional notes</label>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3}
            placeholder="Anything else from the conversation not captured above." />
          <span style={{ fontSize: 11, color: 'var(--fg-muted)' }}>Seeds the next prep brief and the HR write-up at review time.</span>
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
            <button className="btn btn-primary" type="button" onClick={() => setSaved(true)}><Icons.Check />Done</button>
          </div>
        </div>
      </div>
    </main>
  );
};

window.PostMeetingLogger = PostMeetingLogger;
