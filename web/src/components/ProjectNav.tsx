import { Link, NavLink } from 'react-router'
import { Icon } from './common/Icon'
import './ProjectNav.css'

type Props = {
  projectName: string
  basePath: string
}

export function ProjectNav({ projectName, basePath }: Props) {
  return (
    <nav className="project-nav" aria-label="프로젝트 메뉴">
      <div className="project-nav-crumbs">
        <Link to="/projects" className="project-nav-back">
          <Icon name="back" />내 프로젝트
        </Link>
        <span aria-hidden="true" className="project-nav-slash">
          /
        </span>
        {/* shortcut: 다른 프로젝트 고르기 메뉴는 아직 없음, 내 프로젝트 화면으로 대신 */}
        <Link to="/projects" className="project-nav-name" aria-label="다른 프로젝트 고르기">
          {projectName}
          <Icon name="down" size={16} />
        </Link>
      </div>
      {/* NavLink 가 지금 화면 탭에 aria-current="page" 를 붙여 준다 */}
      <div className="project-nav-tabs">
        <NavLink to={basePath} end className="project-nav-tab">
          홈
        </NavLink>
        <NavLink to={`${basePath}/history`} className="project-nav-tab">
          히스토리
        </NavLink>
      </div>
    </nav>
  )
}
