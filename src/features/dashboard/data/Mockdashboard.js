export const mockUser = {
    name: 'Efstathiadou Madelyn',
    initials: 'EM',
    role: 'captain',
}

export const mockWeather = {
    location: 'Thessaloniki, Greece',
    temp: 12,
    unit: 'C',
    condition: 'Mostly sunny',
    icon: '☀️',
    forecast: [
        { day: 'Wed', high: 48, rainChance: 70, icon: '🌧' },
        { day: 'Thu', high: 47, rainChance: 35, icon: '🌦' },
        { day: 'Fri', high: 48, rainChance: 20, icon: '🌦' },
        { day: 'Sat', high: 56, rainChance: 35, icon: '🌦' },
    ],
}

export const mockStats = [
    {
        id: 'members',
        label: 'Total Members',
        value: '124',
        delta: '↑ 6 this month',
        deltaUp: true,
        sub: '97 active this semester',
        color: 'g',
        icon: 'users'
    },
    {
        id: 'events',
        label: 'Events This Month',
        value: '7',
        delta: '↑ 2 vs last month',
        deltaUp: true,
        sub: 'Next: Gen. Assembly, Feb 19',
        color: 'au',
        icon: 'calendar'
    },
    {
        id: 'polls',
        label: 'Poll Participation',
        value: '74%',
        delta: '↑ 8% vs last term',
        deltaUp: true,
        sub: '2 polls currently open',
        color: 'b',
        icon: 'check'
    },
    {
        id: 'attendance',
        label: 'Avg. Attendance',
        value: '81%',
        delta: '↓ 3% vs last term',
        deltaUp: false,
        sub: 'Target: 85% by May',
        color: 'r',
        icon: 'activity'
    },
]

export const mockPolls = [
    {
        id: 1,
        status: 'open',
        question: 'Should the Spring Gala be moved to the outdoor amphitheatre?',
        voted: 48,
        total: 124,
        closesDate: 'Feb 22',
        options: ['✓ Yes, move it', '✗ Keep indoors', '◎ Undecided']
    },
    {
        id: 2,
        status: 'open',
        question: 'Which charity should receive this semester\'s fundraising proceeds?',
        voted: 73,
        total: 124,
        closesDate: 'Feb 25',
        options: ['Local Food Bank', 'Youth Literacy', 'Green Campus']
    },
    {
        id: 3,
        status: 'closed',
        question: 'Preferred time slot for weekly council meetings?',
        voted: 109,
        total: 124,
        closedDate: 'Feb 14',
        outcomeNote: 'Result applied — meetings now scheduled for Wednesdays',
        results: [
            { label: 'Wednesday 6 PM', pct: 52, winner: true },
            { label: 'Thursday 5 PM', pct: 31, winner: false },
            { label: 'Friday 4 PM', pct: 17, winner: false },
        ]
    },
]

export const mockEvents = [
    { id: 1, month: 'Feb', day: '18', title: 'Executive Committee Meeting', time: '5:00 PM', location: 'Room 204B', tag: 'council' },
    { id: 2, month: 'Feb', day: '19', title: 'General Assembly — All Members', time: '6:00 PM', location: 'Main Auditorium', tag: 'urgent' },
    { id: 3, month: 'Feb', day: '22', title: 'Community Outreach — Food Drive', time: '10:00 AM', location: 'Campus Courtyard', tag: 'social' },
    { id: 4, month: 'Feb', day: '28', title: 'Budget Review — Finance Sub-committee', time: '4:30 PM', location: 'Online / Zoom', tag: 'general' },
]

export const mockAttendance = [
    { label: 'Jan 15 · Kickoff', pct: 92, color: '#6BAE78' },
    { label: 'Jan 29 · Finance', pct: 85, color: '#6BAE78' },
    { label: 'Feb 5 · Events', pct: 78, color: '#E8B84B' },
    { label: 'Feb 12 · Outreach', pct: 81, color: '#6BAE78' },
    { label: 'Feb 17 · Today', pct: null, color: '#C9993A' },
]

export const mockNotices = [
    {
        id: 1,
        // color: '#E8B84B',
        text: 'Constitution amendment draft is available for review before the General Assembly on Feb 19.',
        bold: 'Constitution amendment draft',
        time: '2 hr ago',
        author: 'Secretary Lin'
    },
    {
        id: 2,
        color: '#A8D5A2',
        text: 'Merchandise order confirmed — hoodies arrive Feb 24. Collect from the council office.',
        bold: 'Merchandise order confirmed',
        time: 'Yesterday',
        author: 'Treasurer Osei'
    },
    {
        id: 3,
        color: '#C0544A',
        text: 'Reminder: Auditorium reservation for Feb 19 must be confirmed with admin by end of today.',
        bold: 'Reminder:',
        time: '2 days ago',
        author: 'Events Chair'
    },
]