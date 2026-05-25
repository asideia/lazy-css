module.exports = {
  plugins: [
    // 1. Lê os @import e injeta o código real dos arquivos correspondentes
    require('postcss-import'),
    
    // 2. Adiciona os prefixos de compatibilidade globais (ex: -webkit-)
    require('autoprefixer'),
    
    // 3. Limpa os espaços, deleta comentários e minifica o arquivo final
    require('cssnano')({
      preset: 'default',
    }),
  ],
};