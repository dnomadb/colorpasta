var tape = require('tape');
var colorpasta = require('../index.js');
var fs = require('fs');

tape('test if colors are all pass the test', function(t) {
    var colors = fs.readFileSync('test/fixtures/colors')
        .toString()
        .split(',');
    var okColors = [];
    var testColors = [];
    for (var i = 0; i < colors.length; i++) {
        okColors.push('ok');
        testColors.push(colorpasta.verifyColor(colors[i]));
    }
    t.deepEqual(testColors, okColors, 'colors should all pass the color test');
    t.end();
});

tape('test if colors are parsed', function(t) {
    var colors = fs.readFileSync('test/fixtures/colors')
        .toString();
    var testColors = colorpasta.parseColors('class', colors);
    var expectedColors = JSON.parse(fs.readFileSync('test/fixtures/parsed-colors'));
    t.deepEqual(testColors, expectedColors, 'colors should all pass the color test');
    t.end();
});

tape('should make color ramp and classes', function(t) {
    var colors = fs.readFileSync('test/fixtures/colors')
        .toString();
    var template = JSON.parse('{"layer":"temp","min":-40,"max":30,"params":["polygon-fill","line-color"]}');
    colorpasta.makeColorRamp('class', colors, template, function(err, data) {
        t.equals(err, null, 'should not throw an error');
        var expectedColors = JSON.parse(fs.readFileSync('test/fixtures/colors-and-ramp'));
        t.deepEqual(data, expectedColors);
        t.end();
    })
});

tape('should make color ramp only', function(t) {
    var colors = fs.readFileSync('test/fixtures/colors')
        .toString();
    colorpasta.makeColorRamp('class', colors, false, function(err, data) {
        t.equals(err, null, 'should not throw an error');
        var expectedColors = JSON.parse(fs.readFileSync('test/fixtures/colors-only  '));
        t.deepEqual(data, expectedColors);
        t.end();
    })
});