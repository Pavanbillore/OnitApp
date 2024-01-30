import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthorized: false,
    isLoggedIn: false,
    onboardingShown: false,
    userId: '',
    accessToken: '',
    userData: {},
    latitude: '',
    longitude: '',
    cityRedux: '',
    countryRedux: '',
    name: '',
    region: '',
    locality: '',
    houseRedux: '',
    streetNumber: '',
    pincodeRedux: '',
    profileImageUrl: '',
    allServices: [],
    userNumber: '',
    currentAddress: '',
    activeBookings: {},
    completedBookings: {},
    userContacts: [],
    userDocuments: [],
    vehiclelistdata: [],
  },
  reducers: {
    login: (state, action) => {
      state.isAuthorized = true;
      state.accessToken = action.payload;
    },
    setIsAuthorized: (state) => {
      state.isAuthorized = true;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    setProfileImageUrl: (state, action) => {
      state.profileImageUrl = action.payload;
    },
    logout: state => {
      state.isAuthorized = false;
      state.isLoggedIn = false;
      state.accessToken = '';
      state.userData = {};
      state.profileImageUrl = '';
      state.userId = '';
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    setAllServices: (state, action) => {
      state.allServices = action.payload;
    },
    updateLatitude: (state, action) => {
      state.latitude = action.payload;
    },
    updateLongitude: (state, action) => {
      state.longitude = action.payload;
    },
    setCityRedux: (state, action) => {
      state.cityRedux = action.payload;
    },
    setCountryRedux: (state, action) => {
      state.countryRedux = action.payload;
    },
    setLocalityRedux: (state, action) => {
      state.locality = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    setRegion: (state, action) => {
      state.region = action.payload;
    },
    setHouseRedux: (state, action) => {
      state.houseRedux = action.payload;
    },
    setStreetNumber: (state, action) => {
      state.streetNumber = action.payload;
    },
    setPincodeRedux: (state, action) => {
      state.pincodeRedux = action.payload;
    },
    setUserNumber: (state, action) => {
      state.userNumber = action.payload;
    },
    setCurrentAddress: (state, action) => {
      state.currentAddress = action.payload;
    },
    setActiveBookings: (state, action) => {
      state.activeBookings = action.payload;
    },
    setCompletedBookings: (state, action) => {
      state.completedBookings = action.payload;
    },
    setUserContacts: (state, action) => {
      state.userContacts = action.payload;
    },
    setUserDocuments: (state, action) => {
      state.userDocuments = action.payload;
    },
    setVehicleData: (state, action) => {
      state.vehiclelistdata = action.payload;
    }
  },
});

export const {
  login,
  setActiveBookings,
  setCompletedBookings,
  setVehicleData,
  setUserContacts,
  setUserDocuments,
  setIsAuthorized,
  setUserData,
  updateLatitude,
  updateLongitude,
  setCityRedux,
  setCountryRedux,
  setLocalityRedux,
  setName,
  setRegion,
  setHouseRedux,
  setStreetNumber,
  setPincodeRedux,
  logout,
  setAccessToken,
  setProfileImageUrl,
  setUserId,
  setAllServices,
  setUserNumber,
  setCurrentAddress
} = authSlice.actions;

export default authSlice.reducer;
