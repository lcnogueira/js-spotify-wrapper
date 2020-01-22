import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import {
  search, searchAlbuns, searchArtists, searchTracks, searchPlaylists,
} from '../src/main';

global.fetch = require('node-fetch');

chai.use(sinonChai);

describe('Spotify Wrapper', () => {
  describe('Smoke tests', () => {
    it('should exist the search method', () => {
      expect(search).to.exist;
    });

    it('should exist the searchAlbuns method', () => {
      expect(searchAlbuns).to.exist;
    });

    it('should exist the searchArtists method', () => {
      expect(searchArtists).to.exist;
    });

    it('should exist the searchTracks method', () => {
      expect(searchTracks).to.exist;
    });

    it('should exist the searchPlaylist method', () => {
      expect(searchPlaylists).to.exist;
    });
  });

  describe('Generic Search', () => {
    let stubedFetch;
    let promise;

    beforeEach(() => {
      stubedFetch = sinon.stub(global, 'fetch');
      promise = stubedFetch.resolves({ json: () => ({ body: 'json' }) });
    });

    afterEach(() => {
      stubedFetch.restore();
    });

    it('should call fetch function', () => {
      const artists = search();
      expect(stubedFetch).to.have.been.calledOnce;
    });

    it('should receive the correct URL to fetch', () => {
      context('passing one type', () => {
        const artists = search('Incubus', 'artist');
        expect(stubedFetch).to.have.been
          .calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist');

        const albuns = search('Incubus', 'album');
        expect(stubedFetch).to.have.been
          .calledWith('https://api.spotify.com/v1/search?q=Incubus&type=album');
      });

      context('passing more than one type', () => {
        const artistsAndAlbums = search('Incubus', ['artist', 'album']);
        expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist,album');
      });
    });

    it('should return the correct JSON Data from the Promise', () => {
      search('Incubus', 'artist').then((data) => {
        expect(data).to.be.eql({ body: 'json' });
      });
    });
  });
});
