# colorpasta
------------
Paste a color ramp - get CartoCSS

## Installation
1. `git clone` this
2. `npm install`
3. `npm link`

## Usage

With colors copied to your clipboard:

`copypasta --copy --classprefix <prefix> --template <template> `

`--copy` write output to clipboard (vs printing) [default: `false`]

`--classprefix` prefix for name of color classes [default = `class`]

`---template {"layer":<layername>,"min":<min>,"max":<max>,"params":[<style1>, <style2>]}`

`layer` - the name of the layer in the `mapid` you want to style (`string`)
`min` - the minimum value of your classes (`number`)
`max` - the maximum value of your classes (`number`)
`params` - an array of the classes: eg `["polygon-fill", "line-color"]` (`array` of `strings`)

### 1. Make a color ramp

 - EG from http://tristen.ca/hcl-picker/#/hlc/24/1/21313E/EFEE69
 - Choose the number of classes you want
 - Click `copy`

### 2. With the color ramp copied to your clip, run it, and style your map.
