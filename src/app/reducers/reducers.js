import { ALBUM_PENDING, ALBUM_SUCCESS, ALBUM_FAILURE } from '../types/types';

const initialAlbumState = {
  pending: false,
  albums: [],
  err: null,
  date: null
};

export const albumReducer = (state = initialAlbumState, action = {}) => {
  switch (action.type) {
    case ALBUM_PENDING:
      return Object.assign({}, state, { pending: true });
    case ALBUM_SUCCESS:
      return Object.assign({}, state, {
        pending: false,
        albums: action.payload.result,
        date: action.payload.date
      });
    case ALBUM_FAILURE:
      return Object.assign({}, state, { pending: false, err: action.payload });
    default:
      return state;
  }
};
