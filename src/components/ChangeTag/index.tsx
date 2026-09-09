import React from 'react';

type ChangeTagProps = {
  kind: 'new' | 'changed';
};

const colors = {
  new: {
    background: '#dcfce7',
    border: '#16a34a',
    color: '#166534',
  },
  changed: {
    background: '#dbeafe',
    border: '#2563eb',
    color: '#1e40af',
  },
};

export default function ChangeTag({kind}: ChangeTagProps): React.ReactElement {
  const color = colors[kind];

  return (
    <span
      aria-label={`${kind} in the Dify 1.16.1 workshop`}
      style={{
        background: color.background,
        border: `1px solid ${color.border}`,
        borderRadius: '999px',
        color: color.color,
        display: 'inline-block',
        fontSize: '0.68em',
        fontWeight: 700,
        letterSpacing: '0.04em',
        lineHeight: 1,
        marginLeft: '0.55em',
        padding: '0.32em 0.55em',
        textTransform: 'lowercase',
        verticalAlign: 'middle',
      }}
    >
      {kind}
    </span>
  );
}
