install:
	@echo "Installing dependencies..."
	@cd frontend && npm install
	@cd backend && poetry install --no-root

run-frontend:
	@echo "Starting frontend..."
	@cd frontend && npm run dev

run-backend:
	@echo "Starting backend..."
	@cd backend && poetry run fastapi dev main.py