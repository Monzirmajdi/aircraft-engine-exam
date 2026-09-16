export type QuestionType = "MCQ" | "MATCHING" | "FILL" | "DIAGRAM" | "TRUE_FALSE";
export type Difficulty = "Easy" | "Medium" | "Hard";

export type MatchItem = { term: string; answer: string };
export type DiagramKind = "fuel-flow" | "air-bleed" | "oil-loop" | "start-sequence" | "ignition" | "reverser" | "afterburner";

export type Question = {
  id: string;
  topic: string;
  type: QuestionType;
  difficulty: Difficulty;
  prompt: string;
  options?: string[];
  answer?: number;
  explanation: string;
  source: string;
  matches?: MatchItem[];
  matchOptions?: string[];
  diagram?: DiagramKind;
};

const q = (id: string, topic: string, type: QuestionType, difficulty: Difficulty, prompt: string, options: string[], answer: number, explanation: string, source: string, diagram?: DiagramKind): Question => ({ id, topic, type, difficulty, prompt, options, answer, explanation, source, diagram });
const m = (id: string, topic: string, difficulty: Difficulty, prompt: string, matches: MatchItem[], explanation: string, source: string): Question => ({ id, topic, type: "MATCHING", difficulty, prompt, matches, matchOptions: matches.map((x) => x.answer), explanation, source });

export const questionBank: Question[] = [
  // FUEL SYSTEM — 12
  q("F01", "Fuel System", "MCQ", "Easy", "What is the primary function of the aircraft fuel system?", ["Store, transport, and distribute fuel to supply the engine", "Cool the engine oil only", "Extract compressed air from the compressor", "Reverse the exhaust gas stream"], 0, "The lecture states that the fuel system stores, transports, and distributes fuel and supplies the engine with the required amount.", "Fuel system lecture — definition and primary function"),
  q("F02", "Fuel System", "MCQ", "Easy", "Which fuel tank is formed as part of the aircraft structure?", ["Bladder tank", "Integral tank", "External tank", "Auxiliary pump"], 1, "An integral tank is formed as part of the aircraft structure.", "Fuel system lecture — fuel tank types"),
  q("F03", "Fuel System", "MCQ", "Easy", "What is the function of a boost pump?", ["Measure fuel pressure", "Increase pressure and ensure a continuous fuel supply", "Remove water droplets", "Control cabin temperature"], 1, "The lecture identifies boost pumps as pumps used to increase pressure and ensure continuous fuel supply to the engine.", "Fuel system lecture — fuel pump types"),
  q("F04", "Fuel System", "MCQ", "Medium", "Which sequence matches the fuel system operation described in the lecture?", ["Tanks → pumps → filters → fuel lines → engine/combustion chamber", "Filters → tanks → engine → pumps → fuel lines", "Pumps → fuel lines → tanks → filters → engine", "Engine → tanks → filters → pumps → fuel lines"], 0, "The stated sequence is fuel stored in tanks, drawn by pumps, passed through filters, carried by fuel lines, and delivered to the engine or combustion chamber.", "Fuel system lecture — fuel system operation"),
  q("F05", "Fuel System", "MCQ", "Medium", "Which fuel feed system relies on gravity to transfer fuel from the tanks to the engine?", ["Pump feed system", "Gravity feed system", "Cross-feed system", "Boost feed system"], 1, "The gravity feed system relies on gravity to transfer fuel from the tanks to the engine.", "Fuel system lecture — types of fuel feed systems"),
  q("F06", "Fuel System", "MCQ", "Medium", "What is one stated advantage of a pump feed system?", ["It is suitable only for small aircraft", "It provides a constant fuel flow", "It requires no maintenance", "It uses no fuel pumps"], 1, "The lecture lists suitability for large aircraft and a constant fuel flow as advantages of the pump feed system.", "Fuel system lecture — pump feed system"),
  m("F07", "Fuel System", "Medium", "Match each fuel-system item with its lecture description.", [{ term: "Fuel quantity indicator", answer: "Indicates the amount of fuel available" }, { term: "Fuel flow indicator", answer: "Indicates the rate of fuel flow" }, { term: "Fuel pressure indicator", answer: "Indicates fuel pressure within the system" }, { term: "Low fuel warning indicator", answer: "Alerts the pilot when fuel quantity reaches a low level" }], "The four main instruments are defined by the measurements or warning they provide.", "Fuel system lecture — main instruments"),
  m("F08", "Fuel System", "Medium", "What is the purpose of each fuel-system component?", [{ term: "Fuel filter", answer: "Removes impurities, contaminants, and water droplets" }, { term: "Fuel valve", answer: "Controls and regulates fuel flow" }, { term: "Fuel line", answer: "Transports fuel between system components" }, { term: "Fuel pump", answer: "Transfers fuel from tanks to the engine" }], "The lecture links each component to the listed fuel-handling function.", "Fuel system lecture — components"),
  q("F09", "Fuel System", "FILL", "Easy", "Fuel transfer between tanks is used to maintain the aircraft’s ______ and balance.", ["center of gravity", "ignition voltage", "cabin temperature", "oil viscosity"], 0, "The fuel transfer system is used to maintain the aircraft’s center of gravity and balance.", "Fuel system lecture — fuel transfer system"),
  q("F10", "Fuel System", "DIAGRAM", "Medium", "In the lecture’s fuel-flow sequence, which component follows the fuel pumps?", ["Fuel tanks", "Fuel filters", "Fuel lines", "Combustion chamber"], 1, "The lecture sequence places the filters after the fuel pumps and before the fuel lines.", "Fuel system lecture — fuel system operation", "fuel-flow"),
  q("F11", "Fuel System", "TRUE_FALSE", "Easy", "A gravity feed system is described as having a simple design and low operating cost.", ["True", "False"], 0, "Both are listed advantages of the gravity feed system.", "Fuel system lecture — gravity feed system"),
  q("F12", "Fuel System", "TRUE_FALSE", "Medium", "The stated remedy for fuel leakage is to increase the fuel pressure.", ["True", "False"], 1, "The lecture gives periodic inspection and replacement of damaged parts as the remedy for fuel leakage.", "Fuel system lecture — malfunctions and safety procedures"),

  // AIR SYSTEM — 10
  q("A01", "Air System", "MCQ", "Easy", "What is the compressed air extracted from the compressor known as?", ["Bleed air", "Scavenge air", "Cooling air", "Vent air"], 0, "The lecture calls air extracted from the compressor bleed air.", "Air system lecture — introduction"),
  q("A02", "Air System", "MCQ", "Easy", "Where is air for the aircraft air system obtained?", ["The fuel tank", "The axial compressor inside the engine", "The oil tank", "The exhaust unit inner cone"], 1, "The stated source is the axial compressor inside the engine.", "Air system lecture — compressed air source"),
  q("A03", "Air System", "MCQ", "Medium", "Low-pressure bleed is extracted from which compressor stages?", ["Rear stages", "Early stages", "The combustion chamber", "The turbine stages"], 1, "Low-pressure bleed is extracted from the early stages of the compressor.", "Air system lecture — low-pressure bleed"),
  q("A04", "Air System", "MCQ", "Medium", "Which characteristic is associated with high-pressure bleed?", ["Medium pressure and lower temperature", "High pressure and high temperature", "Low pressure and low temperature", "No pressure and ambient temperature"], 1, "The lecture lists high pressure and high temperature for high-pressure bleed.", "Air system lecture — high-pressure bleed"),
  m("A05", "Air System", "Medium", "Match the air-system component with its function.", [{ term: "Ducts", answer: "Transport air" }, { term: "Check valves", answer: "Prevent backflow of air" }, { term: "Sensors", answer: "Measure pressure, temperature, and flow rate" }, { term: "Heat exchangers", answer: "Lower air temperature before use" }], "These component functions are stated directly in the air-system components section.", "Air system lecture — air-system components"),
  m("A06", "Air System", "Medium", "Match the bleed-air application with the described use.", [{ term: "Environmental control system", answer: "Air conditioning and cabin pressurization" }, { term: "Anti-icing", answer: "Directs hot bleed air to leading edges and engine components" }, { term: "Engine starting", answer: "Drives the air starter" }, { term: "Cabin pressurization", answer: "Provides cabin pressure during flight" }], "The lecture lists these applications and their stated uses.", "Air system lecture — main applications of bleed air"),
  q("A07", "Air System", "FILL", "Easy", "The ECS is described as the largest consumer of ______ air inside the aircraft.", ["compressed", "fuel", "lubricating", "exhaust"], 0, "The environmental control system is described as the largest consumer of compressed air inside the aircraft.", "Air system lecture — environmental control system"),
  q("A08", "Air System", "FILL", "Medium", "Before air is distributed to aircraft systems, it must be clean and ______.", ["compressed", "burned", "de-aerated", "reversed"], 0, "The lecture states that the air must be clean and compressed before use.", "Air system lecture — air system operation"),
  q("A09", "Air System", "DIAGRAM", "Medium", "Which path represents the lecture’s bleed-air concept?", ["Compressor → diversion from main airflow → processing/pipelines → aircraft systems", "Fuel tank → filter → compressor → cabin", "Oil tank → scavenge pump → ducts → turbine", "Exhaust nozzle → compressor → fuel system"], 0, "The lecture describes air extraction from the compressor, diversion from the main airflow, processing, and distribution to aircraft systems.", "Air system lecture — air system operation", "air-bleed"),
  q("A10", "Air System", "TRUE_FALSE", "Easy", "Check valves are used to prevent the backflow of air.", ["True", "False"], 0, "Preventing air backflow is the stated function of check valves.", "Air system lecture — air-system components"),

  // LUBRICATION SYSTEM — 16
  q("L01", "Lubrication System", "MCQ", "Easy", "The lubrication system provides lubrication and cooling for which items?", ["Gears, bearings, and splines", "Fuel tanks only", "Cabin ducts only", "Nozzles and cascade vanes only"], 0, "The lecture explicitly lists gears, bearings, and splines.", "Lubrication lecture — purpose"),
  q("L02", "Lubrication System", "MCQ", "Easy", "What does the recirculatory lubrication system do with oil after it is distributed around the engine?", ["Spills it overboard immediately", "Returns it to the oil tank by pumps", "Burns it in the combustion chamber", "Sends it to the cabin"], 1, "In the recirculatory system, oil is returned to the oil tank by pumps.", "Lubrication lecture — classifications"),
  q("L03", "Lubrication System", "MCQ", "Medium", "What is the major difference between the pressure relief valve and full-flow recirculatory systems?", ["The control of oil flow to the bearings", "The fuel tank shape", "The source of bleed air", "The number of ignition plugs"], 0, "The lecture identifies control of oil flow to the bearings as the major difference.", "Lubrication lecture — recirculatory systems"),
  q("L04", "Lubrication System", "MCQ", "Medium", "In a pressure relief valve system, what happens when the design pressure is exceeded?", ["A spring-loaded valve allows oil to return", "The fuel filters open", "The ignition plugs discharge", "The nozzle closes"], 0, "The spring-loaded valve allows oil to be returned from the pressure-pump outlet to the tank or pump inlet.", "Lubrication lecture — pressure relief valve system"),
  q("L05", "Lubrication System", "MCQ", "Hard", "Why does a pressure relief valve system become undesirable for engines with high bearing-chamber pressures?", ["It requires a high relief-valve setting, large pumps, and has difficulty matching oil flow at slower speeds", "It cannot use an oil tank", "It prevents any oil from reaching the bearings", "It operates only with fuel-cooled coolers"], 0, "The lecture’s example explains that a high chamber pressure requires a 130 lb per sq. in. setting and leads to large pumps and difficulty matching flow at slower speeds.", "Lubrication lecture — full-flow system"),
  q("L06", "Lubrication System", "MCQ", "Medium", "What indicates a possible blocked filter in the full-flow system?", ["A differential pressure switch sensing increased pressure difference", "A low fuel warning indicator", "A reverse thrust light", "A cartridge detonator"], 0, "The differential pressure switch senses an increase in pressure difference between filter inlet and outlet.", "Lubrication lecture — full-flow system"),
  q("L07", "Lubrication System", "MCQ", "Easy", "Which system is generally used for engines that run for short durations, such as booster and vertical lift engines?", ["Total loss or expendable system", "Gravity feed system", "Full cabin system", "Cross-feed system"], 0, "The lecture states that the total loss oil system is generally used for short-duration engines such as booster and vertical lift engines.", "Lubrication lecture — total loss system"),
  m("L08", "Lubrication System", "Medium", "Match the oil-system component with its lecture function.", [{ term: "Oil tank", answer: "Allows the system to be drained, replenished, and checked" }, { term: "Scavenge pump", answer: "Helps prevent flooding of bearing chambers" }, { term: "Oil cooler", answer: "Transfers heat from the oil" }, { term: "Magnetic plug", answer: "Collects ferritin debris" }], "Each pairing follows the component descriptions in the oil-system components section.", "Lubrication lecture — oil-system components"),
  m("L09", "Lubrication System", "Hard", "Match the filtration component with its location or purpose.", [{ term: "Coarse strainer", answer: "At the oil tank outlet or pump inlet to protect pumps" }, { term: "Fine pressure filter", answer: "At the pressure-pump outlet to retain small particles" }, { term: "Last-chance filter", answer: "Immediately upstream of the oil jets" }, { term: "Scavenge filter", answer: "In each oil return line" }], "The lecture gives these locations and functions for the filtration components.", "Lubrication lecture — filtration component"),
  q("L10", "Lubrication System", "FILL", "Easy", "The smallest diameter of an oil jet orifice is ______ inch.", ["0.04", "0.4", "4.0", "0.004"], 0, "The lecture states that the smallest diameter of a jet orifice is 0.04 inch.", "Lubrication lecture — oil distribution"),
  q("L11", "Lubrication System", "FILL", "Medium", "At 40 lb. per sq. in., the 0.04-inch oil jet orifice allows a flow of ______ gallons per hour.", ["12", "40", "90", "130"], 0, "The stated flow is 12 gallons per hour at 40 lb. per sq. in.", "Lubrication lecture — oil distribution"),
  q("L12", "Lubrication System", "FILL", "Easy", "Normal starts can be made in temperatures as low as ______ deg. C. without pre-heating the oil.", ["-40", "-4", "40", "4"], 0, "The lecture states that normal starts can be made as low as -40 deg. C. without pre-heating the oil.", "Lubrication lecture — lubricating oils"),
  q("L13", "Lubrication System", "DIAGRAM", "Medium", "Which simplified oil loop matches a recirculatory system?", ["Oil tank → feed pump → lubricated parts → scavenge pump → oil tank", "Oil tank → burner → cabin → oil tank", "Fuel tank → oil cooler → igniter → exhaust", "Compressor → oil tank → nozzle → fuel tank"], 0, "The recirculatory system distributes oil around the engine and returns it to the oil tank by pumps.", "Lubrication lecture — classifications and oil pumps", "oil-loop"),
  q("L14", "Lubrication System", "DIAGRAM", "Medium", "In a fuel-cooled oil cooler, heat is transferred in which direction?", ["From fuel to oil", "From oil to fuel", "From air to the igniter", "From oil to the cabin"], 1, "The lecture states that heat is transferred from the oil to the fuel, lowering oil temperature.", "Lubrication lecture — fuel-cooled oil cooler", "oil-loop"),
  q("L15", "Lubrication System", "TRUE_FALSE", "Easy", "Gear pumps are normally used in recirculatory oil systems.", ["True", "False"], 0, "This is stated directly in the oil-pumps section.", "Lubrication lecture — oil pumps"),
  q("L16", "Lubrication System", "TRUE_FALSE", "Medium", "A centrifugal breather vents air overboard without separating oil droplets.", ["True", "False"], 1, "The centrifugal breather separates oil droplets before the air is vented overboard.", "Lubrication lecture — centrifugal breather"),

  // STARTING — 14
  q("S01", "Starting System", "MCQ", "Easy", "Why are two separate systems required to start a gas turbine engine satisfactorily?", ["To rotate the engine and ignite the air/fuel mixture", "To cool the cabin and measure fuel", "To reverse the exhaust and drain oil", "To pressurize the tires and wings"], 0, "The lecture states that one system rotates the compressor and turbine and the other provides ignition of the air/fuel mixture.", "Starting and ignition lecture — introduction"),
  q("S02", "Starting System", "MCQ", "Medium", "What must the starter motor provide?", ["High torque and smooth acceleration from rest", "Low temperature and low pressure", "Fuel filtration and water drainage", "A high-pressure bleed source only"], 0, "The starter motor must produce high torque and transmit it for smooth acceleration up to takeover speed.", "Starting and ignition lecture — starter motor"),
  q("S03", "Starting System", "MCQ", "Easy", "Which starter is usually a D.C. electric motor coupled through reduction gear and a ratchet mechanism or clutch?", ["Electric starter", "Cartridge starter", "Air turbine starter", "Hydraulic starter"], 0, "This is the description of the electric starter.", "Starting and ignition lecture — electric starter"),
  q("S04", "Starting System", "MCQ", "Medium", "What happens to the electric starter’s clutch after the engine reaches self-sustaining speed?", ["It automatically disengages", "It increases fuel pressure", "It opens the cabin valve", "It starts the igniter plug"], 0, "The clutch or ratchet mechanism automatically disengages after self-sustaining speed is reached.", "Starting and ignition lecture — electric starter"),
  q("S05", "Starting System", "MCQ", "Medium", "Which starting method uses high-velocity gases from a burning cartridge?", ["Cartridge starting", "Air starting", "Hydraulic starting", "Gravity starting"], 0, "The cartridge starter motor is driven by high-velocity gases from a burning cartridge.", "Starting and ignition lecture — cartridge starting"),
  q("S06", "Starting System", "MCQ", "Medium", "Air turbine starter air may come from an external ground supply, an A.P.U., or what other source?", ["A running engine by cross-feed", "The oil tank", "The fuel filter", "The exhaust cone only"], 0, "The lecture lists a cross-feed from a running engine as a source.", "Starting and ignition lecture — air turbine starting"),
  m("S07", "Starting System", "Medium", "Match each starting method with its lecture description.", [{ term: "Electric starter", answer: "D.C. motor with reduction gear and automatic disengagement" }, { term: "Cartridge starting", answer: "Impulse-type turbine driven by gases from a burning cartridge" }, { term: "Air starting", answer: "Starter motor driven by air through a reduction gear and clutch" }, { term: "Hydraulic starting", answer: "Pump/starter or hydraulic motor driven by hydraulic pressure" }], "The lecture describes these starter types and their power sources or mechanisms.", "Starting and ignition lecture — starter types"),
  m("S08", "Starting System", "Hard", "Match the gas-turbine starter sequence with the event.", [{ term: "Initiation", answer: "Starter motor rotates the gas turbine starter" }, { term: "Self-sustaining speed", answer: "Starting and ignition systems switch off" }, { term: "Acceleration", answer: "Exhaust gas drives the free-power turbine" }, { term: "Main engine self-sustaining", answer: "Cut-out switch shuts down the gas-turbine starter" }], "These events are listed in the gas turbine starting sequence.", "Starting and ignition lecture — gas turbine starting"),
  q("S09", "Starting System", "FILL", "Easy", "Gas turbine starter acceleration continues up to approximately ______ r.p.m.", ["60,000", "6,000", "600", "160,000"], 0, "The lecture states approximately 60,000 r.p.m.", "Starting and ignition lecture — gas turbine starting"),
  q("S10", "Starting System", "FILL", "Medium", "In an air starter, the starter turbine is rotated by ______ taken from an external or aircraft source.", ["air", "oil", "fuel", "water"], 0, "The air turbine starter is rotated by air from the listed sources.", "Starting and ignition lecture — air turbine starting"),
  q("S11", "Starting System", "FILL", "Medium", "A combustor starter introduces high-pressure air and fuel into a small ______ chamber.", ["combustion", "oil", "filter", "gear"], 0, "The combustor starter has a small combustion chamber.", "Starting and ignition lecture — combustor starter"),
  q("S12", "Starting System", "DIAGRAM", "Medium", "Which order matches the basic starting cycle described for a gas turbine engine?", ["Rotate engine → adequate air → introduce fuel → ignite mixture", "Ignite mixture → drain oil → rotate engine → extract bleed air", "Open nozzle → reverse thrust → filter fuel → ignite", "Pressurize cabin → start pump → reverse airflow → stop engine"], 0, "The introduction requires rotation to provide air, followed by fuel from spray nozzles and ignition of the mixture.", "Starting and ignition lecture — introduction", "start-sequence"),
  q("S13", "Starting System", "TRUE_FALSE", "Easy", "The starting and ignition systems must operate simultaneously during engine starting.", ["True", "False"], 0, "The lecture states that they must operate simultaneously during starting.", "Starting and ignition lecture — introduction"),
  q("S14", "Starting System", "TRUE_FALSE", "Medium", "The hydraulic pump/starter continues to operate only as a starter after the starting cycle is complete.", ["True", "False"], 1, "After completion, the pump/starter functions as a normal hydraulic pump.", "Starting and ignition lecture — hydraulic starting"),

  // IGNITION — 10
  q("I01", "Ignition System", "MCQ", "Easy", "What type of ignition is used for starting all jet engines in the lecture?", ["High-energy ignition", "Low-energy ignition only", "Surface heating only", "Cartridge ignition only"], 0, "The lecture states that high-energy ignition is used for starting all jet engines.", "Ignition lecture — ignition"),
  q("I02", "Ignition System", "MCQ", "Easy", "How many igniter plugs are fitted in the dual ignition system described?", ["One", "Two", "Three", "Four"], 1, "Each ignition unit has its own igniter plug, and a dual system is always fitted.", "Ignition lecture — ignition"),
  q("I03", "Ignition System", "MCQ", "Medium", "Ignition units are rated in which unit?", ["Joules", "Gallons per hour", "Volts only", "Pounds per square inch"], 0, "The lecture states that ignition units are rated in joules.", "Ignition lecture — ignition units"),
  q("I04", "Ignition System", "MCQ", "Medium", "What is the normal spark rate of a typical ignition system?", ["6–10 sparks per minute", "60–100 sparks per minute", "600–1000 sparks per minute", "1–2 sparks per minute"], 1, "The stated normal spark rate is between 60 and 100 sparks per minute.", "Ignition lecture — spark and plug"),
  m("I05", "Ignition System", "Medium", "Match the ignition feature with its lecture value or role.", [{ term: "High output example", answer: "Twelve joule" }, { term: "Low output example", answer: "Three to six joule" }, { term: "Air-gap igniter", answer: "Approximately 25,000 volts" }, { term: "Surface-discharge igniter", answer: "Approximately 2,000 volts" }], "These output examples and potential differences are stated in the ignition lecture.", "Ignition lecture — ignition units and igniter plugs"),
  q("I06", "Ignition System", "FILL", "Easy", "One joule equals one watt per ______.", ["second", "minute", "hour", "degree"], 0, "The lecture defines one joule as one watt per second.", "Ignition lecture — ignition units"),
  q("I07", "Ignition System", "FILL", "Medium", "The igniter plug tip protrudes approximately ______ inch into the flame tube.", ["0.1", "0.75", "25,000", "2,000"], 0, "The stated protrusion is approximately 0.1 inch.", "Ignition lecture — spark and plug"),
  q("I08", "Ignition System", "DIAGRAM", "Medium", "Which sequence matches the D.C. trembler-operated ignition unit?", ["Induction coil → capacitor charging → breakdown gap → igniter plug discharge", "Fuel pump → oil tank → nozzle → capacitor", "Compressor → bleed valve → cabin → spark plug", "Starter clutch → turbine → fuel tank → igniter"], 0, "The unit charges a reservoir capacitor through a high-voltage rectifier; at breakdown, energy discharges across the igniter plug.", "Ignition lecture — D.C. ignition unit", "ignition"),
  q("I09", "Ignition System", "TRUE_FALSE", "Easy", "The transistorized ignition unit has no moving parts.", ["True", "False"], 0, "The lecture gives no moving parts and longer operating life as advantages of the transistorized unit.", "Ignition lecture — transistorized ignition unit"),
  q("I10", "Ignition System", "TRUE_FALSE", "Medium", "Relighting in flight requires operation of the ignition system only, provided fuel supply is available within the relight envelope.", ["True", "False"], 0, "The lecture states that within the envelope compressor rotation is adequate and only the ignition system is required, provided fuel is available.", "Ignition lecture — relighting"),

  // THRUST REVERSAL — 10
  q("T01", "Thrust Reversal", "MCQ", "Easy", "Why is thrust reversal useful on wet, icy, or snow-covered runways?", ["Tyre adhesion may be reduced, so an additional deceleration method is needed", "It increases cabin temperature", "It replaces the fuel system", "It increases the normal forward nozzle area"], 0, "The lecture connects thrust reversal with reduced tyre adhesion and the need to bring the aircraft to rest within the required distance.", "Thrust reversal lecture — introduction"),
  q("T02", "Thrust Reversal", "MCQ", "Medium", "On high by-pass ratio fan engines, reverse thrust is achieved by reversing which airflow?", ["Cold stream fan airflow", "Hot stream exhaust only", "Oil flow", "Fuel flow"], 0, "The lecture states that the cold stream airflow is reversed because the majority of thrust is derived from the fan.", "Thrust reversal lecture — introduction"),
  q("T03", "Thrust Reversal", "MCQ", "Medium", "What discharge angle is chosen because a completely forward gas direction is not possible?", ["Approximately 45 degrees", "Approximately 90 degrees", "Approximately 10 degrees", "Approximately 180 degrees"], 0, "The lecture gives an approximate 45-degree discharge angle.", "Thrust reversal lecture — introduction"),
  q("T04", "Thrust Reversal", "MCQ", "Medium", "What safety action occurs if operating pressure falls or fails?", ["A mechanical lock holds the reverser in forward thrust position", "The reverser automatically opens to full reverse", "The ignition system is disconnected", "The fuel tanks are drained"], 0, "The mechanical lock holds the reverser in the forward thrust position until pressure is restored.", "Thrust reversal lecture — safety features"),
  m("T05", "Thrust Reversal", "Medium", "Match the reverser system with its operation.", [{ term: "Clamshell door system", answer: "Pneumatic doors uncover ducts and close the normal exit" }, { term: "Bucket target system", answer: "Hydraulically actuated bucket doors reverse hot gas" }, { term: "Cold stream reverser", answer: "Blocker doors divert airflow through cascade vanes" }, { term: "Turbo-propeller reverse pitch", answer: "Propeller blade angle moves through zero to negative pitch" }], "The lecture explains these four reverse-thrust methods.", "Thrust reversal lecture — principles and systems"),
  q("T06", "Thrust Reversal", "FILL", "Medium", "The clamshell door system is operated by pneumatic ______.", ["rams", "pumps", "turbines", "plugs"], 0, "The lecture states that clamshell doors are operated by pneumatic rams.", "Thrust reversal lecture — clamshell door system"),
  q("T07", "Thrust Reversal", "FILL", "Medium", "The cold-stream reverser moves the translating cowl rearwards and folds the blocker doors to divert airflow through the ______ vanes.", ["cascade", "guide", "stator", "scavenge"], 0, "The lecture identifies cascade vanes as the path for diverted cold-stream airflow.", "Thrust reversal lecture — cold stream reverser"),
  q("T08", "Thrust Reversal", "DIAGRAM", "Medium", "Which reverse-thrust path matches the clamshell system?", ["Doors uncover ducts and close normal exit → cascade vanes direct gas forward", "Doors open the normal exit → gas continues rearward", "Fuel flows to the oil tank → propeller pitch changes", "Blocker doors cover fan ducts → gas enters the cabin"], 0, "The lecture states that clamshell doors uncover ducts, close the normal gas-stream exit, and cascade vanes direct the gas forward.", "Thrust reversal lecture — clamshell door system", "reverser"),
  q("T09", "Thrust Reversal", "TRUE_FALSE", "Easy", "A reverse-thrust lever cannot be moved to reverse unless the engine is running at a low power setting.", ["True", "False"], 0, "This is one of the safety features stated in the lecture.", "Thrust reversal lecture — safety features"),
  q("T10", "Thrust Reversal", "TRUE_FALSE", "Medium", "The cold-stream thrust reverser is subjected to the same high temperatures as the clamshell and bucket systems.", ["True", "False"], 1, "The lecture states that the cold-stream reverser is not subjected to high temperatures.", "Thrust reversal lecture — construction and materials"),

  // AFTERBURNING — 8
  q("B01", "Afterburning", "MCQ", "Easy", "Afterburning augments basic engine thrust by introducing and burning fuel where?", ["Between the engine turbine and the jet-pipe propelling nozzle", "Inside the oil tank", "Before the fuel filters", "Inside the cabin"], 0, "The lecture states that afterburning introduces and burns fuel between the engine turbine and jet pipe propelling nozzle.", "Afterburning lecture — introduction"),
  q("B02", "Afterburning", "MCQ", "Medium", "What happens to the propelling nozzle when afterburning is selected?", ["It opens to provide an exit area for the increased gas volume", "It closes permanently", "It is removed from the jet pipe", "It redirects oil to the bearings"], 0, "The nozzle opens as gas temperature and volume increase, preventing pressure increase in the jet pipe.", "Afterburning lecture — introduction"),
  q("B03", "Afterburning", "MCQ", "Hard", "Why is the flow diffused before entering the afterburner combustion zone?", ["The turbine-exit velocity is too high for a stable flame", "To remove all oxygen from the exhaust", "To reduce the fuel pump output", "To close the nozzle"], 0, "The lecture says the 750–1,200 feet-per-second turbine-exit velocity is too high for stable flame, so velocity is reduced and pressure increased.", "Afterburning lecture — operation"),
  m("B04", "Afterburning", "Hard", "Match the afterburning feature with its lecture description.", [{ term: "Flame stabilizer", answer: "Creates turbulent eddies and a lower local velocity region" }, { term: "Burners", answer: "Distribute atomized fuel over the flame area" }, { term: "Heatshield", answer: "Improves cooling and limits instability effects" }, { term: "Pressure ratio control unit", answer: "Coordinates fuel flow and nozzle area" }], "These roles are stated in the afterburning operation and construction sections.", "Afterburning lecture — operation, construction, and control"),
  q("B05", "Afterburning", "FILL", "Medium", "The afterburner flame temperature can be in excess of ______ deg. C.", ["1,700", "170", "700", "800"], 0, "The lecture states that the afterburner flame can be in excess of 1,700 deg. C.", "Afterburning lecture — introduction"),
  q("B06", "Afterburning", "DIAGRAM", "Hard", "When afterburner fuel flow increases, what coordinated change is described?", ["Nozzle area increases to restore the pressure ratio across the turbine", "Nozzle area decreases to stop all gas flow", "The oil tank opens and the ignition plug retracts", "The cold stream is sent to the cabin"], 0, "The pressure ratio control unit increases nozzle area as fuel flow increases so the stated pressure ratio is restored.", "Afterburning lecture — control system", "afterburner"),
  q("B07", "Afterburning", "TRUE_FALSE", "Medium", "A flame stabilizer is located downstream of the fuel burners.", ["True", "False"], 0, "The lecture places the flame stabilizer downstream of the fuel burners.", "Afterburning lecture — operation"),
  q("B08", "Afterburning", "TRUE_FALSE", "Medium", "Without afterburning, an engine fitted with afterburning equipment has slightly more thrust than a similar engine without it.", ["True", "False"], 1, "The lecture states that thrust without afterburning is slightly less because of added jet-pipe restrictions.", "Afterburning lecture — introduction"),
];

export const topics = ["Fuel System", "Air System", "Lubrication System", "Starting System", "Ignition System", "Thrust Reversal", "Afterburning"];
export const topicDescriptions: Record<string, string> = {
  "Fuel System": "Storage, transfer, feed, filtration, instruments, faults",
  "Air System": "Bleed air sources, regulation, ECS, anti-icing, starting",
  "Lubrication System": "Recirculatory and expendable systems, oil components",
  "Starting System": "Electric, cartridge, air, gas turbine, hydraulic starting",
  "Ignition System": "High-energy units, igniter plugs, spark rate, relighting",
  "Thrust Reversal": "Cold and hot stream reversal, safety, construction",
  "Afterburning": "Reheat, flame stabilization, nozzle control, thrust increase",
};

export const examBlueprint: Record<string, number> = {
  "Fuel System": 5,
  "Air System": 5,
  "Lubrication System": 8,
  "Starting System": 6,
  "Ignition System": 5,
  "Thrust Reversal": 5,
  "Afterburning": 4,
};

export function shuffled<T>(input: T[]): T[] {
  const copy = [...input];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function buildExam(): Question[] {
  return topics.flatMap((topic) => shuffled(questionBank.filter((item) => item.topic === topic)).slice(0, examBlueprint[topic]));
}

export function randomizeQuestion(question: Question): Question {
  if (question.type === "MATCHING" && question.matches) {
    return { ...question, matches: shuffled(question.matches), matchOptions: shuffled(question.matches.map((x) => x.answer)) };
  }
  if (!question.options || question.type === "MATCHING") return question;
  const pairs = question.options.map((option, index) => ({ option, index }));
  const shuffledPairs = shuffled(pairs);
  return { ...question, options: shuffledPairs.map((x) => x.option), answer: shuffledPairs.findIndex((x) => x.index === question.answer) };
}

export const typeLabels: Record<QuestionType, string> = {
  MCQ: "Multiple choice",
  MATCHING: "Matching",
  FILL: "Fill in the space",
  DIAGRAM: "Diagram / sequence",
  TRUE_FALSE: "True & false",
};

export const difficultyClass: Record<Difficulty, string> = {
  Easy: "easy",
  Medium: "medium",
  Hard: "hard",
};

export const allTypeCounts = questionBank.reduce<Record<string, number>>((acc, question) => {
  acc[question.type] = (acc[question.type] ?? 0) + 1;
  return acc;
}, {});
