process.on('message', function (msg) {
  process.send([
    'a'.localeCompare('a'),
    'ä'.localeCompare('z', 'de'),
    'ä'.localeCompare('a', 'sv', { sensitivity: 'base' }),
  ]);
});
