## Conceptual E-learning Platform

A full-stack government-oriented e-learning platform built using React, Django, PostgreSQL, and Tailwind CSS.

The platform enables students to browse and enroll in online video courses, securely authenticate using JWT, stream educational content, and make payments through Khalti's sandbox payment gateway. The system was designed to improve accessibility, engagement, and digital learning experiences through a responsive and user-friendly interface.

---

## Platform Features

- User authentication and authorization using JWT
- Online course enrollment system
- Video course streaming functionality
- Khalti sandbox payment gateway integration
- Responsive and modern UI built with Tailwind CSS
- RESTful API architecture using Django
- PostgreSQL database management

## Technologies Used

- Python
  - Django
  - Django Rest Framework
- Javascript
  - NextJS
  - React
  - Zustand
  - Tailwind CSS
- PostgreSQL
- JWT Authentication
- Khalti Payment Gateway

## Setup Web Platform

1.  Clone the repository

    ```bash
    git clone https://github.com/radiaated/MedicalInsurancePricePrediction
    ```

2.  Install backend

    2.1. Go to directory `backend`

    ```bash
    cd backend
    ```

    2.2. Install Python dependencies

    ```bash
    pip install -r requirements.txt
    ```

    2.3. Apply database migrations

    ```bash
    python manage.py makemigrations
    python manage.py migrate
    ```

    2.4. Load default course and chapter records

    ```bash
    python manage.py load_db
    ```

    2.5. Run Django server

    ```bash
    python manage.py runserver
    ```

3.  Install frontend

    3.1. Go to directory `frontend`

    ```bash
    cd frontend
    ```

    3.2. Install node dependencies

    ```bash
    npm i
    ```

    3.3. Run React server

    ```bash
    npm run dev
    ```

---

THE END
