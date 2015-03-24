function verifyTemplate(template, callback) {
    var correct = {
        attribute: 'string',
        min: 'number',
        max: 'number',
        params: 'object'
    };
    for (var i in correct) {
        if (!template[i]) {
            return callback(new Error('no ' + i + ' specified'));
        } else if (typeof(template[i]) !== correct[i]) {
            return callback(new Error(i + ' is not of type ' + correct[i]));
        }
    }
    return callback(null, template);
}

function verifyColor(color) {
    if (color.length !== 7 && color.length !== 4) throw new Error('A hex color code must be 4 or 7 chars long');
    if (color[0] !== '#') throw new Error('A hex color code must have a # at the beginning');
    return 'ok';
}

function parseColors(base, colors) {
    colors = colors.split(',');
    if (colors.length < 2) throw new Error('U pasted: "' + colors + '" - did u mean to to this?');
    return colors.map(function(a, i) {
        verifyColor(a);
        return '@' + base + (i + 1) + ': ' + a + ';' ;
    });
}

function getBreaks(attribute, min, max, params, classes, rounding) {
    var interval = (max - min) / classes.length;
    var outputs = classes.map(function(c, i) {
        var cBase;

        if (i === 0) {
            cBase = '[' + attribute + ' <= ' + (interval + min).toFixed(rounding) + '] { ';
        } else {
            cBase = '[' + attribute + ' > ' + (i * interval + min).toFixed(rounding) + '] { ';
        }

        styles = params.map(function(p) {
            return p + ': ' + c.split(':')[0] + ';'
        }).join(' ');

        cBase += styles + '}'

        return cBase;
    });
    return outputs;
}

function makeColorRamp(prefix, data, template, callback) {
    var colors = parseColors(prefix, data);
    var output = {
        colors: colors
    }
    if (template) {
        verifyTemplate(template, function(err, template) {
            if (err) callback(err);
            output.classes = getBreaks(template.attribute, template.min, template.max, template.params, colors, 2);
            return callback(null, output);
        });
    } else {
        return callback(null, output);
    }
}

module.exports = {
    makeColorRamp: makeColorRamp,
    getBreaks: getBreaks,
    parseColors: parseColors,
    verifyColor: verifyColor,
    verifyTemplate: verifyTemplate
}
