// vite.config.js

module.exports = {
    build: {
      rollupOptions: {
        input: 'src/views/homepage/homepage.html', // Specify the correct entry module here
      },
      outDir: '../../src/dist/public', // Specify the output directory here
    },
  };
  