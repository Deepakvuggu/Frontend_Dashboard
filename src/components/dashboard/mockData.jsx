// Summary strip data
export const summaryStrip = {
  org: "Project X",
  owner: "Deepak",
  totalScans: 100,
  scheduled: 1000,
  rescans: 100,
  failedScans: 100,
  lastUpdated: "10 mins ago",
};


// Severity cards data
export const severityStats = [
  {
    key: "critical",
    label: "Critical Severity",
    value: 86,
    delta: "+2% increase than yesterday",
    deltaType: "up",
  },
  {
    key: "high",
    label: "High Severity",
    value: 16,
    delta: "+0.9% increase than yesterday",
    deltaType: "up",
  },
  {
    key: "medium",
    label: "Medium Severity",
    value: 26,
    delta: "-0.9% decrease than yesterday",
    deltaType: "down",
  },
  {
    key: "low",
    label: "Low Severity",
    value: 16,
    delta: "+0.9% increase than yesterday",
    deltaType: "up",
  },
];


// Reusable vulnerability templates
const standardVulns = {
  critical: 5,
  high: 12,
  medium: 23,
  low: 18,
};

const scheduledVulns = {
  critical: 5,
  high: 12,
  medium: 0,
  low: 0,
};

const failedVulns = {
  critical: 2,
  high: 4,
  medium: 8,
  low: 1,
};


// Scan table rows
export const scanRows = [
  { id: "1", name: "Web App Servers", type: "Greybox", status: "Completed", progress: 100, vulns: standardVulns, lastScan: "4d ago" },
  { id: "2", name: "Web App Servers", type: "Greybox", status: "Completed", progress: 100, vulns: standardVulns, lastScan: "4d ago" },
  { id: "3", name: "Web App Servers", type: "Greybox", status: "Completed", progress: 100, vulns: standardVulns, lastScan: "4d ago" },
  { id: "4", name: "Web App Servers", type: "Greybox", status: "Completed", progress: 100, vulns: standardVulns, lastScan: "4d ago" },
  { id: "5", name: "Web App Servers", type: "Greybox", status: "Completed", progress: 100, vulns: standardVulns, lastScan: "4d ago" },
  { id: "6", name: "Web App Servers", type: "Greybox", status: "Completed", progress: 100, vulns: standardVulns, lastScan: "4d ago" },

  { id: "7", name: "Web App Servers", type: "Greybox", status: "Scheduled", progress: 100, vulns: scheduledVulns, lastScan: "4d ago" },
  { id: "8", name: "Web App Servers", type: "Greybox", status: "Scheduled", progress: 100, vulns: scheduledVulns, lastScan: "4d ago" },

  { id: "9", name: "IoT Devices", type: "Blackbox", status: "Failed", progress: 10, vulns: failedVulns, lastScan: "3d ago" },
  { id: "10", name: "Temp Data", type: "Blackbox", status: "Failed", progress: 10, vulns: failedVulns, lastScan: "3d ago" },
];