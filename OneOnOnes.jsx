// 1:1s screen — upcoming and recent one-on-ones, grouped by week,
// with brief readiness status and quick actions.

const ONE_ON_ONES = [
  // Upcoming
  { id: 'u1', agentId: 'maya',   date: 'Tomorrow',         time: '10:00',  duration: 30, brief: 'ready',      overdue: false },
  { id: 'u2', agentId: 'tomas',  date: 'Tomorrow',         time: '14:00',  duration: 30, brief: 'generating', overdue: false },
  { id: 'u3', agentId: 'jordan', date: 'Wed, May 6',       time: '09:30',  duration: 30, brief: 'scheduled',  overdue: false },
  { id: 'u4', agentId: 'aisha',  date: 'Wed, May 6',       time: '11:00',  duration: 45, brief: 'scheduled',  overdue: false },
  { id: 'u5', agentId: 'priya',  date: 'Thu, May 7',       time: '10:00',  duration: 30, brief: 'scheduled',  overdue: false },
  // Overdue
  { id: 'o1', agentId: 'derek',  date: 'Thu, Apr 10',      time: '10:00',  duration: 30, brief: 'none',       overdue: true,  daysOverdue: 21 },
  // Past (last 30d)
  { id: 'p1', agentId: 'aisha',  date: 'Mon, Apr 28',      time: '11:00',  duration: 45, brief: 'logged',     overdue: false, past: true, outcome: 'exceptional' },
  { id: 'p2', agentId: 'jordan', date: 'Wed, Apr 23',      time: '09:30',  duration: 30, brief: 'logged',     overdue: false, past: true, outcome: 'on-track' },
  { id: 'p3', agentId: 'priya',  date: 'Mon, Apr 21',      time: '10:00',  duration: 30, brief: 'logged',     overdue: false, past: true, outcome: 'on-track' },
  { id: 'p4', agentId: 'tomas',  date: 'Tue, Apr 15',      time: '14:00',  duration: 30, brief: 'logged',     overdue: false, past: true, outcome: 'needs-improvement' },
  { id: 'p5', agentId: 'maya',   date: 'Mon, Apr 14',      time: '10:00',  duration: 30, brief: 'logged',     overdue: false, past: true, outcome: 'on-track' },
];

const BRIEF_STATE = {
  ready:      { kind: 'ai',      label: 'Brief ready',     dot: true  },
  generating: { kind: 'warn',    label: 'Generating…',     dot: true  },
  scheduled:  { kind: 'neutral', label: 'Brief in queue',  dot: false },
  logged:     { kind: 'healthy', label: 'Note logged',     dot: true  },
  none:       { kind: 'concern', label: 'No brief',        dot: true  },
};

const OUTCOME_STYLE = {
  'on-track':          { color: 'var(--teal-700)',  bg: 'var(--teal-50)',  label: 'On track' },
  'exceptional':       { color: 'var(--indigo-700)', bg: 'var(--indigo-50)', label: 'Exceptional' },
  'needs-improvement': { color: 'var(--amber-700)', bg: 'var(--amber-50)', label: 'Needs improvement' },
};

const OneOnOneRow = ({ item, agent, onOpenBrief, onOpenAgent, onOpenLogger }) => {
  const bs = BRIEF_STATE[item.brief];
  const os = item.outcome ? OUTCOME_STYLE[item.outcome] : null;

  return (
    <tr onClick={() => onOpenAgent(agent)} style={{ opacity: item.overdue ? 1 : 1 }}>
      <td style={{ paddingLeft: 20 }}>
        <div className="row">
          <Avatar name={agent.name} size={32} />
          <div>
            <div style={{ fontWeight: 500 }}>{agent.name}</div>
            <div style={{ fontSize: 12, color: 'var(--fg-muted)' }}>{agent.role}</div>
          </div>
        </div>
      </td>
      <td>
        <div style={{ fontWeight: 500, fontSize: 13 }}>
          {item.overdue
            ? <span style={{ color: 'var(--rose-700)' }}>{item.date}</span>
            : item.date}
        </div>
        <div style={{ fontSize: 12, color: 'var(--fg-muted)', fontFamily: 'var(--font-mono)' }}>
          {item.time} · {item.duration} min
        </div>
      </td>
      <td>
        {item.overdue
          ? <Pill kind="concern" dot>Overdue · {item.daysOverdue}d</Pill>
          : os
            ? <span style={{ fontSize: 12, fontWeight: 500, color: os.color,
                             background: os.bg, padding: '2px 8px', borderRadius: 999,
                             display: 'inline-block' }}>{os.label}</span>
            : <Pill kind={bs.kind} dot={bs.dot}>{bs.label}</Pill>
        }
      </td>
      <td>
        <div style={{ display: 'flex', gap: 6 }} onClick={e => e.stopPropagation()}>
          {item.brief === 'ready' && (
            <button className="btn btn-ai" style={{ fontSize: 12, padding: '5px 10px' }}
              onClick={() => onOpenBrief(agent)}>
              <Icons.Sparkles size={12} /> Open brief
            </button>
          )}
          {item.brief === 'logged' && (
            <button className="btn btn-ghost" style={{ fontSize: 12, padding: '5px 10px' }}
              onClick={() => onOpenAgent(agent)}>
              View notes
            </button>
          )}
          {item.overdue && (
            <button className="btn btn-primary" style={{ fontSize: 12, padding: '5px 10px' }}>
              <Icons.Calendar size={12} /> Schedule
            </button>
          )}
          {(item.brief === 'generating' || item.brief === 'scheduled') && (
            <button className="btn btn-secondary" style={{ fontSize: 12, padding: '5px 10px' }}
              onClick={() => onOpenAgent(agent)}>
              View profile
            </button>
          )}
          {item.past && item.brief !== 'logged' && (
            <button className="btn btn-ghost" style={{ fontSize: 12, padding: '5px 10px' }}
              onClick={() => onOpenLogger(agent)}>
              Log notes
            </button>
          )}
        </div>
      </td>
    </tr>
  );
};

const SectionHeader = ({ label, count, countKind }) => (
  <tr className="tier-row">
    <td colSpan={4} style={{ paddingLeft: 20, paddingTop: 10, paddingBottom: 10 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.06em',
                       textTransform: 'uppercase', color: 'var(--fg-muted)' }}>{label}</span>
        <Pill kind={countKind || 'neutral'} dot={false}>{count}</Pill>
      </div>
    </td>
  </tr>
);

const OneOnOnes = ({ openAgent, openBrief, openLogger }) => {
  const byId = Object.fromEntries(TEAM.map(a => [a.id, a]));

  const upcoming = ONE_ON_ONES.filter(i => !i.past && !i.overdue);
  const overdue  = ONE_ON_ONES.filter(i => i.overdue);
  const past     = ONE_ON_ONES.filter(i => i.past);

  const briefsReady = upcoming.filter(i => i.brief === 'ready').length;

  return (
    <main className="main">
      <div className="page-head">
        <div>
          <h1 className="page-title">1:1s</h1>
          <p className="page-sub">Upcoming, overdue, and recent one-on-ones · calendar synced</p>
        </div>
        <div className="row">
          <button className="btn btn-secondary"><Icons.Calendar />Schedule 1:1</button>
          {briefsReady > 0 && (
            <button className="btn btn-ai">
              <Icons.Sparkles />{briefsReady} brief{briefsReady > 1 ? 's' : ''} ready to review
            </button>
          )}
        </div>
      </div>

      <div className="stat-grid" style={{ marginBottom: 24, gridTemplateColumns: 'repeat(4, 1fr)' }}>
        <div className="stat">
          <div className="stat-label">This week</div>
          <div className="stat-value">{upcoming.length}</div>
          <div className="stat-meta">scheduled</div>
        </div>
        <div className="stat">
          <div className="stat-label">Briefs ready</div>
          <div className="stat-value" style={{ color: briefsReady > 0 ? 'var(--indigo-600)' : undefined }}>
            {briefsReady}
          </div>
          <div className="stat-meta">of {upcoming.length} upcoming</div>
        </div>
        <div className="stat">
          <div className="stat-label">Overdue</div>
          <div className="stat-value" style={{ color: overdue.length > 0 ? 'var(--rose-700)' : undefined }}>
            {overdue.length}
          </div>
          <div className="stat-meta">agent{overdue.length !== 1 ? 's' : ''} need scheduling</div>
        </div>
        <div className="stat">
          <div className="stat-label">Completed · 30d</div>
          <div className="stat-value">{past.length}</div>
          <div className="stat-meta">{past.filter(i => i.brief === 'logged').length} notes logged</div>
        </div>
      </div>

      <div className="card" style={{ overflow: 'hidden' }}>
        <table className="table">
          <thead><tr>
            <th style={{ paddingLeft: 20 }}>Agent</th>
            <th>Date · time</th>
            <th>Status</th>
            <th>Actions</th>
          </tr></thead>
          <tbody>
            {overdue.length > 0 && <>
              <SectionHeader label="Overdue" count={`${overdue.length} agent${overdue.length > 1 ? 's' : ''}`} countKind="concern" />
              {overdue.map(item => (
                <OneOnOneRow key={item.id} item={item} agent={byId[item.agentId]}
                  onOpenBrief={openBrief} onOpenAgent={openAgent} onOpenLogger={openLogger} />
              ))}
            </>}

            <SectionHeader label="Upcoming" count={`${upcoming.length} this week`} countKind="neutral" />
            {upcoming.map(item => (
              <OneOnOneRow key={item.id} item={item} agent={byId[item.agentId]}
                onOpenBrief={openBrief} onOpenAgent={openAgent} onOpenLogger={openLogger} />
            ))}

            <SectionHeader label="Recent · last 30 days" count={`${past.length} completed`} countKind="neutral" />
            {past.map(item => (
              <OneOnOneRow key={item.id} item={item} agent={byId[item.agentId]}
                onOpenBrief={openBrief} onOpenAgent={openAgent} onOpenLogger={openLogger} />
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

window.OneOnOnes = OneOnOnes;
