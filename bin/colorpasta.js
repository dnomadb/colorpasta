var colorpasta = require('../index.js');

var clipboard = require('copy-paste');
var argv = require('minimist')(process.argv.slice(2));
var template;
var prefix;

if (argv.template) {
    template = JSON.parse(argv.template);
} else {
    template = false;
}

if (argv.classprefix) {
    prefix = '' + argv.classprefix
} else {
    prefix = 'class'
}

var copy = argv.copy || false;

console.log(copy)

clipboard.paste(function(err, data) {
    if (err) throw err;
    colorpasta.makeColorRamp(prefix, data, template, function(err, carto) {
        if (err) throw err;
        makeOutput[copy](carto);
    });
});

var makeOutput = {
    true: function(carto) {
        var output = carto.colors.join('\n');
        if (carto.classes) {
            output += carto.classes.join('\n');
        }
        clipboard.copy(output, function(err) {
            if (err) throw err;
            console.log('Carto copied to clipboard')
        });
    },
    false: function(carto) {
        console.log(carto.colors.join('\n'));
        if (carto.classes) {
            console.log(carto.classes.join('\n'));
        }
    }
}