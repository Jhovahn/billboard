import React from 'react';
import Song from './song.js';

const SongList = ({ list }) => {
  return (
    <div>
      {list.map((el, index) => (
        <Song
          key={index}
          song={el.song}
          artist={el.artist}
          position={el.position}
        />
      ))}
    </div>
  );
};

export default SongList;
