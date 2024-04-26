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



export default configureStore({
  reducer: {
    envClient: envClient.reducer, // 여기서 선언된 key가 useSelector에서 사용할 key 값임
    openDrawer: openDrawer.reducer, // 여기서 선언된 key가 useSelector에서 사용할 key 값임
  }
}) 