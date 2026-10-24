// Page content. Each service and area gets its own page with unique copy,
// which is what lets the site rank for searches like "wedding limo Columbus"
// or "limo service Dublin Ohio" instead of only the homepage.

const services = [
  {
    slug: "wedding-limo",
    name: "Wedding Limo Service",
    short: "Weddings",
    icon: "rings",
    keyword: "wedding limo Columbus Ohio",
    title: "Wedding Limo Service in Columbus, OH",
    description:
      "Wedding limo service in Columbus, Ohio. Stretch limos, SUV limos and party buses for the bride, groom and bridal party. Red carpet, champagne toast, on-time guarantee.",
    intro:
      "Your wedding day runs on a tight schedule, and transportation is the piece that keeps it all moving. A Team Limo gets the bride, groom and wedding party from getting-ready to ceremony, photos and reception in style, and on time, anywhere in Central Ohio.",
    bullets: [
      "Bride & groom getaway cars and bridal party transportation",
      "Red carpet rollout, chilled champagne or sparkling cider on request",
      "Chauffeur coordinates with your planner or venue coordinator",
      "Photo stops at the Topiary Park, Scioto Mile, Franklin Park Conservatory and more",
      "Guest shuttles between hotels, ceremony and reception venues",
      "Decorated vehicles with ribbons and a \"Just Married\" sign on request",
    ],
    body: [
      "We have driven couples to venues across the Columbus area, from downtown ballrooms and Short North event spaces to barns and country clubs in Delaware, Licking and Union counties. Your chauffeur arrives early, scouts the drop-off and keeps an eye on the timeline so you can stay present.",
      "Book a stretch limousine for the couple, a party bus for the bridal party, or a full package that moves everyone. Ask about our wedding packages when you request a quote.",
    ],
    faqs: [
      ["How far in advance should I book a wedding limo?", "Most couples book 3–6 months ahead. Spring and fall Saturdays in Columbus fill first, so earlier is better for those dates, but contact us any time and we'll check availability."],
      ["How many hours do I need for a wedding?", "Most weddings need 3–6 hours, covering pickup, ceremony, photos and arrival at the reception. If the ceremony and reception are in the same place, a shorter getaway-only booking works well."],
      ["Can you transport our guests too?", "Yes. Party buses and Sprinter vans are a great way to shuttle guests between hotels, ceremony and reception, and they keep everyone safe after the celebration."],
    ],
  },
  {
    slug: "airport-transportation",
    name: "Airport Car & Limo Service (CMH)",
    short: "Airport (CMH)",
    icon: "plane",
    keyword: "Columbus airport limo service CMH",
    title: "Columbus Airport Limo & Car Service (CMH, LCK)",
    description:
      "Reliable airport limo and car service to John Glenn Columbus International Airport (CMH) and Rickenbacker (LCK). Flight tracking, meet & greet, flat rates, 24/7.",
    intro:
      "Skip the rideshare surge and the long-term parking shuttle. A Team Limo provides private, on-time transportation to and from John Glenn Columbus International Airport (CMH) and Rickenbacker International Airport (LCK), any hour of the day.",
    bullets: [
      "Flight tracking: we adjust pickup for early or delayed arrivals",
      "Meet & greet at baggage claim with a name sign on request",
      "Flat, upfront pricing with no surge rates",
      "Executive sedans and SUVs for business travelers",
      "Room for families and luggage, with car seats available on request",
      "Rides to Dayton (DAY), Cincinnati (CVG) and Cleveland (CLE) airports too",
    ],
    body: [
      "Early-morning departure from Dublin? Late-night arrival home to New Albany? We run 24/7, so you're never stuck waiting. Your chauffeur loads your bags, knows the fastest route around construction on I-670 and I-270, and gets you there relaxed.",
      "Corporate accounts are available for companies that fly employees and clients in and out of Columbus regularly.",
    ],
    faqs: [
      ["Do you track flights?", "Yes. Give us your flight number and we'll monitor it, so your chauffeur is waiting when you land, even if the flight is early or late."],
      ["Where will my chauffeur meet me at CMH?", "By default we pick up curbside at arrivals. For a meet & greet, your chauffeur waits at baggage claim with a sign showing your name."],
      ["Do you serve airports outside Columbus?", "Yes. We provide long-distance transfers to Dayton (DAY), Cincinnati/Northern Kentucky (CVG), Cleveland (CLE) and Pittsburgh (PIT)."],
    ],
  },
  {
    slug: "prom-limo",
    name: "Prom & Homecoming Limos",
    short: "Prom & Homecoming",
    icon: "star",
    keyword: "prom limo Columbus",
    title: "Prom & Homecoming Limo Rental in Columbus, OH",
    description:
      "Safe, stylish prom and homecoming limo rentals for Columbus-area high schools. Stretch limos and party buses, strict no-alcohol policy, parent-friendly booking.",
    intro:
      "Prom night should be unforgettable for the right reasons. A Team Limo gives students a grand arrival and gives parents peace of mind, with professional, background-checked chauffeurs and a strict zero-alcohol policy for all prom and homecoming trips.",
    bullets: [
      "Stretch limousines and party buses for groups of every size",
      "Zero-tolerance alcohol and drug policy for student trips",
      "Parents receive the itinerary and chauffeur contact info",
      "Group photo stops before dinner or the dance",
      "Serving Dublin, Olentangy, Hilliard, Westerville, Upper Arlington, Worthington, New Albany schools and more",
      "Split-the-cost friendly: one booking, everyone rides",
    ],
    body: [
      "Prom season in Central Ohio runs from April through May, and the best vehicles book quickly. Reserve early, especially if your school shares a prom weekend with others nearby.",
      "We're happy to talk with parents directly about the route, timing and policies before booking.",
    ],
    faqs: [
      ["What is your prom alcohol policy?", "Zero tolerance. Alcohol, drugs and vaping are not allowed on any student trip. If the policy is violated, the chauffeur will end the trip and contact the parent on file."],
      ["How many students fit in a limo?", "Our stretch limos seat up to 10 and party buses carry larger groups. Tell us your group size and we'll recommend the right vehicle."],
      ["When should we book for prom?", "As early as possible. January through March is ideal for April and May prom dates."],
    ],
  },
  {
    slug: "corporate-transportation",
    name: "Corporate & Executive Car Service",
    short: "Corporate",
    icon: "briefcase",
    keyword: "corporate car service Columbus",
    title: "Corporate & Executive Car Service in Columbus, OH",
    description:
      "Professional corporate transportation in Columbus, Ohio: executive sedans, SUVs and Sprinters for meetings, roadshows, client pickups, conventions and events. Corporate accounts available.",
    intro:
      "First impressions matter. A Team Limo provides discreet, punctual executive transportation for Columbus businesses: client pickups, roadshows, meetings, board events and conventions at the Greater Columbus Convention Center.",
    bullets: [
      "Executive sedans, black SUVs and Sprinter vans",
      "Professionally dressed, discreet chauffeurs",
      "Hourly and point-to-point service, plus multi-day roadshows",
      "Group shuttles for conferences, off-sites and team events",
      "Corporate billing accounts with monthly invoicing",
      "Wi-Fi friendly, quiet cabins for working on the go",
    ],
    body: [
      "From downtown and the Arena District to the business corridors of Dublin, Easton, Polaris and New Albany's business park, we move your people efficiently so they can focus on the meeting, not the drive.",
      "Ask us about setting up a corporate account for your executive team, visiting clients or recruiting candidates.",
    ],
    faqs: [
      ["Do you offer corporate accounts?", "Yes. Corporate accounts get priority booking, a dedicated point of contact and consolidated monthly invoicing."],
      ["Can you handle transportation for a conference?", "Yes. We coordinate shuttles between hotels, the Greater Columbus Convention Center and event venues, scaled to your group size."],
      ["Are your chauffeurs discreet?", "Always. Our chauffeurs are trained to be professional and confidential so you can take calls and work in privacy."],
    ],
  },
  {
    slug: "party-bus",
    name: "Party Bus & Night Out",
    short: "Party Bus",
    icon: "music",
    keyword: "party bus rental Columbus Ohio",
    title: "Party Bus Rental Columbus, OH | Bachelorette & Birthdays",
    description:
      "Party bus and limo rental in Columbus for bachelor and bachelorette parties, birthdays, bar crawls in the Short North and nights out. Sound system, LED lighting, safe rides home.",
    intro:
      "Keep the whole crew together and let someone else drive. A Team Limo party buses and stretch limos are made for bachelor and bachelorette parties, milestone birthdays, anniversaries and nights out in the Short North, Arena District, German Village and Brewery District.",
    bullets: [
      "Premium sound system, LED party lighting and comfortable seating",
      "Bar hopping and brewery tours across Columbus",
      "Bachelor & bachelorette parties, birthdays and anniversaries",
      "Concerts at Nationwide Arena, KEMBA Live!, the Schott and Ohio Stadium",
      "Door-to-door pickup and drop-off: no designated driver needed",
      "Hourly rates with no hidden fees",
    ],
    body: [
      "Planning a night in the Short North or a tour of Columbus breweries and wineries? We'll help you map a route and timing so you spend the night having fun, not hunting for parking.",
      "Everyone gets home safe. That's the whole point.",
    ],
    faqs: [
      ["How many people fit on a party bus?", "It depends on the vehicle. Tell us your headcount and we'll match you with the right bus or limo."],
      ["Can we bring our own drinks?", "Guests 21 and over may bring their own beverages on most adult bookings, following Ohio law. Ask when you book and we'll explain the details."],
      ["Can we make multiple stops?", "Yes. Hourly bookings let you make as many stops as you want within your reserved time."],
    ],
  },
  {
    slug: "sporting-events-concerts",
    name: "Buckeye Games, Sports & Concerts",
    short: "Sports & Concerts",
    icon: "ticket",
    keyword: "Ohio State game limo Columbus",
    title: "Ohio State Game & Concert Limo Service, Columbus",
    description:
      "Ride to Ohio State Buckeyes football at Ohio Stadium, Blue Jackets at Nationwide Arena, Columbus Crew at Lower.com Field and concerts. Skip the traffic and parking hassle.",
    intro:
      "Game-day traffic around Ohio Stadium is legendary, and so is the parking. Let A Team Limo handle it. We drop you close, pick you up after, and you get to tailgate without worrying about the drive home.",
    bullets: [
      "Ohio State Buckeyes football at Ohio Stadium (the Horseshoe)",
      "Columbus Blue Jackets at Nationwide Arena",
      "Columbus Crew at Lower.com Field",
      "Columbus Clippers at Huntington Park",
      "Concerts at Ohio Stadium, Nationwide Arena, KEMBA Live! and the Schottenstein Center",
      "The Memorial Tournament in Dublin and other big events",
    ],
    body: [
      "Game days book up fast, especially for big matchups. Reserve early, invite your crew, and turn the ride into part of the experience.",
      "Hosting clients? A sports outing with chauffeured transportation makes a big impression.",
    ],
    faqs: [
      ["Where do you drop off for Ohio State games?", "We drop off and pick up as close to the stadium as traffic control allows, and we set a clear meeting spot so finding your ride after the game is easy."],
      ["Do you charge for waiting during the game?", "Event packages include wait time. We'll quote it upfront so there are no surprises."],
    ],
  },
  {
    slug: "special-occasions",
    name: "Special Occasions & Date Nights",
    short: "Special Occasions",
    icon: "heart",
    keyword: "limo rental Columbus Ohio",
    title: "Limo Rental Columbus, OH | Anniversaries & Date Nights",
    description:
      "Book a luxury limo in Columbus for anniversaries, proposals, date nights, quinceañeras, graduations, holiday light tours and more. Hourly limo rental, 24/7.",
    intro:
      "Some nights deserve more than a regular ride. Celebrate an anniversary, plan a proposal, surprise someone for a birthday or graduation, or tour the holiday lights, all in a chauffeured limousine.",
    bullets: [
      "Anniversaries, proposals and date nights",
      "Birthdays, quinceañeras and sweet sixteens",
      "Graduations at Ohio State, Otterbein, Capital, Ohio Wesleyan and more",
      "Holiday light tours, including Columbus Zoo Wildlights",
      "Dinner at the best restaurants in the Short North, German Village and Dublin",
      "Wine and brewery tours across Central Ohio",
    ],
    body: [
      "Tell us what you're celebrating and we'll help make it special, whether that's flowers waiting on the seat, a specific playlist, or a scenic drive along the Scioto Mile at night.",
    ],
    faqs: [
      ["What is the minimum rental time?", "Most limo rentals have a short hourly minimum that varies by vehicle and date. Contact us for an exact quote."],
    ],
  },
  {
    slug: "funeral-transportation",
    name: "Funeral & Memorial Transportation",
    short: "Funerals",
    icon: "dove",
    keyword: "funeral limo Columbus",
    title: "Funeral Limo Service in Columbus, OH",
    description:
      "Respectful, dignified funeral limousine and family transportation in Columbus and Central Ohio. Coordination with funeral homes, punctual and compassionate chauffeurs.",
    intro:
      "When your family is grieving, the last thing you should worry about is getting everyone where they need to be. A Team Limo provides respectful, dignified transportation for families to services, the cemetery and gatherings afterward.",
    bullets: [
      "Family limousines for funerals and memorial services",
      "Coordination directly with your funeral home",
      "Experienced, compassionate and punctual chauffeurs",
      "Transportation for out-of-town relatives from the airport",
      "Black vehicles, immaculately maintained",
    ],
    body: [
      "We work with funeral homes throughout Franklin, Delaware, Licking and Fairfield counties. Call us any time, and we'll handle the details with care.",
    ],
    faqs: [],
  },
];

// Local landing pages. Unique, genuinely local copy for each city keeps these
// pages from being treated as duplicate "doorway" pages.
const areas = [
  {
    slug: "columbus",
    city: "Columbus",
    county: "Franklin County",
    zips: "43201–43299",
    blurb: "Downtown, Short North, German Village, Arena District, Clintonville, Easton and every Columbus neighborhood.",
    copy: [
      "As Ohio's capital and largest city, Columbus keeps us busy every night of the week. We pick up across downtown, the Short North Arts District, German Village, the Brewery District, Italian Village, Clintonville, Easton and the Ohio State campus area.",
      "Popular trips include Buckeye game days at Ohio Stadium, Blue Jackets games and concerts at Nationwide Arena, Crew matches at Lower.com Field, dinners in the Short North, and weddings at downtown hotels and event venues. And of course, airport runs to John Glenn Columbus International Airport (CMH).",
    ],
    landmarks: ["Ohio Stadium", "Short North Arts District", "German Village", "Nationwide Arena", "Scioto Mile", "Easton Town Center"],
  },
  {
    slug: "dublin",
    city: "Dublin",
    county: "Franklin, Delaware & Union Counties",
    zips: "43016, 43017",
    blurb: "Bridge Park, Historic Dublin, Muirfield Village and the Dublin business corridor.",
    copy: [
      "Dublin is one of our busiest service areas. We provide executive car service for the many corporate headquarters along the Metro Place and Frantz Road business corridors, plus airport transfers to CMH for Dublin residents and visiting clients.",
      "Weekends bring weddings and nights out at Bridge Park and Historic Dublin, and every spring the Memorial Tournament at Muirfield Village draws visitors from around the world. During the Dublin Irish Festival, a chauffeured ride is the easiest way to skip parking altogether.",
    ],
    landmarks: ["Bridge Park", "Historic Dublin", "Muirfield Village", "Dublin Irish Festival", "Metro Place"],
  },
  {
    slug: "westerville",
    city: "Westerville",
    county: "Franklin & Delaware Counties",
    zips: "43081, 43082, 43086",
    blurb: "Uptown Westerville, Otterbein University, Polaris and surrounding neighborhoods.",
    copy: [
      "From date nights in Uptown Westerville to Otterbein University graduations, A Team Limo is a familiar sight in Westerville. Families book us for prom and homecoming for Westerville North, South and Central high schools, and couples book us for weddings at local churches and event venues.",
      "We're minutes from Polaris and I-270, making Westerville airport trips to CMH quick and easy.",
    ],
    landmarks: ["Uptown Westerville", "Otterbein University", "Polaris Fashion Place", "Inniswood Metro Gardens"],
  },
  {
    slug: "powell",
    city: "Powell",
    county: "Delaware County",
    zips: "43065",
    blurb: "Downtown Powell, the Columbus Zoo area and Olentangy school communities.",
    copy: [
      "Powell residents book A Team Limo for Olentangy Liberty and Olentangy prom nights, anniversaries, and early-morning flights out of CMH. We also love Wildlights season at the Columbus Zoo and Aquarium, a perfect holiday outing by limo.",
      "Planning a night out in Downtown Powell or heading to a wedding at a Delaware County venue? We'll get you there in comfort.",
    ],
    landmarks: ["Columbus Zoo and Aquarium", "Downtown Powell", "Olentangy Liberty", "Scioto River"],
  },
  {
    slug: "hilliard",
    city: "Hilliard",
    county: "Franklin County",
    zips: "43026",
    blurb: "Old Hilliard, Heritage Rail Trail, Mill Run and west-side neighborhoods.",
    copy: [
      "In Hilliard, we drive families for prom at Hilliard Davidson, Darby and Bradley high schools, couples for weddings at west-side venues, and groups heading out from Old Hilliard for a night downtown.",
      "Business travelers in the Mill Run area count on us for punctual car service to CMH and meetings around the outerbelt.",
    ],
    landmarks: ["Old Hilliard", "Heritage Rail Trail", "Mill Run", "Hilliard Davidson"],
  },
  {
    slug: "grove-city",
    city: "Grove City",
    county: "Franklin County",
    zips: "43123",
    blurb: "Grove City Town Center, Beulah Park and the south side.",
    copy: [
      "Grove City residents book us for weddings, birthdays and nights out, with a quick ride up I-71 to downtown Columbus. We serve proms for Grove City and Central Crossing high schools and pickups throughout Town Center and the Beulah Park neighborhood.",
      "Need a ride to Rickenbacker or CMH? From the south side, we've got you covered any hour.",
    ],
    landmarks: ["Grove City Town Center", "Beulah Park", "Fryer Park", "I-71 corridor"],
  },
  {
    slug: "gahanna",
    city: "Gahanna",
    county: "Franklin County",
    zips: "43230",
    blurb: "Creekside, Olde Gahanna and the CMH airport area.",
    copy: [
      "Gahanna sits right next to John Glenn Columbus International Airport, so airport transfers and hotel pickups are a big part of what we do here. We also drive weddings, anniversaries and Gahanna Lincoln prom nights.",
      "Creekside and Olde Gahanna make a great starting point for a night out, and we're happy to take you from there to Easton or downtown.",
    ],
    landmarks: ["Creekside", "Olde Gahanna", "CMH Airport", "Easton"],
  },
  {
    slug: "new-albany",
    city: "New Albany",
    county: "Franklin & Licking Counties",
    zips: "43054",
    blurb: "New Albany Market Square, the country club community and the business park.",
    copy: [
      "New Albany's Georgian-style village center and country club community are a natural fit for luxury transportation. We provide executive car service for the New Albany International Business Park, plus weddings, galas and private events.",
      "New Albany residents also rely on us for discreet, on-time transfers to CMH and private aviation terminals.",
    ],
    landmarks: ["Market Square", "New Albany Country Club", "New Albany Business Park", "Rose Run Park"],
  },
  {
    slug: "upper-arlington",
    city: "Upper Arlington",
    county: "Franklin County",
    zips: "43220, 43221",
    blurb: "Lane Avenue, Kingsdale, Tremont and the Ohio State area.",
    copy: [
      "Just west of the Ohio State campus, Upper Arlington is a game-day favorite. Ride from your front door to the Horseshoe without fighting for parking. We also serve Upper Arlington High School prom and homecoming, weddings, and anniversary dinners.",
      "From Lane Avenue and Kingsdale to Tremont Center, we know UA well.",
    ],
    landmarks: ["Lane Avenue", "Kingsdale", "Tremont Center", "Ohio Stadium"],
  },
  {
    slug: "worthington",
    city: "Worthington",
    county: "Franklin County",
    zips: "43085",
    blurb: "Old Worthington, the Village Green and north Columbus.",
    copy: [
      "Old Worthington's historic Village Green and brick-lined High Street are some of the most charming spots in Central Ohio for wedding photos and date nights. We serve weddings, proms for Thomas Worthington and Worthington Kilbourne, and airport transfers.",
      "Worthington's location along I-270 and US-23 makes it quick to get anywhere in the metro.",
    ],
    landmarks: ["Old Worthington", "Village Green", "Thomas Worthington High School", "Worthington Hills"],
  },
  {
    slug: "delaware",
    city: "Delaware",
    county: "Delaware County",
    zips: "43015",
    blurb: "Downtown Delaware, Ohio Wesleyan University and Delaware County venues.",
    copy: [
      "Delaware County is home to many of Central Ohio's most popular barn and estate wedding venues, and A Team Limo is there to get the couple and their guests to and from in style. We also drive graduations at Ohio Wesleyan University and nights out in historic downtown Delaware.",
      "Fair week and the Little Brown Jug draw big crowds every September, so book a ride and skip the parking.",
    ],
    landmarks: ["Ohio Wesleyan University", "Downtown Delaware", "Delaware County Fairgrounds", "Alum Creek"],
  },
  {
    slug: "lewis-center",
    city: "Lewis Center",
    county: "Delaware County",
    zips: "43035",
    blurb: "Polaris, Olentangy schools and Alum Creek.",
    copy: [
      "Lewis Center families book us for Olentangy Orange and Berlin prom nights, birthdays and anniversaries. With Polaris Parkway right next door, dinners and shopping trips are just minutes away.",
      "We also provide early-morning car service to CMH for Lewis Center travelers.",
    ],
    landmarks: ["Polaris", "Olentangy Orange", "Alum Creek State Park", "Highbanks Metro Park"],
  },
  {
    slug: "reynoldsburg",
    city: "Reynoldsburg",
    county: "Franklin, Licking & Fairfield Counties",
    zips: "43068",
    blurb: "Olde Reynoldsburg, the east side and Brice Road corridor.",
    copy: [
      "On the east side, Reynoldsburg residents call A Team Limo for weddings, proms, quinceañeras and birthday celebrations. It's also a short hop to CMH for airport transfers.",
      "Whether you're celebrating in Olde Reynoldsburg or heading downtown, we'll handle the drive.",
    ],
    landmarks: ["Olde Reynoldsburg", "Huber Park", "Brice Road", "Reynoldsburg High School"],
  },
  {
    slug: "pickerington",
    city: "Pickerington",
    county: "Fairfield County",
    zips: "43147",
    blurb: "Olde Pickerington Village and Fairfield County.",
    copy: [
      "Pickerington families book us for Pickerington Central and North prom nights, weddings across Fairfield County, and nights out in Columbus. Olde Pickerington Village is a lovely spot to start a celebration.",
      "Airport runs to CMH from Pickerington are fast via I-70, and we're available 24/7.",
    ],
    landmarks: ["Olde Pickerington Village", "Pickerington Central", "Sycamore Park"],
  },
  {
    slug: "grandview-heights",
    city: "Grandview Heights",
    county: "Franklin County",
    zips: "43212",
    blurb: "Grandview Avenue, Grandview Yard and the Arena District.",
    copy: [
      "Grandview Avenue and Grandview Yard are full of restaurants and bars that make an easy starting point for a night out, and we're only minutes from the Arena District and Short North.",
      "Grandview residents also book us for weddings, anniversaries and airport transfers.",
    ],
    landmarks: ["Grandview Avenue", "Grandview Yard", "Arena District"],
  },
  {
    slug: "bexley",
    city: "Bexley",
    county: "Franklin County",
    zips: "43209",
    blurb: "Main Street Bexley, Capital University and the east side.",
    copy: [
      "Bexley's tree-lined streets and Main Street restaurants make it a favorite for date nights and anniversaries. We drive Capital University graduations, Bexley High School proms and weddings throughout the east side.",
      "CMH is just a short drive away, making Bexley airport transfers quick.",
    ],
    landmarks: ["Main Street Bexley", "Capital University", "Jeffrey Park", "Drexel Theatre"],
  },
];

// Fleet. TODO: replace with your actual vehicles, capacities and photos.
// Drop a photo into public/images/ and set `image: "/images/your-photo.jpg"`.
const fleet = [
  {
    name: "Stretch Limousine",
    seats: "Up to 10 passengers",
    image: "",
    features: ["Leather wraparound seating", "LED mood lighting", "Bar area with ice & glassware", "Premium sound system"],
    bestFor: "Weddings, proms, anniversaries, nights out",
  },
  {
    name: "SUV Stretch Limo",
    seats: "Up to 14 passengers",
    image: "",
    features: ["Spacious, high-ceiling cabin", "Fiber-optic and LED lighting", "Bluetooth sound system", "Privacy partition"],
    bestFor: "Bachelor & bachelorette parties, larger groups",
  },
  {
    name: "Party Bus",
    seats: "Up to 20+ passengers",
    image: "",
    features: ["Room to stand and move", "Party lighting & sound", "Perimeter seating", "Coolers on request"],
    bestFor: "Birthdays, bar crawls, wedding parties, game days",
  },
  {
    name: "Executive Black SUV",
    seats: "Up to 6 passengers",
    image: "",
    features: ["Cadillac Escalade / Chevy Suburban class", "Extra luggage room", "Phone chargers & water", "Tinted privacy glass"],
    bestFor: "Airport transfers, corporate travel, VIPs",
  },
  {
    name: "Executive Sedan",
    seats: "Up to 3 passengers",
    image: "",
    features: ["Luxury sedan comfort", "Quiet, smooth ride", "Ideal for one to three travelers", "Professional chauffeur"],
    bestFor: "Airport runs, business meetings, date nights",
  },
  {
    name: "Executive Sprinter Van",
    seats: "Up to 14 passengers",
    image: "",
    features: ["Stand-up headroom", "Captain's chairs", "Luggage space", "Great for groups"],
    bestFor: "Corporate groups, wedding guests, wine tours",
  },
];

const generalFaqs = [
  ["How much does a limo cost in Columbus, Ohio?", "Limo pricing depends on the vehicle, date, number of hours and itinerary. Weekend nights and prom/wedding season cost more than weekdays. Request a free quote and we'll give you an exact, all-inclusive price with no hidden fees."],
  ["What areas do you serve?", "We serve all of Columbus and Central Ohio, including Dublin, Westerville, Powell, Hilliard, Grove City, Gahanna, New Albany, Upper Arlington, Worthington, Delaware, Lewis Center, Reynoldsburg, Pickerington, Grandview Heights and Bexley. Long-distance trips are available on request."],
  ["Are you available 24/7?", "Yes. We take reservations and run trips 24 hours a day, 7 days a week, including holidays and early-morning airport runs."],
  ["How far in advance should I book?", "For weddings and prom, book 2–6 months ahead. For airport and corporate trips, 24–48 hours is usually enough, but we'll always try to accommodate last-minute requests."],
  ["Are your chauffeurs licensed and insured?", "Yes. Our chauffeurs are professionally trained, licensed and background-checked, and our vehicles are fully insured commercial vehicles."],
  ["Is gratuity included?", "We'll explain exactly what's included in your quote, gratuity included, so there are no surprises at the end of the night."],
  ["What is your cancellation policy?", "Cancellation terms depend on the type of booking and how far in advance you cancel. We'll explain the policy clearly before you confirm your reservation."],
  ["Can I bring alcohol in the limo?", "Passengers 21 and over may bring beverages on most adult bookings in accordance with Ohio law. Alcohol is never permitted on prom, homecoming or other student trips."],
];

module.exports = { services, areas, fleet, generalFaqs };
