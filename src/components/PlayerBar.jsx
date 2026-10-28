export default function PlayerBar({ player }) {
  const { notice, closeNotice } = player

  return (
    <div 
      id="pbar" 
      className={`soon-bar ${notice ? 'on' : ''}`} 
      role="status" 
      aria-live="polite"
    >
      {notice && (
        <>
          <div className="soon-badge">
            <span className="soon-dot" />
            <span>AVAILABLE SOON</span>
          </div>
          <div className="soon-body">
            <b>{notice.title || 'Available Soon'}</b>
            <p>{notice.desc}</p>
          </div>
          <button 
            className="soon-close" 
            onClick={closeNotice} 
            aria-label="Close notification"
          >
            ✕
          </button>
        </>
      )}
    </div>
  )
}
