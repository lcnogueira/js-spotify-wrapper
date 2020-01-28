import SpotifyWrapper from '../src/index';

global.fetch = require('node-fetch');

const spotify = new SpotifyWrapper({
  token: 'BQAqCFMS-h3BBbqWqsI8flPCFUZ8ISjaxfmWE1jtV-3GOKcaP7eh-yovrzjDctxW8ex7wmEhaZP1JqorRDes9sfj1d4sjfROM4uDeW_r-JiNistmg_7enlfAUaZhhCGFrbFoZw8',
});

const albums = spotify.search.albums('Muse');

albums.then((data) => data.albums.items.map((item) => console.log(item.name)));
