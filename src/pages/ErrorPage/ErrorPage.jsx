import React from "react";
import { Link, useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div 
      className="min-vh-100 d-flex align-items-center justify-content-center p-4" 
      style={{ 
        background: "radial-gradient(circle, #1e293b 0%, #0b0f1a 100%)",
        color: "#f8fafc"
      }}
    >
      <div className="text-center" style={{ maxWidth: "600px" }}>

        <div className="mb-4 position-relative d-inline-block">
          <h1 
            className="display-1 fw-bold" 
            style={{ 
              fontSize: "8rem",
              color: "#2dd4bf", 
              textShadow: "0 0 30px rgba(45, 212, 191, 0.5)",
              animation: "float 3s ease-in-out infinite"
            }}
          >
            404
          </h1>
          <span className="position-absolute top-50 start-50 translate-middle opacity-25" style={{ fontSize: "10rem" }}>🛸</span>
        </div>

        <h2 className="fw-bold mb-3">Content Not Found</h2>
        <p className="fs-5 text-secondary mb-5 px-md-5">
          This post might have been deleted, or the profile link is broken. Don't worry, the rest of the world is still online! 🌎
        </p>

        {/* Action Buttons */}
        <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center mb-5">
          <Link
            to="/"
            className="btn btn-lg px-4 py-3 shadow-sm transition-all"
            style={{
              backgroundColor: "#2dd4bf",
              color: "#0b0f1a",
              fontWeight: "600",
              border: "none"
            }}
          >
            Back to Feed
          </Link>
          
          <button
            onClick={() => navigate(-1)}
            className="btn btn-lg btn-outline-light px-4 py-3"
            style={{ fontWeight: "600" }}
          >
            Go Back
          </button>
        </div>
        <style>
          {`
            @keyframes float {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-20px); }
            }
            .transition-all:hover {
              transform: scale(1.05);
              filter: brightness(1.1);
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default ErrorPage;