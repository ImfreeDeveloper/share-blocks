const smartgrid = require('smart-grid')

const settings = {
  outputStyle: 'scss',
  container: {
    maxWidth: '1250px',
    fields: '30px'
  },
  breakPoints: {
    lg: {
      width: '1250px',
      fields: '30px'
    },
    md: {
      width: '992px',
      fields: '15px'
    },
    sm: {
      width: '720px',
      fields: '15px'
    },
    xs: {
      width: '576px',
      fields: '15px'
    }
  }
}

smartgrid('./src/scss', settings)

// Запуск командой «node smartgrid.js»
