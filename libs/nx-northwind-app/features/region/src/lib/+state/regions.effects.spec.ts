import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as RegionsActions from './regions.actions';
import { RegionsEffects } from './regions.effects';

describe('RegionsEffects', () => {
  let effects: RegionsEffects;
  let actions: Observable<Action>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        RegionsEffects,
        provideMockActions(() => actions),
        provideMockStore()
      ]
    });

    effects = TestBed.inject(RegionsEffects);
  });

  describe('initRegions$', () => {
    it('should work', () => {
      actions = hot('-a-|', {
        a: RegionsActions.initRegions()
      });
      const expected = hot('', {
        a: RegionsActions.loadRegionsSuccess({ regions: [] })
      });
      expect(effects.initRegions$).toBeObservable(expected);
    });

    it('should not work', () => {
      actions = hot('-a-|', {
        a: RegionsActions.initRegions()
      });
      const expected = hot('-a-|', {
        a: RegionsActions.loadRegionsFailure({
          error: 'Failed'
        })
      });
      expect(effects.initRegions$).not.toBeObservable(expected);
    });
  });

  describe('initRegion$', () => {
    it('should work', () => {
      actions = hot('---|', {
        a: RegionsActions.initRegion({ selectedId: '100' })
      });
      const expected = hot('---|', {
        a: RegionsActions.loadRegionSuccess({
          region: {
            regionID: '100',
            regionDescription: 'Test A'
          }
        })
      });
      expect(effects.initRegions$).toBeObservable(expected);
    });

    it('should not work', () => {
      actions = hot('---|', {
        a: RegionsActions.initRegion({ selectedId: '100' })
      });
      const expected = hot('---|', {
        a: RegionsActions.loadRegionFailure({
          error: 'Failed'
        })
      });
      expect(effects.initRegion$).toBeObservable(expected);
    });
  });

  describe('postRegion$', () => {
    it('should work', () => {
      actions = hot('---|', {
        a: RegionsActions.postRegion({
          newRegion: {
            regionID: '105',
            regionDescription: 'Test A'
          }
        })
      });
      const expected = hot('---|', {
        a: RegionsActions.postRegionSuccess({
          region: {
            regionID: '105',
            regionDescription: 'Test A'
          }
        })
      });
      expect(effects.postRegion$).toBeObservable(expected);
    });

    it('should not work', () => {
      actions = hot('---|', {
        a: RegionsActions.postRegion({
          newRegion: {
            regionID: '105',
            regionDescription: 'Test A'
          }
        })
      });
      const expected = hot('---|', {
        a: RegionsActions.postRegionFailure({
          error: 'Failed'
        })
      });
      expect(effects.initRegion$).toBeObservable(expected);
    });
  });

  describe('putRegion$', () => {
    it('should work', () => {
      actions = hot('---|', {
        a: RegionsActions.putRegion({
          selectedId: '110',
          putRegion: {
            regionID: '110',
            regionDescription: 'Test A'
          }
        })
      });
      const expected = hot('---|', {
        a: RegionsActions.putRegionSuccess({
          region: {
            regionID: '110',
            regionDescription: 'Test A'
          }
        })
      });
      expect(effects.putRegion$).toBeObservable(expected);
    });

    it('should not work', () => {
      actions = hot('---|', {
        a: RegionsActions.putRegion({
          selectedId: '110',
          putRegion: {
            regionID: '110',
            regionDescription: 'Test A'
          }
        })
      });
      const expected = hot('---|', {
        a: RegionsActions.putRegionFailure({
          error: 'Failed'
        })
      });
      expect(effects.putRegion$).toBeObservable(expected);
    });
  });

  describe('deleteRegion$', () => {
    it('should work', () => {
      actions = hot('---|', {
        a: RegionsActions.deleteRegion({
          delRegion: {
            regionID: '110',
            regionDescription: 'Test A'
          }
        })
      });
      const expected = hot('---|', {
        a: RegionsActions.deleteRegionSuccess()
      });
      expect(effects.deleteRegion$).toBeObservable(expected);
    });

    it('should not work', () => {
      actions = hot('---|', {
        a: RegionsActions.deleteRegion({
          delRegion: {
            regionID: '110',
            regionDescription: 'Test A'
          }
        })
      });
      const expected = hot('---|', {
        a: RegionsActions.deleteRegionFailure({
          error: 'Failed'
        })
      });
      expect(effects.deleteRegion$).toBeObservable(expected);
    });
  });
});
