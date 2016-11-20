'use strict';

module.exports.serializeColors = function serializeColors(colors) {
  if (!colors) {
    return '';
  }

  return R.map(c => {
    switch (c) {
      case 'White':
        return 'w'
      case 'Blue':
        return 'u'
      case 'Black':
        return 'b'
      case 'Red':
        return 'r'
      case 'Green':
        return 'g'
    }
  }, colors).join('');
};
