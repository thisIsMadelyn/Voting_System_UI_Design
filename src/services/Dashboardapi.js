const BASE = 'http://localhost:8080/api'

// ─── Helpers ────────────────────────────────────────────────────────────────

function relativeTime(isoString) {
    const diff = Date.now() - new Date(isoString).getTime()
    const mins = Math.floor(diff / 60000)
    if (mins < 60) return `${mins} min ago`
    const hrs = Math.floor(mins / 60)
    if (hrs < 24) return `${hrs} hr ago`
    const days = Math.floor(hrs / 24)
    if (days === 1) return 'Yesterday'
    return `${days} days ago`
}

function formatTime(isoString) {
    return new Date(isoString).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    })
}

const PRIORITY_COLOR = {
    HIGH:   '#C0544A',
    MEDIUM: '#E8B84B',
    LOW:    '#A8D5A2',
}

// ─── Events ─────────────────────────────────────────────────────────────────

export async function fetchEvents() {
    const res = await fetch(`${BASE}/events`)
    if (!res.ok) throw new Error('Failed to fetch events')
    const data = await res.json()

    return data.map(e => {
        const date = new Date(e.startTime)
        return {
            id:       e.id,
            month:    date.toLocaleString('en-US', { month: 'short' }).toUpperCase(),
            day:      date.getDate().toString(),
            title:    e.title,
            time:     formatTime(e.startTime),
            location: e.location ?? 'TBD',
            tag:      'general',
        }
    })
}

// ─── Announcements ───────────────────────────────────────────────────────────

export async function fetchAnnouncements() {
    const res = await fetch(`${BASE}/announcements`)
    if (!res.ok) throw new Error('Failed to fetch announcements')
    const data = await res.json()

    return data.map(a => ({
        id:     a.id,
        bold:   a.title,
        text:   a.content,
        author: a.createdBy?.username ?? 'System',
        time:   relativeTime(a.createdAt),
        color:  PRIORITY_COLOR[a.priority] ?? '#E8B84B',
    }))
}

// ─── Stats ───────────────────────────────────────────────────────────────────

export async function fetchStats() {
    const res = await fetch(`${BASE}/stats`)
    if (!res.ok) throw new Error('Failed to fetch stats')
    const d = await res.json()

    return [
        {
            id:       'members',
            label:    'Total Members',
            value:    d.totalMembers.toString(),
            delta:    '',
            deltaUp:  true,
            sub:      '',
            color:    'g',
            icon:     'users',
        },
        {
            id:       'events',
            label:    'Total Events',
            value:    d.totalEvents.toString(),
            delta:    '',
            deltaUp:  true,
            sub:      '',
            color:    'au',
            icon:     'calendar',
        },
        {
            id:       'polls',
            label:    'Poll Participation',
            value:    `${d.pollParticipationPct}%`,
            delta:    '',
            deltaUp:  true,
            sub:      '',
            color:    'b',
            icon:     'check',
        },
        {
            id:       'attendance',
            label:    'Avg. Attendance',
            value:    `${d.avgAttendancePct}%`,
            delta:    '',
            deltaUp:  d.avgAttendancePct >= 80,
            sub:      'Target: 85% by May',
            color:    d.avgAttendancePct >= 80 ? 'g' : 'r',
            icon:     'activity',
        },
    ]
}

// ─── Polls ───────────────────────────────────────────────────────────────────

export async function fetchPolls() {
    const res = await fetch(`${BASE}/polls`)
    if (!res.ok) throw new Error('Failed to fetch polls')
    const data = await res.json()

    return data.map(p => ({
        id:       p.id,
        status:   p.isActive ? 'open' : 'closed',
        question: p.title,
        voted:    p.votes?.length ?? 0,
        total:    p.electoralBodyCount,
        options:  p.options?.map(o => o.optionText ?? o.title ?? '') ?? [],
    }))
}

// ─── Users ───────────────────────────────────────────────────────────────────

export async function fetchUserById(userId) {
    const res = await fetch(`${BASE}/users/${userId}`)
    if (!res.ok) throw new Error('Failed to fetch user')
    return res.json()
}

export async function searchByDiscordTag(tag) {
    const res = await fetch(`${BASE}/users/search/discord?tag=${encodeURIComponent(tag)}`)
    if (res.status === 404) return null
    if (!res.ok) throw new Error('Search failed')
    return res.json()
}

export async function updateProfile(userId, form) {
    const res = await fetch(`${BASE}/users/${userId}`, {
        method:  'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username:        form.username,
            email:           form.email,
            discordTag:      form.discordTag,
            user_phone_num:  form.phone,
        }),
    })
    if (!res.ok) throw new Error('Failed to update profile')
    return res.json()
}

export async function changePassword(userId, currentPassword, newPassword) {
    const res = await fetch(`${BASE}/users/${userId}/password`, {
        method:  'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword }),
    })
    if (!res.ok) {
        const msg = await res.text()
        throw new Error(msg)
    }
    return res.text()
}

export async function updateUserRole(targetUserId, newRole, adminId) {
    const endpoint = newRole === 'MODERATOR'
        ? `${BASE}/users/${targetUserId}/promote-moderator?adminId=${adminId}`
        : `${BASE}/users/${targetUserId}/demote?adminId=${adminId}`

    const res = await fetch(endpoint, { method: 'PATCH' })
    if (!res.ok) throw new Error('Failed to update role')
    return res.text()
}