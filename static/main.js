'use strict'
var app = new Vue({
  el: '#app',

  data:
  {
  	base: base,
    phrase: this.base[ getRandomInt(0, this.base.length-1) ],
    input: '',
    ok: null,
    pronounses: [
    			  ['i'],
    			  ['he', 'she', 'it'],
    			  ['you', 'we', 'they']
    			],
    auxiliary: [
    			  ['am', 'is', 'are', 'was', 'were', 'will', 'be'],
    			  ['do', 'does', 'did'],
    			  ['not', 'no']
    			]
  },

  computed: {

  },

  methods: {
  	inputWord: function(word)
  	{
  		app.input += word + ' ';
  	},

  	updatePhrase: function()
  	{
  		app.phrase = app.base[ getRandomInt(0, app.base.length-1) ];
        app.input = '';
        app.ok = null;
  	},

    checkPhrase: function(){

    	var input = app.input.trim()
    						 .toLowerCase()
    						 .replace('?', '')
    						 .replace('!', '')
    						 .replace('.', '')
    						 .replace('`', '')
    						 .replace("'", '')
    						 .replace(',', '');

    	var flag = false;

    	for( var phrase in app.phrase.en)
    	{
    		if( input === app.phrase.en[phrase] )
    		{
    			flag = true;
    			break;
    		}
    	}

	    if( flag )
	    {
	        app.ok = true;
	        setTimeout(app.updatePhrase, 2000);
	    }
	    else
	    {
	        app.ok = false;
	        setTimeout(app.updatePhrase, 5000);
	    }
    }
  }
})



function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}