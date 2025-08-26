# Tasks Manager Frontend

This repository contains a **Next.js frontend** for managing tasks. It connects to the **Tasks Manager API** to fetch, create, and display tasks with pagination.

## Features

- Fetch tasks with **pagination** from `/tasks` endpoint
- Add new tasks via a **modal form**
- Show **validation errors** in the form if any
- Display **success notifications** when tasks are added
- Tasks have `id`, `title`, `description`, and `status`
    - Status values: Pending, In Progress, Done

## Getting Started

### Prerequisites

- Node.js v18+ (or compatible)
- npm or yarn
- Tasks Manager API running locally or remotely

### Setup Steps

- Clone the repository:

   ```bash
   git clone git@github.com:Hossam-Tarek/tasks-manager-frontend.git
   cd tasks-manager-frontend
    ```
- Install dependencies:

   ```bash
    npm install
    # or
    yarn install
    ```

- Create .env.local and set the API URL:

   ```bash
   NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
    ```

- Run the development server:

   ```bash
    npm run dev
    # or
    yarn dev

    ```

- Open the app in your browser:

   ```bash
   http://localhost:3000
    ```
