// AI-Generated 1:1 Prep Brief — numbered inline citations linking to ServiceNow,
// Amazon Connect, and CSAT Survey sources. Per-section manager annotations.

const SOURCES = [
  { n: 1, system: 'ServiceNow', badge: 'SN', color: '#16a34a',
    ref: 'INC-44219, INC-44402, INC-44587',
    detail: 'First-response p95 exceeded 12-min SLA threshold on all 3; each involved a network-team escalation handoff.',
    date: 'Apr 28 – May 1, 2026' },
  { n: 2, system: 'CSAT Survey', badge: 'CS', color: '#7c3aed',
    ref: 'CSAT-Q1 · 28 responses',
    detail: '90-day post-interaction survey batch. Avg score 4.2 / 5.0, down from 4.6 the prior window.',
    date: 'Feb 1 – May 1, 2026' },
  { n: 3, system: 'ServiceNow', badge: 'SN', color: '#16a34a',
    ref: 'INC-44021',
    detail: 'Datacenter B power-event escalation — 11 of 14 affected tickets held within SLA without further escalation.',
    date: 'Apr 22, 2026' },
  { n: 4, system: 'CSAT Survey', badge: 'CS', color: '#7c3aed',
    ref: 'CSAT-2104 · score 5/5',
    detail: '"Maya stayed on the call until my MFA worked. Felt like talking to someone who actually cared."',
    date: 'Apr 29, 2026' },
  { n: 5, system: 'ServiceNow', badge: 'SN', color: '#16a34a',
    ref: 'SLA report · 30-day window',
    detail: 'First-response p95: 14m 22s (threshold: 12m). Up from 11m the prior 30-day window.',
    date: 'Apr 1 – May 1, 2026' },
  { n: 6, system: 'ServiceNow', badge: 'SN', color: '#16a34a',
    ref: 'INC-43712, INC-43890',
    detail: 'Both reopened tickets involve laptop imaging — root cause not documented in resolution notes.',
    date: 'Apr 10 & Apr 17, 2026' },
  { n: 7, system: 'Amazon Connect', badge: 'AC', color: '#d97706',
    ref: 'Call quality report · April',
    detail: 'Quality score 86/100 (−3 pts). Hold time p95: 2m 18s. Abandonment rate: 4.2% (+0.3pp).',
    date: 'Apr 1 – Apr 30, 2026' },
  { n: 8, system: 'CSAT Survey', badge: 'CS', color: '#7c3aed',
    ref: 'CSAT-2098 · score 2/5',
    detail: '"Took two days to get a response. The fix itself was quick once we connected." — wait-time complaint, not accuracy.',
    date: 'Apr 25, 2026' },
];

const Cite = ({ n }) => {
  const [open, setOpen] = React.useState(false);
  const wrapRef = React.useRef(null);
  const src = SOURCES.find(s => s.n === n);

  React.useEffect(() => {
    if (!open) return;
    const close = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [open]);

  if (!src) return null;
  return (
    <span ref={wrapRef} style={{ position: 'relative', display: 'inline' }}>
      <span className="cite-num"
        onClick={e => { e.stopPropagation(); setOpen(o => !o); }}>
        {n}
      </span>
      {open && (
        <span className="cite-popover" onClick={e => e.stopPropagation()}>
          <span className="cite-badge" style={{ background: src.color }}>{src.badge}</span>
          <span className="cite-popover-body">
            <span className="cite-popover-system">{src.system}</span>
            <span className="cite-popover-ref">{src.ref}</span>
            <span className="cite-popover-detail">{src.detail}</span>
            <span className="cite-popover-date">{src.date}</span>
          </span>
        </span>
      )}
    </span>
  );
};

const BriefSection = ({ eyebrow, children }) => {
  const [note, setNote] = React.useState('');
  const [editing, setEditing] = React.useState(false);
  return (
    <section className="brief-section">
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
        <h3 style={{ margin: 0 }}>{eyebrow}</h3>
        {!note && !editing && (
          <button className="btn btn-ghost"
            style={{ marginLeft: 'auto', fontSize: 11, padding: '2px 8px', color: 'var(--fg-muted)' }}
            onClick={() => setEditing(true)}>
            <Icons.Plus size={11} /> Add note
          </button>
        )}
        {note && !editing && (
          <button className="btn btn-ghost"
            style={{ marginLeft: 'auto', fontSize: 11, padding: '2px 8px', color: 'var(--amber-700)' }}
            onClick={() => setEditing(true)}>Edit note</button>
        )}
      </div>
      {children}
      {editing && (
        <div style={{ marginTop: 10, padding: '10px 14px', background: 'var(--amber-50)',
                      border: '1px solid var(--amber-100)', borderRadius: 8 }}>
          <textarea autoFocus value={note} onChange={e => setNote(e.target.value)}
            placeholder="Your note for this section — carries into the next brief."
            rows={2}
            style={{ width: '100%', fontSize: 13, background: 'transparent', border: 'none',
                     outline: 'none', resize: 'vertical', fontFamily: 'var(--font-sans)',
                     lineHeight: 1.55, color: 'var(--fg-primary)' }} />
          <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end', marginTop: 6 }}>
            <button className="btn btn-ghost" style={{ fontSize: 12 }} onClick={() => setEditing(false)}>Cancel</button>
            <button className="btn btn-secondary" style={{ fontSize: 12 }} onClick={() => setEditing(false)}>Save note</button>
          </div>
        </div>
      )}
      {note && !editing && (
        <div className="brief-note">
          <div className="brief-note-label">Your note</div>
          {note}
        </div>
      )}
    </section>
  );
};

const SourcesPanel = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="sources-section">
      <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', userSelect: 'none' }}
        onClick={() => setOpen(o => !o)}>
        <h3 style={{ margin: 0 }}>Sources &middot; {SOURCES.length}</h3>
        <span style={{ marginLeft: 'auto', color: 'var(--fg-muted)', display: 'flex',
                       transform: open ? 'rotate(90deg)' : 'rotate(0deg)',
                       transition: 'transform 200ms' }}>
          <Icons.Chevron size={14} />
        </span>
      </div>
      {open && (
        <div style={{ marginTop: 12 }}>
          {SOURCES.map(src => (
            <div key={src.n} className="source-row">
              <span className="source-n">{src.n}</span>
              <div className="source-body">
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                  <span style={{ width: 20, height: 20, borderRadius: 4, background: src.color, flexShrink: 0,
                                 display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                                 color: '#fff', fontSize: 9, fontWeight: 700 }}>{src.badge}</span>
                  <span className="source-system">{src.system}</span>
                  <span className="source-ref">{src.ref}</span>
                </div>
                <div className="source-detail">{src.detail}</div>
                <div className="cite-popover-date">{src.date}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const PrepBrief = ({ a, onBack, openLogger }) => (
  <main className="main">
    <div className="page-head">
      <div>
        <div className="row" style={{ marginBottom: 6 }}>
          <Pill kind="ai"><Icons.Sparkles size={11} /> AI draft · source-backed</Pill>
          <span style={{ fontSize: 12, color: 'var(--fg-muted)' }}>Coverage: 92% &middot; {SOURCES.length} sources &middot; manager review required</span>
        </div>
        <h1 className="page-title">Prep brief &mdash; {a.name}</h1>
        <p className="page-sub">Tomorrow at 10:00 &middot; 30 min &middot; review window 5 min</p>
      </div>
      <div className="row">
        <button className="btn btn-secondary">Edit</button>
        <button className="btn btn-secondary"><Icons.Sparkles />Regenerate</button>
        <button className="btn btn-primary" onClick={openLogger}><Icons.Check />Approve brief</button>
      </div>
    </div>

    <div className="brief">
      <span className="brief-eyebrow"><Icons.Sparkles size={11} /> Performance summary</span>
      <h2 className="brief-title">{a.name.split(' ')[0]} is steady on volume but slipping on first-response time.</h2>

      <BriefSection eyebrow="Trajectory">
        <p>Resolution rate held at <strong>{Math.round(a.resolved * 100)}%</strong> over the last 30 days, in line with the team average. First-response time slipped on three high-priority tickets <Cite n={1} />, all involving a single escalation path through the network team.</p>
        <p>CSAT trended down from 4.6 to {a.csat.toFixed(1)} across 28 responses <Cite n={2} />. Two negative comments referenced wait time, not technical accuracy <Cite n={8} /> &mdash; suggesting the bottleneck is upstream.</p>
      </BriefSection>

      <BriefSection eyebrow="Highlights">
        <div className="bullet-row">
          <span className="bullet-mark up"><Icons.TrendUp size={12} /></span>
          <div className="bullet-text">
            Handled the Datacenter B power-event escalation single-handedly &mdash; kept SLA on 11 of 14 affected tickets <Cite n={3} />.
            <small>Worth specific recognition. Mentor opportunity for Tom&aacute;s and Derek.</small>
          </div>
        </div>
        <div className="bullet-row">
          <span className="bullet-mark up"><Icons.TrendUp size={12} /></span>
          <div className="bullet-text">
            Two CSAT verbatims praised follow-through on MFA and login issues that other agents escalate <Cite n={4} />.
            <small>Theme: persistence on problems others bounce. Reinforce this explicitly.</small>
          </div>
        </div>
      </BriefSection>

      <BriefSection eyebrow="Concerns">
        <div className="bullet-row">
          <span className="bullet-mark down"><Icons.TrendDown size={12} /></span>
          <div className="bullet-text">
            First-response p95 climbed to 14m 22s, up from 11m last cycle <Cite n={5} />. All three SLA breaches trace to the network-team handoff path <Cite n={1} />.
            <small>Likely a process issue, not effort. Probe the handoff specifically.</small>
          </div>
        </div>
        <div className="bullet-row">
          <span className="bullet-mark down"><Icons.TrendDown size={12} /></span>
          <div className="bullet-text">
            Reopened tickets up from 4 to 6 this window <Cite n={6} />. Both involve laptop imaging where root cause was not documented.
            <small>Ask {a.name.split(' ')[0]} to describe her documentation process for imaging tickets.</small>
          </div>
        </div>
        <div className="bullet-row">
          <span className="bullet-mark down"><Icons.TrendDown size={12} /></span>
          <div className="bullet-text">
            Call quality score 86/100, down 3 pts; hold time p95 up slightly <Cite n={7} />.
            <small>Minor signal &mdash; flag only if it continues next cycle.</small>
          </div>
        </div>
      </BriefSection>

      <BriefSection eyebrow="Coaching questions">
        <ol style={{ paddingLeft: 18, margin: 0, fontSize: 14, lineHeight: 1.8, color: 'var(--slate-800)' }}>
          <li>Walk me through the network-team handoff on INC-44219. Where did the time go? <Cite n={1} /></li>
          <li>What would have to be true for first-response p95 to land under 12 minutes next month? <Cite n={5} /></li>
          <li>You mentioned Tier 3 as a 12-month goal &mdash; what&apos;s the first step you&apos;d want this quarter?</li>
          <li>How are you feeling about workload right now, honestly?</li>
        </ol>
      </BriefSection>

      <BriefSection eyebrow="Suggested next steps">
        <ol style={{ paddingLeft: 18, margin: 0, fontSize: 14, lineHeight: 1.8, color: 'var(--slate-800)' }}>
          <li>Loop in network-team lead on the three breach tickets to fix the handoff path. <Cite n={1} /></li>
          <li>Pair {a.name.split(' ')[0]} with Priya for two escalation shadows over the next two weeks.</li>
          <li>Revisit Tier 3 path in the Q2 development plan; add a concrete milestone.</li>
        </ol>
      </BriefSection>

      <SourcesPanel />
    </div>
  </main>
);

window.PrepBrief = PrepBrief;
