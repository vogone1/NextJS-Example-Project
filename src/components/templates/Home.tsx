'use client';
import { Alignment, Fit, Layout, useRive } from '@rive-app/react-webgl2';
import './Home.scss';

export default function Home() {
  const { RiveComponent } = useRive({
    src: '/fast_stroke_test.riv',
    autoplay: true,
    layout: new Layout({
      fit: Fit.Contain,
      alignment: Alignment.Center,
    }),
  });
  //TODO: make the component map over 3 different words in a loop!
  // Control overlay placement and size consistently between the words
  const overlayWidth = 500; // px
  const overlayHeight = 500; // px
  return (
    <section className="fullPageSection u-noSelect">
      <div className="container">
        <header className="hero">
          <p className="eyebrow">Frontend Engineer</p>
          <h1 style={{ position: 'relative', zIndex: 1 }}>
            Build
            {' '}
            {/* Anchor reserves horizontal space but contributes zero height */}
            <span
              className="riveAnchor"
              aria-hidden="true"
              style={{
                // Pass CSS variables so SCSS can keep anchor and overlay sized identically
                ['--rive-w' as any]: `${overlayWidth}px`,
                ['--rive-h' as any]: `${overlayHeight}px`,
              }}
            >
              <span
                className="riveOverlay"
                style={{
                  // Raise the overlay to sit between the words and overlap the lede
                  top: '-5.25em',
                }}
              >
                <RiveComponent
                  style={{ width: '100%', height: '100%', display: 'block' }}
                />
              </span>
            </span>
            {' '}
            UIs
          </h1>
          <p className="lede">I design and ship modern web experiences with performance, DX, and delightful details at the core.</p>
          <div className="actions">
            <a className="primary" href="/projects">View Projects</a>
            <a className="ghost" href="/cv">View CV</a>
          </div>
        </header>
      </div>
    </section>
  );
}
