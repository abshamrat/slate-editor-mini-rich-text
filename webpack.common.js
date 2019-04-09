
const config = {
    entry: __dirname + '/main.js',
  
    output: {
      path: __dirname + '/dist',
      filename: 'index.js'
    },
  
    devServer: {
      inline: true,
      port: 3344,
      historyApiFallback: true,
      contentBase: './',
      compress: true,
      disableHostCheck: true,
    },
    module: {
      rules: [
        {
          test: /(\.less|\.css)$/,
          use: [
            {
              loader: 'style-loader'
            },
            {
              loader: 'css-loader'
            },
            {
              loader: 'less-loader'
            },
          ]
          
        },
        {
          test: /(\.jsx|\.js)?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['es2015', 'react'],
                plugins: ['transform-class-properties']
              }
            }
          ]
        },
        {
          test: /\.json$/,
          exclude: /(node_modules|bower_components)/,
          use: [{
            loader: 'json-loader'
          }]
        },
        {
          test: /(\.webp|\.png)$/,
          exclude: /(node_modules|bower_components)/,
          use: [{
            loader: 'file-loader'
          }]
        }
      ]
    }
  }
  
  module.exports = config;