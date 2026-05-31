// Admin — Integrations page. Connect EvalIQ to ticketing, call center, CSAT, and calendar APIs.

const INTEGRATIONS_DATA = [
  {
    id: 'servicenow',
    name: 'ServiceNow',
    initials: 'SN',
    color: '#16a34a',
    category: 'Ticketing',
    description: 'Pulls ticket volume, resolution rate, SLA adherence, and reopened tickets per agent on a rolling 30 and 90-day basis.',
    status: 'connected',
    lastSync: '2 min ago',
    fields: [
      { key: 'instance', label: 'Instance URL', hint: 'yourorg.service-now.com', type: 'text', value: 'stanford.service-now.com' },
      { key: 'username', label: 'API username', hint: 'evaliq-svc', type: 'text', value: 'evaliq-svc' },
      { key: 'token', label: 'API token', hint: '', type: 'password', value: 'sn_exampletoken123456abcdef' },
    ],
  },
  {
    id: 'zendesk',
    name: 'Zendesk',
    initials: 'ZD',
    color: '#0e7490',
    category: 'Ticketing',
    description: 'Alternative to ServiceNow. Pulls tickets, first-response time, and CSAT scores from Zendesk Support via the REST API.',
    status: 'disconnected',
    lastSync: null,
    fields: [
      { key: 'subdomain', label: 'Subdomain', hint: 'yourorg.zendesk.com', type: 'text', value: '' },
      { key: 'email', label: 'Admin email', hint: 'admin@yourorg.edu', type: 'email', value: '' },
      { key: 'token', label: 'API token', hint: '', type: 'password', value: '' },
    ],
  },
  {
    id: 'amazonconnect',
    name: 'Amazon Connect',
    initials: 'AC',
    color: '#d97706',
    category: 'Call center',
    description: 'Pulls average handle time, abandonment rate, and call quality scores. Requires a read-only IAM user with the AmazonConnectReadOnlyAccess policy.',
    status: 'connected',
    lastSync: '2 min ago',
    fields: [
      { key: 'instanceArn', label: 'Instance ARN', hint: 'arn:aws:connect:us-east-1:123456789:instance/…', type: 'text', value: 'arn:aws:connect:us-east-1:123456789012:instance/abcd1234-ef56' },
      { key: 'accessKey', label: 'Access key ID', hint: 'AKIAIOSFODNN7EXAMPLE', type: 'text', value: 'AKIAIOSFODNN7EXAMPLE' },
      { key: 'secretKey', label: 'Secret access key', hint: '', type: 'password', value: 'wJalrXUtnFEMIK7MDENGbPxRfiCYEXAMPLEKEY' },
      { key: 'region', label: 'AWS region', hint: 'us-east-1', type: 'text', value: 'us-east-1' },
    ],
  },
  {
    id: 'five9',
    name: 'Five9',
    initials: 'F9',
    color: '#dc2626',
    category: 'Call center',
    description: 'Alternative to Amazon Connect. Pulls call metrics from Five9 cloud contact center via the Five9 Statistics and Reporting API.',
    status: 'disconnected',
    lastSync: null,
    fields: [
      { key: 'domain', label: 'Domain', hint: 'app.five9.com', type: 'text', value: '' },
      { key: 'username', label: 'API username', hint: '', type: 'text', value: '' },
      { key: 'password', label: 'API password', hint: '', type: 'password', value: '' },
    ],
  },
  {
    id: 'csat',
    name: 'CSAT email',
    initials: 'CS',
    color: '#7c3aed',
    category: 'Customer satisfaction',
    description: 'Forward CSAT survey response emails to the address below. EvalIQ parses the score and agent ID automatically. Works with any survey tool that sends structured email reports.',
    status: 'connected',
    lastSync: '14 min ago',
    fields: [
      { key: 'address', label: 'Forward responses to this address', hint: '', type: 'readonly', value: 'csat-ingest+stanford@evaliq.app' },
    ],
  },
  {
    id: 'gcal',
    name: 'Google Calendar',
    initials: 'GC',
    color: '#1d4ed8',
    category: 'Calendar',
    description: 'Reads scheduled 1:1s from the manager\'s calendar to trigger prep brief generation 24 hours before each meeting.',
    status: 'connected',
    lastSync: '5 min ago',
    fields: [
      { key: 'account', label: 'Connected account', hint: '', type: 'oauth-connected', value: 'sam.hidalgo@stanford.edu' },
    ],
  },
];

const ServiceLogo = ({ initials, color, size = 36 }) => (
  <span style={{
    width: size, height: size, borderRadius: 8, background: color, flexShrink: 0,
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    color: '#fff', fontSize: 11, fontWeight: 700, letterSpacing: '0.04em',
  }}>{initials}</span>
);

const IntegrationCard = ({ intg }) => {
  const [open, setOpen] = React.useState(false);
  const [values, setValues] = React.useState(
    () => Object.fromEntries(intg.fields.map(f => [f.key, f.value]))
  );
  const [shown, setShown] = React.useState({});
  const [status, setStatus] = React.useState(intg.status);
  const [testState, setTestState] = React.useState(null); // null | 'testing' | 'ok' | 'fail'

  const connected = status === 'connected';

  const handleTest = () => {
    setTestState('testing');
    setTimeout(() => setTestState('ok'), 1400);
  };

  return (
    <div className={`card intg-card ${open ? 'intg-open' : ''}`}>

      <div className="intg-header" onClick={() => setOpen(o => !o)}>
        <ServiceLogo initials={intg.initials} color={intg.color} />
        <div className="intg-meta">
          <div className="intg-name">{intg.name}</div>
          <div className="intg-sub">
            <span className="t-eyebrow">{intg.category}</span>
            {connected && intg.lastSync && (
              <span className="intg-sync">· Last sync {intg.lastSync}</span>
            )}
          </div>
        </div>
        <div className="intg-right">
          <Pill kind={connected ? 'healthy' : 'neutral'} dot>
            {connected ? 'Connected' : 'Not connected'}
          </Pill>
          <span className={`intg-chevron ${open ? 'open' : ''}`}>
            <Icons.Chevron />
          </span>
        </div>
      </div>

      {open && (
        <div className="intg-body">
          <p style={{ fontSize: 13, color: 'var(--fg-secondary)', marginBottom: 20, lineHeight: 1.55 }}>
            {intg.description}
          </p>

          {intg.fields.map(f => (
            <div className="field" key={f.key}>
              <label>{f.label}</label>

              {f.type === 'readonly' && (
                <div className="intg-readonly">
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, flex: 1 }}>{values[f.key]}</span>
                  <button className="btn btn-ghost" style={{ padding: '3px 8px', fontSize: 12 }}
                    onClick={() => navigator.clipboard?.writeText(values[f.key])}>
                    <Icons.Copy size={12} /> Copy
                  </button>
                </div>
              )}

              {f.type === 'oauth-connected' && (
                <div className="intg-readonly">
                  <Icons.CheckCircle size={14} style={{ color: 'var(--teal-700)', flexShrink: 0 }} />
                  <span style={{ fontSize: 13, fontWeight: 500, flex: 1 }}>{values[f.key]}</span>
                  <button className="btn btn-ghost" style={{ padding: '3px 8px', fontSize: 12 }}>
                    Re-authorize
                  </button>
                </div>
              )}

              {f.type === 'password' && (
                <div style={{ position: 'relative', width: '100%' }}>
                  <input
                    type={shown[f.key] ? 'text' : 'password'}
                    value={values[f.key]}
                    placeholder={f.hint}
                    style={{ width: '100%', paddingRight: 36 }}
                    onChange={e => setValues(v => ({ ...v, [f.key]: e.target.value }))}
                  />
                  <button
                    onClick={() => setShown(s => ({ ...s, [f.key]: !s[f.key] }))}
                    style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)',
                             background: 'none', border: 'none', cursor: 'pointer',
                             color: 'var(--fg-muted)', display: 'flex', padding: 4 }}>
                    {shown[f.key] ? <Icons.EyeOff size={13} /> : <Icons.Eye size={13} />}
                  </button>
                </div>
              )}

              {(f.type === 'text' || f.type === 'email') && (
                <input
                  type={f.type}
                  value={values[f.key]}
                  placeholder={f.hint}
                  style={{ width: '100%' }}
                  onChange={e => setValues(v => ({ ...v, [f.key]: e.target.value }))}
                />
              )}
            </div>
          ))}

          <div className="intg-actions">
            {intg.fields[0].type !== 'readonly' && intg.fields[0].type !== 'oauth-connected' && (
              testState === 'ok' ? (
                <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--teal-700)' }}>
                  <Icons.CheckCircle size={14} /> Connection verified
                </span>
              ) : testState === 'testing' ? (
                <span style={{ fontSize: 13, color: 'var(--fg-muted)' }}>Testing…</span>
              ) : (
                <button className="btn btn-secondary" onClick={handleTest}>
                  <Icons.Refresh /> Test connection
                </button>
              )
            )}
            <div style={{ flex: 1 }} />
            {connected ? (
              <>
                <button className="btn btn-secondary"
                  style={{ color: 'var(--rose-700)', borderColor: 'var(--rose-100)' }}
                  onClick={() => { setStatus('disconnected'); setOpen(false); }}>
                  Disconnect
                </button>
                <button className="btn btn-primary" onClick={() => setOpen(false)}>
                  Save changes
                </button>
              </>
            ) : (
              <button className="btn btn-primary"
                onClick={() => { setStatus('connected'); setTestState(null); setOpen(false); }}>
                Connect
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const CATEGORIES = ['Ticketing', 'Call center', 'Customer satisfaction', 'Calendar'];

const AdminIntegrations = () => {
  const connectedCount = INTEGRATIONS_DATA.filter(i => i.status === 'connected').length;
  const [syncing, setSyncing] = React.useState(false);
  const [lastSync, setLastSync] = React.useState('2 min ago');

  const handleSyncNow = () => {
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
      setLastSync('just now');
    }, 1800);
  };

  return (
    <main className="main" style={{ maxWidth: 820 }}>
      <div className="page-head">
        <div>
          <h1 className="page-title">Integrations</h1>
          <p className="page-sub">
            {connectedCount} of {INTEGRATIONS_DATA.length} connected · One-time setup per platform · Central IT provisions credentials
          </p>
        </div>
        <button className="btn btn-secondary" onClick={handleSyncNow} disabled={syncing}>
          <Icons.Refresh size={14} style={syncing ? { animation: 'spin 0.8s linear infinite' } : {}} />
          {syncing ? 'Syncing…' : 'Sync now'}
        </button>
      </div>

      <div className="stat-grid" style={{ marginBottom: 28, gridTemplateColumns: 'repeat(3, 1fr)' }}>
        <div className="stat">
          <div className="stat-label">Connected</div>
          <div className="stat-value">{connectedCount} <span style={{ fontSize: 14, fontWeight: 400, color: 'var(--fg-muted)' }}>/ {INTEGRATIONS_DATA.length}</span></div>
          <div className="stat-meta">integrations active</div>
        </div>
        <div className="stat">
          <div className="stat-label">Last sync</div>
          <div className="stat-value" style={{ fontSize: 18 }}>{lastSync}</div>
          <div className="stat-meta">ServiceNow + Amazon Connect</div>
        </div>
        <div className="stat">
          <div className="stat-label">Data coverage</div>
          <div className="stat-value">73%</div>
          <div className="stat-meta">across active integrations this window</div>
        </div>
      </div>

      {CATEGORIES.map(cat => {
        const items = INTEGRATIONS_DATA.filter(i => i.category === cat);
        return (
          <div key={cat} style={{ marginBottom: 28 }}>
            <div className="t-eyebrow" style={{ marginBottom: 10 }}>{cat}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {items.map(intg => <IntegrationCard key={intg.id} intg={intg} />)}
            </div>
          </div>
        );
      })}
    </main>
  );
};

window.AdminIntegrations = AdminIntegrations;
