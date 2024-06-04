import { configureStore, createSlice } from '@reduxjs/toolkit' // redux 기본 라이브러리

const envClient = createSlice({
  name: 'envClient',
  initialState: { lang: [], menu: [], plantlist : [], appBarTitle : '' },
  reducers: {
    setEnvClientLang: (state, action) => {
      state.lang = action.payload
    },
    setEnvClientMenu: (state, action) => {
      state.menu = action.payload
    },
    setEnvClientPlantlist: (state, action) => {
      state.plantlist = action.payload
    },
    setEnvClientAppBarTitle: (state, action) => {
      state.appBarTitle = action.payload
    },
  }
})
export const { setEnvClientLang, setEnvClientMenu, setEnvClientPlantlist, setEnvClientAppBarTitle } = envClient.actions

const openDrawer = createSlice({
  name: 'openDrawer',
  initialState: false,
  reducers: {
    setOpenDrawer: (state) => {
      return state = !state
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

const sessCtrl = createSlice({ 
  name: 'sessCtrl',
  initialState: { scLoginStat: false, scCloseExp: false, scExpDateTime : null }, //expDateTime는 ISO String 담을 것
  reducers: {
    setscLoginStat: (state, action) => {
      state.scLoginStat = action.payload
    },
    setscCloseExp: (state, action) => {
      state.scCloseExp = action.payload
    },
    setscExpDateTime: (state, action) => {
      state.scExpDateTime = action.payload
    },
    scUpdate: (state, action) => {
      state.scLoginStat = true
      state.scCloseExp = false
      state.scExpDateTime = action.payload
    },
    scExpire: (state) => {
      state.scLoginStat = false
      state.scCloseExp = false
      state.scExpDateTime = null
    },
  }
})
export const { setscLoginStat, setscCloseExp, setscExpDateTime, scUpdate, scExpire } = sessCtrl.actions



export default configureStore({
  reducer: {
    envClient: envClient.reducer,
    openDrawer: openDrawer.reducer,
    backDrop: backDrop.reducer,
    sessCtrl: sessCtrl.reducer, 
  }
}) 