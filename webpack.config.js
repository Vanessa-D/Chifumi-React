module.exports = {
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
              plugins: ['styled-jsx/babel']
            }
          }
        }
      ]
    }
  }
// Fichier .js qui à la fin exporte un objet qui correspond à la configuration