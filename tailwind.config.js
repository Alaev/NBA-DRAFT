module.exports = {
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    fontFamily: {
      display: ['Roboto', 'sans-serif'],
      body: ['Roboto', 'sans-serif'],
    },
    extend: {
    },
  },
  variants: {
    borderColor: ['hover', 'focus'],
    transitionProperty: ['responsive', 'motion-safe', 'motion-reduce']
  },
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: {
    purge: ['./src/**/*.tsx', './public/index.html'],
  },
};
