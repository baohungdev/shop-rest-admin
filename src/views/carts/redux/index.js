import * as actions from './actions';
import reducer, { name } from './reducers';
import sagas from './sagas';

export { name, actions, sagas };

export default reducer;
