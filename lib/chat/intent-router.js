/**
 * Intent classification and routing
 */

export function classifyIntent(message) {
  const msg = message.toLowerCase().trim()

  // Audit request keywords
  if (msg.match(/\baudit\b|\bcheck\b|\bscan\b|\banalyze.*website\b|\breview.*website\b/i)) {
    return 'audit_request'
  }

  // Socialsect info keywords
  if (msg.match(/\bwhat.*do.*you.*do\b|\bservices\b|\bprocess\b|\bindustries\b|\bresults\b|\bcase\s*studies\b|\bpricing\b|\bteam\b|\babout.*socialsect\b|\btell.*me.*about\b/i)) {
    return 'socialsect_info'
  }

  // Healthcare marketing questions
  if (msg.match(/\bhow\b.*\b(spend|budget|invest|advertise|market|get.*patients|acquire.*patients|grow|improve)\b|\bwhat\b.*\b(strategy|approach|should|can)\b.*\b(practice|clinic|dentist|doctor)\b|patient\s+(acquisition|generation|flow)|website\s+(optimization|performance|conversion)|healthcare\s+marketing|social\s+media.*healthcare|google\s+ads.*healthcare/i)) {
    return 'healthcare_marketing_question'
  }

  // Default to casual chat
  return 'casual_chat'
}
