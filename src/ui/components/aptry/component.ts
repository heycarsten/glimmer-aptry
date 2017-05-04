import Component, { tracked } from '@glimmer/component';
import ENDPOINTS    from '../../../utils/endpoints';
import API_KEY      from '../../../utils/api-key';
import JSON_GRAMMAR from '../../../utils/json-grammar';

declare const Prism;
const ENTER = 13;

export default class APTry extends Component {
  @tracked isOpen            = false;
  @tracked isFetching        = true;
  @tracked selectedEndpoint  = null;
  @tracked currentPath       = null;
  @tracked responseJSON      = null;

  didInsertElement() {
    this.selectEndpoint(ENDPOINTS[0]);
  }

  openDropdown() {
    this.isOpen = true;
  }

  closeDropdown() {
    this.isOpen = false;
  }

  selectEndpoint(endpoint) {
    this.selectedEndpoint = endpoint;
    this.currentPath = endpoint.path;
    this.updateConsole();
  }

  pathChanged(event) {
    this.currentPath = event.target.value;
  }

  keyPressed(event) {
    if (ENTER !== event.which) {
      return;
    }

    this.updateConsole();
  }

  @tracked('responseJSON') get formattedResponse() {
    let json = JSON.stringify(this.responseJSON, null, 2);
    return Prism.highlight(json, JSON_GRAMMAR);
  }

  updateConsole() {
    this.isFetching = true;

    fetch(`https://lcboapi.com/${this.currentPath}`, {
      headers: new Headers({
        Authorization: `Token token="${API_KEY}"`
      })
    }).then((res) => {
      res.json().then((data) => {
        this.responseJSON = data;
        this.isFetching = false;
      });
    }, (err) => {
      this.responseJSON = { error: '[404] Not found 😢' };
      this.isFetching = false;
    });
  }
}
