/*
 * Airport Ecosystem — data (Phases 1 + 2).
 * A generic, composite model of "how airports work" — deliberately not
 * any single named airport (Changi has its own, separate interactive).
 * Thesis: an airport feels like one place to a passenger but is
 * operated by several separate organizations that don't fully
 * coordinate.
 *
 * Phase 2 adds the organization layer: seven organizations with zone
 * footprints, cross-highlighting, and the four-field detail panel
 * (Responsibilities / Pain points / Decision bottlenecks / Information
 * flows) for all fifteen nodes.
 *
 * Register note (deliberate, editor-specified): the three zones a
 * passenger experiences alone and unmediated — Security, Immigration,
 * Retail — are written in the second person ("the line you're standing
 * in"). The five genuinely multi-organization zones stay in the
 * site's third-person register.
 */

export const aeQuestion =
  "How does an airport function as one interconnected organizational system?";

export const aeOrientation = "Click an area of the terminal to begin.";

/* The four-field detail structure shared by zones and organizations. */
export interface AeDetail {
  responsibilities: string;
  painPoints: string;
  decisionBottlenecks: string;
  informationFlows: string;
}

export interface AeZone {
  id: string;
  name: string;
  /* One-line caption shown beside the name. */
  blurb: string;
  detail: AeDetail;
}

export interface AeOrganization {
  id: string;
  name: string;
  /* Short role line shown beside the name. */
  role: string;
  /* Zone footprint — the payoff visual: some are scattered. */
  zones: string[];
  detail: AeDetail;
}

export const aeZones: AeZone[] = [
  {
    id: "check-in",
    name: "Check-in / Ticketing",
    blurb:
      "Airline territory on the airport's floor: counters staffed by carriers and their handling agents, not by the terminal operator.",
    detail: {
      responsibilities:
        "Passenger and bag identity verification, bag drop, and the airline's first (and sometimes only) face-to-face contact with the passenger.",
      painPoints:
        "Staffing here is airline-controlled, so wait times vary wildly by carrier and time of day even within the same terminal; the airport itself has little authority to intervene.",
      decisionBottlenecks:
        "A bag flagged for extra screening at check-in triggers a security decision the check-in agent has no visibility into and no ability to expedite.",
      informationFlows:
        "Passenger and bag data flows to the airline's system and the security agency's system separately, and the two don't always sync in real time, which is why a bag can show as \"checked in\" in the airline's app while still sitting unscreened.",
    },
  },
  {
    id: "security",
    name: "Security Screening",
    blurb:
      "The chokepoint every departing passenger funnels through, run by a government or contracted security authority, on its own rules and its own clock.",
    detail: {
      responsibilities:
        "Physical screening of passengers and carry-on items at the checkpoint you actually stand in.",
      painPoints:
        "The line you're standing in moves at a pace set entirely by staffing decisions made somewhere else, on a schedule you have no visibility into. That is why the same checkpoint can be a five-minute wait on Tuesday and a forty-minute wait on Friday with no obvious cause.",
      decisionBottlenecks:
        "If you're pulled for secondary screening, that decision is made and resolved entirely within this checkpoint; no one outside it, including your airline, is notified or consulted.",
      informationFlows:
        "The wait time you experience is rarely communicated anywhere else in the terminal in real time; your gate agent typically has no better idea of how long this line is than you do.",
    },
  },
  {
    id: "immigration",
    name: "Immigration / Customs",
    blurb:
      "A national border drawn across a building, staffed by border agencies with a chain of command that ends in a ministry, not in the terminal.",
    detail: {
      responsibilities:
        "Verifying your eligibility to enter the country, for international arrivals: the last formal checkpoint between the aircraft and the outside world.",
      painPoints:
        "You're standing in a hall where processing speed has nothing to do with how many flights actually landed today. It was set by a staffing plan made well before your flight was scheduled.",
      decisionBottlenecks:
        "If the passenger three people ahead of you is flagged for additional questioning, the entire hall backs up, and nothing in the terminal (not the airport, not your airline) has any authority to reroute or expedite the line around it.",
      informationFlows:
        "There is no wait-time signage or notification system that reaches you before you're already committed to this line. You find out how long it is by standing in it.",
    },
  },
  {
    id: "gates",
    name: "Gate / Boarding",
    blurb:
      "Shared infrastructure reassigned by the hour: the airport owns the gate, the airline runs the boarding.",
    detail: {
      responsibilities:
        "Final passenger verification, boarding sequencing, and the airline's last point of control before the aircraft door closes.",
      painPoints:
        "Gate agents are frequently the public face of decisions made upstream (by ground handlers, by ATC, by weather) that they had no part in and often weren't informed of until minutes prior.",
      decisionBottlenecks:
        "A late-arriving connecting bag or a delayed inbound aircraft creates a decision the gate agent can't resolve alone; it requires coordination across ground handling, ATC slot timing, and the airline's operations center simultaneously.",
      informationFlows:
        "Real-time aircraft turnaround status often reaches the gate agent later than it reaches the airline's own operations center, creating a lag between what's actually happening on the ramp and what's being announced at the gate.",
    },
  },
  {
    id: "baggage",
    name: "Baggage Handling",
    blurb:
      "A parallel logistics network under the floor, where a bag passes through more organizational handoffs than the passenger who checked it.",
    detail: {
      responsibilities:
        "Physical movement of checked bags between check-in, aircraft, and baggage claim, almost never performed by airport or airline staff directly.",
      painPoints:
        "A bag can be mishandled at any of three organizational handoffs (check-in agent to ground handler, ground handler to aircraft, aircraft to claim belt), and pinpointing which handoff failed is notoriously difficult after the fact.",
      decisionBottlenecks:
        "Rebooking a passenger's connecting flight and rerouting their bag are decided by two different systems (the airline's passenger system and the ground handler's cargo system) that don't automatically talk to each other.",
      informationFlows:
        "The \"your bag has been loaded\" notification most airlines send is often generated from a scan at handoff, not confirmation the bag actually made it onto the correct aircraft: a real, if narrow, information gap.",
    },
  },
  {
    id: "retail",
    name: "Retail & Concessions",
    blurb:
      "A shopping center leasing space inside a transport facility, tuned to the dwell time the other zones create.",
    detail: {
      responsibilities:
        "The shops and restaurants you actually walk past and buy from along the concourse.",
      painPoints:
        "You've landed on a redeye and every shop is dark. Not because the airport doesn't want your business, but because none of these businesses are staffed or scheduled by the airport itself.",
      decisionBottlenecks:
        "A specific shop being closed when you need it isn't a decision anyone made about your flight. It's a staffing choice made by an independent business owner, working from a schedule that has nothing to do with your gate's departure time.",
      informationFlows:
        "The shop you're standing in front of almost certainly has no idea how many passengers are about to arrive from your gate in the next twenty minutes; they're staffed for a typical day, not this one.",
    },
  },
  {
    id: "curbside",
    name: "Ground Transport / Curbside",
    blurb:
      "The contested edge where city traffic, taxis, buses, and transit authorities meet the terminal door.",
    detail: {
      responsibilities:
        "The physical handoff between the airport and the outside world: taxis, rideshare, transit, and private vehicles, each governed by different rules.",
      painPoints:
        "Curbside space is finite and contested between multiple transport modes that don't coordinate with each other, each optimizing for their own throughput.",
      decisionBottlenecks:
        "Rideshare pickup zone policy is frequently negotiated directly between the airport authority and individual rideshare companies, with taxi and transit operators governed by entirely separate agreements.",
      informationFlows:
        "A passenger's flight delay is rarely communicated to their pre-booked ground transport automatically; that connection is usually the passenger's own responsibility to manage.",
    },
  },
  {
    id: "ramp",
    name: "Ramp / Aircraft Turnaround",
    blurb:
      "The busiest 40 minutes in aviation: fueling, catering, cleaning, loading, each by a different company, all against one departure time.",
    detail: {
      responsibilities:
        "Everything that happens to the aircraft itself between landing and the next departure: fueling, cleaning, catering, baggage loading, maintenance checks.",
      painPoints:
        "A delay in any single ramp task (a late fuel truck, a maintenance flag) cascades through the entire turnaround sequence, and the passenger-facing systems often don't reflect the real cause.",
      decisionBottlenecks:
        "Turnaround time is coordinated by the ground handler, but the actual departure slot is controlled by air traffic control: two organizations with different priorities making sequential, not joint, decisions.",
      informationFlows:
        "Ramp status is often the least visible part of the entire system to passengers, by design, since it's considered an operational rather than customer-facing function, but it's frequently the actual cause of a delay announced only as \"aircraft awaiting arrival.\"",
    },
  },
];

export const aeOrganizations: AeOrganization[] = [
  {
    id: "airport-authority",
    name: "Airport Authority",
    role: "Owns the facility; operates almost none of it.",
    zones: [
      "check-in",
      "security",
      "immigration",
      "gates",
      "baggage",
      "retail",
      "curbside",
      "ramp",
    ],
    detail: {
      responsibilities:
        "Owns and maintains the physical facility, sets lease terms for concessionaires, and coordinates (but does not directly operate) most of what happens within its walls.",
      painPoints:
        "Public complaints about wait times, cleanliness, or service are directed at the airport authority regardless of whether the airport actually controls the responsible function.",
      decisionBottlenecks:
        "The authority can influence but rarely mandate outcomes from the government agencies (security, customs, ATC) operating inside its own facility.",
      informationFlows:
        "The airport authority often has the broadest visibility into terminal-wide data but the least direct control over the individual systems generating it: a genuine ownership-versus-operation gap.",
    },
  },
  {
    id: "airlines",
    name: "Airlines",
    role: "Sell the journey; answer to the passenger for all of it.",
    zones: ["check-in", "gates", "baggage", "ramp"],
    detail: {
      responsibilities:
        "Sell the seats, staff check-in and gate counters, and remain the passenger's primary point of accountability for the entire journey.",
      painPoints:
        "Airlines are held responsible by passengers for delays and failures that frequently originate with a ground handler, a security agency, or ATC, organizations the airline doesn't control.",
      decisionBottlenecks:
        "Rebooking decisions require real-time coordination between the airline's operations center, its contracted ground handler, and gate staff: three different systems that don't always update simultaneously.",
      informationFlows:
        "An airline's own app-facing passenger communication is often generated faster than the airline's actual internal operational data updates, occasionally creating a gap between what a passenger is told and what's actually happening on the ground.",
    },
  },
  {
    id: "security-agency",
    name: "Security Agency",
    role: "A federal mandate inside someone else's building.",
    zones: ["security"],
    detail: {
      responsibilities:
        "A government agency operating inside a facility it doesn't own, screening passengers under a federal mandate entirely separate from the airport's or any airline's authority.",
      painPoints:
        "Staffing levels are set by budget and scheduling decisions made at a level with no visibility into any single airport's actual daily passenger volume, which is the real reason checkpoint wait times vary so unpredictably.",
      decisionBottlenecks:
        "The agency has no obligation to coordinate checkpoint staffing or timing with the airport authority or any airline, even though both have a direct stake in how long that line moves.",
      informationFlows:
        "Throughput and wait-time data generated at the checkpoint is rarely shared, in real time, with the airport or the airlines whose passengers are standing in it: an agency with enormous operational impact on the terminal, and almost no data relationship with anyone else running it.",
    },
  },
  {
    id: "customs",
    name: "Customs & Border Protection",
    role: "The national border, drawn across the arrivals hall.",
    zones: ["immigration"],
    detail: {
      responsibilities:
        "A national government agency verifying entry eligibility, operating under a mandate entirely separate from airport security, airline operations, or any other function in the building.",
      painPoints:
        "Processing capacity is set by national policy and staffing decisions, frequently with no direct relationship to a specific airport's actual arrival volume on a given day.",
      decisionBottlenecks:
        "This is the one organization in the entire terminal where no other party (not the airport authority, not any airline) has any standing to intervene once a passenger enters the process.",
      informationFlows:
        "For security reasons, this agency's systems are typically walled off entirely from airport and airline IT infrastructure; almost no operational data crosses that boundary in either direction, by design rather than oversight.",
    },
  },
  {
    id: "ground-handlers",
    name: "Ground Handlers",
    role: "The invisible contractor at nearly every physical handoff.",
    zones: ["check-in", "baggage", "ramp"],
    detail: {
      responsibilities:
        "A third-party contractor (sometimes airline-owned, more often independent) that physically moves bags, marshals aircraft, and services planes between flights.",
      painPoints:
        "Ground handlers are frequently the least visible organization to passengers despite touching bags and aircraft at nearly every physical handoff point in the journey.",
      decisionBottlenecks:
        "A ground handler's staffing and scheduling decisions are made independently of the airline's passenger-facing promises, which can create a real gap between what's booked and what's staffed.",
      informationFlows:
        "Bag-scan data generated by ground handlers often reaches the airline's passenger-facing app with a delay, since it requires two separate companies' systems to sync.",
    },
  },
  {
    id: "concessionaires",
    name: "Concessionaires",
    role: "Independent businesses on leased airport floor.",
    zones: ["retail"],
    detail: {
      responsibilities:
        "Independently leased retail and food businesses, each setting its own staffing, hours, and supply chain within space leased from the airport authority, not operated or scheduled by the airport in any way.",
      painPoints:
        "Staffing decisions are made against historical traffic averages, not real-time flight schedules, which is structurally why odd-hour gates are so reliably underserved.",
      decisionBottlenecks:
        "The airport authority can set lease terms (hours of operation, minimum staffing) but has limited real-time authority over any individual business's actual day-to-day decisions.",
      informationFlows:
        "These businesses generally have no access to real-time passenger volume or flight delay data, leaving them to staff for an average day rather than actually anticipate today's.",
    },
  },
  {
    id: "atc",
    name: "Air Traffic Control",
    role: "The airspace, sequenced from outside the terminal.",
    zones: ["ramp"],
    detail: {
      responsibilities:
        "Governs the airspace and runway sequencing: a wholly separate government agency with essentially no presence inside the terminal itself.",
      painPoints:
        "ATC's sequencing decisions, made purely for airspace safety and efficiency, frequently cascade into terminal-side delays that passengers experience as an airline or airport failure.",
      decisionBottlenecks:
        "A departure slot assigned by ATC can conflict with a ground handler's turnaround timeline, and the two organizations resolve that conflict sequentially, not jointly.",
      informationFlows:
        "ATC data is operationally critical but almost entirely invisible to passengers; the \"awaiting departure slot\" announcement is usually the only surface-level trace of an entire coordination layer happening out of sight.",
    },
  },
];

/* Field labels for the four-field panel, in render order. */
export const aeDetailFields: { key: keyof AeDetail; label: string }[] = [
  { key: "responsibilities", label: "Responsibilities" },
  { key: "painPoints", label: "Pain points" },
  { key: "decisionBottlenecks", label: "Decision bottlenecks" },
  { key: "informationFlows", label: "Information flows" },
];

/* Key Insights — pulled from the panel content above, not invented. */
export const aeInsights: { tag: string; text: string }[] = [
  {
    tag: "Ground Handlers",
    text: "The least visible organization in the building touches the most physical handoffs. Select Ground Handlers and three scattered, non-adjacent zones light up at once (check-in, the bag room, the ramp): a footprint no passenger ever sees whole.",
  },
  {
    tag: "Airport Authority",
    text: "The authority owns everything and operates almost nothing: the broadest visibility into terminal-wide data, attached to the least direct control over the systems generating it.",
  },
  {
    tag: "The Chokepoints",
    text: "The two slowest points in the passenger journey, security and immigration, are run by agencies with no obligation to coordinate with the airport or the airlines whose passengers are standing in their lines.",
  },
];

export function getAeZone(id: string): AeZone | null {
  return aeZones.find((z) => z.id === id) ?? null;
}

export function getAeOrganization(id: string): AeOrganization | null {
  return aeOrganizations.find((o) => o.id === id) ?? null;
}

/* Organizations present in a zone, in canonical org order. */
export function getAeZoneOrganizations(zoneId: string): AeOrganization[] {
  return aeOrganizations.filter((o) => o.zones.includes(zoneId));
}

/* ------------------------------------------------------------------ */
/* Consistency checks (the converged-block-checker lesson applied      */
/* here from day one). Deterministic over static data and unguarded,   */
/* so a violation fails `next build` at prerender:                     */
/* 1. every org footprint references real zone ids;                    */
/* 2. every zone is covered by at least one organization;              */
/* 3. the Airport Authority (per its own copy: "coordinates most of    */
/*    what happens within its walls") covers all eight zones.          */
/* ------------------------------------------------------------------ */
{
  const zoneIds = new Set(aeZones.map((z) => z.id));
  for (const org of aeOrganizations) {
    for (const zid of org.zones) {
      if (!zoneIds.has(zid)) {
        throw new Error(
          `Airport Ecosystem: organization "${org.id}" references unknown zone "${zid}".`,
        );
      }
    }
  }
  for (const zone of aeZones) {
    if (!aeOrganizations.some((o) => o.zones.includes(zone.id))) {
      throw new Error(
        `Airport Ecosystem: zone "${zone.id}" has no organization — contradicts the model.`,
      );
    }
  }
  const authority = aeOrganizations.find((o) => o.id === "airport-authority");
  if (!authority || authority.zones.length !== aeZones.length) {
    throw new Error(
      "Airport Ecosystem: the Airport Authority must touch all zones — its own panel copy claims facility-wide coordination.",
    );
  }
}
