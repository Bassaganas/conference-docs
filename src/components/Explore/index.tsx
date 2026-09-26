import React from 'react';

type ExploreProps = {
  title: string;
  href: string;
  source: string;
  children: React.ReactNode;
};

export default function Explore({title, href, source, children}: ExploreProps): React.ReactElement {
  return (
    <div
      style={{
        background: '#f5f3ff',
        border: '2px dashed #8b5cf6',
        borderRadius: '8px',
        margin: '1.5em 0',
        padding: '1em 1.5em',
      }}
    >
      <div style={{alignItems: 'center', display: 'flex', flexWrap: 'wrap', gap: '0.5em', marginBottom: '0.6em'}}>
        <span
          style={{
            background: '#ede9fe',
            border: '1px solid #8b5cf6',
            borderRadius: '999px',
            color: '#5b21b6',
            fontSize: '0.75em',
            fontWeight: 700,
            letterSpacing: '0.04em',
            padding: '0.2em 0.6em',
            textTransform: 'uppercase',
          }}
        >
          Optional · Explore
        </span>
        <b style={{color: '#5b21b6'}}>🔭 {title}</b>
      </div>
      <div style={{fontSize: '0.95em'}}>{children}</div>
      <div style={{marginTop: '0.6em'}}>
        <a href={href} target="_blank" rel="noopener noreferrer" style={{fontWeight: 600}}>
          Open {source} ↗
        </a>
      </div>
    </div>
  );
}
