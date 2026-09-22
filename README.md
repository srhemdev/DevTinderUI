# Project Description

- Create a Vite + React Application
- Install Tailwind
- Install DaisyUI
- Add NavBar component to App.jsx
- Create Navbar JSX file
- Instal react router dom
- Create browser router > routes > route / Body > Route Children
- Create a footer
- Create a login Page
- Install axios
- CORS - install cors in backend and middleware to with configuration with origin and credentials
- Whenever you're making API call so pass axios => { withCredentials: true }
- Install redux toolkit
- install react-redux
- configureStore => Provider => createSlice



# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


# Deployment

- Signup on AWS
- Launch instance
- chmod 400 <secret>.pem # secret key available from AWS (downloaded)
- ssh -i "devTinder-secret.pem" ubuntu@ec2 ....
- Install node version 20.12.0 - whatever node version you have
- Git clone
- Frontend
  - npm install - install dependencies
  - npm run build
  - sudo apt update
  - sudo apt install nginx
  - sudo systemctl start nginx
  - sudo systemctl enable nginx
  - copy code from dist(build files) to /var/www/html 
    (sudo scp -r dist/* /var/www/html)
  - Enable port :80 on your instance

  # Payment Gateway Integration
  - Signup on Razorpay and complete KYC
  - Create a UI for premium page
  - Creating an API for create order in backend
  - Added my key and secret in env file
  - Initialize RazorPay
  - creating order on Razorpay
  - create schema and model
  - saved the order in payments collection
  - Make the API dynamic
  - Setup Razorpay webhook

  # Real time chat using Websocket API
  - Socket.io



