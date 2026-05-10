'use client'
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const styles = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@600;700;800&display=swap');
*{
  margin:0;
  padding:0;
  box-sizing:border-box;
  font-family:'Inter',sans-serif;
}
// *{
//   box-sizing:border-box;
//   margin:0;
//   padding:0;
// }

.ad-wrapper{
  font-family:'Inter',sans-serif;
  min-height:100vh;

  background:
    radial-gradient(circle at top left, rgba(124,58,237,0.1), transparent 35%),
    radial-gradient(circle at bottom right, rgba(147,51,234,0.08), transparent 35%),
    #050505;

  display:flex;
  flex-direction:column;

  color:#fafafa;
}

/* NAVBAR */

.ad-nav{
  display:flex;
  align-items:center;
  justify-content:space-between;

  padding:16px 34px;

  background:rgba(10,10,12,0.92);

  border-bottom:1px solid rgba(255,255,255,0.06);

  backdrop-filter:blur(18px);

  position:sticky;
  top:0;
  z-index:100;
}

.ad-brand{
  display:flex;
  align-items:center;
  gap:14px;
}

.ad-logo{
  width:44px;
  height:44px;

  border-radius:14px;

  background:linear-gradient(135deg,#7c3aed,#9333ea);

  display:flex;
  align-items:center;
  justify-content:center;

  color:white;

  font-weight:700;
  font-size:14px;

  box-shadow:
    0 10px 25px rgba(124,58,237,0.35);
}

.ad-brand-text h1{
  font-family:'Inter',sans-serif;

  font-size:16px;
  font-weight:700;

  color:#ffffff;

  line-height:1;
}

.ad-brand-text p{
  font-size:10px;

  color:#71717a;

  letter-spacing:2px;

  text-transform:uppercase;

  margin-top:4px;
}

/* NAV RIGHT */

.ad-nav-right{
  display:flex;
  align-items:center;
  gap:14px;
}

.ad-user{
  display:flex;
  align-items:center;
  gap:8px;

  padding:8px 16px;

  background:rgba(124,58,237,0.12);

  border:1px solid rgba(124,58,237,0.22);

  border-radius:999px;

  font-size:13px;
  font-weight:500;

  color:#c4b5fd;

  backdrop-filter:blur(10px);
}

.ad-logout{
  display:flex;
  align-items:center;
  gap:8px;

  padding:10px 18px;

  background:rgba(239,68,68,0.08);

  border:1px solid rgba(239,68,68,0.18);

  border-radius:12px;

  color:#ef4444;

  font-size:13px;
  font-weight:600;

  cursor:pointer;

  transition:all .25s ease;
}

.ad-logout:hover{
  background:rgba(239,68,68,0.16);

  transform:translateY(-2px);
}

/* MAIN */

.ad-main{
  flex:1;

  max-width:1100px;
  width:100%;

  margin:0 auto;

  padding:48px 28px 70px;
}

/* HEADER */

.ad-header{
  margin-bottom:38px;
}

.ad-header-label{
  display:flex;
  align-items:center;
  gap:10px;

  margin-bottom:12px;
}

.ad-header-label::before{
  content:'';

  width:4px;
  height:16px;

  border-radius:10px;

  background:#7c3aed;
}

.ad-header-label span{
  font-size:10px;
  font-weight:700;

  letter-spacing:2px;

  text-transform:uppercase;

  color:#71717a;
}

.ad-header h2{
  font-size:48px;

  font-weight:700;

  line-height:1.2;

  color:#fafafa;
  font-family:'Playfair Display',serif;

  letter-spacing:-1.5px;
}

.ad-header h2 em{
  font-style:normal;

  color:#8b5cf6;
}

.ad-header p{
  margin-top:10px;

  color:#a1a1aa;

  font-size:15px;

  line-height:1.6;
}

/* WELCOME */

.ad-welcome{
  display:inline-flex;
  align-items:center;
  gap:8px;

  padding:8px 18px;

  border-radius:999px;

  background:rgba(124,58,237,0.12);

  border:1px solid rgba(124,58,237,0.2);

  color:#c4b5fd;

  font-size:13px;
  font-weight:600;

  margin-bottom:24px;

  backdrop-filter:blur(10px);
}

/* SECTION */

.ad-section{
  background:rgba(15,15,18,0.88);

  border:1px solid rgba(255,255,255,0.06);

  border-radius:24px;

  padding:32px;

  margin-bottom:24px;

  backdrop-filter:blur(18px);

  box-shadow:
    0 0 1px rgba(255,255,255,0.08),
    0 8px 24px rgba(0,0,0,0.35);
}

.ad-section-title{

  font-family:'Inter',sans-serif;
  display:flex;
  align-items:center;
  gap:10px;

  margin-bottom:22px;

  font-size:11px;
  font-weight:700;

  letter-spacing:2px;

  text-transform:uppercase;

  color:#71717a;
}

.ad-section-title::before{
  content:'';

  width:4px;
  height:14px;

  border-radius:10px;

  background:#8b5cf6;
}

/* GRID */

.ad-btn-grid{
  display:grid;

  grid-template-columns:
    repeat(auto-fill,minmax(230px,1fr));

  gap:16px;
}

/* BUTTON CARD */

.ad-btn{
  display:flex;
  align-items:center;
  gap:14px;

  padding:20px;

  background:rgba(255,255,255,0.02);

  border:1px solid rgba(255,255,255,0.08);

  border-radius:20px;

  cursor:pointer;

  transition:all .3s cubic-bezier(.22,1,.36,1);

  color:white;

  backdrop-filter:blur(12px);
}

.ad-btn:hover{
  transform:translateY(-6px);

  border-color:rgba(124,58,237,0.5);

  background:rgba(124,58,237,0.1);

  box-shadow:
    0 20px 40px rgba(124,58,237,0.18);
}

.ad-btn-icon{
  width:46px;
  height:46px;

  border-radius:14px;

  background:
    linear-gradient(135deg,#7c3aed,#9333ea);

  display:flex;
  align-items:center;
  justify-content:center;

  font-size:18px;

  flex-shrink:0;

  box-shadow:
    0 10px 25px rgba(124,58,237,0.35);
}

.ad-btn-text{
  display:flex;
  flex-direction:column;
  gap:4px;
}

.ad-btn-text span{
  font-size:14px;
  font-weight:700;
  font-family:'Inter',sans-serif;
  color:#ffffff;
}

.ad-btn-text small{
  font-size:12px;

  color:#a1a1aa;

  line-height:1.4;
}

/* RESPONSIVE */

@media(max-width:768px){

  .ad-nav{
    padding:14px 18px;
  }

  .ad-main{
    padding:30px 18px 60px;
  }

  .ad-header h2{
    font-size:32px;
  }

  .ad-btn-grid{
    grid-template-columns:1fr;
  }

  .ad-nav-right{
    gap:10px;
  }

  .ad-user{
    display:none;
  }
}
  /* =========================================
   THEME TOGGLE BUTTON
========================================= */

.theme-toggle{
  width:54px;
  height:54px;

  border-radius:18px;

  border:1px solid rgba(0,0,0,0.08);

  background:#ffffff;

  display:flex;
  align-items:center;
  justify-content:center;

  cursor:pointer;

  color:#64748b;

  font-size:22px;

  transition:all 0.25s ease;

  box-shadow:
    0 2px 10px rgba(0,0,0,0.04);

  backdrop-filter:blur(12px);
}

.theme-toggle:hover{
  transform:translateY(-2px);

  border-color:rgba(124,58,237,0.2);

  box-shadow:
    0 10px 24px rgba(0,0,0,0.08);
}

/* DARK MODE BUTTON */

.dark .theme-toggle{
  background:#0f0f12;

  border:1px solid rgba(255,255,255,0.06);

  color:#f8fafc;

  box-shadow:
    inset 0 1px 0 rgba(255,255,255,0.03),
    0 8px 24px rgba(0,0,0,0.45);
}

/* =========================================
   DARK THEME
========================================= */

.dark{
  background:#050505;
  color:#ffffff;
}

.dark .ad-nav,
.dark .sm-nav,
.dark .am-nav{
  background:#0a0a0f;
  border-bottom:1px solid rgba(255,255,255,0.06);
}

.dark .ad-section,
.dark .sm-section,
.dark .am-section,
.dark .ad-card,
.dark .sm-card,
.dark .am-card{
  background:#101014;
  border:1px solid rgba(255,255,255,0.06);
  box-shadow:0 0 30px rgba(124,58,237,0.08);
}

.dark input,
.dark select{
  background:#141419;
  color:white;
  border:1px solid rgba(255,255,255,0.08);
}

.dark table{
  color:white;
}

/* =========================================
   LIGHT THEME
========================================= */

.light{
  background:#f4f7fb;
  color:#111827;
}

.light .ad-nav,
.light .sm-nav,
.light .am-nav{
  background:white;
  border-bottom:1px solid #e5e7eb;
}

.light .ad-section,
.light .sm-section,
.light .am-section,
.light .ad-card,
.light .sm-card,
.light .am-card{
  background:white;
  border:1px solid #e5e7eb;
  box-shadow:0 10px 25px rgba(0,0,0,0.05);
}

.light h1,
.light h2,
.light h3,
.light p,
.light span,
.light td,
.light th{
  color:#111827;
}

.light input,
.light select{
  background:white;
  color:#111827;
  border:1px solid #d1d5db;
}

.light table{
  color:#111827;
}

.light .ad-btn,
.light .sm-btn,
.light .am-btn{
  background:#f3f4f6;
  color:#111827;
}

.light .ad-btn:hover,
.light .sm-btn:hover,
.light .am-btn:hover{
  background:white;
}

/* =========================================
   SMOOTH TRANSITION
========================================= */

.ad-wrapper,
.sm-wrapper,
.am-wrapper,
.ad-section,
.sm-section,
.am-section,
.ad-card,
.sm-card,
.am-card,
input,
select,
button{
  transition:all 0.3s ease;
}
`;

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
//   const [darkMode, setDarkMode] = useState(() => {
//   if (typeof window !== "undefined") {
//     return localStorage.getItem("theme") !== "light";
//   }
//   return true;
// });

// useEffect(() => {
//   localStorage.setItem("theme", darkMode ? "dark" : "light");
// }, [darkMode]);
const [darkMode, setDarkMode] = useState(true);
const [mounted, setMounted] = useState(false);
useEffect(() => {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "light") {
    setDarkMode(false);
  } else {
    setDarkMode(true);
  }

  setMounted(true);
}, []);
useEffect(() => {
  if (mounted) {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }
}, [darkMode, mounted]);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      router.push("/login");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.clear();
    router.push("/");
  };

  return (
    <>
      <style>{styles}</style>
      <div className={`ad-wrapper ${darkMode ? "dark" : "light"}`}>

        {/* NAVBAR */}
        <nav className="ad-nav">
          <div className="ad-brand">
            <div className="ad-logo">DT</div>
            <div className="ad-brand-text">
              <h1>Admin Panel</h1>
              <p>Assessment Portal</p>
            </div>
          </div>

          <div className="ad-nav-right">
            <div className="ad-user">
              👤 {user?.ad_name || "Administrator"}
            </div>
            <button
              className="theme-toggle"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? "☀" : "☾"}
            </button>
            <button className="ad-logout" onClick={handleLogout}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              Logout
            </button>
          </div>
        </nav>

        {/* MAIN */}
        <main className="ad-main">

          <div className="ad-header">
            <div className="ad-header-label"><span>Admin Dashboard</span></div>
            <h2>Manage Your <em>Exams</em></h2>
            <p>Create exams, upload questions, and configure the assessment portal.</p>
          </div>

          {/* Exam Management */}
          <div className="ad-section">
            <div className="ad-section-title">Exam Management</div>
            <div className="ad-btn-grid">
<button className="ad-btn" onClick={() => router.push("/create-exam")}> 
                <div className="ad-btn-icon">➕</div>
                <div className="ad-btn-text">
                  <span>Create Exam</span>
                  <small>Set up a new exam session</small>
                </div>
              </button>

<button className="ad-btn" onClick={() => router.push("/upload")}> 
                <div className="ad-btn-icon">📤</div>
                <div className="ad-btn-text">
                  <span>Upload Questions</span>
                  <small>Import from Excel file</small>
                </div>
              </button>

              <button className="ad-btn" onClick={() => router.push("/exam-keys")}> 
                <div className="ad-btn-icon">🔑</div>
                <div className="ad-btn-text">
                  <span>Exam Keys</span>
                  <small>View student exam keys</small>
                </div>
              </button>
              <button
                className="ad-btn"
                onClick={() => router.push("/exam-results")}
              >
                <div className="ad-btn-icon">📊</div>
                <div className="ad-btn-text">
                  <span>Exam Results</span>
                  <small>View & download student results</small>
                </div>
              </button>
            </div>

          </div>


          {/* Student Management */}
          <div className="ad-section">
            <div className="ad-section-title">Student Management</div>
            <div className="ad-btn-grid">
              <button className="ad-btn" onClick={() => router.push("/student-management")}> 
                <div className="ad-btn-icon">👥</div>
                <div className="ad-btn-text">
                  <span>Student Management</span>
                  <small>Search, edit & add students</small>
                </div>
              </button>
              <button
                className="ad-btn"
                onClick={() => router.push("/admin-management")}
              >
                <div className="ad-btn-icon">🛠️</div>
                <div className="ad-btn-text">
                  <span>Admin Management</span>
                  <small>Manage admin accounts</small>
                </div>
              </button>

            </div>
          </div>

        </main>
      </div>
    </>
  );
}