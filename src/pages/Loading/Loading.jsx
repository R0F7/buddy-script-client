const Loading = () => {
  return (
    <div
      className="min-vh-100 d-flex flex-column align-items-center justify-content-center"
      style={{ backgroundColor: "#0b0f1a" }}
    >
      <div className="spinner-container mb-3">
        <div className="custom-spinner"></div>
      </div>
      <p
        className="text-teal-400 fw-bold tracking-widest animate-pulse"
        style={{ color: "#2dd4bf", letterSpacing: "2px" }}
      >
        CONNECTING TO VOID...
      </p>

      <style>
        {`
                .custom-spinner {
                    width: 60px;
                    height: 60px;
                    border: 4px solid rgba(45, 212, 191, 0.1);
                    border-left-color: #2dd4bf;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                    box-shadow: 0 0 15px rgba(45, 212, 191, 0.4);
                }
                @keyframes spin { to { transform: rotate(360deg); } }
                @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
                .animate-pulse { animation: pulse 2s infinite; }
                `}
      </style>
    </div>
  );
};

export default Loading;
