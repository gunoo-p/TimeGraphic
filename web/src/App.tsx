import { useCallback, useState } from 'react'
import { Navigate, Outlet, Route, Routes, useNavigate } from 'react-router'
import { ActivityDetail } from './components/ActivityDetail'
import { AddActivityDialog } from './components/AddActivityDialog'
import { Toast } from './components/common/Toast'
import { ProjectNav } from './components/ProjectNav'
import { ACTIVITIES, MEMBERS, OTHER_PROJECTS, PROJECT, TODAY } from './mock'
import { AutoFillScreen } from './screens/AutoFillScreen'
import { HistoryScreen } from './screens/HistoryScreen'
import { HomeScreen } from './screens/HomeScreen'
import { ProjectsScreen } from './screens/ProjectsScreen'
import { StartScreen } from './screens/StartScreen'
import type { Activity } from './types'

// shortcut: 가짜 데이터라 프로젝트 주소가 하나뿐. /api 연결 때 :projectId 로 바꾼다.
const PROJECT_PATH = '/projects/timegraphic'

function App() {
  const navigate = useNavigate()
  const [activities, setActivities] = useState(ACTIVITIES)
  const [adding, setAdding] = useState(false)
  const [selected, setSelected] = useState<Activity | null>(null)
  const [toast, setToast] = useState<string | null>(null)
  const clearToast = useCallback(() => setToast(null), [])

  return (
    <>
      <Routes>
        <Route path="/" element={<StartScreen onLogin={() => navigate('/projects')} />} />
        <Route
          path="/projects"
          element={
            <ProjectsScreen
              me={MEMBERS[0]}
              project={PROJECT}
              activities={activities}
              members={MEMBERS}
              others={OTHER_PROJECTS}
              today={TODAY}
              onOpen={() => navigate(PROJECT_PATH)}
              onAutoFill={() => navigate('/autofill')}
            />
          }
        />
        <Route
          path="/autofill"
          element={
            <AutoFillScreen
              projectName="스터디 사이트"
              onBack={() => navigate('/projects')}
              onSave={() => {
                navigate('/projects')
                setToast('저장했어요. 팀원 모두에게 보여요.')
              }}
            />
          }
        />
        <Route
          path={PROJECT_PATH}
          element={
            <main className="page">
              <ProjectNav projectName={PROJECT.name} basePath={PROJECT_PATH} />
              <Outlet />
            </main>
          }
        >
          <Route
            index
            element={
              <HomeScreen
                project={PROJECT}
                activities={activities}
                members={MEMBERS}
                today={TODAY}
                onAdd={() => setAdding(true)}
                onSelect={setSelected}
              />
            }
          />
          <Route
            path="history"
            element={
              <HistoryScreen
                activities={activities}
                members={MEMBERS}
                today={TODAY}
                since={PROJECT.start}
                onAdd={() => setAdding(true)}
                onSelect={setSelected}
              />
            }
          />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {adding && (
        <AddActivityDialog
          members={MEMBERS}
          today={TODAY}
          onClose={() => setAdding(false)}
          onSave={(a) => {
            setActivities([...activities, a])
            setAdding(false)
            setToast('저장했어요. 팀원 모두에게 보여요.')
          }}
        />
      )}
      {selected && (
        <ActivityDetail
          activity={selected}
          activities={activities}
          members={MEMBERS}
          onSelect={setSelected}
          onClose={() => setSelected(null)}
        />
      )}
      {toast && <Toast message={toast} onDone={clearToast} />}
    </>
  )
}

export default App
