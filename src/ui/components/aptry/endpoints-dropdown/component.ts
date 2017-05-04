import Component, { tracked } from '@glimmer/component';
import ENDPOINTS from '../../../../utils/endpoints';

export default class EndpointsDropdown extends Component {
  endpoints = ENDPOINTS;

  args: {
    selectedEndpoint: {};
    onDismiss: () => void;
    onSelect: ({}) => void;
  }

  handleEvent() {
    this.args.onDismiss();
    return true;
  }

  // Ability to do addEventListener('click', () => {}, { once: true }) would be
  // better, a background overlay div that listens for a click would probably
  // be good too
  didInsertElement() {
    document.addEventListener('click', this, false);
  }

  willDestroy() {
    document.removeEventListener('click', this, false);
  }
}
