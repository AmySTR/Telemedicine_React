import React, { Component } from 'react';
import EpicMenu from './EpicMenu';



class App extends Component {
  render() {
    let links = [
      { label: 'Home', link: './', active: true },
      { label: 'Create Health Record', link: '../health' },
      { label: 'Search Health Record', link: '../health/search' },
      { label: 'Book Apointment', link: '../appointment' },
      { label: 'Update Apointment', link: '../appointment/update' },
      { label: 'Search Apointment', link: '../appointment/search' },
      { label: 'Create Medication', link: '../medicine' },
      { label: 'Update Medication', link: '../medicine/update' },
      { label: 'Create Bill', link: '../billing' },
      { label: 'Update Bill', link: '../billing/update' },
      { label: 'Search Bill', link: '../billing/search' },
    ];

    return (
      <div className="container center">
        <EpicMenu links={links} />
      </div>
    );
  }
}

export default App;
