import React from 'react';

export default function Header({handleAddLocationModal}) {
  return (
    <header className='app-header'>
        <div className='locations'>Locations</div>
        <div onClick={handleAddLocationModal} className='add-location'>+ Add Location</div>
    </header>
  );
}
