# local-fonts-macos


> (WIP) Finds all locally installed fonts on macOS


Uses an [Objective-C FFI](https://github.com/TooTallNate/NodObjC) to access the [NSFontManager](https://developer.apple.com/reference/appkit/nsfontmanager) class and generate a list of locally installed and available fonts along with their attributes.

## Install

```
$ npm install --save local-fonts-macos
```


## Usage

### Default

Without passing in any options an object is returned containing every available font family and
an array of integers encoded with the attributes of each variant within the family.

```js
const findLocalFonts = require('local-fonts-macos');
findLocalFonts().then(fonts => console.log(fonts));
// {  
//   'Abril Fatface': [ 49154 ],
//   Acre: [ 24576 ],
//   'Advent Pro': [ 20480, 12288, 12288, 24576, 32770, 36866, 12352 ],
//   'Afta serif': [ 20480, 20481 ],

```

### Expanded

Optionally have the encoded attributes expanded, but this is really slow and redundant.

```js
const findLocalFonts = require('local-fonts-macos');
findLocalFonts({ expanded: true }).then(fonts => console.log(fonts));
//   'Abril Fatface':
//    [ { postscriptName: 'AbrilFatface-Regular',
//        style: 'Bold',
//        width: 'Normal',
//        layout: 'Normal',
//        weight: 'Normal' } ],
//   Acre:
//    [ { postscriptName: 'Acre-Medium',
//        style: 'Normal',
//        width: 'Normal',
//        layout: 'Normal',
//        weight: 'Medium' } ],
//   'Advent Pro':
//    [ { postscriptName: 'AdventPro-Regular',
//        style: 'Normal',
//        width: 'Normal',
//        layout: 'Normal',
//        weight: 'Regular' },
//      { postscriptName: 'AdventPro-ExtraLight',
//        style: 'Normal',
//        width: 'Normal',
//        layout: 'Normal',
//        weight: 'Light' },
//      { postscriptName: 'AdventPro-Light',
//        style: 'Normal',
//        width: 'Normal',
//        layout: 'Normal',
//        weight: 'Light' },
//      { postscriptName: 'AdventPro-Medium',
//        style: 'Normal',
//        width: 'Normal',
//        layout: 'Normal',
//        weight: 'Medium' },
//      { postscriptName: 'AdventPro-SemiBold',
//        style: 'Bold',
//        width: 'Normal',
//        layout: 'Normal',
//        weight: 'SemiBold' },
//      { postscriptName: 'AdventPro-Bold',
//        style: 'Bold',
//        width: 'Normal',
//        layout: 'Normal',
//        weight: 'Bold' },
//      { postscriptName: 'AdventPro-Thin',
//        style: 'Normal',
//        width: 'Condensed',
//        layout: 'Normal',
//        weight: 'Light' } ],
//   'Afta serif':
//    [ { postscriptName: 'Aftaserif',
//        style: 'Normal',
//        width: 'Normal',
//        layout: 'Normal',
//        weight: 'Regular' },
//      { postscriptName: 'Aftaserif-Italic',
//        style: 'Italic',
//        width: 'Normal',
//        layout: 'Normal',
//        weight: 'Regular' } ],
// ...............

```

## Attribute encoding

```

Styles (bits 1-4)
1 - Italic
2 - Bold

Widths (bits 5-8)
1 - Narrow
2 - Expanded
4 - Condensed
8 - SmallCaps

Layouts (bits 9-12)
4 - Monospace

Weights (bits 13-16)
1 - Thin
2 - Thin
3 - Light
4 - Regular
5 - Regular
6 - Medium
7 - Medium
8 - SemiBold
9 - Bold
10 - ExtraBold
11 - Black
```


### TODO

Working on implementing a bridge to the [Core Text](https://developer.apple.com/reference/coretext) framework to query additional font attributes/descriptors and allow access to more low-level functionalities involved in creating/displaying fonts.



## License

MIT © [Scott M. Rogers](http://scottrogers.tech)
