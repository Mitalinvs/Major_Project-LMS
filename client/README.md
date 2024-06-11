Move into the directory
    cd lms-frontend-hn

install dependencies
    npm i

run the server
    npm run dev

Setup instructions for tailwind
Tail wind official instruction doc

Install tailwindcss
    npm install -D tailwindcss postcss autoprefixer

Create tailwind config file
    npx tailwindcss init

Add file extensions to tailwind config file in the contents property
    "./src/**/*.{html,js,jsx,ts,tsx}", "./index.html",

Add the tailwind directives at the top of the index.css file
    @tailwind base;
    @tailwind components;
    @tailwind utilities;

Add the following details in the plugin property of tainwind config
    [require("daisyui"), require("@tailwindcss/line-clamp")]

Adding plugins and dependencies
npm install @reduxjs/toolkit react-redux react-router-dom react-icons react-chartjs-2 chart.js daisyui axios react-hot-toast @tailwindcss/line-clamp
