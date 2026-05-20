export default {
  source: ["tokens/base.json"],
  platforms: {
    css: {
      transformGroup: "css",
      prefix: "ds",
      buildPath: "src/styles/",
      files: [{
        destination: "tokens.css",
        format: "css/variables",
        options: { outputReferences: true }
      }]
    },
    js: {
      transformGroup: "js",
      buildPath: "src/styles/",
      files: [{
        destination: "tokens.ts",
        format: "javascript/es6"
      }]
    }
  }
}
