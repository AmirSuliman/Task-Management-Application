# Task Management Backend API 🚀

A professional, scalable RESTful API built with Node.js, Express, and MongoDB for managing tasks.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [API Documentation](#api-documentation)
- [Error Handling](#error-handling)
- [Architecture Decisions](#architecture-decisions)

## ✨ Features

- ✅ RESTful API endpoints for task management
- ✅ MongoDB integration with Mongoose ODM
- ✅ Input validation with detailed error messages
- ✅ Centralized error handling
- ✅ CORS enabled for cross-origin requests
- ✅ Environment-based configuration
- ✅ Professional MVC architecture
- ✅ Scalable and maintainable code structure
- ✅ Proper HTTP status codes and responses

## 🛠 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **ODM**: Mongoose
- **Environment Management**: dotenv
- **CORS**: cors

## 📁 Project Structure

```
task-management-backend/
├── src/
│   ├── config/
│   │   └── database.js          # MongoDB connection configuration
│   ├── models/
│   │   └── Task.js              # Task schema and model
│   ├── controllers/
│   │   └── taskController.js    # Business logic for tasks
│   ├── routes/
│   │   └── taskRoutes.js        # API route definitions
│   ├── middleware/
│   │   ├── errorHandler.js      # Global error handling
│   │   └── validateRequest.js   # Input validation middleware
│   ├── utils/
│   │   └── apiResponse.js       # Standardized API responses
│   └── app.js                   # Express app configuration
├── .env                         # Environment variables (not in repo)
├── .env.example                 # Example environment variables
├── .gitignore                   # Git ignore rules
├── package.json                 # Dependencies and scripts
├── server.js                    # Server entry point
└── README.md                    # Documentation
```

## 🚀 Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone or create the project directory**

   ```bash
   mkdir task-management-backend
   cd task-management-backend
   ```

2. **Initialize and install dependencies**

   ```bash
   npm init -y
   npm install express mongoose dotenv cors
   npm install --save-dev nodemon
   ```

3. **Create the project structure**
   Create all the folders and files as shown in the [Project Structure](#project-structure) section.

4. **Configure environment variables**

   Create a `.env` file in the root directory:

   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/taskmanagement
   NODE_ENV=development
   ```

   **For MongoDB Atlas (Cloud):**

   ```env
   PORT=5000
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/taskmanagement
   NODE_ENV=development
   ```

5. **Update package.json scripts**
   ```json
   "scripts": {
     "start": "node server.js",
     "dev": "nodemon server.js"
   }
   ```

### Running the Application

**Development mode (with auto-reload):**

```bash
npm run dev
```

**Production mode:**

```bash
npm start
```

The server will start on `http://localhost:5000`

## 📡 API Documentation

### Base URL

```
http://localhost:5000/api/tasks
```

### Endpoints

#### 1. Create Task

Creates a new task with the provided title and optional description.

- **URL**: `/api/tasks`
- **Method**: `POST`
- **Headers**: `Content-Type: application/json`
- **Body**:
  ```json
  {
    "title": "Complete project documentation",
    "description": "Write comprehensive README and API docs"
  }
  ```
- **Success Response** (201):
  ```json
  {
    "success": true,
    "message": "Task created successfully",
    "data": {
      "id": "674b1c2d3e4f5a6b7c8d9e0f",
      "title": "Complete project documentation",
      "description": "Write comprehensive README and API docs",
      "status": "pending",
      "createdAt": "2025-11-18T10:30:00.000Z",
      "updatedAt": "2025-11-18T10:30:00.000Z"
    },
    "statusCode": 201
  }
  ```
- **Error Response** (400):
  ```json
  {
    "success": false,
    "message": "Validation failed",
    "errors": ["Title is required", "Title cannot exceed 100 characters"],
    "statusCode": 400
  }
  ```

#### 2. Get All Tasks

Retrieves all tasks, optionally filtered by status.

- **URL**: `/api/tasks` or `/api/tasks?status=pending`
- **Method**: `GET`
- **Query Parameters**:
  - `status` (optional): Filter by status (`pending`, `in-progress`, `completed`)
- **Success Response** (200):
  ```json
  {
    "success": true,
    "message": "3 task(s) retrieved successfully",
    "data": [
      {
        "id": "674b1c2d3e4f5a6b7c8d9e0f",
        "title": "Complete project documentation",
        "description": "Write comprehensive README and API docs",
        "status": "pending",
        "createdAt": "2025-11-18T10:30:00.000Z",
        "updatedAt": "2025-11-18T10:30:00.000Z"
      }
    ],
    "statusCode": 200
  }
  ```
- **Error Response** (400 - Invalid status):
  ```json
  {
    "success": false,
    "message": "Invalid status. Must be one of: pending, in-progress, completed",
    "statusCode": 400
  }
  ```

#### 3. Update Task Status

Updates the status of an existing task.

- **URL**: `/api/tasks/:id`
- **Method**: `PATCH`
- **Headers**: `Content-Type: application/json`
- **Body**:
  ```json
  {
    "status": "in-progress"
  }
  ```
- **Success Response** (200):
  ```json
  {
    "success": true,
    "message": "Task status updated successfully",
    "data": {
      "id": "674b1c2d3e4f5a6b7c8d9e0f",
      "title": "Complete project documentation",
      "description": "Write comprehensive README and API docs",
      "status": "in-progress",
      "createdAt": "2025-11-18T10:30:00.000Z",
      "updatedAt": "2025-11-18T10:35:00.000Z"
    },
    "statusCode": 200
  }
  ```
- **Error Response** (404):
  ```json
  {
    "success": false,
    "message": "Task not found with id: 674b1c2d3e4f5a6b7c8d9e0f",
    "statusCode": 404
  }
  ```
- **Error Response** (400 - Invalid ID):
  ```json
  {
    "success": false,
    "message": "Invalid task ID format",
    "statusCode": 400
  }
  ```

#### 4. Delete Task

Deletes a task by its ID.

- **URL**: `/api/tasks/:id`
- **Method**: `DELETE`
- **Success Response** (200):
  ```json
  {
    "success": true,
    "message": "Task deleted successfully",
    "data": {
      "id": "674b1c2d3e4f5a6b7c8d9e0f"
    },
    "statusCode": 200
  }
  ```
- **Error Response** (404):
  ```json
  {
    "success": false,
    "message": "Task not found with id: 674b1c2d3e4f5a6b7c8d9e0f",
    "statusCode": 404
  }
  ```

### Testing with cURL

```bash
# Create a task
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Implement authentication","description":"Add JWT authentication"}'

# Get all tasks
curl http://localhost:5000/api/tasks

# Get tasks by status
curl http://localhost:5000/api/tasks?status=pending

# Update task status
curl -X PATCH http://localhost:5000/api/tasks/674b1c2d3e4f5a6b7c8d9e0f \
  -H "Content-Type: application/json" \
  -d '{"status":"completed"}'

# Delete a task
curl -X DELETE http://localhost:5000/api/tasks/674b1c2d3e4f5a6b7c8d9e0f
```

### Testing with Postman

1. Import the following collection or create requests manually
2. Set base URL as environment variable: `http://localhost:5000`
3. Test each endpoint with the examples provided above

## ⚠️ Error Handling

The API implements comprehensive error handling:

### Validation Errors (400)

- Missing required fields
- Invalid data types
- Field length violations
- Invalid status values

### Not Found Errors (404)

- Task with specified ID doesn't exist
- Invalid route

### Server Errors (500)

- Database connection issues
- Unexpected server errors

### Error Response Format

```json
{
  "success": false,
  "message": "Error description",
  "errors": ["Detailed error 1", "Detailed error 2"],
  "statusCode": 400
}
```

## 🏗 Architecture Decisions

### 1. MVC Pattern

- **Models**: Define data structure and validation (Mongoose schemas)
- **Controllers**: Handle business logic and request processing
- **Routes**: Define API endpoints and map to controllers

### 2. Middleware Pattern

- **Validation Middleware**: Validates requests before reaching controllers
- **Error Handler**: Centralized error handling for consistent responses
- **CORS**: Enables cross-origin requests for frontend integration

### 3. Environment Configuration

- Sensitive data (DB credentials, ports) stored in `.env`
- Different configurations for development/production
- `.env.example` provided for easy setup

### 4. Mongoose ODM

- Schema validation at database level
- Automatic timestamps (createdAt, updatedAt)
- Custom JSON transformation for cleaner API responses

### 5. RESTful Design

- Proper HTTP methods (GET, POST, PATCH, DELETE)
- Meaningful status codes (200, 201, 400, 404, 500)
- Resource-based URLs (/api/tasks/:id)

### 6. Scalability Considerations

- Modular structure allows easy feature additions
- Separated concerns for maintainability
- Middleware can be extended for authentication, logging, etc.
- Database queries optimized with sorting and filtering

## 🔐 Security Considerations

Current implementation includes:

- ✅ Input validation
- ✅ CORS configuration
- ✅ Error message sanitization

## 🔄 Connecting Frontend

Update your frontend API calls to point to:

```javascript
const API_BASE_URL = "http://localhost:5000/api/tasks";

// Example: Creating a task
const response = await fetch(API_BASE_URL, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    title: "New Task",
    description: "Task description",
  }),
});

const data = await response.json();
```

## 🐛 Troubleshooting

### MongoDB Connection Issues

- Ensure MongoDB is running locally or connection string is correct
- Check if firewall is blocking MongoDB port (27017)
- Verify MongoDB Atlas IP whitelist settings

### Port Already in Use

- Change PORT in `.env` file
- Kill process using port 5000: `lsof -ti:5000 | xargs kill`

### CORS Issues

- Ensure CORS is enabled in `app.js`
- Check if frontend URL is different from backend

## 📝 Future Enhancements

Potential improvements:

- [ ] Authentication and authorization
- [ ] Task assignment to users
- [ ] Due dates and reminders
- [ ] Task categories/tags
- [ ] File attachments
- [ ] Activity logs
- [ ] Unit and integration tests
- [ ] API documentation with Swagger
- [ ] Docker containerization
- [ ] CI/CD pipeline

## 👤 Author

Amir Suliman - Full Stack Developer Assignment

## 📄 License

ISC

---

# Task Management Frontend - Next.js

A modern, responsive task management application built with Next.js 14, React, and Tailwind CSS.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [Available Scripts](#available-scripts)
- [Environment Variables](#environment-variables)
- [Component Architecture](#component-architecture)
- [API Integration](#api-integration)
- [Styling](#styling)
- [Browser Support](#browser-support)

## ✨ Features

### Core Features ✅

- **Task Management**: Create, read, update, and delete tasks
- **Status Tracking**: Three status levels (Pending, In Progress, Completed)
- **Status Filtering**: Filter tasks by status with tab-based navigation
- **Responsive Design**: Fully responsive layout for mobile, tablet, and desktop
- **Form Validation**: Client-side validation with helpful error messages
- **Loading States**: Visual feedback during API operations
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Optimistic Updates**: Instant UI updates for better user experience
- **Delete Confirmation**: Modal confirmation before deleting tasks

### UI/UX Features ✅

- **Modern Design**: Clean, professional interface with Tailwind CSS
- **Status Badges**: Color-coded status indicators
- **Task Counts**: Real-time task counts per status
- **Empty States**: Helpful messages when no tasks exist
- **Smooth Animations**: Subtle transitions and loading indicators
- **Accessible**: Semantic HTML and keyboard navigation support

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **UI Library**: React 18
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **State Management**: React Hooks (useState, useEffect, useCallback)
- **Form Handling**: Native HTML5 validation + custom validation

## 📁 Project Structure

```
task-management-frontend/
├── src/
│   ├── app/
│   │   ├── layout.js              # Root layout with metadata
│   │   ├── page.js                # Main page component
│   │   └── globals.css            # Global styles
│   ├── components/
│   │   ├── CreateTaskForm.jsx     # Task creation form
│   │   ├── TaskList.jsx           # Task list container
│   │   ├── TaskItem.jsx           # Individual task card
│   │   ├── FilterTabs.jsx         # Status filter tabs
│   │   ├── LoadingSpinner.jsx     # Loading indicator
│   │   ├── ErrorMessage.jsx       # Error display
│   │   └── DeleteConfirmModal.jsx # Delete confirmation modal
│   ├── hooks/
│   │   └── useTasks.js            # Custom hook for task management
│   ├── services/
│   │   └── taskService.js         # API service layer
│   ├── utils/
│   │   ├── constants.js           # App constants
│   │   └── helpers.js             # Helper functions
│   └── types/
│       └── task.js                # Type definitions (if using TypeScript)
├── public/                        # Static assets
├── .env.local                     # Environment variables
├── .env.example                   # Example environment variables
├── .gitignore                     # Git ignore rules
├── next.config.js                 # Next.js configuration
├── package.json                   # Dependencies
├── tailwind.config.js             # Tailwind configuration
├── postcss.config.js              # PostCSS configuration
└── README.md                      # Documentation
```

## 🚀 Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Backend API running on http://localhost:5000

### Installation

1. **Create Next.js project**

   ```bash
   npx create-next-app@latest task-management-frontend
   ```

   **Select these options:**

   - TypeScript? **No** (or Yes if you prefer)
   - ESLint? **Yes**
   - Tailwind CSS? **Yes**
   - `src/` directory? **Yes**
   - App Router? **Yes**
   - Customize default import alias? **No**

2. **Navigate to project**

   ```bash
   cd task-management-frontend
   ```

3. **Install additional dependencies**

   ```bash
   npm install axios
   ```

4. **Create environment file**

   Create `.env.local` in the root directory:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

5. **Copy all source files**

   Copy all the component, hook, service, and utility files as provided in the artifacts.

6. **Start the development server**
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:3000`

## 📜 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

## 🔐 Environment Variables

Create a `.env.local` file in the root directory:

```env
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

For production, update the URL to your production backend URL.

**Note**: All environment variables that need to be exposed to the browser must be prefixed with `NEXT_PUBLIC_`.

## 🏗 Component Architecture

### Page Components

- **`app/page.js`**: Main application page that orchestrates all components

### Feature Components

- **`CreateTaskForm`**: Handles task creation with validation
- **`TaskList`**: Displays list of tasks with empty state
- **`TaskItem`**: Individual task card with actions
- **`FilterTabs`**: Status-based filtering interface
- **`DeleteConfirmModal`**: Confirmation dialog for task deletion

### UI Components

- **`LoadingSpinner`**: Reusable loading indicator
- **`ErrorMessage`**: Standardized error display

### Custom Hooks

- **`useTasks`**: Manages task state, API calls, and operations
  - Handles loading, error states
  - Provides CRUD operations
  - Implements optimistic updates
  - Manages filtering

### Service Layer

- **`taskService`**: Centralized API communication
  - GET /tasks (with optional status filter)
  - POST /tasks (create new task)
  - PATCH /tasks/:id (update status)
  - DELETE /tasks/:id (delete task)

### Utilities

- **`constants.js`**: Status configurations, filter tabs, validation rules
- **`helpers.js`**: Date formatting, text truncation, validation functions

## 🔌 API Integration

### Base Configuration

```javascript
// services/taskService.js
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
```

### API Endpoints

All endpoints expect/return JSON with this structure:

```javascript
// Success Response
{
  "success": true,
  "message": "Operation successful",
  "data": { /* task object or array */ },
  "statusCode": 200
}

// Error Response
{
  "success": false,
  "message": "Error message",
  "errors": ["Detailed error 1", "Detailed error 2"],
  "statusCode": 400
}
```

### Error Handling

The service layer includes:

- Axios interceptors for global error handling
- Timeout configuration (10 seconds)
- Detailed error messages for users
- Network error detection

## 🎨 Styling

### Tailwind CSS

The application uses Tailwind CSS for styling with a custom configuration:

**Color Scheme:**

- Primary: Blue (for actions, active states)
- Success: Green (for completed tasks)
- Warning: Yellow (for pending tasks)
- Info: Blue (for in-progress tasks)
- Danger: Red (for delete actions)

**Responsive Breakpoints:**

- `sm`: 640px (mobile)
- `md`: 768px (tablet)
- `lg`: 1024px (desktop)
- `xl`: 1280px (large desktop)

### Custom Styles

Global styles in `globals.css`:

- Custom scrollbar styling
- Smooth transitions
- Gradient backgrounds

### Component Styling Patterns

```javascript
// Status-based conditional styling
className={`
  ${statusConfig.color}
  hover:shadow-md
  transition-shadow
`}
```

## 🧪 Testing the Application

### Manual Testing Checklist

**Task Creation:**

- [ ] Create task with title only
- [ ] Create task with title and description
- [ ] Try to create task without title (should show error)
- [ ] Try to create task with title > 100 chars (should show error)
- [ ] Verify success message appears

**Task Status Updates:**

- [ ] Update task from Pending → In Progress
- [ ] Update task from In Progress → Completed
- [ ] Verify status badge updates
- [ ] Verify task moves to correct filter tab

**Task Deletion:**

- [ ] Click delete button
- [ ] Verify confirmation modal appears
- [ ] Cancel deletion
- [ ] Confirm deletion
- [ ] Verify task is removed

**Filtering:**

- [ ] Switch between filter tabs
- [ ] Verify task counts update
- [ ] Verify correct tasks display
- [ ] Verify empty state shows when no tasks

**Error Handling:**

- [ ] Stop backend server
- [ ] Try to create task (should show connection error)
- [ ] Restart backend
- [ ] Click "Try again" on error message

**Responsive Design:**

- [ ] Test on mobile (< 640px)
- [ ] Test on tablet (640px - 1024px)
- [ ] Test on desktop (> 1024px)
- [ ] Verify all elements are accessible and readable

## 🐛 Troubleshooting

### Backend Connection Issues

**Problem**: "No response from server" error

**Solutions:**

1. Ensure backend is running: `cd task-management-backend && npm run dev`
2. Check backend is on port 5000
3. Verify `NEXT_PUBLIC_API_URL` in `.env.local`
4. Check browser console for CORS errors

### CORS Errors

**Problem**: CORS policy blocking requests

**Solutions:**

1. Ensure backend has CORS enabled (should be by default)
2. Check backend `app.js` has `app.use(cors())`
3. Restart both frontend and backend

### Environment Variables Not Working

**Problem**: API calls going to wrong URL

**Solutions:**

1. Ensure `.env.local` exists in root directory
2. Restart Next.js dev server after creating/modifying `.env.local`
3. Verify variable starts with `NEXT_PUBLIC_`
4. Check `next.config.js` includes env configuration

### Build Errors

**Problem**: Build fails with module not found

**Solutions:**

1. Delete `node_modules` and `.next` folders
2. Run `npm install` again
3. Clear Next.js cache: `rm -rf .next`
4. Restart dev server

## 🚀 Deployment

### Production Build

```bash
# Build the application
npm run build

# Start production server
npm start
```

### Environment Variables for Production

Update `.env.local` (or use your hosting platform's environment variable settings):

```env
NEXT_PUBLIC_API_URL=https://your-production-api.com/api
```

### Deployment Platforms

**Vercel (Recommended for Next.js):**

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

**Other Platforms:**

- Netlify
- AWS Amplify
- DigitalOcean App Platform
- Railway

## 📊 Performance Optimizations

Implemented optimizations:

- ✅ Optimistic UI updates for instant feedback
- ✅ Debounced API calls where appropriate
- ✅ Minimal re-renders with proper React hooks
- ✅ Code splitting with Next.js App Router
- ✅ Image optimization (if images added)
- ✅ CSS purging with Tailwind

## 🔒 Security Considerations

Current implementation:

- ✅ Environment variables for API URLs
- ✅ Input validation on client and server
- ✅ XSS prevention with React's built-in escaping
- ✅ HTTPS ready (for production)

## 🎯 Future Enhancements

Potential improvements:

- [ ] Add task editing functionality
- [ ] Implement search/filter by title
- [ ] Add sorting options (by date, title, status)
- [ ] Implement task priorities (low, medium, high)
- [ ] Add due dates with calendar picker
- [ ] Implement pagination for large task lists
- [ ] Add dark mode toggle
- [ ] Implement drag-and-drop reordering
- [ ] Add task categories/tags
- [ ] Implement user authentication
- [ ] Add task collaboration features
- [ ] Implement real-time updates with WebSockets
- [ ] Add unit and integration tests

## 🌐 Browser Support

Tested and working on:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

Mobile browsers:

- iOS Safari
- Chrome Mobile
- Samsung Internet

## 📝 Code Style

The project follows these conventions:

- **Components**: PascalCase (e.g., `TaskItem.jsx`)
- **Hooks**: camelCase with 'use' prefix (e.g., `useTasks.js`)
- **Services**: camelCase (e.g., `taskService.js`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `TASK_STATUS`)
- **Functions**: camelCase (e.g., `handleSubmit`)

## 👥 Contributing

When contributing:

1. Follow existing code style
2. Write descriptive commit messages
3. Test all features before committing
4. Update documentation for new features

## 📄 License

ISC

## 🤝 Integration with Backend

This frontend is designed to work with the Task Management Backend API. Ensure both are running:

```bash
# Terminal 1 - Backend
cd task-management-backend
npm run dev
# Runs on http://localhost:5000

# Terminal 2 - Frontend
cd task-management-frontend
npm run dev
# Runs on http://localhost:3000
```

## 📧 Support

If you encounter any issues:

1. Check this README for solutions
2. Review browser console for errors
3. Verify backend is running and accessible
4. Check environment variables are set correctly

---

**Built with ❤️ using Next.js, React, and Tailwind CSS**
