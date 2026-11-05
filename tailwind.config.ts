import type { Config } from 'tailwindcss'
export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        paper: '#f5f3ee', ink: '#222725', muted: '#717571', line: '#deded8',
        moss: '#697c6b', coral: '#e46c4a', cream: '#e9e4d9'
      },
      fontFamily: { sans: ['DM Sans', 'sans-serif'], display: ['Manrope', 'sans-serif'] },
      boxShadow: { card: '0 20px 60px rgba(27,34,29,.07)' }
    }
  }
}
