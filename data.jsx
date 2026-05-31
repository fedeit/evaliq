// Mock data for the EvalIQ UI kit. All names/numbers are synthetic,
// modeled on the interview anecdotes from the source brief.

const TEAM = [
  {
    id: 'maya', name: 'Maya Patel', role: 'Tier 2 Support', tenure: '2y',
    status: 'warn', statusLabel: 'Needs attention',
    tickets: 98, ticketsTrend: -3, resolved: 0.84, resolvedTrend: -0.04,
    csat: 4.2, csatTrend: -0.4, aht: '6:42', lastOneOnOne: '12d ago',
    spark: [60, 62, 58, 65, 70, 64, 60, 56, 54, 50, 48, 46],
    readiness: { state: 'warn', label: 'Brief in 4h' },
  },
  {
    id: 'jordan', name: 'Jordan Reyes', role: 'Tier 1 Support', tenure: '8mo',
    status: 'healthy', statusLabel: 'On track',
    tickets: 142, ticketsTrend: +12, resolved: 0.94, resolvedTrend: +0.02,
    csat: 4.7, csatTrend: +0.1, aht: '4:18', lastOneOnOne: '7d ago',
    spark: [40, 45, 50, 52, 58, 60, 62, 64, 66, 68, 71, 74],
    readiness: { state: 'healthy', label: '1:1 ready' },
  },
  {
    id: 'aisha', name: 'Aisha Saunders', role: 'Tier 2 Support', tenure: '3y',
    status: 'healthy', statusLabel: 'On track',
    tickets: 87, ticketsTrend: +2, resolved: 0.96, resolvedTrend: +0.01,
    csat: 4.8, csatTrend: 0, aht: '7:02', lastOneOnOne: '4d ago',
    spark: [70, 72, 71, 73, 74, 72, 75, 74, 76, 75, 76, 77],
    readiness: { state: 'healthy', label: '1:1 ready' },
  },
  {
    id: 'derek', name: 'Derek Whitmore', role: 'Tier 1 Support', tenure: '1y',
    status: 'concern', statusLabel: 'Below SLA',
    tickets: 71, ticketsTrend: -8, resolved: 0.78, resolvedTrend: -0.07,
    csat: 3.9, csatTrend: -0.5, aht: '8:14', lastOneOnOne: '21d ago',
    spark: [50, 48, 46, 44, 42, 40, 38, 40, 38, 36, 34, 32],
    readiness: { state: 'concern', label: 'Overdue · 21d' },
  },
  {
    id: 'priya', name: 'Priya Anand', role: 'Tier 3 / Escalation', tenure: '4y',
    status: 'healthy', statusLabel: 'On track',
    tickets: 54, ticketsTrend: +1, resolved: 0.98, resolvedTrend: 0,
    csat: 4.9, csatTrend: 0, aht: '11:08', lastOneOnOne: '9d ago',
    spark: [62, 64, 65, 66, 68, 70, 71, 72, 74, 75, 76, 78],
    readiness: { state: 'healthy', label: '1:1 ready' },
  },
  {
    id: 'tomas', name: 'Tomás Vargas', role: 'Tier 1 Support', tenure: '6mo',
    status: 'warn', statusLabel: 'Needs attention',
    tickets: 119, ticketsTrend: +18, resolved: 0.88, resolvedTrend: -0.02,
    csat: 4.3, csatTrend: -0.2, aht: '5:51', lastOneOnOne: '14d ago',
    spark: [50, 52, 55, 58, 60, 64, 66, 68, 65, 62, 58, 56],
    readiness: { state: 'warn', label: 'Brief in 22h' },
  },
];

window.TEAM = TEAM;
