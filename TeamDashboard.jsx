// Team Dashboard — primary roster screen with per-agent performance tiles.

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

const TeamSummary = () => (
  <div className="stat-grid" style={{ marginBottom: 24 }}>
    <div className="stat">
      <div className="stat-label">Team size</div>
      <div className="stat-value">6</div>
      <div className="stat-meta">3 Tier 1 · 2 Tier 2 · 1 Tier 3</div>
    </div>
    <div className="stat">
      <div className="stat-label">Tickets · 30d</div>
      <div className="stat-value">571 <span className="stat-delta up">↑ 8%</span></div>
      <div className="stat-meta">vs prior 30d window</div>
    </div>
    <div className="stat">
      <div className="stat-label">Resolution rate</div>
      <div className="stat-value">89.3% <span className="stat-delta down">↓ 1.2pp</span></div>
      <div className="stat-meta">team weighted average</div>
    </div>
    <div className="stat">
      <div className="stat-label">CSAT</div>
      <div className="stat-value">4.5 <span className="stat-delta down">↓ 0.1</span></div>
      <div className="stat-meta">211 responses</div>
    </div>
  </div>
);

const TeamDashboard = ({ openAgent }) => {
  const fmtPct = (v) => `${Math.round(v * 100)}%`;
  return (
    <main className="main">
      <div className="page-head">
        <div>
          <h1 className="page-title">Team performance</h1>
          <p className="page-sub">Last 30 days · ServiceNow + Amazon Connect + CSAT · synced 2 min ago</p>
        </div>
        <div className="row">
          <button className="btn btn-secondary"><Icons.Calendar />Q4 2025</button>
          <button className="btn btn-ai"><Icons.Sparkles />Generate all briefs</button>
        </div>
      </div>

      <TeamSummary />

      <div className="card" style={{ overflow: 'hidden' }}>
        <table className="table">
          <thead><tr>
            <th style={{ paddingLeft: 20 }}>Agent</th>
            <th>Status</th>
            <th>Tickets · 30d</th>
            <th>Resolved</th>
            <th>CSAT</th>
            <th>Trend</th>
            <th>Last 1:1</th>
            <th>Readiness</th>
          </tr></thead>
          <tbody>
            {TEAM.map(a => (
              <tr key={a.id} onClick={() => openAgent(a)}>
                <td style={{ paddingLeft: 20 }}>
                  <div className="row">
                    <Avatar name={a.name} size={32} />
                    <div>
                      <div style={{ fontWeight: 500 }}>{a.name}</div>
                      <div style={{ fontSize: 12, color: 'var(--fg-muted)' }}>{a.role} · {a.tenure}</div>
                    </div>
                  </div>
                </td>
                <td><StatusCell a={a} /></td>
                <td><TrendNumber v={a.tickets} delta={a.ticketsTrend} /></td>
                <td><TrendNumber v={a.resolved} fmt={fmtPct} delta={a.resolvedTrend} /></td>
                <td><TrendNumber v={a.csat.toFixed(1)} delta={a.csatTrend} /></td>
                <td>
                  <Sparkline values={a.spark}
                    color={a.status === 'concern' ? 'var(--rose-500)' : a.status === 'warn' ? 'var(--amber-500)' : 'var(--teal-500)'} />
                </td>
                <td><span style={{ color: 'var(--fg-muted)', fontSize: 12 }}>{a.lastOneOnOne}</span></td>
                <td><Pill kind={a.readiness.state} dot={false}>{a.readiness.label}</Pill></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

window.TeamDashboard = TeamDashboard;
