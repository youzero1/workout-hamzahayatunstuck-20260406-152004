'use client';

import { useState } from 'react';
import GoalSelector from './GoalSelector';
import WorkoutDisplay from './WorkoutDisplay';
import { generateWorkout } from '@/lib/workoutGenerator';
import type { WorkoutPlan, UserPreferences } from '@/lib/types';

export default function WorkoutPlanner() {
  const [plan, setPlan] = useState<WorkoutPlan | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = (prefs: UserPreferences) => {
    setLoading(true);
    setTimeout(() => {
      const workout = generateWorkout(prefs);
      setPlan(workout);
      setLoading(false);
    }, 800);
  };

  const handleReset = () => {
    setPlan(null);
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.headerInner}>
          <div style={styles.logo}>
            <span style={styles.logoIcon}>💪</span>
            <span style={styles.logoText}>WorkoutPlanner</span>
          </div>
          <p style={styles.tagline}>Personalized routines for your goals</p>
        </div>
      </header>

      <div style={styles.content}>
        {!plan ? (
          <GoalSelector onGenerate={handleGenerate} loading={loading} />
        ) : (
          <WorkoutDisplay plan={plan} onReset={handleReset} />
        )}
      </div>

      <footer style={styles.footer}>
        <p>© 2024 WorkoutPlanner — Train Smart, Live Better</p>
      </footer>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column'
  },
  header: {
    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    borderBottom: '1px solid rgba(255,255,255,0.08)',
    padding: '24px 0'
  },
  headerInner: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '0 24px',
    textAlign: 'center'
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    marginBottom: '8px'
  },
  logoIcon: {
    fontSize: '36px'
  },
  logoText: {
    fontSize: '28px',
    fontWeight: '800',
    background: 'linear-gradient(90deg, #e94560, #f5a623)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  },
  tagline: {
    color: '#8892b0',
    fontSize: '15px'
  },
  content: {
    flex: 1,
    maxWidth: '900px',
    margin: '0 auto',
    padding: '40px 24px',
    width: '100%'
  },
  footer: {
    textAlign: 'center',
    padding: '20px',
    color: '#4a4a6a',
    fontSize: '13px',
    borderTop: '1px solid rgba(255,255,255,0.05)'
  }
};
