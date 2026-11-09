export function classifyComplaint(text: string): {
  categoryId: string;
  confidence: number;
} {
  const t = text.trim().toLowerCase();
  if (!t) return { categoryId: "pothole", confidence: 0 };

  const rules: { id: string; re: RegExp }[] = [
    { id: "streetlight", re: /street\s*light|தெரு\s*விளக்கு|தெருவிளக்கு|lamp|light not|விளக்கு/ },
    { id: "drainage", re: /drain|வடிகால்|சாக்கடை|கழிவுநீர்|sewage|manhole|blockage|கழிப்பறை சுத்த/ },
    { id: "hospital", re: /hospital|மருத்துவ|phc|primary health|doctor|clinic/ },
    { id: "school", re: /school|பள்ளி|classroom|teacher|கல்வி|blackboard/ },
    { id: "garbage", re: /garbage|குப்பை|waste|trash|dump|solid waste|bin/ },
    { id: "water", re: /water|குடிநீர்|தண்ணீர்|tap|pipeline|குழாய்|supply/ },
    { id: "power", re: /power|outage|மின்சாரம்|மின்\s*தடை|electricity|eb |current cut/ },
    { id: "pothole", re: /pothole|road|சாலை|குழி|pit|asphalt|damag/ },
  ];

  for (const r of rules) {
    if (r.re.test(t)) return { categoryId: r.id, confidence: 0.88 };
  }
  return { categoryId: "pothole", confidence: 0.42 };
}
