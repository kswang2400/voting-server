import { expect } from 'chai';
import { Map, fromJS } from 'immutable';

import reducer from '../src/reducer';

describe('reducer', () => {
  it('has an initial state', () => {
    const action = {
      type: 'SET_ENTRIES',
      entries: ['Trainspotting']
    }

    const newState = reducer(undefined, action);

    expect(newState).to.equal(fromJS({
      entries: ['Trainspotting']
    }));
  });

  it('handles SET_ENTRIES', () => {
    const initialState = Map();
    const action = {
      type: 'SET_ENTRIES',
      entries: ['Trainspotting']
    };

    const newState = reducer(initialState, action);

    expect(newState).to.equal(fromJS({
      entries: ['Trainspotting']
    }));
  });

  it('handles NEXT', () => {
    const initialState = fromJS({
      entries: ['Trainspotting', '28 Days Later']
    });

    const action = { type: 'NEXT' };
    const newState = reducer(initialState, action);

    expect(newState).to.equal(fromJS({
      vote: {
        pair: ['Trainspotting', '28 Days Later']
      },
      entries: []
    }));
  });

  it('handles VOTE', () => {
    const initialState = fromJS({
      vote: {
        pair: ['Trainspotting', '28 Days Later']
      },
      entries: []
    });

    const action = {
      type: 'VOTE',
      entry: 'Trainspotting'
    }

    const newState = reducer(initialState, action);

    expect(newState).to.equal(fromJS({
      vote: {
        pair: ['Trainspotting', '28 Days Later'],
        tally: { 'Trainspotting': 1 }
      },
      entries: []
    }));
  });

  it('can be used with reduce', () => {
    const actions = [
      {type: 'SET_ENTRIES', entries: ['Trainspotting', '28 Days Later']},
      {type: 'NEXT'},
      {type: 'VOTE', entry: 'Trainspotting'},
      {type: 'VOTE', entry: '28 Days Later'},
      {type: 'VOTE', entry: 'Trainspotting'},
      {type: 'NEXT'}
    ];

    const finalState = actions.reduce(reducer, Map());

    expect(finalState).to.equal(fromJS({
      winner: 'Trainspotting'
    }));
  });

});
