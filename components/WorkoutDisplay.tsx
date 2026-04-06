'use client';

import type { WorkoutPlan } from '@/lib/types';
import ExerciseCard from './ExerciseCard';

interface Props {
  plan: WorkoutPlan;
  onReset: () => void;
}

export default function WorkoutDisplay({ plan, onReset }: Props) {
  const [activeDay, setActiveDay] = useState(0);

  return (
    <div style={styles.wrapper}>
      <div style={styles.planHeader}>
        <div>
          <h2 style={styles.planTitle}>{plan.title}</h2>
          <p style={styles.planDesc}>{plan.description}</p>
        </div>
        <button onClick={onReset} style={styles.resetBtn}>← New Plan</button>
      </div>

      <div style={styles.statsRow}>
        {plan.stats.map((s) => (
          <div key={s.label} style={styles.statCard}>
            <span style={styles.statValue}>{s.value}</span>
            <span style={styles.statLabel}>{s.label}</span>
          </div>
        ))}
      </div>

      <div style={styles.dayTabs}>
        {plan.days.map((day, i) => (
          <button
            key={i}
            onClick={() => setActiveDay(i)}
            style={{
              ...styles.dayTab,
              ...(activeDay === i ? styles.dayTabActive : {})
            }}
          >
            {day.name}
          </button>
        ))}
      </div>

      {plan.days[activeDay] && (
        <div style={styles.dayContent}>
          <div style={styles.dayMeta}>
            <span style={styles.dayBadge}>{plan.days[activeDay].focus}</span>
            <span style={styles.dayDuration}>⏱ {plan.days[activeDay].duration}</span>
          </div>
          <div style={styles.exerciseList}>
            {plan.days[activeDay].exercises.map((ex, idx) => (
              <ExerciseCard key={idx} exercise={ex} index={idx} />
            ))}
          </div>
        </div>
      )}

      <div style={styles.tipsCard}>
        <h3 style={styles.tipsTitle}>💡 Pro Tips</h3>
        <ul style={styles.tipsList}>
          {plan.tips.map((tip, i) => (
            <li key={i} style={styles.tipItem}>{tip}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

import { useState } from 'react';

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  },
  planHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    gap: '16px'
  },
  planTitle: {
    fontSize: '24px',
    fontWeight: '800',
    color: '#ccd6f6'
  },
  planDesc: {
    color: '#8892b0',
    marginTop: '4px',
    fontSize: '14px'
  },
  resetBtn: {
    padding: '10px 20px',
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: '10px',
    color: '#ccd6f6',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    whiteSpace: 'nowrap'
  },
  statsRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
    gap: '12px'
  },
  statCard: {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '12px',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px'
  },
  statValue: {
    fontSize: '22px',
    fontWeight: '700',
    color: '#e94560'
  },
  statLabel: {
    fontSize: '12px',
    color: '#8892b0',
    textAlign: 'center'
  },
  dayTabs: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap'
  },
  dayTab: {
    padding: '10px 18px',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '10px',
    color: '#8892b0',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: '500',
    transition: 'all 0.2s'
  },
  dayTabActive: {
    background: 'rgba(233,69,96,0.15)',
    border: '1px solid #e94560',
    color: '#e94560'
  },
  dayContent: {
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: '16px',
    padding: '24px'
  },
  dayMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '20px'
  },
  dayBadge: {
    padding: '4px 12px',
    background: 'rgba(100,255,218,0.1)',
    border: '1px solid rgba(100,255,218,0.3)',
    borderRadius: '20px',
    color: '#64ffda',
    fontSize: '12px',
    fontWeight: '600'
  },
  dayDuration: {
    color: '#8892b0',
    fontSize: '13px'
  },
  exerciseList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  tipsCard: {
    background: 'rgba(245,166,35,0.05)',
    border: '1px solid rgba(245,166,35,0.2)',
    borderRadius: '16px',
    padding: '24px'
  },
  tipsTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#f5a623',
    marginBottom: '12px'
  },
  tipsList: {
    paddingLeft: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  tipItem: {
    color: '#8892b0',
    fontSize: '14px',
    lineHeight: 1.5
  }
};
