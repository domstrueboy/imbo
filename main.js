'use strict'
var app = new Vue(
{
  el: '#app',

  data:
  {
  	base: base,
  	verbsBase: verbsBase,
    phrase: this.base[ getRandomInt(0, this.base.length-1) ],
    input: '',
    ok: null,
    pronouns: [
    			  ['i'],
    			  ['he', 'she', 'it'],
    			  ['you', 'we', 'they']
    			],
    auxiliary: [
    			  ['am', 'is', 'are', 'was', 'were', 'will', 'be'],
    			  ['isnt', 'arent', 'wasnt', 'werent', 'wont' ],
    			  ['do', 'does', 'did'],
    			  ['dont', 'doesnt', 'didnt'],
    			  ['not', 'no']
    			]
  },

  computed:
  {
  	words: function()
  	{
  		var words = [];
  		for(let i in this.phrase.en)
  		{
  			words = words.concat(
  									this.phrase.en[i].replace(',', ' ')
  				  				  			 	 	 .replace(/  +/g, ' ')
  				  				  			 	 	 .replace('`', '')
    						 				 		 .replace("'", '')
  				  				  			 		 .split(' ')
  				  				)
  		}

  		let buf = words;

  		for(let i in words)
  		{
  			this.pronouns.forEach( function(str)
  			{
  				if( str.includes(words[i]) )
	  			{
	  				buf[i] = null; 
	  			}
  			});

  			this.auxiliary.forEach( function(str)
  			{
  				if( str.includes(words[i]) )
	  			{
	  				buf[i] = null; 
	  			}
  			});
  		}

  		words = buf.filter( function(element) // фильтрация элементов null
		{
			return element;
		});

		words = unique(words);


		let verbs = [];
		let rests = [];

		for(let i in words)
  		{
  			let el;

  			el = this.verbsBase.find( function(str)
			{
				return str.includes(words[i]);
			});

  			if(el){
  				verbs = verbs.concat(el);
  			}
  			else
  			{
  				rests = rests.concat( words[i] );
  			}
  		}

  		verbs = verbs.filter( function(element) // фильтрация элементов undefined
		{
			return element;
		});

  		console.log(verbs); console.log(rests);
  		return { verbs: verbs, rests: rests};
  	}
  },

  mounted: function()
  {
  	inp.focus();
  },

  methods:
  {
  	inputWord: function(word)
  	{
  		app.input += word + ' ';
  		app.input = app.input[0].toUpperCase() + app.input.substring(1);
  	},

  	updatePhrase: function()
  	{
  		app.phrase = app.base[ getRandomInt(0, app.base.length-1) ];
        app.input = '';
        app.ok = null;
  	},

    checkPhrase: function()
    {
    	var input = app.input.trim()
    						 .toLowerCase()
    						 .replace('?', '')
    						 .replace('!', '')
    						 .replace('.', '')
    						 .replace('`', '')
    						 .replace("'", '')
    						 .replace(',', ' ')
    						 .replace(/  +/g, ' '); // it replaces several spaces to one

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
	        setTimeout(app.updatePhrase, 1000);
	    }
	    else
	    {
	        app.ok = false;
	        setTimeout(app.updatePhrase, 5000);
	    }

	    inp.focus();
    },

    cleanPhrase: function()
    {
    	app.input = '';
    	inp.focus();
    }
  }
}
)



function getRandomInt(min, max)
{
  return Math.floor(Math.random() * (max - min)) + min;
}

function unique(arr) {
  var obj = {};

  for (var i = 0; i < arr.length; i++) {
    var str = arr[i];
    obj[str] = true; // запомнить строку в виде свойства объекта
  }

  return Object.keys(obj); // или собрать ключи перебором для IE8-
}