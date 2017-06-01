const test = require('ava');
const fn = require('.');

test('unexpanded output (default)', t => {
  fn().then(fonts => {
    console.log(fonts);
  })
  t.pass();
});
test('expanded output', t => {
  fn({ expanded: true }).then(fonts => {
    console.log(fonts);
  })
  t.pass();
});
test('stats', t => {
  fn().then(fonts => {
    const families = Object.keys(fonts);
    const variants = families.reduce((acc, family) => {
      return acc.concat(fonts[family]);
    }, []);
    console.log(fonts);
    console.log(`${families.length} locally installed fonts`);
    console.log(`${variants.length} family variants`);
  });
  t.pass();
});
