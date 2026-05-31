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
            <Icons.Plus size={11} /> Add section note
          </button>
        )}
        {note && !editing && (
          <button className="btn btn-ghost"
            style={{ marginLeft: 'auto', fontSize: 11, padding: '2px 8px', color: 'var(--amber-700)' }}
            onClick={() => setEditing(true)}>Edit section note</button>
        )}
      </div>
      {children}
      {editing && (
        <div style={{ marginTop: 10, padding: '10px 14px', background: 'var(--amber-50)',
                      border: '1px solid var(--amber-100)', borderRadius: 8 }}>
          <textarea autoFocus value={note} onChange={e => setNote(e.target.value)}
            placeholder="Manager note for this section — preserves the draft and carries into the next brief."
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
          <div className="brief-note-label">Section note</div>
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

const EditableDraft = ({ editing, value, onChange, rows = 3, sources = [], children }) => editing ? (
  <div style={{ marginBottom: 14 }}>
    <textarea value={value} onChange={e => onChange(e.target.value)} rows={rows}
      style={{ width: '100%', minHeight: Math.max(rows * 42, 96), fontSize: 14,
               padding: '12px 14px', borderRadius: 8,
               border: '1px solid var(--indigo-200)', background: 'var(--indigo-50)',
               fontFamily: 'var(--font-sans)', lineHeight: 1.55, resize: 'vertical',
               outline: 'none', color: 'var(--fg-primary)' }} />
    {sources.length > 0 && (
      <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap', marginTop: 6 }}>
        <span style={{ fontSize: 11, color: 'var(--fg-muted)' }}>Sources</span>
        {sources.map(n => <Cite key={n} n={n} />)}
      </div>
    )}
  </div>
) : children;

const PrepBrief = ({ a, onBack, openLogger }) => {
  const [editingBrief, setEditingBrief] = React.useState(false);
  const [approved, setApproved] = React.useState(false);
  const firstName = a.name.split(' ')[0];
  const [draft, setDraft] = React.useState({
    summary: `${firstName} is steady on volume but slipping on first-response time.`,
    trajectory1: `Resolution rate held at ${Math.round(a.resolved * 100)}% over the last 30 days, in line with the team average. First-response time slipped on three high-priority tickets, all involving a single escalation path through the network team.`,
    trajectory2: `CSAT trended down from 4.6 to ${a.csat.toFixed(1)} across 28 responses. Two negative comments referenced wait time, not technical accuracy — suggesting the bottleneck is upstream.`,
    highlight1: 'Handled the Datacenter B power-event escalation single-handedly — kept SLA on 11 of 14 affected tickets.',
    highlight1Note: 'Worth specific recognition. Mentor opportunity for Tomás and Derek.',
    highlight2: 'Two CSAT verbatims praised follow-through on MFA and login issues that other agents escalate.',
    highlight2Note: 'Theme: persistence on problems others bounce. Reinforce this explicitly.',
    concern1: 'First-response p95 climbed to 14m 22s, up from 11m last cycle. All three SLA breaches trace to the network-team handoff path.',
    concern1Note: 'Likely a process issue, not effort. Probe the handoff specifically.',
    concern2: 'Reopened tickets up from 4 to 6 this window. Both involve laptop imaging where root cause was not documented.',
    concern2Note: `Ask ${firstName} to describe her documentation process for imaging tickets.`,
    concern3: 'Call quality score 86/100, down 3 pts; hold time p95 up slightly.',
    concern3Note: 'Minor signal — flag only if it continues next cycle.',
    question1: 'Walk me through the network-team handoff on INC-44219. Where did the time go?',
    question2: 'What would have to be true for first-response p95 to land under 12 minutes next month?',
    question3: `You mentioned Tier 3 as a 12-month goal — what's the first step you'd want this quarter?`,
    question4: 'How are you feeling about workload right now, honestly?',
    nextStep1: 'Loop in network-team lead on the three breach tickets to fix the handoff path.',
    nextStep2: `Pair ${firstName} with Priya for two escalation shadows over the next two weeks.`,
    nextStep3: 'Revisit Tier 3 path in the Q2 development plan; add a concrete milestone.',
    managerNote: '',
  });
  const setField = (key, value) => setDraft(d => ({ ...d, [key]: value }));
  const statusLabel = approved ? 'Manager approved' : editingBrief ? 'Manager editing' : 'AI draft · source-backed';

  return (
  <main className="main">
    <div className="page-head">
      <div>
        <div className="row" style={{ marginBottom: 6 }}>
          <Pill kind={approved ? 'healthy' : editingBrief ? 'warn' : 'ai'}><Icons.Sparkles size={11} /> {statusLabel}</Pill>
          <span style={{ fontSize: 12, color: 'var(--fg-muted)' }}>Coverage: 92% &middot; {SOURCES.length} sources &middot; manager review required</span>
        </div>
        <h1 className="page-title">Prep brief &mdash; {a.name}</h1>
        <p className="page-sub">Tomorrow at 10:00 &middot; 30 min &middot; review window 5 min</p>
      </div>
      <div className="row">
        <button className="btn btn-secondary" onClick={() => { setEditingBrief(e => !e); setApproved(false); }}>
          {editingBrief ? 'Done editing' : 'Edit'}
        </button>
        <button className="btn btn-primary" onClick={() => { setApproved(true); setEditingBrief(false); }}>
          <Icons.Check />Approve brief
        </button>
        {approved && <button className="btn btn-secondary" onClick={openLogger}>Open logger</button>}
      </div>
    </div>

    <div className="brief">
      <div style={{ marginBottom: 18, padding: '12px 14px', border: '1px solid var(--indigo-100)',
                    borderRadius: 10, background: 'var(--indigo-50)', color: 'var(--indigo-900)',
                    fontSize: 13, lineHeight: 1.55 }}>
        Draft generated by EvalIQ. Manager reviews before use. Every claim links to a source.
      </div>

      <span className="brief-eyebrow"><Icons.Sparkles size={11} /> Performance summary</span>
      <EditableDraft editing={editingBrief} value={draft.summary} onChange={v => setField('summary', v)} rows={2}>
        <h2 className="brief-title">{draft.summary}</h2>
      </EditableDraft>

      <BriefSection eyebrow="Trajectory">
        <EditableDraft editing={editingBrief} value={draft.trajectory1} onChange={v => setField('trajectory1', v)} sources={[1]}>
          <p>{draft.trajectory1} <Cite n={1} /></p>
        </EditableDraft>
        <EditableDraft editing={editingBrief} value={draft.trajectory2} onChange={v => setField('trajectory2', v)} sources={[2, 8]}>
          <p>{draft.trajectory2} <Cite n={2} /> <Cite n={8} /></p>
        </EditableDraft>
      </BriefSection>

      <BriefSection eyebrow="Highlights">
        {editingBrief ? (
          <>
            <EditableDraft editing={editingBrief} value={draft.highlight1} onChange={v => setField('highlight1', v)} rows={2} sources={[3]}>
              <span />
            </EditableDraft>
            <EditableDraft editing={editingBrief} value={draft.highlight1Note} onChange={v => setField('highlight1Note', v)} rows={2}>
              <span />
            </EditableDraft>
            <EditableDraft editing={editingBrief} value={draft.highlight2} onChange={v => setField('highlight2', v)} rows={2} sources={[4]}>
              <span />
            </EditableDraft>
            <EditableDraft editing={editingBrief} value={draft.highlight2Note} onChange={v => setField('highlight2Note', v)} rows={2}>
              <span />
            </EditableDraft>
          </>
        ) : (
          <>
            <div className="bullet-row">
              <span className="bullet-mark up"><Icons.TrendUp size={12} /></span>
              <div className="bullet-text">
                {draft.highlight1} <Cite n={3} />.
                <small>{draft.highlight1Note}</small>
              </div>
            </div>
            <div className="bullet-row">
              <span className="bullet-mark up"><Icons.TrendUp size={12} /></span>
              <div className="bullet-text">
                {draft.highlight2} <Cite n={4} />.
                <small>{draft.highlight2Note}</small>
              </div>
            </div>
          </>
        )}
      </BriefSection>

      <BriefSection eyebrow="Concerns">
        {editingBrief ? (
          <>
            <EditableDraft editing={editingBrief} value={draft.concern1} onChange={v => setField('concern1', v)} rows={2} sources={[5, 1]}>
              <span />
            </EditableDraft>
            <EditableDraft editing={editingBrief} value={draft.concern1Note} onChange={v => setField('concern1Note', v)} rows={2}>
              <span />
            </EditableDraft>
            <EditableDraft editing={editingBrief} value={draft.concern2} onChange={v => setField('concern2', v)} rows={2} sources={[6]}>
              <span />
            </EditableDraft>
            <EditableDraft editing={editingBrief} value={draft.concern2Note} onChange={v => setField('concern2Note', v)} rows={2}>
              <span />
            </EditableDraft>
            <EditableDraft editing={editingBrief} value={draft.concern3} onChange={v => setField('concern3', v)} rows={2} sources={[7]}>
              <span />
            </EditableDraft>
            <EditableDraft editing={editingBrief} value={draft.concern3Note} onChange={v => setField('concern3Note', v)} rows={2}>
              <span />
            </EditableDraft>
          </>
        ) : (
          <>
            <div className="bullet-row">
              <span className="bullet-mark down"><Icons.TrendDown size={12} /></span>
              <div className="bullet-text">
                {draft.concern1} <Cite n={5} /> <Cite n={1} />.
                <small>{draft.concern1Note}</small>
              </div>
            </div>
            <div className="bullet-row">
              <span className="bullet-mark down"><Icons.TrendDown size={12} /></span>
              <div className="bullet-text">
                {draft.concern2} <Cite n={6} />.
                <small>{draft.concern2Note}</small>
              </div>
            </div>
            <div className="bullet-row">
              <span className="bullet-mark down"><Icons.TrendDown size={12} /></span>
              <div className="bullet-text">
                {draft.concern3} <Cite n={7} />.
                <small>{draft.concern3Note}</small>
              </div>
            </div>
          </>
        )}
      </BriefSection>

      <BriefSection eyebrow="Coaching questions">
        {editingBrief ? (
          <div>
            {['question1', 'question2', 'question3', 'question4'].map((key, i) => (
              <EditableDraft key={key} editing value={draft[key]} onChange={v => setField(key, v)} rows={2}
                sources={key === 'question1' ? [1] : key === 'question2' ? [5] : []}>
                <span />
              </EditableDraft>
            ))}
          </div>
        ) : (
          <ol style={{ paddingLeft: 18, margin: 0, fontSize: 14, lineHeight: 1.8, color: 'var(--slate-800)' }}>
            <li>{draft.question1} <Cite n={1} /></li>
            <li>{draft.question2} <Cite n={5} /></li>
            <li>{draft.question3}</li>
            <li>{draft.question4}</li>
          </ol>
        )}
      </BriefSection>

      <BriefSection eyebrow="Suggested next steps">
        {editingBrief ? (
          <div>
            {['nextStep1', 'nextStep2', 'nextStep3'].map(key => (
              <EditableDraft key={key} editing value={draft[key]} onChange={v => setField(key, v)} rows={2}
                sources={key === 'nextStep1' ? [1] : []}>
                <span />
              </EditableDraft>
            ))}
          </div>
        ) : (
          <ol style={{ paddingLeft: 18, margin: 0, fontSize: 14, lineHeight: 1.8, color: 'var(--slate-800)' }}>
            <li>{draft.nextStep1} <Cite n={1} /></li>
            <li>{draft.nextStep2}</li>
            <li>{draft.nextStep3}</li>
          </ol>
        )}
      </BriefSection>

      <BriefSection eyebrow="Manager notes">
        <textarea value={draft.managerNote} onChange={e => setField('managerNote', e.target.value)}
          placeholder="Add private prep notes before the 1:1. These carry into the post-meeting logger."
          rows={3}
          style={{ width: '100%', fontSize: 13, padding: '10px 12px', borderRadius: 8,
                   border: '1px solid var(--border-default)', background: 'white',
                   fontFamily: 'var(--font-sans)', lineHeight: 1.5, resize: 'vertical',
                   outline: 'none', color: 'var(--fg-primary)' }} />
      </BriefSection>

      <SourcesPanel />
    </div>
  </main>
  );
};

window.PrepBrief = PrepBrief;
