# 🚀 BreakPack Infrastructure Service

<div align="center">

![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=for-the-badge&logo=react)
![FastAPI](https://img.shields.io/badge/FastAPI-0.116.1-009688?style=for-the-badge&logo=fastapi)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-336791?style=for-the-badge&logo=postgresql)
![Docker](https://img.shields.io/badge/Docker-3.8-2496ED?style=for-the-badge&logo=docker)

**워게임 인프라 배포 서비스**

[ 문서](#-문서) • [🚀 시작하기](#-시작하기) • [🛠️ 기술스택](#-기술스택) • [📁 구조](#-구조)

</div>

---

## ✨ 기능

- **YAML을 이용한 배포** - YAML이용해 웹에서 인프라 서비스를 Kubernetes에 배포
- **실시간 데이터 처리** - FastAPI 기반 API
- **이미지 처리** - OpenCV를 통한 고급 이미지 분석
- **데이터베이스 관리** - PostgreSQL과 SQLAlchemy ORM

## 🛠️ 기술스택

### Frontend
| 기술 | 버전 | 설명 |
|------|------|------|
| ![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=flat&logo=react) | 19.1.0 | UI 라이브러리 |
| ![Vite](https://img.shields.io/badge/Vite-7.0.4-646CFF?style=flat&logo=vite) | 7.0.4 | 빌드 도구 |
| ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat&logo=typescript) | 5.0+ | 타입 안전성 |
| ![Styled Components](https://img.shields.io/badge/Styled%20Components-6.1.19-DB7093?style=flat&logo=styled-components) | 6.1.19 | CSS-in-JS |
| ![Framer Motion](https://img.shields.io/badge/Framer%20Motion-12.23.7-0055FF?style=flat&logo=framer) | 12.23.7 | 애니메이션 |

### Backend
| 기술 | 버전 | 설명 |
|------|------|------|
| ![FastAPI](https://img.shields.io/badge/FastAPI-0.116.1-009688?style=flat&logo=fastapi) | 0.116.1 | API 프레임워크 |
| ![Python](https://img.shields.io/badge/Python-3.8+-3776AB?style=flat&logo=python) | 3.8+ | 프로그래밍 언어 |
| ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-336791?style=flat&logo=postgresql) | 15 | 데이터베이스 |
| ![SQLAlchemy](https://img.shields.io/badge/SQLAlchemy-2.0.41-D71F00?style=flat&logo=sqlalchemy) | 2.0.41 | ORM |
| ![OpenCV](https://img.shields.io/badge/OpenCV-4.12.0-5C3EE8?style=flat&logo=opencv) | 4.12.0 | 이미지 처리 |

### DevOps
| 기술 | 버전 | 설명 |
|------|------|------|
| ![Kubernetes](https://img.shields.io/badge/Kubernetes-1.28+-326CE5?style=flat&logo=kubernetes) | 1.28+ | 컨테이너 오케스트레이션 |
| ![pnpm](https://img.shields.io/badge/pnpm-8.0+-F69220?style=flat&logo=pnpm) | 8.0+ | 패키지 매니저 |

## 📖 프로젝트 구조

```
breakpack_InfraService/
├── 🎨 servicefrontend/          # React 프론트엔드
│   ├── src/                     # 소스 코드
│   │   ├── components/          # React 컴포넌트
│   │   ├── pages/              # 페이지 컴포넌트
│   │   ├── hooks/              # 커스텀 훅
│   │   └── utils/              # 유틸리티 함수
│   ├── public/                  # 정적 파일
│   ├── dist/                    # 빌드 결과물
│   ├── package.json             # 의존성 관리
│   └── vite.config.js           # Vite 설정
├── ⚙️ servicebackend/           # FastAPI 백엔드
│   ├── main.py                  # 애플리케이션 진입점
│   ├── models/                  # 데이터베이스 모델
│   ├── schemas/                 # Pydantic 스키마
│   ├── crud/                    # CRUD 작업
│   ├── service/                 # 비즈니스 로직
│   ├── utils/                   # 유틸리티 함수
│   ├── core/                    # 핵심 설정
│   ├── database/                # DB 설정
│   ├── requirements.txt         # Python 의존성
│   └── docker-compose.yml       # Docker 설정
└── 📖 README.md                # 프로젝트 문서
```

## 🚀 시작하기

### Prerequisites

- [Node.js](https://nodejs.org/) 18+
- [Python](https://www.python.org/) 3.8+
- [Docker](https://www.docker.com/) & Docker Compose
- [pnpm](https://pnpm.io/) (권장)

### Quick Start

1. **저장소 클론**
```bash
git clone https://github.com/your-username/breakpack_InfraService.git
cd breakpack_InfraService
```

2. **백엔드 실행**
```bash
cd servicebackend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
docker-compose up -d  # PostgreSQL 실행
python main.py
```

3. **프론트엔드 실행**
```bash
cd servicefrontend
pnpm install
pnpm dev
```

4. **브라우저에서 확인**
- Frontend: http://localhost:5174
- Backend: http://localhost:8000
- API Docs: http://localhost:8000/docs

## 📖 문서

### API 문서
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

### 환경 변수
백엔드 `.env` 파일 예시:
```env
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
SECRET_KEY=your-secret-key
POSTGRES_PORT=5432
```

## 📄 라이선스

이 프로젝트는 [LICENSE](LICENSE) 파일에 명시된 라이선스 하에 배포됩니다.