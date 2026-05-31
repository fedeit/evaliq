// Shared atoms — Avatar, Pill, Sparkline, Brand, NavItem.
const initials = (name) => name.split(' ').map(s => s[0]).slice(0,2).join('');

const Avatar = ({ name, size = 32 }) => (
  <span className={`avatar avatar-${size}`}>{initials(name)}</span>
);

const Pill = ({ kind = 'neutral', dot = true, children }) => (
  <span className={`pill pill-${kind}`}>
    {dot && <span className="pill-dot" />} {children}
  </span>
);

const Sparkline = ({ values, color = 'var(--indigo-500)' }) => {
  const max = Math.max(...values), min = Math.min(...values);
  const w = 64, h = 20, pad = 1;
  const pts = values.map((v, i) => {
    const x = pad + (i / (values.length - 1)) * (w - pad * 2);
    const y = pad + (1 - (v - min) / (max - min || 1)) * (h - pad * 2);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');
  return (
    <svg className="spark" viewBox={`0 0 ${w} ${h}`}>
      <polyline fill="none" stroke={color} strokeWidth="1.5" points={pts}
                strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

const Brand = () => (
  <div className="nav-brand">
    <span className="nav-brand-mark">
      <svg viewBox="0 0 40 40" width="20" height="20"><g transform="translate(8 8)" fill="#fff">
        <rect x="0" y="0" width="14" height="2.8" rx="0.8"/>
        <rect x="0" y="8.4" width="9.5" height="2.8" rx="0.8"/>
        <rect x="0" y="16.8" width="14" height="2.8" rx="0.8"/>
        <circle cx="18" cy="18" r="1.3" opacity="0.5"/>
        <circle cx="21" cy="14" r="1.3" opacity="0.75"/>
        <circle cx="24" cy="10" r="1.3"/>
      </g></svg>
    </span>
    <span className="nav-brand-name">EvalIQ</span>
  </div>
);

const NavItem = ({ icon: Ico, label, count, active, onClick, primary }) => (
  <div className={`nav-item ${active ? 'active' : ''} ${primary ? 'nav-main' : ''}`} onClick={onClick}>
    <Ico /> <span>{label}</span>
    {count != null && <span className="nav-item-count">{count}</span>}
  </div>
);

const Sidebar = ({ route, setRoute }) => (
  <aside className="nav">
    <Brand />
    <NavItem icon={Icons.Users} label="Team" count="6" primary
      active={route === 'team' || route === 'profile'}
      onClick={() => setRoute('team')} />
    <NavItem icon={Icons.Calendar} label="1:1s" count="3" primary
      active={route === '1on1s'}
      onClick={() => setRoute('1on1s')} />
    <NavItem icon={Icons.Sparkles} label="Briefs" count="2" primary
      active={route === 'brief'}
      onClick={() => setRoute('brief')} />
    <NavItem icon={Icons.ChartLine} label="Reports"
      active={route === 'reports'}
      onClick={() => setRoute('reports')} />
    <div style={{ flex: 1 }} />
    <NavItem icon={Icons.Link2} label="Integrations" primary
      active={route === 'integrations'}
      onClick={() => setRoute('integrations')} />
    <NavItem icon={Icons.Settings} label="User Settings"
      active={route === 'settings'}
      onClick={() => setRoute('settings')} />
    <div className="nav-user">
      <Avatar name="Sam Hidalgo" size={32} />
      <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <span style={{ fontSize: 13, fontWeight: 500 }}>Sam Hidalgo</span>
        <span style={{ fontSize: 11, color: 'var(--fg-muted)' }}>IT Helpdesk · Stanford</span>
      </div>
    </div>
  </aside>
);

const Header = ({ route, agent, onBack }) => {
  let title = 'Team performance';
  let crumbs = null;
  if (route === 'profile' && agent) {
    crumbs = (
      <span className="header-crumb">
        <span style={{ cursor: 'pointer' }} onClick={onBack}>Team</span>
        <Icons.Chevron size={12} />
        <span style={{ color: 'var(--fg-primary)', fontWeight: 500 }}>{agent.name}</span>
      </span>
    );
    title = null;
  } else if (route === 'brief' && agent) {
    crumbs = (
      <span className="header-crumb">
        <span style={{ cursor: 'pointer' }} onClick={onBack}>Briefs</span>
        <Icons.Chevron size={12} />
        <span style={{ color: 'var(--fg-primary)', fontWeight: 500 }}>{agent.name} · 1:1 prep</span>
      </span>
    );
    title = null;
  } else if (route === '1on1s') title = '1:1s';
  else if (route === 'brief') title = 'Briefs';
  else if (route === 'logger') title = 'Post-meeting note';
  else if (route === 'reports') title = 'Reports';
  else if (route === 'integrations') title = 'Integrations';
  else if (route === 'settings') title = 'User Settings';

  return (
    <header className="header">
      {crumbs || <span className="header-title">{title}</span>}
      <div className="header-actions">
        <button className="btn btn-ghost"><Icons.Search /></button>
        <button className="btn btn-secondary"><Icons.Plus />New 1:1</button>
      </div>
    </header>
  );
};

Object.assign(window, { Avatar, Pill, Sparkline, Brand, NavItem, Sidebar, Header, initials });
