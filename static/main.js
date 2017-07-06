'use strict'
var app = new Vue(
{
  el: '#app',

  data:
  {
  	base: base,
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
  	verbs: function()
  	{
  		var verbs = [];
  		for(let i in this.phrase.en)
  		{
  			verbs = verbs.concat(
  									this.phrase.en[i].replace(',', ' ')
  				  				  			 	 	 .replace(/  +/g, ' ')
  				  				  			 	 	 .replace('`', '')
    						 				 		 .replace("'", '')
  				  				  			 		 .split(' ')
  				  				)
  		}

  		let buf = verbs;

  		for(let i in verbs)
  		{
  			this.pronouns.forEach( function(str)
  			{
  				if( str.includes(verbs[i]) )
	  			{
	  				buf[i] = null; 
	  			}
  			});

  			this.auxiliary.forEach( function(str)
  			{
  				if( str.includes(verbs[i]) )
	  			{
	  				buf[i] = null; 
	  			}
  			});
  		}

  		console.log(buf);

  		verbs = buf.filter(function(element)
		{
			return element;
		});

  		console.log(verbs);
  		return verbs;
  	}
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
	        setTimeout(app.updatePhrase, 2000);
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

