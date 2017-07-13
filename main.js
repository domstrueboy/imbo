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
    			  ['I'],
    			  ['he', 'she', 'it'],
    			  ['you', 'we', 'they']
    			],

    nots: [
            ['not', 'no']
        ],

    auxiliary: [
    			  ['am', 'is', 'are'],
            ['was', 'were'],
            ['will', 'be', 'been']
    			],

    tobes: [
            ['do', 'does', 'did'],
            ['have', 'has', 'had']
          ],

    questions: [
            ['what', 'why', 'where', 'when', 'who'],
            ['how', 'many']
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
  				rests = rests.concat( words[i] )
                       .filter( function(element)
                       {
                          return element !== 'i' &&
                                 element !== 'im' &&
                                 element !== 'hes' &&
                                 element !== 'shes' &&
                                 element !== 'its' &&
                                 element !== 'youre' &&
                                 element !== 'were' &&
                                 element !== 'theyre' &&
                                 element !== 'ill' &&
                                 element !== 'hell' &&
                                 element !== 'shell' &&
                                 element !== 'itll' &&
                                 element !== 'youll' &&
                                 element !== 'theyll' &&
                                 element !== 'dont' &&
                                 element !== 'do' &&
                                 element !== 'doesnt' &&
                                 element !== 'does' &&
                                 element !== 'didnt' &&
                                 element !== 'did' &&
                                 element !== 'wasnt' &&
                                 element !== 'werent' &&
                                 element !== 'wont' &&
                                 element !== 'ive' &&
                                 element !== 'id' &&
                                 element !== 'not' &&
                                 element !== 'no'
                       } );
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
	        setTimeout(app.updatePhrase, 1500);
	    }
	    else
	    {
	        app.ok = false;
	        //setTimeout(app.updatePhrase, 5000);
	    }

	    inp.focus();
    },

    cleanInput: function()
    {
    	app.input = '';
    	inp.focus();
    }
  },

  filters: {
    capitalize: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
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