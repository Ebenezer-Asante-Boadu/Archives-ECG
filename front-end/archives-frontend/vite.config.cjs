// vite.config.js

module.exports = {
    build: {
      rollupOptions: {
        input: {
          homepage : 'src/views/homepage/homepage.html', // Specify the correct entry module here
          database : "src/views/database/database.html"
        }
      },
      outDir: '../../src/dist/public', // Specify the output directory here
    },
  };
  