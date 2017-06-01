'use strict';
const os = require('os');
const ffi = require('nodobjc');

const FONT_ATTR_NORMAL = 'Normal';
const FONT_STYLES = {
  [1]: 'Italic',
  [2]: 'Bold'
};
const FONT_WIDTHS = {
  [1]: 'Narrow',
  [2]: 'Expanded',
  [4]: 'Condensed',
  [8]: 'SmallCaps'
};
const FONT_LAYOUTS = {
  [4]: 'Monospace'
};
const FONT_WEIGHTS = {
  [1]: 'Thin',
  [2]: 'Thin',
  [3]: 'Light',
  [4]: 'Regular',
  [5]: 'Regular',
  [6]: 'Medium',
  [7]: 'Medium',
  [8]: 'SemiBold',
  [9]: 'Bold',
  [10]: 'ExtraBold',
  [11]: 'Black'
};

const getStyle = bits => (FONT_STYLES[(bits & 0xf) >> 0] || FONT_ATTR_NORMAL);
const getWidth = bits => (FONT_WIDTHS[(bits & 0xff) >> 4] || FONT_ATTR_NORMAL);
const getLayout = bits => (FONT_LAYOUTS[(bits & 0xfff) >> 8] || FONT_ATTR_NORMAL);
const getWeight = bits => (FONT_WEIGHTS[(bits & 0xffff) >> 12] || FONT_ATTR_NORMAL);

const getAttributes = bits => {
  return {
    style: getStyle(bits),
    width: getWidth(bits),
    layout: getLayout(bits),
    weight: getWeight(bits)
  }
};

const createFontList = (options, callback) => {
  ffi.framework('AppKit');

  const fonts = {};
  const familyEnum = ffi.NSFontManager('sharedFontManager')('availableFontFamilies')('objectEnumerator');
  let family;

  while ((family = familyEnum('nextObject'))) {
    const memberEnum = ffi.NSFontManager('sharedFontManager')('availableMembersOfFontFamily', family)('objectEnumerator');
    const variants = (fonts[family('UTF8String')] = []);
    let member;

    while ((member = memberEnum('nextObject'))) {
      const tbits = +member('objectAtIndex', 3)('stringValue')('UTF8String');
      const wbits = +member('objectAtIndex', 2)('stringValue')('UTF8String');
      const bits = (wbits << 12) | tbits;
      variants.push(options.expanded ? getAttributes(bits) : bits);
    }
  }
  callback(fonts);
}


module.exports = (options) => {
  return new Promise((resolve, reject) => {
    if (os.platform() !== 'darwin') {
      reject(`macOS/OSX system required (detected ${os.platform()})`)
    }

    options = Object.assign({
      expanded: false
    }, options);

    createFontList(options, resolve);
  });
};
