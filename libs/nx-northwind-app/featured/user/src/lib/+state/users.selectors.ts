import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UsersState, USERS_FEATURE_KEY } from './users.reducer';

export const selectUsersState =
  createFeatureSelector<UsersState>(USERS_FEATURE_KEY);

export const selectUsersLoaded = createSelector(
  selectUsersState,
  (state: UsersState) => {
    return state.loaded;
  }
);

export const selectUsersError = createSelector(
  selectUsersState,
  (state: UsersState) => {
    return state.error;
  }
);

export const selectAllUsers = createSelector(
  selectUsersState,
  (state: UsersState) => {
    return state.users;
  }
);

export const selectUser = createSelector(
  selectUsersState,
  (state: UsersState) => {
    return state.user;
  }
);

// export const selectSelectedUser = createSelector(
//   selectAllUsers,
//   selectSelectedId,
//   (users, selectedId) =>
//     selectedId
//       ? users.find((item) => item.id === selectedId)
//       : undefined
// );
