import axios from 'axios';

import { ALBUM_PENDING, ALBUM_SUCCESS, ALBUM_FAILURE } from '../types/types';

export const fetchAlbums = () => dispatch => {
  dispatch({ type: ALBUM_PENDING });
  axios
    .get('/albums')
    .then(data => {
      dispatch({ type: ALBUM_SUCCESS, payload: data.data });
    })
    .catch(err => dispatch({ type: ALBUM_FAILURE, payload: err }));
};
