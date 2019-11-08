import {SESSION_LOGIN_FAILED, SESSION_LOGIN_REQUEST ,SESSION_LOGIN_SUCCESS, SESSION_LOGOUT,
  SESSION_USER_INFO_REQUEST, SESSION_USER_INFO_REQUEST_SUCCESS, SESSION_USER_INFO_REQUEST_FAILED} from '../actions/sessionActions';

const initialState = {
  loggedIn: false,
  authenticToken: "",
  user: {
    accountName: '',
    userName: "",
    role: '' // ['USER']
  },
  // To be Done
  detailedUserInfo: {}
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SESSION_LOGIN_REQUEST: {
      return state;
    }

    case SESSION_LOGIN_SUCCESS: {
      let token = action.content.tokenType+' '+action.content.accessToken
      return {...state, loggedIn: true, authenticToken: token}
    }

    case SESSION_LOGIN_FAILED: {
      return state;
    }

    case SESSION_LOGOUT: {
      return {loggedIn: false, authenticToken: '', user: {accountName: '', userName: "", role: ''}};
    }

    case SESSION_USER_INFO_REQUEST: {
      return state;
    }

    case SESSION_USER_INFO_REQUEST_SUCCESS: {
      return {...state, user: {accountName: '', userName: "", role: ''}};
    }

    case SESSION_USER_INFO_REQUEST_FAILED: {
      return {loggedIn: false, authenticToken: '', user: {accountName: '', userName: "", role: ''}};
    }

    default: {
      return state;
    }
  }
};

export default sessionReducer;
