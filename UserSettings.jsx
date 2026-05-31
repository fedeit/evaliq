// User Settings — notification preferences and additional email recipients.

const Toggle = ({ checked, onChange }) => (
  <button
    type="button"
    onClick={() => onChange(!checked)}
    style={{
      width: 40, height: 22, borderRadius: 11, border: 'none', cursor: 'pointer',
      background: checked ? 'var(--indigo-500)' : 'var(--border-strong)',
      position: 'relative', flexShrink: 0, transition: 'background 0.18s',
      padding: 0,
    }}>
    <span style={{
      position: 'absolute', top: 3, left: checked ? 21 : 3,
      width: 16, height: 16, borderRadius: 8, background: 'white',
      transition: 'left 0.18s', boxShadow: '0 1px 3px rgba(0,0,0,0.18)',
    }} />
  </button>
);

const SettingsSection = ({ title, description, children }) => (
  <div className="card card-pad-lg" style={{ marginBottom: 16 }}>
    <div style={{ marginBottom: 20, paddingBottom: 16, borderBottom: '1px solid var(--border-subtle)' }}>
      <h3 style={{ margin: '0 0 4px', fontSize: 15, fontWeight: 600 }}>{title}</h3>
      {description && <p style={{ margin: 0, fontSize: 13, color: 'var(--fg-secondary)', lineHeight: 1.5 }}>{description}</p>}
    </div>
    {children}
  </div>
);

const SettingRow = ({ label, hint, children }) => (
  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
                gap: 24, padding: '12px 0', borderBottom: '1px solid var(--border-subtle)' }}>
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--fg-primary)', marginBottom: 2 }}>{label}</div>
      {hint && <div style={{ fontSize: 12, color: 'var(--fg-muted)', lineHeight: 1.5 }}>{hint}</div>}
    </div>
    <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>{children}</div>
  </div>
);

const TIMING_OPTIONS = [
  { value: '1h',  label: '1 hour before' },
  { value: '2h',  label: '2 hours before' },
  { value: '4h',  label: '4 hours before' },
  { value: '12h', label: '12 hours before' },
  { value: '24h', label: '24 hours before' },
  { value: '48h', label: '48 hours before' },
  { value: '1w',  label: '1 week before' },
];

const INITIAL_RECIPIENTS = [
  { id: 1, name: 'Sarah Chen', email: 'sarah.chen@stanford.edu', role: 'HR Business Partner' },
];

const UserSettings = () => {
  const [briefEnabled, setBriefEnabled] = React.useState(true);
  const [briefTiming, setBriefTiming] = React.useState('24h');
  const [summaryEnabled, setSummaryEnabled] = React.useState(true);
  const [recipients, setRecipients] = React.useState(INITIAL_RECIPIENTS);
  const [adding, setAdding] = React.useState(false);
  const [newRec, setNewRec] = React.useState({ name: '', email: '', role: '' });
  const [saved, setSaved] = React.useState(false);
  const [testSent, setTestSent] = React.useState(false);

  const removeRecipient = (id) => setRecipients(rs => rs.filter(r => r.id !== id));

  const addRecipient = () => {
    if (!newRec.email.trim()) return;
    setRecipients(rs => [...rs, { id: Date.now(), ...newRec }]);
    setNewRec({ name: '', email: '', role: '' });
    setAdding(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleTest = () => {
    setTestSent(true);
    setTimeout(() => setTestSent(false), 3000);
  };

  return (
    <main className="main" style={{ maxWidth: 720 }}>
      <div className="page-head">
        <div>
          <h1 className="page-title">User Settings</h1>
          <p className="page-sub">sam.hidalgo@stanford.edu · IT Helpdesk Manager</p>
        </div>
      </div>

      {/* Prep brief notifications */}
      <SettingsSection
        title="Prep brief emails"
        description="EvalIQ generates a source-backed prep draft before each scheduled 1:1. The manager reviews it before use.">

        <SettingRow label="Enable prep brief emails"
          hint="Receive a brief email before each 1:1 pulled from your Google Calendar.">
          <Toggle checked={briefEnabled} onChange={setBriefEnabled} />
        </SettingRow>

        <SettingRow label="Deliver brief"
          hint="How far in advance of the scheduled 1:1 the email is sent.">
          <select
            value={briefTiming}
            onChange={e => setBriefTiming(e.target.value)}
            disabled={!briefEnabled}
            style={{ fontSize: 13, padding: '6px 10px', border: '1px solid var(--border-default)',
                     borderRadius: 8, background: 'white', color: 'var(--fg-primary)',
                     cursor: 'pointer', outline: 'none', fontFamily: 'var(--font-sans)',
                     opacity: briefEnabled ? 1 : 0.45 }}>
            {TIMING_OPTIONS.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </SettingRow>

        <SettingRow label="Test email"
          hint="Send a sample prep brief to sam.hidalgo@stanford.edu right now.">
          {testSent ? (
            <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--teal-700)' }}>
              <Icons.CheckCircle size={14} /> Sent
            </span>
          ) : (
            <button className="btn btn-secondary" style={{ fontSize: 12 }}
              disabled={!briefEnabled} onClick={handleTest}>
              <Icons.Mail size={13} /> Send test
            </button>
          )}
        </SettingRow>
      </SettingsSection>

      {/* Additional recipients */}
      <SettingsSection
        title="Approved stakeholders"
        description="Approved stakeholders can receive summary notifications after manager review. Raw prep briefs remain manager-facing by default.">

        {recipients.length > 0 && (
          <div style={{ marginBottom: 12 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto',
                          gap: '0 12px', padding: '6px 0', marginBottom: 4 }}>
              {['Name', 'Email', 'Role', ''].map(h => (
                <span key={h} style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em',
                                       color: 'var(--fg-muted)', fontWeight: 600 }}>{h}</span>
              ))}
            </div>
            {recipients.map(r => (
              <div key={r.id} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto',
                                       gap: '0 12px', padding: '10px 0',
                                       borderTop: '1px solid var(--border-subtle)', alignItems: 'center' }}>
                <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--fg-primary)' }}>{r.name || '—'}</span>
                <span style={{ fontSize: 13, color: 'var(--fg-secondary)', fontFamily: 'var(--font-mono)', fontSize: 12 }}>{r.email}</span>
                <span style={{ fontSize: 12, color: 'var(--fg-muted)' }}>{r.role || '—'}</span>
                <button className="btn btn-ghost"
                  style={{ padding: '3px 6px', color: 'var(--rose-600)', fontSize: 12 }}
                  onClick={() => removeRecipient(r.id)}>
                  <Icons.X size={12} /> Remove
                </button>
              </div>
            ))}
          </div>
        )}

        {recipients.length === 0 && !adding && (
          <p style={{ fontSize: 13, color: 'var(--fg-muted)', margin: '0 0 12px', fontStyle: 'italic' }}>
            No additional recipients yet.
          </p>
        )}

        {adding ? (
          <div style={{ padding: '14px 16px', border: '1px dashed var(--border-strong)',
                        borderRadius: 8, background: 'var(--bg-surface-2)', marginTop: 8 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
              <div className="field" style={{ marginBottom: 0 }}>
                <label>Name</label>
                <input type="text" placeholder="e.g. Sarah Chen" value={newRec.name}
                  onChange={e => setNewRec(r => ({ ...r, name: e.target.value }))}
                  style={{ width: '100%' }} />
              </div>
              <div className="field" style={{ marginBottom: 0 }}>
                <label>Role <span style={{ fontWeight: 400, color: 'var(--fg-muted)' }}>(optional)</span></label>
                <input type="text" placeholder="e.g. HR Business Partner" value={newRec.role}
                  onChange={e => setNewRec(r => ({ ...r, role: e.target.value }))}
                  style={{ width: '100%' }} />
              </div>
            </div>
            <div className="field" style={{ marginBottom: 12 }}>
              <label>Email address</label>
              <input type="email" placeholder="name@stanford.edu" value={newRec.email}
                onChange={e => setNewRec(r => ({ ...r, email: e.target.value }))}
                style={{ width: '100%' }} />
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn btn-ghost" style={{ fontSize: 12 }}
                onClick={() => { setAdding(false); setNewRec({ name: '', email: '', role: '' }); }}>
                Cancel
              </button>
              <button className="btn btn-primary" style={{ fontSize: 12 }} onClick={addRecipient}>
                <Icons.Plus size={12} /> Add recipient
              </button>
            </div>
          </div>
        ) : (
          <button className="btn btn-ghost" style={{ marginTop: 4 }} onClick={() => setAdding(true)}>
            <Icons.Plus size={13} /> Add recipient
          </button>
        )}
      </SettingsSection>

      {/* Post-meeting summaries */}
      <SettingsSection
        title="Post-meeting summaries"
        description="After you log a 1:1, EvalIQ emails you (and any additional recipients above) a summary of the session notes and action items.">

        <SettingRow label="Enable post-meeting summary emails"
          hint="Sent immediately after you click Done in the post-meeting logger.">
          <Toggle checked={summaryEnabled} onChange={setSummaryEnabled} />
        </SettingRow>

        <SettingRow label="Additional recipients receive summaries"
          hint="All recipients listed above also receive the post-meeting summary.">
          <span style={{ fontSize: 13, color: recipients.length > 0 && summaryEnabled ? 'var(--teal-700)' : 'var(--fg-muted)',
                         fontWeight: 500 }}>
            {recipients.length > 0 && summaryEnabled ? `${recipients.length} recipient${recipients.length > 1 ? 's' : ''}` : 'None'}
          </span>
        </SettingRow>
      </SettingsSection>

      {/* Save */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 8 }}>
        {saved && (
          <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--teal-700)' }}>
            <Icons.CheckCircle size={14} /> Settings saved
          </span>
        )}
        <button className="btn btn-primary" onClick={handleSave}>
          <Icons.Check size={14} /> Save settings
        </button>
      </div>
    </main>
  );
};

window.UserSettings = UserSettings;
