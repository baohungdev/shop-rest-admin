import { stateToHTML } from 'draft-js-export-html';

export default state => {
  return stateToHTML(state.getCurrentContent());
};
