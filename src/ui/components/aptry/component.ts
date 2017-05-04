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
  @tracked formattedResponse = '';

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
    console.log(this.currentPath);
  }

  keyPressed(event) {
    if (ENTER !== event.which) {
      return;
    }

    this.updateConsole();
  }

  updateConsole() {
    this.isFetching = true;

    let headers = new Headers({
      Authorization: `Token token="${API_KEY}"`
    });

    fetch(`https://lcboapi.com/${this.currentPath}`, {
      headers: headers
    }).then((res) => {
      res.json().then((data) => {
        let json = JSON.stringify(data, null, 2);
        this.formattedResponse = Prism.highlight(json, JSON_GRAMMAR);
        this.isFetching = false;
      });
    }, (err) => {
      this.formattedResponse = '<span class="err">[404] Not found 😢</span>';
      this.isFetching = false;
    });
  }
}
