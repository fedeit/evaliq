// Employee Profile — 4-panel deep dive: tickets, calls, CSAT, coaching history + Goals panel.

const PanelCard = ({ icon: Ico, title, children, action }) => (
  <div className="card card-pad-lg">
    <div className="row" style={{ marginBottom: 16, alignItems: 'center' }}>
      <span style={{ color: 'var(--indigo-600)' }}><Ico size={18} /></span>
      <h3 style={{ margin: 0, fontSize: 14, fontWeight: 600 }}>{title}</h3>
      <div style={{ marginLeft: 'auto' }}>{action}</div>
    </div>
    {children}
  </div>
);

const KV = ({ k, v, delta }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border-subtle)' }}>
    <span style={{ color: 'var(--fg-secondary)', fontSize: 13 }}>{k}</span>
    <span className="num" style={{ fontWeight: 500 }}>
      {v}{' '}
      {delta != null && delta !== 0 && (
        <span className={`stat-delta ${delta > 0 ? 'up' : 'down'}`}>
          {delta > 0 ? '↑' : '↓'} {Math.abs(delta)}
        </span>
      )}
    </span>
  </div>
);

const Verbatim = ({ tone, text, ticket }) => (
  <div style={{
    borderLeft: `2px solid var(--${tone === 'pos' ? 'teal' : 'rose'}-500)`,
    paddingLeft: 12, margin: '10px 0',
  }}>
    <p style={{ margin: 0, fontFamily: 'var(--font-serif)', fontSize: 15, fontStyle: 'italic', lineHeight: 1.45, color: 'var(--slate-800)' }}>
      "{text}"
    </p>
    <div style={{ fontSize: 11, color: 'var(--fg-muted)', marginTop: 4, fontFamily: 'var(--font-mono)' }}>{ticket}</div>
  </div>
);

const CoachingNote = ({ date, body, tags }) => (
  <div style={{ padding: '12px 0', borderBottom: '1px solid var(--border-subtle)' }}>
    <div className="row" style={{ marginBottom: 6 }}>
      <span style={{ fontSize: 12, color: 'var(--fg-muted)', fontFamily: 'var(--font-mono)' }}>{date}</span>
      {tags?.map(t => <Pill key={t} kind="neutral" dot={false}>{t}</Pill>)}
    </div>
    <p style={{ margin: 0, fontSize: 13, lineHeight: 1.55, color: 'var(--slate-800)' }}>{body}</p>
  </div>
);

const GOAL_STATUS = {
  'in-progress': { kind: 'neutral', label: 'In progress' },
  'met':         { kind: 'healthy', label: 'Met' },
  'at-risk':     { kind: 'concern', label: 'At risk' },
};

const GoalRow = ({ goal: initialGoal }) => {
  const [goal, setGoal] = React.useState(initialGoal);
  const [editingNote, setEditingNote] = React.useState(false);
  const [noteInput, setNoteInput] = React.useState(goal.note);
  const s = GOAL_STATUS[goal.status];

  return (
    <div style={{ padding: '14px 0', borderBottom: '1px solid var(--border-subtle)' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--fg-primary)', marginBottom: 6 }}>
            {goal.text}
          </div>
          <div className="goal-bar" style={{ maxWidth: 240 }}>
            <div className="goal-bar-fill" style={{ width: `${goal.progress}%` }} />
          </div>
          <div style={{ display: 'flex', gap: 12, marginTop: 6, fontSize: 12, color: 'var(--fg-muted)' }}>
            <span>{goal.progress}% complete</span>
            <span>·</span>
            <span>Target: {goal.target}</span>
          </div>
          {goal.note && !editingNote && (
            <p style={{ margin: '8px 0 0', fontSize: 12, color: 'var(--fg-secondary)', lineHeight: 1.5 }}>
              {goal.note}
              <button className="btn btn-ghost" style={{ fontSize: 11, padding: '1px 6px', marginLeft: 6 }}
                onClick={() => setEditingNote(true)}>Edit</button>
            </p>
          )}
          {editingNote && (
            <div style={{ marginTop: 8 }}>
              <textarea value={noteInput} onChange={e => setNoteInput(e.target.value)} rows={2}
                style={{ width: '100%', fontSize: 12, padding: '6px 10px', borderRadius: 6,
                         border: '1px solid var(--border-strong)', outline: 'none', resize: 'vertical',
                         fontFamily: 'var(--font-sans)', lineHeight: 1.5 }} />
              <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
                <button className="btn btn-ghost" style={{ fontSize: 12 }}
                  onClick={() => { setEditingNote(false); setNoteInput(goal.note); }}>Cancel</button>
                <button className="btn btn-secondary" style={{ fontSize: 12 }}
                  onClick={() => { setGoal(g => ({ ...g, note: noteInput })); setEditingNote(false); }}>Save</button>
              </div>
            </div>
          )}
          {!goal.note && !editingNote && (
            <button className="btn btn-ghost" style={{ fontSize: 12, marginTop: 6, padding: '2px 8px' }}
              onClick={() => setEditingNote(true)}>
              <Icons.Plus size={11} /> Add note
            </button>
          )}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8, flexShrink: 0 }}>
          <Pill kind={s.kind} dot>{s.label}</Pill>
          <select value={goal.status}
            onChange={e => setGoal(g => ({ ...g, status: e.target.value }))}
            style={{ fontSize: 11, padding: '3px 6px', border: '1px solid var(--border-default)',
                     borderRadius: 6, background: 'white', color: 'var(--fg-secondary)',
                     cursor: 'pointer', outline: 'none', fontFamily: 'var(--font-sans)' }}>
            <option value="in-progress">In progress</option>
            <option value="met">Met</option>
            <option value="at-risk">At risk</option>
          </select>
        </div>
      </div>
    </div>
  );
};

const GOALS_DATA = [
  {
    text: 'Reduce first-response p95 to under 12 minutes',
    target: 'Q2 2026', status: 'in-progress', progress: 60,
    note: 'Depends on resolving network-team handoff. Shadow sessions with Priya now scheduled.',
  },
  {
    text: 'Complete ITIL 4 Foundation certification',
    target: 'Q3 2026', status: 'in-progress', progress: 30,
    note: '',
  },
  {
    text: 'Handle 2 Tier 3 escalations independently (Tier 3 readiness)',
    target: 'Q2 2027', status: 'in-progress', progress: 15,
    note: 'Long-horizon goal. No action needed this cycle.',
  },
];

const EmployeeProfile = ({ a, onBack, openBrief }) => {
  const [goals, setGoals] = React.useState(GOALS_DATA);
  const [addingGoal, setAddingGoal] = React.useState(false);
  const [newGoalText, setNewGoalText] = React.useState('');

  return (
    <main className="main">
      <div className="page-head" style={{ alignItems: 'flex-start' }}>
        <div className="row" style={{ alignItems: 'center', gap: 16 }}>
          <Avatar name={a.name} size={56} />
          <div>
            <h1 className="page-title" style={{ marginBottom: 2 }}>{a.name}</h1>
            <p className="page-sub">{a.role} · {a.tenure} · reports to Sam Hidalgo</p>
            <div style={{ marginTop: 8 }} className="row">
              <Pill kind={a.status}>{a.statusLabel}</Pill>
              <span style={{ color: 'var(--fg-muted)', fontSize: 12 }}>Last 1:1 {a.lastOneOnOne}</span>
            </div>
          </div>
        </div>
        <div className="row">
          <button className="btn btn-secondary"><Icons.Calendar />Schedule 1:1</button>
          <button className="btn btn-ai" onClick={openBrief}><Icons.Sparkles />Open prep brief</button>
        </div>
      </div>

      <div className="profile-grid">
        <PanelCard icon={Icons.Ticket} title="Ticket metrics — 30d">
          <KV k="Volume" v={a.tickets} delta={a.ticketsTrend} />
          <KV k="Resolution rate" v={`${Math.round(a.resolved * 100)}%`} delta={a.resolvedTrend} />
          <KV k="Reopened" v="6" delta={2} />
          <KV k="Avg first-response" v="14m 22s" delta={-2} />
          <KV k="SLA breaches" v="3" delta={1} />
        </PanelCard>

        <PanelCard icon={Icons.Phone} title="Call metrics — 30d">
          <KV k="Calls handled" v="62" delta={4} />
          <KV k="Avg handle time" v={a.aht} delta={0} />
          <KV k="Abandonment" v="4.2%" delta={0.3} />
          <KV k="Quality score" v="86 / 100" delta={-3} />
          <KV k="Hold time p95" v="2m 18s" delta={1} />
        </PanelCard>

        <PanelCard icon={Icons.Smile} title="Customer satisfaction — 90d">
          <KV k="CSAT" v={a.csat.toFixed(1)} delta={a.csatTrend} />
          <KV k="Responses" v="28" />
          <KV k="Promoter rate" v="68%" delta={-4} />
          <Verbatim tone="pos" text="Maya stayed on the call until my MFA worked. Felt like talking to someone who actually cared." ticket="CSAT-2104 · ↑" />
          <Verbatim tone="neg" text="Took two days to get a response. The fix itself was quick once we connected." ticket="CSAT-2098 · ↓" />
        </PanelCard>

        <PanelCard icon={Icons.Quote} title="Coaching history">
          <CoachingNote date="2026-04-17"
            body="Discussed first-response time on escalations. Maya identified the network-team handoff as the bottleneck. Action: shadow Priya on next two."
            tags={['action item', 'first-response']} />
          <CoachingNote date="2026-03-20"
            body="Strong month on volume. Asked about energy / burnout, no concerns. Career goal: Tier 3 by Q2 2027."
            tags={['development']} />
          <CoachingNote date="2026-02-12"
            body="Praised handling of INC-43021 escalation. Discussed documentation gap that caused two reopens earlier in window."
            tags={['recognition', 'documentation']} />
        </PanelCard>

        {/* Development context — full-width below the evidence grid */}
        <div style={{ gridColumn: '1 / -1' }}>
          <PanelCard icon={Icons.TrendUp} title="Development context"
            action={
              <button className="btn btn-ghost" style={{ fontSize: 12 }}
                onClick={() => setAddingGoal(true)}>
                <Icons.Plus size={12} /> Add goal
              </button>
            }>
            {goals.map((g, i) => <GoalRow key={i} goal={g} />)}
            {addingGoal && (
              <div style={{ marginTop: 12, padding: '12px 16px', border: '1px dashed var(--border-strong)',
                            borderRadius: 8, background: 'var(--bg-surface-2)' }}>
                <div className="field" style={{ marginBottom: 8 }}>
                  <label>Goal description</label>
                  <input type="text" value={newGoalText} onChange={e => setNewGoalText(e.target.value)}
                    placeholder="e.g. Achieve 95% resolution rate for 3 consecutive months"
                    style={{ width: '100%' }} />
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button className="btn btn-ghost" style={{ fontSize: 12 }}
                    onClick={() => { setAddingGoal(false); setNewGoalText(''); }}>Cancel</button>
                  <button className="btn btn-primary" style={{ fontSize: 12 }}
                    onClick={() => {
                      if (newGoalText.trim()) {
                        setGoals(gs => [...gs, { text: newGoalText, target: 'TBD', status: 'in-progress', progress: 0, note: '' }]);
                      }
                      setAddingGoal(false); setNewGoalText('');
                    }}>Add goal</button>
                </div>
              </div>
            )}
          </PanelCard>
        </div>
      </div>
    </main>
  );
};

window.EmployeeProfile = EmployeeProfile;
