import React, {Component} from 'react';
import InputField from './InputField';

export class Framework extends Component {
  // render() {
  //   console.log('it works');
  //   return (<h1>it works here too</h1>);
  // }
  constructor(...args) {
    super(...args);
    this.state = {
      h6Props: 'msg msg-error',
      padded: 'padded',
      header: 'header',
      centered: 'text-center padded'
    };
  }

  render() {
    return (
      <div className="off-white-background">
        <header><h1>Allergen List Lookup App (ALLA)</h1></header>
        <main>
          <section>
            <h2>Eat Without Dying!</h2>
            <div className="warning">
              <h6>This app is not medical advice. We cannot guarantee that a dish is allergen-free.</h6>
              <h6>Please make healthy, informed decisions.</h6>
            </div>
          </section>
          <InputField/>
        </main>
      </div>
    );
  }
}
