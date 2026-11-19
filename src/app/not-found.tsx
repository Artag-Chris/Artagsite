import Link from "next/link"

export default function RootNotFound() {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          backgroundColor: "#0B0C0E",
          color: "#F3F4F6",
          fontFamily: "system-ui, sans-serif",
          padding: "24px",
        }}
      >
        <div
          style={{
            maxWidth: "520px",
            width: "100%",
            border: "1px solid #262A34",
            backgroundColor: "#121418",
            padding: "32px",
          }}
        >
          <p
            style={{
              margin: "0 0 12px",
              fontFamily: "monospace",
              fontSize: "12px",
              letterSpacing: "0.15em",
              color: "#EF4444",
            }}
          >
            HTTP 404 · ROUTE_NOT_FOUND
          </p>
          <h1 style={{ margin: "0 0 12px", fontSize: "36px", fontWeight: 400 }}>
            Page not found
          </h1>
          <p style={{ margin: "0 0 24px", color: "#9CA3AF", lineHeight: 1.6 }}>
            This route does not exist or was consolidated into the new architecture.
          </p>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Link
              href="/"
              style={{
                border: "1px solid #00E599",
                backgroundColor: "#00E599",
                color: "#0B0C0E",
                padding: "10px 16px",
                textDecoration: "none",
                fontFamily: "monospace",
                fontSize: "12px",
                fontWeight: 600,
              }}
            >
              HOME (/)
            </Link>
            <Link
              href="/labs"
              style={{
                border: "1px solid #4A5162",
                color: "#F3F4F6",
                padding: "10px 16px",
                textDecoration: "none",
                fontFamily: "monospace",
                fontSize: "12px",
              }}
            >
              LABS (/labs)
            </Link>
          </div>
        </div>
      </body>
    </html>
  )
}
