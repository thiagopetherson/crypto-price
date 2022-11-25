const globalMixins = {    
    methods: {
      brazilianCurrency: function(value) {
        return value.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
      }      
    }
  }
  
  export default globalMixins