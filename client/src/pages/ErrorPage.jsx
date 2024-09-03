import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div
      id="error-page"
      style={{
        height: "100vh",
        backgroundColor: "#1F1F2E",
        color: "#E0E0E0",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>Uh-oh!</h1>
      <p style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
        🚧 Something went off-script. Our bad!
      </p>
      <p style={{ fontSize: "1rem", fontStyle: "italic", color: "#F08080" }}>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
