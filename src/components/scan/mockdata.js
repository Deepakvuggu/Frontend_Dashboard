// Scan header (top progress + meta)
export const scanHeaderData = {
    percent: 0,
    status: "InProgress",

    steps: [
        { key: "spidering", label: "Spidering", active: true },
        { key: "mapping", label: "Mapping", active: false },
        { key: "testing", label: "Testing", active: false },
        { key: "validating", label: "Validating", active: false },
        { key: "reporting", label: "Reporting", active: false },
    ],

    meta: [
        { label: "Scan Type", value: "Grey Box" },
        { label: "Targets", value: "google.com" },
        { label: "Started At", value: "Nov 22, 09:00AM" },
        { label: "Credentials", value: "2 Active" },
        { label: "Files", value: "Control.pdf" },
        { label: "Checklists", value: "40/350", valueTone: "teal" },
    ],
};


// Live console logs
export const activityLog = [
    {
        t: "[09:00:00]",
        txt: "I'll begin a systematic penetration test on helpdesk.democomp.com. Let me start with reconnaissance and enumeration.",
    },
    {
        t: "[09:01:00]",
        txt: "Good! target is online. Now let me perform port scanning to identify running services.",
    },
    {
        t: "[09:02:00]",
        txt:
            "Excellent reconnaissance results:\n" +
            "- helpdesk.democomp.com: Apache httpd 2.4.65 on port 80 (web server)\n" +
            "Let me probe the web server on target first to understand its structure.",
    },
    {
        t: "[09:03:00]",
        txt:
            'Great! I found a login page for a Help Desk Platform. I can see a useful comment: "TODO: Delete the testing account (test:test)". Let me test this credential.',
    },
    {
        t: "[09:04:00]",
        txt:
            "The POST method is not allowed on /password/test. Let me check if the page posts to # which means the current page. Let me try a different approach.",
    },
    {
        t: "[09:05:00]",
        txt:
            "It redirects back to /password/test. Let me check if there's an /api endpoint or look for other paths. Let me also try with the test:test password directly on other endpoints.",
    },
    {
        t: "[09:06:00]",
        txt:
            'I can access the dashboard using the "X-UserId: 1032" header. The dashboard shows "Welcome, John Doe". This suggests an IDOR vulnerability. Let me explore more...',
    },
];


// Finding log (right panel)
export const findingLog = [
    {
        id: "f1",
        sev: "Critical",
        title: "SQL Injection in Authentication Endpoint",
        path: "/api/users/profile",
        time: "10:45:23",
        desc:
            "Time-based blind SQL injection confirmed on user-controlled input during authentication flow. Exploitation allows database-level access.",
    },
    {
        id: "f2",
        sev: "High",
        title: "Unauthorized Access to User Metadata",
        path: "/api/auth/login",
        time: "10:45:23",
        desc:
            "Authenticated low-privilege user was able to access metadata of other users. Access control checks were missing.",
    },
    {
        id: "f3",
        sev: "Medium",
        title: "Broken Authentication Rate Limiting",
        path: "/api/search",
        time: "10:45:23",
        desc:
            "No effective rate limiting detected on login attempts. Automated brute-force attempts possible.",
    },
];


// Bottom bar stats
export const bottomStats = {
    subAgents: 0,
    parallelExecutions: 2,
    operations: 1,
    counts: {
        critical: 0,
        high: 0,
        medium: 0,
        low: 0,
    },
};