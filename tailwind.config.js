/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "login-green": '#00a884',
        "teal-green-dark": '#215C54',
        "teal-green-light": '#35897E',
        "light-green": '#59CE72',
        "outgoing-chat-bubble": '#E0F6CA',
        "checkmark-blue": '#4FB6EC',
        "chat-background": '#EBE5DE',
        "app-dark": '#0a1014',
        "app-text-gray": '#41525d',
      },
      backgroundImage: {
        'chat-bg': "url('/chat-bg.png')"
      }
    },
  },
  plugins: [],
};