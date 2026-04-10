

export type ConceptScaling = "proportional" | "cap";
export type FormatLevels = 1 | 2 | 3;
export type CoherenceLevels = 1 | 2 | 3;
export type Points = number;

/**
 * Grade calculation:
 *
 * grade = clamp(starting_vote, 10,
 *   starting_vote
 *   + concept_score(required)
 *   + concept_score(non_required)
 *   + criteria_adj
 *   + coherence_bonus
 *   + manual_bonus
 * )
 *
 * concept_score(required):
 *   raw = count(present) * is_present + sum(satisfied_booleans) * boolean_answer
 *   if scaling == "proportional": score = (raw / max_possible) ^ gamma * cap.max
 *   if scaling == "cap":          score = min(raw, cap.max)
 *
 * concept_score(non_required):
 *   raw = count(present) * is_present + sum(satisfied_booleans) * boolean_answer
 *   score = min(raw, cap)
 *
 * criteria_adj:
 *   for each BooleanQ: boolean_answer_weight * booleanq.severity * severity_multiplier
 *
 * coherence_bonus: coherence_map[level]
 *
 * Result is rounded to nearest 0.5, clamped to [starting_vote, 10].
 */


export interface GradeParams {
  starting_vote: Points;
  concepts: {
    required: {
      scaling: ConceptScaling;
      cap: {
        max: Points;
      };
      gamma_curve: {
        gamma: number;
      };
      weights: {
        is_present: Points;
        boolean_answer: Points;
      };
    };
    non_required: {
      cap: Points;
      weights: {
        is_present: Points;
        boolean_answer: Points;
      };
    };
  },
  criteria: {
    boolean_answer_weight: Points;
    severity_multiplier: number;
  },
  coherence_map: Record<CoherenceLevels, number>;
}
