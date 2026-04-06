'use client';

import { useState } from 'react';
import type { Exercise } from '@/lib/types';

interface Props {
  exercise: Exercise;
  index: number;
}

export default function ExerciseCard({ exercise, index }: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div style={styles.card}>
      <div style={styles.header} onClick={() => setExpanded(!expanded)}>
        <div style={styles.left}>
          <span style={styles.number}>{index + 1}</span>
          <div>
            <div style={styles.name}>{exercise.name}</div>
            <div style={styles.meta}>
              {exercise.sets && <span style={styles.badge}>{exercise.sets} sets</span>}
              {exercise.reps && <span style={styles.badge}>{exercise.reps} reps</span>}
              {exercise.duration && <span style={styles.badge}>{exercise.duration}</span>}
              {exercise.rest && <span style={styles.restBadge}>Rest: {exercise.rest}</span>}
            </div>
          </div>
        </div>
        <div style={styles.right}>
          <span style={styles.muscle}>{exercise.muscleGroup}</span>
          <span style={styles.toggle}>{expanded ? '▲' : '▼'}</span>
        </div>
      </div>
      {expanded && (
        <div style={styles.detail}>
          <p style={styles.instructions}>{exercise.instructions}</p>
          {exercise.tips && (
            <p style={styles.tip}>💡 {exercise.tips}</p>
          )}
        </div>
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  card: {
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '12px',
    overflow: 'hidden'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '14px 16px',
    cursor: 'pointer'
  },
  left: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px'
  },
  number: {
    width: '28px',
    height: '28px',
    background: 'rgba(233,69,96,0.2)',
    border: '1px solid rgba(233,69,96,0.4)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    fontWeight: '700',
    color: '#e94560',
    flexShrink: 0
  },
  name: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#ccd6f6',
    marginBottom: '4px'
  },
  meta: {
    display: 'flex',
    gap: '6px',
    flexWrap: 'wrap'
  },
  badge: {
    padding: '2px 8px',
    background: 'rgba(100,255,218,0.08)',
    border: '1px solid rgba(100,255,218,0.2)',
    borderRadius: '6px',
    fontSize: '11px',
    color: '#64ffda'
  },
  restBadge: {
    padding: '2px 8px',
    background: 'rgba(189,147,249,0.08)',
    border: '1px solid rgba(189,147,249,0.2)',
    borderRadius: '6px',
    fontSize: '11px',
    color: '#bd93f9'
  },
  right: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  muscle: {
    fontSize: '11px',
    color: '#8892b0',
    background: 'rgba(255,255,255,0.05)',
    padding: '3px 8px',
    borderRadius: '6px'
  },
  toggle: {
    color: '#8892b0',
    fontSize: '10px'
  },
  detail: {
    padding: '0 16px 14px 58px',
    borderTop: '1px solid rgba(255,255,255,0.05)'
  },
  instructions: {
    fontSize: '13px',
    color: '#8892b0',
    lineHeight: 1.6,
    paddingTop: '12px'
  },
  tip: {
    fontSize: '12px',
    color: '#f5a623',
    marginTop: '8px',
    fontStyle: 'italic'
  }
};
