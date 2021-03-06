module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        "cool": "inset 0 2px 4px 0 rgba(0, 0, 0, 0.3)"
      },
      width: {
        '15p': "15%",
        '70p': "70%",
      },
      height: {
        'mini': '2px',
      },
      colors: {
        "custom-modal": "#000000cc",
        "custom-gray-0": "#151515",
        "custom-gray-1": "#222222",
        "custom-gray-2": "#333333",
        "custom-gray-3": "#4E4F4E",
        "custom-gray-4": "#F5F5F5",
        "custom-white-0": "#FFFFFF",
        "custom-green": "#26CF5E",
        "custom-red": "#F24855",
        "custom-blue": "#0EA8FF",
        "custom-gold": "#E5B25D",
        "custom-silver": "#D7D7D7",
        "custom-bronze":"#AD8A56",
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}