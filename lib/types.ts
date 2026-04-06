export type FitnessGoal = 'weight_loss' | 'muscle_gain' | 'endurance' | 'flexibility' | 'general_fitness';
export type FitnessLevel = 'beginner' | 'intermediate' | 'advanced';
export type WorkoutDays = 3 | 4 | 5 | 6;

export interface UserPreferences {
  goal: FitnessGoal;
  level: FitnessLevel;
  daysPerWeek: WorkoutDays;
  hasEquipment: boolean;
}

export interface Exercise {
  name: string;
  sets?: number;
  reps?: string;
  duration?: string;
  rest?: string;
  muscleGroup: string;
  instructions: string;
  tips?: string;
}

export interface WorkoutDay {
  name: string;
  focus: string;
  duration: string;
  exercises: Exercise[];
}

export interface PlanStat {
  label: string;
  value: string;
}

export interface WorkoutPlan {
  title: string;
  description: string;
  stats: PlanStat[];
  days: WorkoutDay[];
  tips: string[];
}
