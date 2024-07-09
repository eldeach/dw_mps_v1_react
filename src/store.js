import { configureStore, createSlice } from '@reduxjs/toolkit' // redux 기본 라이브러리

import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { persistStore, persistReducer } from 'redux-persist'
import { combineReducers } from 'redux'

const envClient = createSlice({
  name: 'envClient',
  initialState: { lang: [],menu: []},
  reducers: {
    setEnvClientLang: (state, action) => {
      state.lang = action.payload
    },
    setEnvClientMenu: (state, action) => {
      state.menu = action.payload
    },
  }
})
export const { setEnvClientLang, setEnvClientMenu} = envClient.actions

const openDrawer = createSlice({
  name: 'openDrawer',
  initialState: false,
  reducers: {
    setOpenDrawer: (state, action) => {
      return state = action.payload
    },
  }
})
export const { setOpenDrawer } = openDrawer.actions


const backDrop = createSlice({
  name: 'backDrop',
  initialState: false,
  reducers: {
    setBackDrop: (state, action) => {
      return state = action.payload
    },
  }
})
export const { setBackDrop } = backDrop.actions


// export default configureStore({
//   reducer: {
//     envClient: envClient.reducer,
//     openDrawer: openDrawer.reducer,
//     backDrop: backDrop.reducer,
//   }
// }) 

// Persist config
const persistConfig = {
  key: 'root',
  storage,
}

// Combine reducers
const rootReducer = combineReducers({
  envClient: envClient.reducer,
  openDrawer: openDrawer.reducer,
  backDrop: backDrop.reducer,
})

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer)

// Create store
const store = configureStore({
  reducer: persistedReducer,
})

// Persistor
const persistor = persistStore(store)

export { store, persistor }