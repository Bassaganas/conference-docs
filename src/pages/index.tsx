import type { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';
import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';

import styles from './index.module.css';

function ImperfectStarSVG({ color, size }: { color: string; size: number }) {
  // Generate a star with slightly randomized points
  const points = [];
  const cx = 12, cy = 12, r1 = 10, r2 = 4.5;
  for (let i = 0; i < 10; i++) {
    const angle = (i / 10) * 2 * Math.PI - Math.PI / 2;
    const r = i % 2 === 0 ? r1 + Math.random() * 2 - 1 : r2 + Math.random() * 1.2 - 0.6;
    const x = cx + Math.cos(angle) * r;
    const y = cy + Math.sin(angle) * r;
    points.push(`${x},${y}`);
  }
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      style={{ display: 'block' }}
    >
      <polygon
        points={points.join(' ')}
        fill={color}
        opacity="0.92"
        filter={`drop-shadow(0 0 8px ${color}) drop-shadow(0 0 16px #fffce7)`}
      />
    </svg>
  );
}

function SparkleOverlay({ show, width, height }: { show: boolean, width: number, height: number }) {
  if (!show || !width || !height) return null;
  const N = 14; // number of sparkles
  const sparkleColors = ['#eab410', '#fffce7', '#7c3aed'];
  const sparkles = Array.from({ length: N }).map((_, i) => {
    const angle = (i / N) * 2 * Math.PI;
    // Closer to button
    const rx = width / 2 + 2;
    const ry = height / 2 + 2;
    const x = Math.cos(angle) * rx + width / 2;
    const y = Math.sin(angle) * ry + height / 2;
    // Alternate between star and glow
    const type = i % 4 === 0 ? 'star' : 'glow';
    const color = sparkleColors[i % sparkleColors.length];
    const size = type === 'star' ? Math.random() * 6 + 10 : Math.random() * 5 + 7;
    const sparkleShadow = `0 0 8px 2px ${color}, 0 0 16px 4px #fffce7`;
    return (
      <span
        key={i}
        style={{
          position: 'absolute',
          left: x - size / 2,
          top: y - size / 2,
          width: size,
          height: size,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
          animation: 'sparkle-float 1.2s infinite',
          animationDelay: `${i * 0.09}s`,
        }}
      >
        {type === 'star' ? (
          <ImperfectStarSVG color={color} size={size} />
        ) : (
          <span
            style={{
              width: size,
              height: size,
              background: `radial-gradient(circle, ${color} 70%, transparent 100%)`,
              borderRadius: '50%',
              opacity: 0.92,
              boxShadow: sparkleShadow,
              display: 'block',
            }}
          />
        )}
      </span>
    );
  });
  return (
    <span style={{
      position: 'absolute',
      left: 0,
      top: 0,
      width: width,
      height: height,
      pointerEvents: 'none',
      zIndex: 10,
      overflow: 'visible',
      display: 'block',
    }}>
      {sparkles}
      <style>{`
        @keyframes sparkle-float {
          0% { transform: scale(1) translateY(0); opacity: 0.95; }
          50% { transform: scale(1.15) translateY(-5px); opacity: 1; }
          100% { transform: scale(1) translateY(0); opacity: 0.95; }
        }
      `}</style>
    </span>
  );
}

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  const [hover, setHover] = useState(false);
  const [btnSize, setBtnSize] = useState({ width: 0, height: 0 });
  const btnRef = useRef<HTMLAnchorElement>(null);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useLayoutEffect(() => {
    if (btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      setBtnSize({ width: rect.width, height: rect.height });
    }
  }, [hover]);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch('https://connect.mailerlite.com/api/subscribers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiNWFjZTI1MjgwNWI1OWU5N2YxOGNlMTk3M2QyNzc2NWQ3OTQxNDBiY2U3YjIyNGE2MTc4OTU3NjU2YWVhZmJhYWI5YzA2YTlkNzY0NTcyYzMiLCJpYXQiOjE3NjA4MDQ5MTkuNjgxNjg1LCJuYmYiOjE3NjA4MDQ5MTkuNjgxNjg3LCJleHAiOjQ5MTY0Nzg1MTkuNjc3NzI0LCJzdWIiOiIxODgxNzQ2Iiwic2NvcGVzIjpbXX0.cA7u1WV7ieibBc0LJVnevydYINX5bN5282YgeTkUGllf851A8I3snb8hXwQwJ7f-biNnXYEG8noG79cjWNzzNDFX3FMfkgUUSsG6V8Dvt2LzxZ9RbumXZ4hcHCb-HZ-eraZDBgg_LULbZG6IJ26AEVQ3NW3xjVjEW4xI4VhFD6Axtujf1TVTeW841hYCSD8UgQ9NpARDZ5wr4Xe9k8cKeebPiO6cXrlVMm36D0X7bRVSIYpVzIobaTJ3iQSfUrdl7YrZyUu1Azryjg1jdFK-ETGkNCmggjFNw1YvLREMTZFXgVHCEJfNnX-IHZtRCD26hERh9xljaSE7H0BBLWx7wXXk3TV62o3rOv4m6Ps0ZqXWbvvCGFLqoqa4t_KRzRwOzHw0Ysc95XgEOrHtPnHZJUQPljDhH6tBqgMhcG96AnzSpdJx950lXmaq92LAXSc9qnAGSzcnIQ699ezexFFKnHauBYrjPHiYOQKHo1xefhBOAp7BIf0R7KwE01B1CTJ-Z-iOumcEIKPwwnNW-_IU8jzHCRCLZkJPN3lgrHvWowp6WVTke1HL3peZ8fiujMI7H1iD_3kJW82ASXlA42zqkyFkzUa7kNY0yXC0_P-ZeUiQT5lzUc2yL6022qbzGYlxYW5IK21SCZbiqhCwzBraNVKdCn9jWMsC97OeaqyNxoo`
        },
        body: JSON.stringify({
          email: email,
          groups: ["168614688429442382"],
          fields: {
            source: 'testus-patronus-homepage',
            course_interest: 'harry-potter'
          }
        })
      });
      
      if (response.ok) {
        setIsSubmitted(true);
      } else {
        const errorData = await response.json();
        console.error('Error:', errorData);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Make email capture available globally
  useEffect(() => {
    // Create a global email capture component
    const createGlobalEmailCapture = () => {
      // Check if already exists
      if (document.getElementById('global-email-capture')) {
        return;
      }

      const container = document.createElement('div');
      container.id = 'global-email-capture';
      container.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 1000;
        background: rgba(234, 180, 16, 0.95);
        border: 2px solid #eab410;
        border-radius: 12px;
        padding: 0.8rem;
        box-shadow: 0 4px 16px rgba(234, 180, 16, 0.3), 0 2px 8px rgba(0, 0, 0, 0.2);
        backdrop-filter: blur(8px);
        min-width: 260px;
        max-width: 300px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      `;
      
      // Add subtle hover effects
      container.addEventListener('mouseenter', () => {
        container.style.transform = 'scale(1.02)';
        container.style.boxShadow = '0 6px 20px rgba(234, 180, 16, 0.4), 0 3px 10px rgba(0, 0, 0, 0.2)';
      });
      
      container.addEventListener('mouseleave', () => {
        container.style.transform = 'scale(1)';
        container.style.boxShadow = '0 4px 16px rgba(234, 180, 16, 0.3), 0 2px 8px rgba(0, 0, 0, 0.2)';
      });
      
      // Add simple input focus effects
      const addInputEffects = () => {
        const emailInput = document.getElementById('email-input') as HTMLInputElement;
        
        if (emailInput) {
          emailInput.addEventListener('focus', () => {
            emailInput.style.borderColor = '#eab410';
          });
          
          emailInput.addEventListener('blur', () => {
            emailInput.style.borderColor = '#1a1a2e';
          });
        }
      };
      
      // Add effects after a short delay to ensure elements are rendered
      setTimeout(addInputEffects, 100);
      
      // Hide on very small screens
      const mediaQuery = window.matchMedia('(max-width: 768px)');
      const handleResize = () => {
        if (mediaQuery.matches) {
          container.style.display = 'none';
        } else {
          container.style.display = 'block';
        }
      };
      
      mediaQuery.addListener(handleResize);
      handleResize();

      container.innerHTML = `
        <div id="email-capture-content">
          <div style="text-align: center; margin-bottom: 0.6rem;">
            <h4 style="color: #1a1a2e; margin-bottom: 0.4rem; font-size: 0.9rem; font-weight: 600; text-align: center;">
              ⚡ Join the Testing Fantasy Community
            </h4>
            <p style="color: #1a1a2e; margin-bottom: 0.6rem; font-size: 0.75rem; text-align: center; opacity: 0.9; line-height: 1.3;">
              Get notified about new magical sagas and join our testing community
            </p>
          </div>
          <form id="email-form" style="display: flex; flex-direction: column; gap: 0.5rem;">
            <input
              type="email"
              id="email-input"
              placeholder="Your email address..."
              required
              style="
                padding: 0.5rem;
                border: 1px solid #1a1a2e;
                border-radius: 6px;
                background: rgba(255, 255, 255, 0.95);
                color: #1a1a2e;
                font-size: 0.8rem;
                transition: all 0.3s ease;
              "
            />
            <button
              type="submit"
              id="email-submit-btn"
              style="
                padding: 0.5rem;
                border: 1px solid #1a1a2e;
                border-radius: 6px;
                background: #1a1a2e;
                color: #eab410;
                font-size: 0.8rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
              "
            >
              Join Community
            </button>
          </form>
          <div style="text-align: center; margin-top: 0.4rem;">
            <p style="color: #1a1a2e; font-size: 0.65rem; opacity: 0.7; margin: 0;">
              Free • No spam • Unsubscribe anytime
            </p>
          </div>
        </div>
      `;

      document.body.appendChild(container);

      // Add event listener
      const form = document.getElementById('email-form');
      const emailInput = document.getElementById('email-input') as HTMLInputElement;
      const submitBtn = document.getElementById('email-submit-btn') as HTMLButtonElement;

      if (form && emailInput && submitBtn) {
        form.addEventListener('submit', async (e) => {
          e.preventDefault();
          const email = emailInput.value;
          
          if (!email) return;

          submitBtn.textContent = '🦉 Sending...';
          submitBtn.disabled = true;

          try {
            const response = await fetch('https://connect.mailerlite.com/api/subscribers', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiNWFjZTI1MjgwNWI1OWU5N2YxOGNlMTk3M2QyNzc2NWQ3OTQxNDBiY2U3YjIyNGE2MTc4OTU3NjU2YWVhZmJhYWI5YzA2YTlkNzY0NTcyYzMiLCJpYXQiOjE3NjA4MDQ5MTkuNjgxNjg1LCJuYmYiOjE3NjA4MDQ5MTkuNjgxNjg3LCJleHAiOjQ5MTY0Nzg1MTkuNjc3NzI0LCJzdWIiOiIxODgxNzQ2Iiwic2NvcGVzIjpbXX0.cA7u1WV7ieibBc0LJVnevydYINX5bN5282YgeTkUGllf851A8I3snb8hXwQwJ7f-biNnXYEG8noG79cjWNzzNDFX3FMfkgUUSsG6V8Dvt2LzxZ9RbumXZ4hcHCb-HZ-eraZDBgg_LULbZG6IJ26AEVQ3NW3xjVjEW4xI4VhFD6Axtujf1TVTeW841hYCSD8UgQ9NpARDZ5wr4Xe9k8cKeebPiO6cXrlVMm36D0X7bRVSIYpVzIobaTJ3iQSfUrdl7YrZyUu1Azryjg1jdFK-ETGkNCmggjFNw1YvLREMTZFXgVHCEJfNnX-IHZtRCD26hERh9xljaSE7H0BBLWx7wXXk3TV62o3rOv4m6Ps0ZqXWbvvCGFLqoqa4t_KRzRwOzHw0Ysc95XgEOrHtPnHZJUQPljDhH6tBqgMhcG96AnzSpdJx950lXmaq92LAXSc9qnAGSzcnIQ699ezexFFKnHauBYrjPHiYOQKHo1xefhBOAp7BIf0R7KwE01B1CTJ-Z-iOumcEIKPwwnNW-_IU8jzHCRCLZkJPN3lgrHvWowp6WVTke1HL3peZ8fiujMI7H1iD_3kJW82ASXlA42zqkyFkzUa7kNY0yXC0_P-ZeUiQT5lzUc2yL6022qbzGYlxYW5IK21SCZbiqhCwzBraNVKdCn9jWMsC97OeaqyNxoo'
              },
              body: JSON.stringify({
                email: email,
                groups: ["168614688429442382"],
                fields: {
                  source: 'testus-patronus-global',
                  course_interest: 'harry-potter'
                }
              })
            });

            if (response.ok) {
              container.innerHTML = `
                <div style="position: relative; text-align: center; padding: 0.3rem;">
                  <button
                    id="close-banner"
                    style="
                      position: absolute;
                      top: 0.2rem;
                      right: 0.2rem;
                      background: none;
                      border: none;
                      color: #1a1a2e;
                      font-size: 1rem;
                      cursor: pointer;
                      padding: 0.2rem;
                      border-radius: 50%;
                      width: 1.5rem;
                      height: 1.5rem;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      transition: all 0.3s ease;
                      opacity: 0.7;
                    "
                    onmouseover="this.style.background='rgba(26, 26, 46, 0.1)'; this.style.opacity='1'"
                    onmouseout="this.style.background='none'; this.style.opacity='0.7'"
                  >
                    ×
                  </button>
                  <h4 style="color: #1a1a2e; margin-bottom: 0.4rem; font-size: 0.9rem; font-weight: 600;">
                    🎉 Welcome to Testing Fantasy!
                  </h4>
                  <p style="color: #1a1a2e; margin-bottom: 0.6rem; font-size: 0.75rem; opacity: 0.9; line-height: 1.3;">
                    You're now part of our community! Get ready for new sagas and testing adventures.
                  </p>
                  <a
                    href="https://testingfantasy.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    style="
                      display: inline-block;
                      padding: 0.5rem 1rem;
                      border: 1px solid #1a1a2e;
                      border-radius: 6px;
                      background: #1a1a2e;
                      color: #eab410;
                      font-size: 0.8rem;
                      font-weight: 600;
                      cursor: pointer;
                      text-decoration: none;
                      transition: all 0.3s ease;
                    "
                  >
                    Explore All Sagas
                  </a>
                  <p style="color: #1a1a2e; font-size: 0.65rem; opacity: 0.7; margin: 0.4rem 0 0 0;">
                    Check your email for confirmation
                  </p>
                </div>
              `;
              
              // Add close button functionality
              const closeButton = document.getElementById('close-banner');
              if (closeButton) {
                closeButton.addEventListener('click', () => {
                  container.style.display = 'none';
                });
              }
            } else {
              alert('Something went wrong. Please try again.');
              submitBtn.textContent = '⚡ Join the Order';
              submitBtn.disabled = false;
            }
          } catch (error) {
            console.error('Error:', error);
            alert('Something went wrong. Please try again.');
            submitBtn.textContent = '⚡ Join the Order';
            submitBtn.disabled = false;
          }
        });
      }
    };

    // Initialize immediately
    createGlobalEmailCapture();

    // Also initialize on navigation
    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;

    history.pushState = function(...args) {
      originalPushState.apply(history, args);
      setTimeout(createGlobalEmailCapture, 100);
    };

    history.replaceState = function(...args) {
      originalReplaceState.apply(history, args);
      setTimeout(createGlobalEmailCapture, 100);
    };

    window.addEventListener('popstate', () => {
      setTimeout(createGlobalEmailCapture, 100);
    });
  }, []);



  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className={styles.hero__title}>
          <span className={styles.hero__magicIcon}>✨</span>
          {siteConfig.title}
          <span className={styles.hero__magicIcon}>🪄</span>
        </Heading>
        <p className={styles.hero__subtitle}>{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <div
            style={{ position: 'relative', display: 'inline-block' }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <Link
              ref={btnRef}
              className="button button--secondary button--lg"
              style={{
                '--ifm-button-background-color': '#7c3aed',
                '--ifm-button-color': '#fffce7',
                '--ifm-button-border-color': '#7c3aed',
                color: '#fffce7',
                position: 'relative',
                zIndex: 3,
                overflow: 'visible',
                transition: 'box-shadow 0.4s cubic-bezier(.4,2,.6,1)',
              } as any}
              to="/docs/intro"
            >
              RAG Tutorial - 2 hours ✨
              <SparkleOverlay show={hover} width={btnSize.width} height={btnSize.height} />
            </Link>
          </div>
        </div>
        {/* Quick Links Section */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1em',
          justifyContent: 'center',
          marginTop: '2em',
          marginBottom: '1.5em',
        }}>
          <a href="docs/exercise-2-knowledge-ingestion#-chunking-breaking-text-into-pieces" style={{
            background: '#f3f0ff',
            color: '#7c3aed',
            borderRadius: '999px',
            padding: '0.6em 1.4em',
            fontWeight: 600,
            textDecoration: 'none',
            border: '2px solid #7c3aed',
            fontSize: '1.08em',
            boxShadow: '0 2px 8px #7c3aed22',
          }}>📏 Chunk Size Tradeoff</a>
          <a href="docs/exercise-4-advanced-prompting#-1-parentchild-retrieval" style={{
            background: '#f3f0ff',
            color: '#7c3aed',
            borderRadius: '999px',
            padding: '0.6em 1.4em',
            fontWeight: 600,
            textDecoration: 'none',
            border: '2px solid #7c3aed',
            fontSize: '1.08em',
            boxShadow: '0 2px 8px #7c3aed22',
          }}>🪜 Parent–Child Retrieval</a>
          <a href="docs/exercise-4-advanced-prompting#-2-query-rewriting" style={{
            background: '#f3f0ff',
            color: '#7c3aed',
            borderRadius: '999px',
            padding: '0.6em 1.4em',
            fontWeight: 600,
            textDecoration: 'none',
            border: '2px solid #7c3aed',
            fontSize: '1.08em',
            boxShadow: '0 2px 8px #7c3aed22',
          }}>🧹 Query Rewriting</a>
          <a href="docs/exercise-3-ai-chatbot-setup#%EF%B8%8F-step-5-augmenting-your-prompt" style={{
            background: '#f3f0ff',
            color: '#7c3aed',
            borderRadius: '999px',
            padding: '0.6em 1.4em',
            fontWeight: 600,
            textDecoration: 'none',
            border: '2px solid #7c3aed',
            fontSize: '1.08em',
            boxShadow: '0 2px 8px #7c3aed22',
          }}>⚠️ Preventing Hallucinations</a>
          <a href="docs/exercise-2-api-knowledge-ingestion#-compare-manual-basic-and-advanced-knowledge-bases" style={{
            background: '#f3f0ff',
            color: '#7c3aed',
            borderRadius: '999px',
            padding: '0.6em 1.4em',
            fontWeight: 600,
            textDecoration: 'none',
            border: '2px solid #7c3aed',
            fontSize: '1.08em',
            boxShadow: '0 2px 8px #7c3aed22',
          }}>🔌 Manual vs API Ingestion</a>
        </div>
      </div>
      {/* Gradient overlay for blending */}
      <div style={{
        position: 'absolute',
        left: 0,
        bottom: 0,
        width: '100%',
        height: 32,
        pointerEvents: 'none',
        background: 'linear-gradient(180deg, transparent 0%, #19181b 100%)',
        zIndex: 10
      }} />
    </header>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
