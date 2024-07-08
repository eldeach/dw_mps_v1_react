import { configureStore, createSlice } from '@reduxjs/toolkit' // redux 기본 라이브러리

const envClient = createSlice({
  name: 'envClient',
  initialState: { lang: [], langlist:[], menu: [], plantlist : [] },
  reducers: {
    setEnvClientLang: (state, action) => {
      state.lang = action.payload
    },
    setEnvClientLanglist: (state, action) => {
      state.langlist = action.payload
    },
    setEnvClientMenu: (state, action) => {
      state.menu = action.payload
    },
    setEnvClientPlantlist: (state, action) => {
      state.plantlist = action.payload
    },
  }
})
export const { setEnvClientLang, setEnvClientLanglist, setEnvClientMenu, setEnvClientPlantlist  } = envClient.actions

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

const sessCtrl = createSlice({ 
  name: 'sessCtrl',
  initialState: { loginStat: false, closeExp: false, scExpDateTime : null }, //expDateTime는 ISO String 담을 것
  reducers: {
    setLoginStat: (state, action) => {
      state.loginStat = action.payload
    },
    setCloseExp: (state, action) => {
      state.closeExp = action.payload
    },
    setscExpDateTime: (state, action) => {
      state.scExpDateTime = action.payload
    },
    scUpdate: (state, action) => {
      state.loginStat = true
      state.closeExp = false
      state.scExpDateTime = action.payload
    },
    scExpire: (state) => {
      state.loginStat = false
      state.closeExp = false
      state.scExpDateTime = null
    },
  }
})
export const { setLoginStat, setCloseExp, setscExpDateTime, scUpdate, scExpire } = sessCtrl.actions



export default configureStore({
  reducer: {
    envClient: envClient.reducer,
    openDrawer: openDrawer.reducer,
    backDrop: backDrop.reducer,
    sessCtrl: sessCtrl.reducer, 
  }
}) 