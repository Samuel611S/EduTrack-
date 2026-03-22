# EduTrack+

University attendance tracking demo: a single-page React app with role-based dashboards for **Admin**, **Teacher**, and **Student**. Data is mocked from JSON files—no backend required.

**Repository:** [github.com/Samuel611S/EduTrack-](https://github.com/Samuel611S/EduTrack-)

## Tech stack

- [React](https://react.dev/) (functional components)
- [Vite](https://vite.dev/)
- [Tailwind CSS](https://tailwindcss.com/) v4 (`@tailwindcss/vite`)
- [React Router](https://reactrouter.com/)

## Prerequisites

- [Node.js](https://nodejs.org/) 18+ (recommended: current LTS)

## Getting started

```bash
git clone https://github.com/Samuel611S/EduTrack-.git
cd EduTrack-
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

## Scripts

| Command        | Description                    |
|----------------|--------------------------------|
| `npm run dev`  | Start dev server with HMR      |
| `npm run build`| Production build to `dist/`      |
| `npm run preview` | Serve the production build locally |

## Demo login

On the login page, use **Login as Admin**, **Login as Teacher**, or **Login as Student**. You can also use the email/password fields and **Log in** (defaults to the student role for the demo).

- **Teacher** demo uses instructor `t1` (Computer Science courses).
- **Student** demo uses student `s1` (Jordan Lee).

## Routes

| Role   | Paths |
|--------|--------|
| Admin  | `/admin/dashboard`, `/admin/students`, `/admin/teachers`, `/admin/courses`, `/admin/reports` |
| Teacher| `/teacher/dashboard`, `/teacher/course/:id`, `/teacher/attendance`, `/teacher/reports` |
| Student| `/student/dashboard`, `/student/course/:id`, `/student/attendance`, `/student/materials` |

## Project layout

```
src/
  App.jsx
  main.jsx
  index.css
  components/     # Navbar, Sidebar, DashboardLayout, cards, etc.
  context/        # Auth (role in sessionStorage)
  data/           # *.json mock data + mockData.js helpers
  pages/          # Login + admin / teacher / student pages
```

## License

Private / educational use unless otherwise specified by the author.
