export interface Problem {
  id: string;
  number: string;
  category: string;
  title: string;
  subline: string;
  symptom: string;
  reallyGoingOn: string;
  howWeSolve: string;
  whatYouGet: string;
}

export const PROBLEMS: Problem[] = [
  {
    id: 'retention',
    number: '01',
    category: 'RETENTION',
    title: 'Users sign up, then vanish',
    subline: 'Acquisition isn’t the problem when the bucket leaks.',
    symptom: 'Healthy sign-ups, a busy dashboard, and revenue that doesn’t follow.',
    reallyGoingOn: 'Users never reach the moment the product becomes valuable to them.',
    howWeSolve:
      'Map the first session, find where people drop, and cut the steps between sign-up and first value.',
    whatYouGet:
      'A shorter path to the “aha” moment, and a retention curve that starts to flatten.',
  },
  {
    id: 'operations',
    number: '02',
    category: 'OPERATIONS',
    title: 'The business runs on spreadsheets',
    subline: 'It worked at ten orders a day. It breaks at a hundred.',
    symptom: 'Copy-pasting between sheets, approvals in group chats, errors nobody can trace.',
    reallyGoingOn:
      'The process has outgrown the tools, and nobody has written the process down.',
    howWeSolve:
      'Document the real workflow first, then build a lean internal tool around it, not around a template.',
    whatYouGet: 'Hours back every week, one source of truth, and a process that can scale.',
  },
  {
    id: 'speed-to-market',
    number: '03',
    category: 'SPEED TO MARKET',
    title: 'The MVP that never launches',
    subline: 'Twelve months in, and still “almost ready”.',
    symptom: 'The roadmap keeps growing and the launch date keeps moving.',
    reallyGoingOn: 'Scope was never cut. Every feature was treated as a must-have.',
    howWeSolve: 'Re-scope to the core loop, fix the date, and ship in weekly slices.',
    whatYouGet:
      'A live product in real users’ hands, and real data to decide what comes next.',
  },
  {
    id: 'legacy-code',
    number: '04',
    category: 'LEGACY CODE',
    title: 'Nobody wants to touch the code',
    subline: 'Every change breaks something else.',
    symptom: 'Simple features take weeks, and every release comes with a prayer.',
    reallyGoingOn: 'No tests, no docs, and knowledge that left with the last developer.',
    howWeSolve:
      'Audit first, add tests around the critical paths, then refactor in small, safe steps. No big rewrite.',
    whatYouGet:
      'A codebase your team can change with confidence, and speed that comes back.',
  },
  {
    id: 'performance',
    number: '05',
    category: 'PERFORMANCE',
    title: 'The product feels slow',
    subline: 'Users don’t file bug reports. They just leave.',
    symptom: 'Long load times, lagging screens, complaints in the reviews.',
    reallyGoingOn:
      'Usually a few bottlenecks: heavy queries, unoptimised assets, too many round trips.',
    howWeSolve:
      'Measure before touching anything, fix the biggest bottleneck, then measure again.',
    whatYouGet: 'Faster screens, lower infrastructure cost, and numbers that prove it.',
  },
  {
    id: 'conversion',
    number: '06',
    category: 'CONVERSION',
    title: 'Traffic arrives, nobody converts',
    subline: 'The product is good. The first impression isn’t.',
    symptom: 'Visitors bounce from the landing page or stall halfway through sign-up.',
    reallyGoingOn:
      'The value is unclear in the first five seconds, and the flow asks for too much, too early.',
    howWeSolve:
      'Rewrite the message around the customer’s problem, simplify the flow, and test variants on real traffic.',
    whatYouGet: 'More of the traffic you already pay for turns into customers.',
  },
  {
    id: 'capacity',
    number: '07',
    category: 'CAPACITY',
    title: 'Your team can’t keep up',
    subline: 'The roadmap is bigger than the people available to build it.',
    symptom: 'Missed deadlines, tired developers, and a backlog nobody believes.',
    reallyGoingOn: 'Hiring is slow, and every new person needs months to ramp up.',
    howWeSolve:
      'A dedicated, managed product team that plugs into your process, tools and rituals.',
    whatYouGet:
      'More shipped without the hiring overhead, and a team that scales with the roadmap.',
  },
  {
    id: 'trust',
    number: '08',
    category: 'TRUST',
    title: 'The last agency burned you',
    subline: 'Missed deadlines, vanished developers, code you couldn’t access.',
    symptom: 'You’re wary of outsourcing again, and that’s fair.',
    reallyGoingOn: 'An opaque process, no ownership, and progress you had to take on faith.',
    howWeSolve:
      'Weekly demos, everything in your name from day one, and one accountable lead.',
    whatYouGet:
      'You can see the work, you own the work, and it stays yours whatever happens.',
  },
  {
    id: 'brand',
    number: '09',
    category: 'BRAND',
    title: 'The product looks cheaper than it is',
    subline: 'Premium pricing needs a premium experience.',
    symptom: 'Customers question the price, and bigger buyers hesitate.',
    reallyGoingOn: 'Inconsistent UI, generic templates, rough edges in the details.',
    howWeSolve:
      'A design system, a considered visual language, and polish on the moments that matter most.',
    whatYouGet: 'A product that looks worth what you charge.',
  },
];
