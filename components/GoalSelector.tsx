'use client';

import { useState } from 'react';
import type { UserPreferences, FitnessGoal, FitnessLevel, WorkoutDays } from '@/lib/types';

interface Props {
  onGenerate: (prefs: UserPreferences) => void;
  loading: boolean;
}

const goals: { value: FitnessGoal; label: string; icon: string; desc: string }[] = [
  { value: 'weight_loss', label: 'Weight Loss', icon: '🔥', desc: 'Burn fat and calories' },
  { value: 'muscle_gain', label: 'Muscle Gain', icon: '💪', desc: 'Build strength and mass' },
  { value: 'endurance', label: 'Endurance', icon: '🏃', desc: 'Improve stamina and cardio' },
  { value: 'flexibility', label: 'Flexibility', icon: '🧘', desc: 'Stretch and mobility work' },
  { value: 'general_fitness', label: 'General Fitness', icon: '⚡', desc: 'Overall health and wellness' }
];

const levels: { value: FitnessLevel; label: string; desc: string }[] = [
  { value: 'beginner', label: 'Beginner', desc: 'New to working out' },
  { value: 'intermediate', label: 'Intermediate', desc: '1-3 years experience' },
  { value: 'advanced', label: 'Advanced', desc: '3+ years experience' }
];

const daysOptions: { value: WorkoutDays; label: string }[] = [
  { value: 3, label: '3 days/week' },
  { value: 4, label: '4 days/week' },
  { value: 5, label: '5 days/week' },
  { value: 6, label: '6 days/week' }
];

export default function GoalSelector({ onGenerate, loading }: Props) {
  const [goal, setGoal] = useState<FitnessGoal>('general_fitness');
  const [level, setLevel] = useState<FitnessLevel>('beginner');
  const [days, setDays] = useState<WorkoutDays>(3);
  const [equipment, setEquipment] = useState<boolean>(false);

  const handleSubmit = () => {
    onGenerate({ goal, level, daysPerWeek: days, hasEquipment: equipment });
  };

  return (
    <div style={styles.wrapper}>
      <h2 style={styles.sectionTitle}>Build Your Personalized Plan</h2>
      <p style={styles.sectionDesc}>Tell us about yourself and we'll create the perfect workout routine.</p>

      <div style={styles.card}>
        <h3 style={styles.cardTitle}>🎯 What's your goal?</h3>
        <div style={styles.goalGrid}>
          {goals.map((g) => (
            <button
              key={g.value}
              onClick={() => setGoal(g.value)}
              style={{
                ...styles.goalBtn,
                ...(goal === g.value ? styles.goalBtnActive : {})
              }}
            >
              <span style={styles.goalIcon}>{g.icon}</span>
              <span style={styles.goalLabel}>{g.label}</span>
              <span style={styles.goalDesc}>{g.desc}</span>
            </button>
          ))}
        </div>
      </div>

      <div style={styles.card}>
        <h3 style={styles.cardTitle}>📊 Fitness Level</h3>
        <div style={styles.levelGrid}>
          {levels.map((l) => (
            <button
              key={l.value}
              onClick={() => setLevel(l.value)}
              style={{
                ...styles.levelBtn,
                ...(level === l.value ? styles.levelBtnActive : {})
              }}
            >
              <span style={styles.levelLabel}>{l.label}</span>
              <span style={styles.levelDesc}>{l.desc}</span>
            </button>
          ))}
        </div>
      </div>

      <div style={styles.row}>
        <div style={{ ...styles.card, flex: 1 }}>
          <h3 style={styles.cardTitle}>📅 Days Per Week</h3>
          <div style={styles.daysGrid}>
            {daysOptions.map((d) => (
              <button
                key={d.value}
                onClick={() => setDays(d.value)}
                style={{
                  ...styles.dayBtn,
                  ...(days === d.value ? styles.dayBtnActive : {})
                }}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ ...styles.card, flex: 1 }}>
          <h3 style={styles.cardTitle}>🏋️ Equipment</h3>
          <div style={styles.equipGrid}>
            <button
              onClick={() => setEquipment(false)}
              style={{
                ...styles.equipBtn,
                ...(!equipment ? styles.equipBtnActive : {})
              }}
            >
              <span style={styles.equipIcon}>🏠</span>
              <span>No Equipment</span>
              <span style={styles.equipDesc}>Bodyweight only</span>
            </button>
            <button
              onClick={() => setEquipment(true)}
              style={{
                ...styles.equipBtn,
                ...(equipment ? styles.equipBtnActive : {})
              }}
            >
              <span style={styles.equipIcon}>🏋️</span>
              <span>Full Gym</span>
              <span style={styles.equipDesc}>All equipment</span>
            </button>
          </div>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{
          ...styles.generateBtn,
          ...(loading ? styles.generateBtnDisabled : {})
        }}
      >
        {loading ? (
          <span>⏳ Generating your plan...</span>
        ) : (
          <span>🚀 Generate My Workout Plan</span>
        )}
      </button>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  sectionTitle: {
    fontSize: '26px',
    fontWeight: '700',
    color: '#ccd6f6'
  },
  sectionDesc: {
    color: '#8892b0',
    fontSize: '15px',
    marginTop: '4px'
  },
  card: {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '16px',
    padding: '24px'
  },
  cardTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#ccd6f6',
    marginBottom: '16px'
  },
  goalGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
    gap: '12px'
  },
  goalBtn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '6px',
    padding: '16px 12px',
    background: 'rgba(255,255,255,0.03)',
    border: '2px solid rgba(255,255,255,0.08)',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    color: '#8892b0'
  },
  goalBtnActive: {
    border: '2px solid #e94560',
    background: 'rgba(233,69,96,0.1)',
    color: '#e94560'
  },
  goalIcon: {
    fontSize: '28px'
  },
  goalLabel: {
    fontSize: '13px',
    fontWeight: '600'
  },
  goalDesc: {
    fontSize: '11px',
    opacity: 0.7,
    textAlign: 'center'
  },
  levelGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '12px'
  },
  levelBtn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
    padding: '16px',
    background: 'rgba(255,255,255,0.03)',
    border: '2px solid rgba(255,255,255,0.08)',
    borderRadius: '12px',
    cursor: 'pointer',
    color: '#8892b0'
  },
  levelBtnActive: {
    border: '2px solid #f5a623',
    background: 'rgba(245,166,35,0.1)',
    color: '#f5a623'
  },
  levelLabel: {
    fontSize: '14px',
    fontWeight: '600'
  },
  levelDesc: {
    fontSize: '11px',
    opacity: 0.7
  },
  row: {
    display: 'flex',
    gap: '20px',
    flexWrap: 'wrap'
  },
  daysGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '10px'
  },
  dayBtn: {
    padding: '12px',
    background: 'rgba(255,255,255,0.03)',
    border: '2px solid rgba(255,255,255,0.08)',
    borderRadius: '10px',
    cursor: 'pointer',
    color: '#8892b0',
    fontSize: '13px',
    fontWeight: '500'
  },
  dayBtnActive: {
    border: '2px solid #64ffda',
    background: 'rgba(100,255,218,0.1)',
    color: '#64ffda'
  },
  equipGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '12px'
  },
  equipBtn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '6px',
    padding: '16px',
    background: 'rgba(255,255,255,0.03)',
    border: '2px solid rgba(255,255,255,0.08)',
    borderRadius: '12px',
    cursor: 'pointer',
    color: '#8892b0',
    fontSize: '13px',
    fontWeight: '500'
  },
  equipBtnActive: {
    border: '2px solid #bd93f9',
    background: 'rgba(189,147,249,0.1)',
    color: '#bd93f9'
  },
  equipIcon: {
    fontSize: '24px'
  },
  equipDesc: {
    fontSize: '11px',
    opacity: 0.7
  },
  generateBtn: {
    width: '100%',
    padding: '18px',
    background: 'linear-gradient(135deg, #e94560, #f5a623)',
    border: 'none',
    borderRadius: '14px',
    color: '#fff',
    fontSize: '16px',
    fontWeight: '700',
    cursor: 'pointer',
    marginTop: '8px',
    transition: 'opacity 0.2s'
  },
  generateBtnDisabled: {
    opacity: 0.6,
    cursor: 'not-allowed'
  }
};
