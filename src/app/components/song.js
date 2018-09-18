import React from 'react';

const songStyle = {
  fontFamily: 'New Rocker',
  paddingLeft: '20px',
  color: '#d5008f'
};

const Song = ({ position, song, artist }) => (
  <div>
    <h3 className="grow dib" style={songStyle}>
      {`${position}. ${song} - ${artist}`}
    </h3>
    <br />
  </div>
);

export default Song;
