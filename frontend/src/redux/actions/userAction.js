export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";

const fetchUserSuccess = user => ({
  type: FETCH_USER_SUCCESS,
  payload: user 
});

// fetch products
export const fetchUser = user => {
  return dispatch => {
    dispatch(fetchUserSuccess(user))
  };
};
//delete products

