'use strict'
var app = new Vue({
  el: '#app',

  data:
  {
  	base: base,
  	ru: this.base[ getRandomInt(0, this.base.length-1) ].ru,
    en: '',
    pronounses: ['I', 'He', 'She', 'It', 'You', 'We', 'They'],
    auxiliary: ['am', 'is', 'are', 'was', 'were', 'will', 'do', 'does', 'did', 'not', 'no']
  },

  methods: {
  	inputWord: function(word)
  	{
  		app.en += word + ' ';
  	}
  }
})



function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}