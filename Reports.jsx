// Reports — source-backed team performance summary for review cycles.

const ReportMetric = ({ label, value, note, tone = 'neutral' }) => (
  <div className="stat">
    <div className="stat-label">{label}</div>
    <div className="stat-value" style={{
      color: tone === 'good' ? 'var(--teal-700)' : tone === 'warn' ? 'var(--amber-700)' : undefined,
    }}>{value}</div>
    <div className="stat-meta">{note}</div>
  </div>
);

const ReportRow = ({ name, focus, evidence, status }) => (
  <tr>
    <td style={{ paddingLeft: 20 }}>
      <div className="row">
        <Avatar name={name} size={32} />
        <div>
          <div style={{ fontWeight: 500 }}>{name}</div>
          <div style={{ fontSize: 12, color: 'var(--fg-muted)' }}>{focus}</div>
        </div>
      </div>
    </td>
    <td>{evidence}</td>
    <td><Pill kind={status.kind}>{status.label}</Pill></td>
  </tr>
);

const Reports = () => (
  <main className="main">
    <div className="page-head">
      <div>
        <h1 className="page-title">Team review report</h1>
        <p className="page-sub">30-day coaching evidence · generated from tickets, calls, CSAT, and 1:1 notes</p>
      </div>
      <div className="row">
        <button className="btn btn-secondary"><Icons.Calendar />Last 30 days</button>
        <button className="btn btn-ai"><Icons.Sparkles />Generate report</button>
      </div>
    </div>

    <div className="stat-grid" style={{ marginBottom: 24, gridTemplateColumns: 'repeat(4, 1fr)' }}>
      <ReportMetric label="Resolution" value="84%" note="+4 pts vs prior window" tone="good" />
      <ReportMetric label="CSAT" value="4.6" note="stable across 142 responses" tone="good" />
      <ReportMetric label="SLA flags" value="3" note="network handoff pattern" tone="warn" />
      <ReportMetric label="Brief coverage" value="92%" note="11 of 12 meetings sourced" />
    </div>

    <div className="card card-pad-lg" style={{ marginBottom: 24 }}>
      <div className="row" style={{ marginBottom: 14 }}>
        <span style={{ color: 'var(--indigo-600)' }}><Icons.Sparkles size={18} /></span>
        <h3 style={{ margin: 0, fontSize: 14, fontWeight: 600 }}>AI summary</h3>
        <Pill kind="ai">source-backed</Pill>
      </div>
      <p style={{ margin: 0, fontSize: 14, lineHeight: 1.65, color: 'var(--slate-800)' }}>
        Team performance is stable overall, with strong resolution and CSAT. The primary coaching theme is not
        effort or accuracy; it is first-response delay on network-team handoffs. Maya and Priya are ready for more
        Tier 3 shadowing, while Derek needs a scheduled 1:1 and clearer documentation expectations.
      </p>
    </div>

    <div className="card" style={{ overflow: 'hidden' }}>
      <table className="table">
        <thead><tr>
          <th style={{ paddingLeft: 20 }}>Agent</th>
          <th>Evidence to discuss</th>
          <th>Status</th>
        </tr></thead>
        <tbody>
          <ReportRow name="Maya Chen" focus="Tier 2 support"
            evidence="CSAT praise on MFA follow-through; first-response slipped on network handoffs."
            status={{ kind: 'warn', label: 'Coach handoff path' }} />
          <ReportRow name="Priya Shah" focus="Tier 2 support"
            evidence="Highest resolution rate in the cohort; useful mentor for escalation handling."
            status={{ kind: 'healthy', label: 'Recognize' }} />
          <ReportRow name="Derek Moore" focus="Tier 1 support"
            evidence="No recent 1:1 logged; documentation gaps appear in reopened laptop-imaging tickets."
            status={{ kind: 'concern', label: 'Schedule 1:1' }} />
          <ReportRow name="Jordan Reyes" focus="Tier 1 support"
            evidence="On-track output; action items from last coaching note are complete."
            status={{ kind: 'healthy', label: 'On track' }} />
        </tbody>
      </table>
    </div>
  </main>
);

window.Reports = Reports;
