'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from './Sidebar'
import FlipCard from './FlipCard'
import AdminModal from './AdminModal'
import { supabase } from '@/lib/supabase'

export default function MainPage() {

  const router = useRouter()

  const [questions, setQuestions] = useState([])
  const [admin, setAdmin] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [data, setData] = useState({ semesters: [] })

  const [activeCard, setActiveCard] = useState(null)

  const [meta, setMeta] = useState({
    sem: '—',
    subj: '—',
    mod: '—'
  })

  const selectedModuleRef = useRef(null)

  useEffect(() => {
    setIsMobile(window.innerWidth <= 768)

    const h = () => setIsMobile(window.innerWidth <= 768)

    window.addEventListener('resize', h)

    return () => window.removeEventListener('resize', h)
  }, [])

  const loadData = useCallback(async () => {

    const { data: semData, error } = await supabase
      .from('semesters')
      .select(`
        id, label,
        branches (
          id, label,
          subjects (
            id, label,
            modules ( id, label )
          )
        )
      `)

    if (error) {
      console.error(error)
      return
    }

    setData({
      semesters: semData.map(sem => ({
        id: sem.id,
        label: sem.label,
        branches: sem.branches || []
      }))
    })

  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  const selectModule = async (sem, branch, subj, mod, index) => {

    selectedModuleRef.current = { sem, branch, subj, mod }

    const { data: d, error } = await supabase
      .from('dt_questions')
      .select('*')
      .eq('sem_id', sem.id)
      .eq('branch_id', branch.id)
      .eq('subject_id', subj.id)
      .eq('module_id', mod.id)

    if (error) {
      console.error(error)
      return
    }

    if (d) {
      setQuestions(d.map(i => [i.question, i.answer]))
    }

    setMeta({
      sem: sem.label,
      subj: subj.label,
      mod: `Module ${index + 1}: ${mod.label}`
    })
  }

  const downloadPDF = () => {

    if (!questions.length) {
      alert('Please select a module first')
      return
    }

    const content = questions
      .map((qa, i) => `Q${i + 1}: ${qa[0]}\nA: ${qa[1]}\n`)
      .join('\n')

    const blob = new Blob([content], { type: 'text/plain' })

    const a = document.createElement('a')

    a.href = URL.createObjectURL(blob)

    a.download = `${meta.subj}_${meta.mod}.txt`

    a.click()
  }

  return (
    <>

      {isMobile && (
        <button
          className="hamburger"
          onClick={() => setSidebarOpen(true)}
        >
          ☰
        </button>
      )}

      {isMobile && (
        <div
          className={`overlay ${sidebarOpen ? 'show' : ''}`}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="layout">

        <Sidebar
          data={data}
          selectModule={selectModule}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          isMobile={isMobile}
        />

        <main className="main-content">

          <div className="page-header">

            <div className="page-header-left">

              <h1>
                {meta.subj !== '—'
                  ? `${meta.subj} — ${meta.mod}`
                  : 'Welcome Back 👋'}
              </h1>

              <p>
                {questions.length > 0
                  ? `Showing ${questions.length} questions. Click any card to reveal the answer.`
                  : 'Select a semester, branch, subject and module to begin studying.'}
              </p>

            </div>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>

              {questions.length > 0 && (
                <button
                  className="btn-download"
                  onClick={downloadPDF}
                >
                  <span>⬇</span> Download PDF
                </button>
              )}

              {questions.length > 0 && (
                <button
                  className="btn-practice"
                  onClick={() => {
                    localStorage.setItem(
                      'examData',
                      JSON.stringify({ questions, meta })
                    )
                    router.push('/exam')
                  }}
                >
                  🧠Start Practice Test
                </button>
              )}

              <button
                className="btn-login"
                onClick={() => router.push('/login')}
              >
                👤 Login
              </button>

            </div>

          </div>

          <div className="divider" />

          <div className="breadcrumb">

            <span className="bc-item">{meta.sem}</span>
            <span className="sep">›</span>

            <span className="bc-item">{meta.subj}</span>
            <span className="sep">›</span>

            <span className="bc-item">{meta.mod}</span>

          </div>

          <div className="info-cards">

            <div className="info-card">
              <div className="info-icon sem">📚</div>
              <div className="info-text">
                <label>Semester</label>
                <span>{meta.sem}</span>
              </div>
            </div>

            <div className="info-card">
              <div className="info-icon subj">🔬</div>
              <div className="info-text">
                <label>Subject</label>
                <span>{meta.subj}</span>
              </div>
            </div>

            <div className="info-card">
              <div className="info-icon mod">🗂️</div>
              <div className="info-text">
                <label>Module</label>
                <span>{meta.mod}</span>
              </div>
            </div>

          </div>

          <div className="question-grid">

            {questions.length === 0 ? (

              <div className="empty-state">
                <div className="empty-icon">🎓</div>
                <h2>Your study cards will appear here</h2>
                <p>Select a semester, branch, subject and module to begin.</p>
              </div>

            ) : (

              questions.map((x, i) => (
                <FlipCard
                  key={i}
                  q={x[0]}
                  a={x[1]}
                  i={i}
                  activeCard={activeCard}
                  setActiveCard={setActiveCard}
                />
              ))

            )}

          </div>

        </main>

      </div>

      {admin && (
        <AdminModal
          close={() => setAdmin(false)}
        />
      )}

    </>
  )
}