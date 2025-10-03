export const metadata = { title: 'Projects' };

export default function ProjectsPage() {
    return (
        <section style={{ padding: '2rem' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <h1>Projects</h1>
                <p style={{ color: 'var(--muted)', maxWidth: '70ch' }}>
                    Selected case studies. Each one focuses on real impact, trade-offs, and the stack used.
                </p>
                {/* Placeholder grid; swap to real data later */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginTop: '1.5rem' }}>
                    {[1, 2, 3].map((i) => (
                        <article key={i} style={{ border: '1px solid var(--border)', borderRadius: '12px', padding: '1rem' }}>
                            <h3 style={{ margin: 0 }}>Project {i}</h3>
                            <p style={{ color: 'var(--muted)' }}>Short impact statement, tech stack, and links.</p>
                            <a href="#" style={{ color: 'var(--accent)' }}>View details</a>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
