// AI-Generated 1:1 Prep Brief — five-section editorial document
// with inline source citations.

const BriefSection = ({ eyebrow, children }) => (
  <section className="brief-section">
    <h3>{eyebrow}</h3>
    {children}
  </section>
);

const Cite = ({ id }) => <a className="cite">{id}</a>;

const PrepBrief = ({ a, onBack, openLogger }) => (
  <main className="main">
    <div className="page-head">
      <div>
        <div className="row" style={{ marginBottom: 6 }}>
          <Pill kind="ai"><Icons.Sparkles size={11} /> AI-generated · 24h before 1:1</Pill>
          <span style={{ fontSize: 12, color: 'var(--fg-muted)' }}>Coverage: 92% · 3 sources · regenerate available</span>
        </div>
        <h1 className="page-title">Prep brief — {a.name}</h1>
        <p className="page-sub">Tomorrow at 10:00 · 30 min · review window 5 min</p>
      </div>
      <div className="row">
        <button className="btn btn-secondary">Edit</button>
        <button className="btn btn-secondary"><Icons.Sparkles />Regenerate</button>
        <button className="btn btn-primary" onClick={openLogger}><Icons.Check />Mark reviewed</button>
      </div>
    </div>

    <div className="brief">
      <span className="brief-eyebrow"><Icons.Sparkles size={11} /> Performance summary</span>
      <h2 className="brief-title">{a.name.split(' ')[0]} is steady on volume but slipping on first-response time.</h2>

      <BriefSection eyebrow="Trajectory">
        <p>Resolution rate held at <strong>{Math.round(a.resolved * 100)}%</strong> over the last 30 days, in line with team average. First-response time slipped on three high-priority tickets <Cite id="INC-44219" /><Cite id="INC-44402" /><Cite id="INC-44587" />, all involving a single escalation path through the network team.</p>
        <p>CSAT trended down from 4.6 to {a.csat.toFixed(1)} across 28 responses <Cite id="CSAT-Q1" />. Two negative comments referenced wait time, not technical accuracy — suggesting the bottleneck is upstream.</p>
      </BriefSection>

      <BriefSection eyebrow="Highlights">
        <div className="bullet-row">
          <span className="bullet-mark up"><Icons.TrendUp size={12} /></span>
          <div className="bullet-text">
            Handled the Datacenter B power-event escalation single-handedly, kept SLA on 11 of 14 affected tickets <Cite id="INC-44021" />.
            <small>Worth specific recognition. Mentor opportunity for Tomás and Derek.</small>
          </div>
        </div>
        <div className="bullet-row">
          <span className="bullet-mark up"><Icons.TrendUp size={12} /></span>
          <div className="bullet-text">
            CSAT verbatims praised follow-through twice this month <Cite id="CSAT-2104" />.
            <small>Theme: persistence on MFA / login issues that other agents bounce.</small>
          </div>
        </div>
      </BriefSection>

      <BriefSection eyebrow="Concerns">
        <div className="bullet-row">
          <span className="bullet-mark down"><Icons.TrendDown size={12} /></span>
          <div className="bullet-text">
            First-response p95 climbed to 14m 22s, up from 11m last cycle <Cite id="SN-Q1" />.
            <small>Three breaches all on tickets requiring network-team handoff. Likely a process issue, not effort.</small>
          </div>
        </div>
        <div className="bullet-row">
          <span className="bullet-mark down"><Icons.TrendDown size={12} /></span>
          <div className="bullet-text">
            Reopened tickets up from 4 to 6 <Cite id="INC-43712" /><Cite id="INC-43890" />.
            <small>Pattern: laptop imaging issues where root cause wasn't documented in the resolution note.</small>
          </div>
        </div>
      </BriefSection>

      <BriefSection eyebrow="Coaching questions">
        <ol style={{ paddingLeft: 18, margin: 0, fontSize: 14, lineHeight: 1.8, color: 'var(--slate-800)' }}>
          <li>Walk me through the network-team handoff on INC-44219. Where did the time go?</li>
          <li>What would have to be true for first-response p95 to land under 12 minutes next month?</li>
          <li>You mentioned Tier 3 as a 12-month goal — what's the first step you'd want this quarter?</li>
          <li>How are you feeling about workload right now, honestly?</li>
        </ol>
      </BriefSection>

      <BriefSection eyebrow="Suggested next steps">
        <ol style={{ paddingLeft: 18, margin: 0, fontSize: 14, lineHeight: 1.8, color: 'var(--slate-800)' }}>
          <li>Loop in network-team lead on the three breach tickets to fix the handoff path.</li>
          <li>Pair Maya with Priya for two escalation shadows over the next two weeks.</li>
          <li>Revisit Tier 3 path in the Q2 development plan; concrete milestone suggested.</li>
        </ol>
      </BriefSection>
    </div>
  </main>
);

window.PrepBrief = PrepBrief;
