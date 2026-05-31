// Team Dashboard — roster with tier filtering, tier-grouped table, and custom date range selector.

const DATE_PRESETS = [
  { id: 'last30',   label: 'Last 30 days' },
  { id: 'last90',   label: 'Last 90 days' },
  { id: 'fall25',   label: 'Fall semester 2025 (Aug–Dec)' },
  { id: 'spring26', label: 'Spring semester 2026 (Jan–May)' },
  { id: 'custom',   label: 'Custom range…' },
];

const DateRangePicker = ({ value, onChange }) => {
  const [open, setOpen] = React.useState(false);
  const [customStart, setCustomStart] = React.useState('2026-04-01');
  const [customEnd, setCustomEnd] = React.useState('2026-05-03');

  const current = value === 'custom'
    ? { label: `${customStart} → ${customEnd}` }
    : DATE_PRESETS.find(p => p.id === value);

  return (
    <div style={{ position: 'relative' }}>
      <button className="btn btn-secondary" onClick={() => setOpen(o => !o)}>
        <Icons.Calendar /> {current.label}
        <span style={{ marginLeft: 2, opacity: 0.5 }}><Icons.Chevron size={12} /></span>
      </button>
      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 6px)', right: 0,
          background: 'white', border: '1px solid var(--border-default)',
          borderRadius: 8, boxShadow: 'var(--shadow-md)', zIndex: 30,
          minWidth: 248, padding: 6,
        }}>
          {DATE_PRESETS.filter(p => p.id !== 'custom').map(p => (
            <div key={p.id}
              className={`date-picker-option ${value === p.id ? 'active' : ''}`}
              onClick={() => { onChange(p.id); setOpen(false); }}>
              {p.label}
            </div>
          ))}
          <div className={`date-picker-option ${value === 'custom' ? 'active' : ''}`}
            onClick={() => onChange('custom')}>
            Custom range…
          </div>
          {value === 'custom' && (
            <div style={{ padding: '10px 12px', borderTop: '1px solid var(--border-subtle)', marginTop: 4 }}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
                <input type="date" value={customStart}
                  onChange={e => setCustomStart(e.target.value)}
                  style={{ flex: 1, fontSize: 12, padding: '5px 8px', border: '1px solid var(--border-strong)',
                           borderRadius: 6, fontFamily: 'var(--font-sans)', outline: 'none' }} />
                <span style={{ fontSize: 12, color: 'var(--fg-muted)', flexShrink: 0 }}>to</span>
                <input type="date" value={customEnd}
                  onChange={e => setCustomEnd(e.target.value)}
                  style={{ flex: 1, fontSize: 12, padding: '5px 8px', border: '1px solid var(--border-strong)',
                           borderRadius: 6, fontFamily: 'var(--font-sans)', outline: 'none' }} />
              </div>
              <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: 12 }}
                onClick={() => setOpen(false)}>Apply</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const StatusCell = ({ a }) => {
  const m = { healthy: 'healthy', warn: 'warn', concern: 'concern' }[a.status];
  return <Pill kind={m}>{a.statusLabel}</Pill>;
};

const TrendNumber = ({ v, fmt = (x) => x, delta }) => {
  const arrow = delta > 0 ? '↑' : delta < 0 ? '↓' : '·';
  const cls = delta > 0 ? 'up' : delta < 0 ? 'down' : '';
  return (
    <span className="num">
      {fmt(v)} {delta !== 0 && (
        <span className={`stat-delta ${cls}`}>{arrow} {fmt(Math.abs(delta))}</span>
      )}
    </span>
  );
};

const TeamSummary = ({ members }) => {
  const totalTickets = members.reduce((s, a) => s + a.tickets, 0);
  const ticketsTrend = members.reduce((s, a) => s + a.ticketsTrend, 0);
  const avgRes = members.reduce((s, a) => s + a.resolved, 0) / members.length;
  const avgCsat = members.reduce((s, a) => s + a.csat, 0) / members.length;
  const tierCounts = [1, 2, 3].map(t => members.filter(a => a.tier === t).length).filter(Boolean);
  const tierLabel = tierCounts.length > 1
    ? tierCounts.map((n, i) => `${n} Tier ${i + 1}`).join(' · ')
    : `${members.length} agent${members.length !== 1 ? 's' : ''}`;

  return (
    <div className="stat-grid" style={{ marginBottom: 24 }}>
      <div className="stat">
        <div className="stat-label">Agents</div>
        <div className="stat-value">{members.length}</div>
        <div className="stat-meta">{tierLabel}</div>
      </div>
      <div className="stat">
        <div className="stat-label">Tickets</div>
        <div className="stat-value">
          {totalTickets}
          {ticketsTrend !== 0 && (
            <span className={`stat-delta ${ticketsTrend > 0 ? 'up' : 'down'}`}>
              {ticketsTrend > 0 ? '↑' : '↓'} {Math.abs(ticketsTrend)}
            </span>
          )}
        </div>
        <div className="stat-meta">vs prior window</div>
      </div>
      <div className="stat">
        <div className="stat-label">Resolution rate</div>
        <div className="stat-value">{Math.round(avgRes * 100)}%</div>
        <div className="stat-meta">weighted average</div>
      </div>
      <div className="stat">
        <div className="stat-label">CSAT</div>
        <div className="stat-value">{avgCsat.toFixed(1)}</div>
        <div className="stat-meta">{members.reduce((s, a) => s + 28, 0)} responses</div>
      </div>
    </div>
  );
};

const TIER_LABELS = { 1: 'Tier 1 · Frontline', 2: 'Tier 2 · Specialist', 3: 'Tier 3 · Escalation' };

const TeamDashboard = ({ openAgent }) => {
  const [dateRange, setDateRange] = React.useState('last30');
  const [tierFilter, setTierFilter] = React.useState('all');
  const fmtPct = (v) => `${Math.round(v * 100)}%`;

  const visibleTeam = tierFilter === 'all'
    ? TEAM
    : TEAM.filter(a => a.tier === parseInt(tierFilter));

  // When showing all tiers, build grouped rows with tier-header entries
  const tableRows = tierFilter === 'all'
    ? [1, 2, 3].flatMap(tier => {
        const members = TEAM.filter(a => a.tier === tier);
        if (!members.length) return [];
        const avgRes = members.reduce((s, a) => s + a.resolved, 0) / members.length;
        const avgCsat = members.reduce((s, a) => s + a.csat, 0) / members.length;
        return [
          { _type: 'tier-header', tier, count: members.length, avgRes, avgCsat },
          ...members.map(a => ({ _type: 'agent', ...a })),
        ];
      })
    : visibleTeam.map(a => ({ _type: 'agent', ...a }));

  return (
    <main className="main">
      <div className="page-head">
        <div>
          <h1 className="page-title">Team performance</h1>
          <p className="page-sub">ServiceNow + Amazon Connect + CSAT · synced 2 min ago</p>
        </div>
        <div className="row">
          <DateRangePicker value={dateRange} onChange={setDateRange} />
          <button className="btn btn-ai"><Icons.Sparkles />Generate all briefs</button>
        </div>
      </div>

      <TeamSummary members={visibleTeam} />

      <div className="tabs" style={{ marginBottom: 16 }}>
        {[['all', 'All', null], ['1', 'Tier 1', 3], ['2', 'Tier 2', 2], ['3', 'Tier 3', 1]].map(([id, label, n]) => (
          <div key={id} className={`tab ${tierFilter === id ? 'active' : ''}`}
            onClick={() => setTierFilter(id)}>
            {label}
            {n != null && (
              <span style={{ marginLeft: 6, fontFamily: 'var(--font-mono)', fontSize: 11,
                             color: tierFilter === id ? 'var(--indigo-600)' : 'var(--fg-muted)' }}>
                {n}
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="card" style={{ overflow: 'hidden', padding: 0 }}>
        <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
        <table className="table">
          <thead><tr>
            <th style={{ paddingLeft: 20 }}>Agent</th>
            <th>Status</th>
            <th>Tickets</th>
            <th>Resolved</th>
            <th>CSAT</th>
            <th>Trend</th>
            <th>Last 1:1</th>
            <th>Readiness</th>
          </tr></thead>
          <tbody>
            {tableRows.map((row, i) => {
              if (row._type === 'tier-header') {
                return (
                  <tr key={`tier-${row.tier}`} className="tier-row">
                    <td colSpan={8} style={{ paddingLeft: 20, paddingTop: 10, paddingBottom: 10 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.06em',
                                       textTransform: 'uppercase', color: 'var(--fg-muted)' }}>
                          {TIER_LABELS[row.tier]}
                        </span>
                        <span style={{ fontSize: 12, color: 'var(--fg-muted)' }}>
                          {row.count} agent{row.count > 1 ? 's' : ''}
                        </span>
                        <span style={{ fontSize: 12, color: 'var(--fg-secondary)',
                                       fontFamily: 'var(--font-mono)' }}>
                          avg res {fmtPct(row.avgRes)} · avg CSAT {row.avgCsat.toFixed(1)}
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              }
              return (
                <tr key={row.id} onClick={() => openAgent(row)}>
                  <td style={{ paddingLeft: 20 }}>
                    <div className="row">
                      <Avatar name={row.name} size={32} />
                      <div>
                        <div style={{ fontWeight: 500 }}>{row.name}</div>
                        <div style={{ fontSize: 12, color: 'var(--fg-muted)' }}>{row.role} · {row.tenure}</div>
                      </div>
                    </div>
                  </td>
                  <td><StatusCell a={row} /></td>
                  <td><TrendNumber v={row.tickets} delta={row.ticketsTrend} /></td>
                  <td><TrendNumber v={row.resolved} fmt={fmtPct} delta={row.resolvedTrend} /></td>
                  <td><TrendNumber v={row.csat.toFixed(1)} delta={row.csatTrend} /></td>
                  <td>
                    <Sparkline values={row.spark}
                      color={row.status === 'concern' ? 'var(--rose-500)' : row.status === 'warn' ? 'var(--amber-500)' : 'var(--teal-500)'} />
                  </td>
                  <td><span style={{ color: 'var(--fg-muted)', fontSize: 12 }}>{row.lastOneOnOne}</span></td>
                  <td><Pill kind={row.readiness.state} dot={false}>{row.readiness.label}</Pill></td>
                </tr>
              );
            })}
          </tbody>
        </table>
        </div>
      </div>
    </main>
  );
};

window.TeamDashboard = TeamDashboard;
