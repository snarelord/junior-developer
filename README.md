<div align="center">
  <img src="frontend/public/logo.png" alt="Citizens Advice Logo" width="100" height="100" />
    <h1>Citizens Advice SORT</h1>
    <h3>Junior Developer Practical</h3>
</div>

---

## Overview

This is a full stack practical for Junior Developer at Citizens Advice SORT. The project consists of a full-stack application with a Python backend and Next.js frontend.

## Backend Wake Up Time

The backend is hosted on Render using a free tier, which may take 10-20 seconds to load on first request.

## Project Structure

```
.
└── junior-developer/
    ├── .github/
    │   └── workflows/
    │       └── ci.yml
    ├── backend/
    │   ├── data/
    │   │   └── mock.json
    │   ├── main.py
    │   ├── models.py
    │   └── test_main.py
    ├── frontend/
    │   ├── public/
    │   └── src/
    │       ├── app/
    │       │   ├── utils/
    │       │   │   └── fetchData.ts
    │       │   ├── layout.tsx
    │       │   ├── page.module.css
    │       │   └── page.tsx
    │       ├── components/
    │       │   ├── Content.module.css
    │       │   └── Content.tsx
    │       ├── tests/
    │       │   └── content.spec.ts
    │       └── types/
    │           └── types.ts
    └── Makefile
```

## Task Description

### Backend Task

In the backend, you need to:

1. **Identify cited sources** within the content from `mock.json`
2. **Replace document IDs** with actual links to the sources
3. **Extract favicon URLs** from the source websites

### Frontend Task

The `Content.tsx` component has been provided for you to:

1. **Display each piece of content** and its associated sources, both cited and non-cited
2. **Show favicons** from the source websites alongside each source
3. **Create a clean, user-friendly interface**

## Challenges Faced

- **Python:** This project was my introduction to Python. It was a great crash course learning about FastAPI, Pydantic models and writing unit tests with Pytest.
- **Next.js Data Fetching:** Fetched data asynchronously in 'page.ts' and pre rendered with grouped content.
- **Playwright Testing:** Encountered timing issues with async data loading times and solved through explicit waits.
- **React Components:** Refactored to pass props to the reusable `<Content />` component instead of fetching inside the component.
- **CI/CD:** Added caching of Playwright dependencies in GitHub Actions to reduce the build times and stabilise test suite.
- **CSS Modules:** Scoped CSS styling to keep code clean and styles maintainable.

## Getting Started

### Prerequisites

- Python 3.10+
- Node.js 18+
- npm
- [poetry](https://python-poetry.org/docs/#installation)

### Installation & Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd junior-developer
   ```

2. **Install backend dependencies**

   ```bash
   cd backend
   poetry install --no-root
   ```

3. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   ```

### Running the Application

Use the provided Makefile for easy setup:

```bash
# Install all dependencies
make install

# Start the backend server
make run-backend

# Start the frontend development server
make run-frontend
```

Or run manually:

**Backend:**

```bash
cd backend
poetry run fastapi dev main.py
```

**Frontend:**

```bash
cd frontend
npm run dev
```

## API Endpoints

- `GET /data` - Returns the list of data

## Testing

- End to end test written with Playwright and Pytest
- Playwright test include explicit waits to handle data loading

Run tests locally:

```bash
cd frontend
npx playright test

cd backend
poetry run pytest
```

## CI/CD

This project uses GitHub Actions to run Playwright test on every push.
To speed up CI Playwright dependencies are cached using `actions/cache/`

## Future Improvements

- Improve error handling and UI empty state
- Add sorting and filtering for sources
- Expand edge case test coverage
- Implement a cleaner UI with home page and redirectable category pages

## License

This project is for technical assessment purposes only.
