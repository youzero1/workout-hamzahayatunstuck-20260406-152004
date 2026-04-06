import type { UserPreferences, WorkoutPlan, WorkoutDay, Exercise } from './types';

const exerciseDatabase: Record<string, Exercise[]> = {
  chest_bw: [
    { name: 'Push-Ups', sets: 3, reps: '10-15', rest: '60s', muscleGroup: 'Chest', instructions: 'Start in a high plank position. Lower your chest to the floor, keeping elbows at 45 degrees. Push back up.', tips: 'Keep your core tight throughout the movement.' },
    { name: 'Wide Push-Ups', sets: 3, reps: '10-12', rest: '60s', muscleGroup: 'Chest', instructions: 'Place hands wider than shoulder-width. Lower chest to ground and push back up.', tips: 'Focus on squeezing the chest at the top.' },
    { name: 'Diamond Push-Ups', sets: 3, reps: '8-12', rest: '60s', muscleGroup: 'Triceps/Chest', instructions: 'Place hands close together forming a diamond shape. Lower chest to hands and push up.', tips: 'Great for targeting the inner chest and triceps.' }
  ],
  chest_gym: [
    { name: 'Barbell Bench Press', sets: 4, reps: '8-12', rest: '90s', muscleGroup: 'Chest', instructions: 'Lie on bench, grip bar slightly wider than shoulders. Lower to chest, press up explosively.', tips: 'Keep feet flat on the floor for stability.' },
    { name: 'Dumbbell Flyes', sets: 3, reps: '10-12', rest: '75s', muscleGroup: 'Chest', instructions: 'Lie on bench with dumbbells extended above chest. Lower arms in arc motion, return to start.', tips: 'Maintain a slight bend in the elbows throughout.' },
    { name: 'Incline Dumbbell Press', sets: 3, reps: '10-12', rest: '75s', muscleGroup: 'Upper Chest', instructions: 'Set bench to 30-45 degrees. Press dumbbells from chest level up and slightly together.', tips: 'The incline targets the upper chest more effectively.' }
  ],
  back_bw: [
    { name: 'Superman Hold', sets: 3, reps: '12-15', rest: '45s', muscleGroup: 'Back', instructions: 'Lie face down, extend arms forward. Lift arms and legs simultaneously, hold briefly.', tips: 'Squeeze your glutes and back muscles at the top.' },
    { name: 'Reverse Snow Angels', sets: 3, reps: '12', rest: '45s', muscleGroup: 'Upper Back', instructions: 'Lie face down, arms at sides. Move arms in arc motion above your head and back.', tips: 'Keep arms slightly off the ground throughout.' },
    { name: 'Doorframe Rows', sets: 3, reps: '10-12', rest: '60s', muscleGroup: 'Back/Biceps', instructions: 'Grip a doorframe or sturdy surface, lean back, then pull yourself toward it.', tips: 'Keep body straight like a plank while pulling.' }
  ],
  back_gym: [
    { name: 'Barbell Deadlift', sets: 4, reps: '5-8', rest: '120s', muscleGroup: 'Full Back', instructions: 'Stand with feet hip-width, grip bar. Keep back flat, drive hips forward as you stand.', tips: 'The deadlift is a full-body movement — brace your core.' },
    { name: 'Pull-Ups', sets: 3, reps: '6-10', rest: '90s', muscleGroup: 'Back/Biceps', instructions: 'Hang from bar, pull yourself up until chin clears bar. Lower slowly.', tips: 'Initiate the movement by depressing your shoulder blades.' },
    { name: 'Seated Cable Row', sets: 3, reps: '10-12', rest: '75s', muscleGroup: 'Mid Back', instructions: 'Sit at cable machine, pull handle to lower chest, squeezing shoulder blades together.', tips: 'Avoid using momentum — control the movement.' }
  ],
  legs_bw: [
    { name: 'Bodyweight Squat', sets: 3, reps: '15-20', rest: '60s', muscleGroup: 'Quads/Glutes', instructions: 'Stand feet shoulder-width. Lower until thighs are parallel to floor, drive back up.', tips: 'Keep your chest up and knees tracking over toes.' },
    { name: 'Reverse Lunges', sets: 3, reps: '10 each leg', rest: '60s', muscleGroup: 'Quads/Glutes', instructions: 'Step backward, lower back knee toward floor. Push through front heel to return.', tips: 'Keep torso upright and front knee stable.' },
    { name: 'Glute Bridges', sets: 3, reps: '15-20', rest: '45s', muscleGroup: 'Glutes/Hamstrings', instructions: 'Lie on back, feet flat. Drive hips up by squeezing glutes, hold briefly, lower.', tips: 'Pause at the top for maximum glute activation.' },
    { name: 'Wall Sit', sets: 3, duration: '30-45s', rest: '60s', muscleGroup: 'Quads', instructions: 'Lean against wall, slide down until thighs are parallel to floor. Hold.', tips: 'Keep your back flat against the wall.' }
  ],
  legs_gym: [
    { name: 'Barbell Back Squat', sets: 4, reps: '8-10', rest: '120s', muscleGroup: 'Quads/Glutes', instructions: 'Bar on upper traps, squat down until thighs parallel, drive through heels to stand.', tips: 'Brace your core before descending.' },
    { name: 'Romanian Deadlift', sets: 3, reps: '10-12', rest: '90s', muscleGroup: 'Hamstrings/Glutes', instructions: 'Hold bar, hinge at hips keeping back flat, lower bar along legs, return to stand.', tips: 'Feel the stretch in your hamstrings at the bottom.' },
    { name: 'Leg Press', sets: 3, reps: '12-15', rest: '75s', muscleGroup: 'Quads', instructions: 'Sit in machine, place feet shoulder-width. Push platform away, lower slowly.', tips: 'Do not lock out your knees at the top.' },
    { name: 'Calf Raises', sets: 4, reps: '15-20', rest: '45s', muscleGroup: 'Calves', instructions: 'Stand on edge of step or flat ground. Rise onto toes, lower slowly.', tips: 'Full range of motion — stretch at the bottom.' }
  ],
  shoulders_bw: [
    { name: 'Pike Push-Ups', sets: 3, reps: '8-12', rest: '60s', muscleGroup: 'Shoulders', instructions: 'Form an inverted V with hips high. Lower head toward floor, push back up.', tips: 'The more vertical your body, the more shoulder-focused it becomes.' },
    { name: 'Arm Circles', sets: 3, duration: '30s each direction', rest: '30s', muscleGroup: 'Shoulders', instructions: 'Extend arms out to sides. Make small to large circles in both directions.', tips: 'Great as a warm-up or for shoulder mobility.' }
  ],
  shoulders_gym: [
    { name: 'Overhead Press', sets: 4, reps: '8-10', rest: '90s', muscleGroup: 'Shoulders', instructions: 'Stand with bar at shoulder height. Press overhead until arms fully extended, lower slowly.', tips: 'Avoid arching your lower back — brace your core.' },
    { name: 'Lateral Raises', sets: 3, reps: '12-15', rest: '60s', muscleGroup: 'Side Delts', instructions: 'Hold dumbbells at sides. Raise arms to shoulder height, lower slowly.', tips: 'Use lighter weight and focus on the squeeze.' },
    { name: 'Face Pulls', sets: 3, reps: '15-20', rest: '60s', muscleGroup: 'Rear Delts', instructions: 'Set cable at face height, pull toward face with elbows high and wide.', tips: 'Essential for shoulder health and posture.' }
  ],
  arms_bw: [
    { name: 'Tricep Dips (Chair)', sets: 3, reps: '10-15', rest: '60s', muscleGroup: 'Triceps', instructions: 'Place hands on chair behind you, lower body by bending elbows, push back up.', tips: 'Keep your back close to the chair.' },
    { name: 'Chin-Ups', sets: 3, reps: '6-10', rest: '90s', muscleGroup: 'Biceps/Back', instructions: 'Hang from bar with palms facing you. Pull up until chin clears bar.', tips: 'Supinated grip emphasizes the biceps more.' }
  ],
  arms_gym: [
    { name: 'Barbell Curl', sets: 3, reps: '10-12', rest: '60s', muscleGroup: 'Biceps', instructions: 'Hold bar with underhand grip, curl to shoulders, lower slowly.', tips: 'Keep elbows pinned at your sides.' },
    { name: 'Skull Crushers', sets: 3, reps: '10-12', rest: '60s', muscleGroup: 'Triceps', instructions: 'Lie on bench, hold bar above chest. Bend elbows lowering bar to forehead, extend back up.', tips: 'Move only at the elbows — keep upper arms still.' },
    { name: 'Hammer Curls', sets: 3, reps: '10-12', rest: '60s', muscleGroup: 'Biceps/Forearms', instructions: 'Hold dumbbells with neutral grip, curl up keeping palms facing each other.', tips: 'Great for building forearm and brachialis.' }
  ],
  core_bw: [
    { name: 'Plank', sets: 3, duration: '30-60s', rest: '45s', muscleGroup: 'Core', instructions: 'Forearms on floor, body in straight line from head to heels. Hold.', tips: 'Do not let hips sag or pike up.' },
    { name: 'Crunches', sets: 3, reps: '15-20', rest: '45s', muscleGroup: 'Abs', instructions: 'Lie on back, knees bent. Curl shoulders off floor toward knees, lower slowly.', tips: 'Exhale as you crunch up.' },
    { name: 'Bicycle Crunches', sets: 3, reps: '20 total', rest: '45s', muscleGroup: 'Obliques', instructions: 'Lie on back, alternate bringing elbow to opposite knee in cycling motion.', tips: 'Slow and controlled beats fast and sloppy.' },
    { name: 'Mountain Climbers', sets: 3, duration: '30s', rest: '30s', muscleGroup: 'Core/Cardio', instructions: 'High plank position, drive knees alternately toward chest at pace.', tips: 'Keep hips level and core engaged.' }
  ],
  cardio_bw: [
    { name: 'Jumping Jacks', sets: 3, duration: '45s', rest: '30s', muscleGroup: 'Full Body', instructions: 'Jump feet out while raising arms overhead, return to start. Repeat.', tips: 'Land softly to reduce joint impact.' },
    { name: 'High Knees', sets: 3, duration: '30s', rest: '30s', muscleGroup: 'Cardio/Core', instructions: 'Run in place driving knees as high as possible with each step.', tips: 'Pump your arms to increase intensity.' },
    { name: 'Burpees', sets: 3, reps: '8-10', rest: '60s', muscleGroup: 'Full Body', instructions: 'Squat down, kick feet back to plank, do push-up, jump feet forward, jump up.', tips: 'Scale by removing the push-up or jump.' },
    { name: 'Jump Rope (or Simulate)', sets: 4, duration: '60s', rest: '30s', muscleGroup: 'Cardio', instructions: 'Jump rope or simulate the motion by jumping in place with wrist rotations.', tips: 'Great low-impact cardio option.' }
  ],
  cardio_gym: [
    { name: 'Treadmill Run', sets: 1, duration: '20-30 min', rest: 'N/A', muscleGroup: 'Cardio', instructions: 'Run at moderate pace (60-70% max HR) for duration.', tips: 'Maintain conversational pace for fat burning.' },
    { name: 'Rowing Machine', sets: 4, duration: '4 min', rest: '1 min', muscleGroup: 'Full Body Cardio', instructions: 'Row at steady pace, focusing on leg drive and arm pull.', tips: '60% legs, 20% lean back, 20% arm pull.' },
    { name: 'Stationary Bike Intervals', sets: 8, duration: '30s hard / 30s easy', rest: 'N/A', muscleGroup: 'Cardio', instructions: 'Alternate between high intensity and recovery pace on stationary bike.', tips: 'HIIT intervals burn more calories in less time.' }
  ],
  yoga_bw: [
    { name: 'Downward Dog', sets: 1, duration: '60s', rest: '15s', muscleGroup: 'Full Body Stretch', instructions: 'Form inverted V, press heels toward floor, spread fingers wide, breathe deeply.', tips: 'Pedal feet to deepen hamstring stretch.' },
    { name: 'Pigeon Pose', sets: 1, duration: '60s each side', rest: '15s', muscleGroup: 'Hips/Glutes', instructions: 'Bring one knee forward behind wrist, extend other leg back. Fold forward gently.', tips: 'Use a pillow under hip if needed.' },
    { name: 'Cat-Cow Stretch', sets: 3, reps: '10 cycles', rest: '15s', muscleGroup: 'Spine', instructions: 'On hands and knees, alternate arching and rounding spine with breath.', tips: 'Move slowly and match breath to movement.' },
    { name: "Child's Pose", sets: 1, duration: '60-90s', rest: 'N/A', muscleGroup: 'Back/Hips', instructions: 'Kneel and sit back on heels, extend arms forward, rest forehead on floor.', tips: 'Perfect recovery and relaxation pose.' },
    { name: 'Warrior I', sets: 1, duration: '45s each side', rest: '15s', muscleGroup: 'Legs/Core', instructions: 'Lunge forward, back foot at 45 degrees, raise arms overhead, square hips forward.', tips: 'Ground through the outer edge of the back foot.' }
  ]
};

function getKey(group: string, hasEquipment: boolean): string {
  return `${group}_${hasEquipment ? 'gym' : 'bw'}`;
}

function getExercises(group: string, hasEquipment: boolean, count: number): Exercise[] {
  const key = getKey(group, hasEquipment);
  const fallbackKey = getKey(group, false);
  const pool = exerciseDatabase[key] || exerciseDatabase[fallbackKey] || [];
  return pool.slice(0, count);
}

function scaleForLevel(exercises: Exercise[], level: string): Exercise[] {
  return exercises.map((ex) => {
    if (level === 'beginner') {
      return { ...ex, sets: ex.sets ? Math.max(2, ex.sets - 1) : ex.sets };
    } else if (level === 'advanced') {
      return { ...ex, sets: ex.sets ? ex.sets + 1 : ex.sets };
    }
    return ex;
  });
}

export function generateWorkout(prefs: UserPreferences): WorkoutPlan {
  const { goal, level, daysPerWeek, hasEquipment } = prefs;

  const goalTitles: Record<string, string> = {
    weight_loss: 'Fat Burning & Conditioning Plan',
    muscle_gain: 'Strength & Hypertrophy Plan',
    endurance: 'Endurance & Stamina Plan',
    flexibility: 'Flexibility & Mobility Plan',
    general_fitness: 'Complete Fitness Plan'
  };

  const goalDescs: Record<string, string> = {
    weight_loss: 'High-intensity circuits designed to maximize calorie burn and boost metabolism.',
    muscle_gain: 'Progressive overload training to build lean muscle mass and increase strength.',
    endurance: 'Cardio-focused sessions to improve cardiovascular health and stamina.',
    flexibility: 'Yoga and stretching routines to improve mobility and reduce injury risk.',
    general_fitness: 'Balanced mix of strength, cardio, and flexibility for overall wellness.'
  };

  const days: WorkoutDay[] = [];

  if (goal === 'flexibility') {
    const dayNames = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6'];
    for (let i = 0; i < daysPerWeek; i++) {
      const yogaExercises = scaleForLevel(getExercises('yoga', false, 5), level);
      days.push({
        name: dayNames[i],
        focus: i % 2 === 0 ? 'Full Body Flow' : 'Deep Stretch',
        duration: '45-60 min',
        exercises: yogaExercises
      });
    }
  } else if (goal === 'endurance') {
    const dayNames = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6'];
    for (let i = 0; i < daysPerWeek; i++) {
      const cardioEx = scaleForLevel(getExercises('cardio', hasEquipment, 4), level);
      const coreEx = scaleForLevel(getExercises('core', false, 2), level);
      days.push({
        name: dayNames[i],
        focus: i % 2 === 0 ? 'Cardio Intervals' : 'Steady State + Core',
        duration: '45-60 min',
        exercises: i % 2 === 0 ? cardioEx : [...cardioEx.slice(0, 2), ...coreEx]
      });
    }
  } else if (goal === 'weight_loss') {
    const splits: WorkoutDay[] = [
      { name: 'Day 1', focus: 'Upper Body + Cardio', duration: '50-60 min', exercises: scaleForLevel([...getExercises('chest', hasEquipment, 2), ...getExercises('back', hasEquipment, 2), ...getExercises('cardio', hasEquipment, 2)], level) },
      { name: 'Day 2', focus: 'Lower Body + Cardio', duration: '50-60 min', exercises: scaleForLevel([...getExercises('legs', hasEquipment, 3), ...getExercises('cardio', hasEquipment, 2)], level) },
      { name: 'Day 3', focus: 'Core & HIIT', duration: '40-50 min', exercises: scaleForLevel([...getExercises('core', false, 3), ...getExercises('cardio', hasEquipment, 3)], level) },
      { name: 'Day 4', focus: 'Full Body Circuit', duration: '50-60 min', exercises: scaleForLevel([...getExercises('chest', hasEquipment, 1), ...getExercises('legs', hasEquipment, 2), ...getExercises('shoulders', hasEquipment, 1), ...getExercises('cardio', hasEquipment, 2)], level) },
      { name: 'Day 5', focus: 'Arms + Cardio', duration: '45-55 min', exercises: scaleForLevel([...getExercises('arms', hasEquipment, 3), ...getExercises('cardio', hasEquipment, 3)], level) },
      { name: 'Day 6', focus: 'Active Recovery', duration: '30-40 min', exercises: scaleForLevel(getExercises('yoga', false, 4), level) }
    ];
    for (let i = 0; i < daysPerWeek; i++) {
      days.push(splits[i]);
    }
  } else if (goal === 'muscle_gain') {
    const splits: WorkoutDay[] = [
      { name: 'Day 1', focus: 'Chest & Triceps', duration: '60-75 min', exercises: scaleForLevel([...getExercises('chest', hasEquipment, 3), ...getExercises('arms', hasEquipment, 2)], level) },
      { name: 'Day 2', focus: 'Back & Biceps', duration: '60-75 min', exercises: scaleForLevel([...getExercises('back', hasEquipment, 3), ...getExercises('arms', hasEquipment, 2)], level) },
      { name: 'Day 3', focus: 'Legs & Glutes', duration: '60-75 min', exercises: scaleForLevel(getExercises('legs', hasEquipment, 4), level) },
      { name: 'Day 4', focus: 'Shoulders & Core', duration: '55-65 min', exercises: scaleForLevel([...getExercises('shoulders', hasEquipment, 3), ...getExercises('core', false, 3)], level) },
      { name: 'Day 5', focus: 'Full Body Power', duration: '65-75 min', exercises: scaleForLevel([...getExercises('chest', hasEquipment, 2), ...getExercises('back', hasEquipment, 2), ...getExercises('legs', hasEquipment, 2)], level) },
      { name: 'Day 6', focus: 'Arms & Core', duration: '50-60 min', exercises: scaleForLevel([...getExercises('arms', hasEquipment, 3), ...getExercises('core', false, 3)], level) }
    ];
    for (let i = 0; i < daysPerWeek; i++) {
      days.push(splits[i]);
    }
  } else {
    const splits: WorkoutDay[] = [
      { name: 'Day 1', focus: 'Upper Body', duration: '50-60 min', exercises: scaleForLevel([...getExercises('chest', hasEquipment, 2), ...getExercises('back', hasEquipment, 2), ...getExercises('shoulders', hasEquipment, 1)], level) },
      { name: 'Day 2', focus: 'Lower Body', duration: '50-60 min', exercises: scaleForLevel(getExercises('legs', hasEquipment, 4), level) },
      { name: 'Day 3', focus: 'Cardio & Core', duration: '45-55 min', exercises: scaleForLevel([...getExercises('cardio', hasEquipment, 3), ...getExercises('core', false, 3)], level) },
      { name: 'Day 4', focus: 'Full Body', duration: '55-65 min', exercises: scaleForLevel([...getExercises('chest', hasEquipment, 1), ...getExercises('back', hasEquipment, 1), ...getExercises('legs', hasEquipment, 2), ...getExercises('core', false, 2)], level) },
      { name: 'Day 5', focus: 'Arms & Shoulders', duration: '45-55 min', exercises: scaleForLevel([...getExercises('arms', hasEquipment, 3), ...getExercises('shoulders', hasEquipment, 2)], level) },
      { name: 'Day 6', focus: 'Flexibility & Recovery', duration: '40-50 min', exercises: scaleForLevel(getExercises('yoga', false, 5), level) }
    ];
    for (let i = 0; i < daysPerWeek; i++) {
      days.push(splits[i]);
    }
  }

  const totalExercises = days.reduce((sum, d) => sum + d.exercises.length, 0);
  const avgDuration = goal === 'flexibility' ? '45-60' : goal === 'endurance' ? '45-60' : '55-65';

  const tipsByGoal: Record<string, string[]> = {
    weight_loss: [
      'Maintain a caloric deficit of 300-500 calories per day for steady fat loss.',
      'Stay hydrated — aim for 8-10 glasses of water daily.',
      'Prioritize protein (0.8-1g per lb bodyweight) to preserve muscle while losing fat.',
      'Get 7-9 hours of sleep — poor sleep increases cortisol and fat storage.',
      'Track your workouts and celebrate non-scale victories.'
    ],
    muscle_gain: [
      'Progressive overload is key — increase weight or reps each week.',
      'Eat in a caloric surplus of 200-300 calories with high protein intake.',
      'Allow 48 hours between training the same muscle group.',
      'Focus on compound movements for maximum muscle stimulation.',
      'Consistency over months beats intensity over days.'
    ],
    endurance: [
      'Build volume gradually — increase weekly mileage/duration by no more than 10%.',
      'Include easy recovery days between hard sessions.',
      'Fuel properly before and after long sessions with carbohydrates.',
      'Cross-train to reduce injury risk and improve overall fitness.',
      'Track your heart rate to ensure you train in the right zones.'
    ],
    flexibility: [
      'Never stretch cold muscles — always warm up first.',
      'Hold stretches for 30-60 seconds for maximum benefit.',
      'Breathe deeply and relax into each stretch — never force it.',
      'Consistency is key — daily stretching beats occasional long sessions.',
      'Yoga improves not just flexibility but also balance and mental clarity.'
    ],
    general_fitness: [
      'Balance is key — do not neglect any aspect of fitness.',
      'Listen to your body and take rest days when needed.',
      'Nutrition is 70% of your results — fuel your body well.',
      'Track your progress with photos, measurements, or performance metrics.',
      'Find activities you enjoy to make fitness a sustainable lifestyle.'
    ]
  };

  return {
    title: goalTitles[goal] || 'Custom Workout Plan',
    description: goalDescs[goal] || 'A personalized plan built for your goals.',
    stats: [
      { label: 'Days/Week', value: `${daysPerWeek}` },
      { label: 'Total Exercises', value: `${totalExercises}` },
      { label: 'Avg Duration', value: `${avgDuration} min` },
      { label: 'Level', value: level.charAt(0).toUpperCase() + level.slice(1) },
      { label: 'Equipment', value: hasEquipment ? 'Gym' : 'Bodyweight' }
    ],
    days,
    tips: tipsByGoal[goal] || tipsByGoal['general_fitness']
  };
}
