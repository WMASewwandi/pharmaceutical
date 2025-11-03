export default function SiteFooter() {
  return (
    <footer style={{
      marginTop: 40,
      borderTop: "1px solid var(--color-border)",
      background: "var(--color-surface)",
      color: "var(--color-text)",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 20px" }}>
        <p style={{ color: "var(--color-muted-text)" }}>
          © {new Date().getFullYear()} Pharmacia. All rights reserved.
        </p>
      </div>
    </footer>
  );
}


