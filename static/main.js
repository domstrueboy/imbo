'use strict'
var app = new Vue({
  el: '#app',

  data:
  {
  	base: base,
    num: getRandomInt(0, this.base.length-1),
  	ru: this.base[ num ].ru,
    en: '',
    pronounses: ['I', 'He', 'She', 'It', 'You', 'We', 'They'],
    auxiliary: ['am', 'is', 'are', 'was', 'were', 'will', 'do', 'does', 'did', 'not', 'no']
  },

  computed: {

  },

  methods: {
  	inputWord: function(word)
  	{
  		app.en += word + ' ';
  	},

    checkPhrase: function(){
      if( app.en === his.base[ num ].en )
      {
        alert('Right!');
        app.num = getRandomInt(0, app.base.length-1);
        ru: app.base[ num ].ru
      }
      else
      {
        alert('Wrong!');
      }
    }
  }
})



function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}