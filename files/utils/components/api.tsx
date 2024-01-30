// export const BASE_URLS = 'https://api.onit.services/'; //Production
export const BASE_URL = 'https://api.onitservices.in/'    //Testing
export const NEW_BASE_URL = 'http://13.233.255.20/'
// https://api.onit.services/payment/phonepe
// export const pickdrop_API = ' https://api.onit.services/center/public-ticket-booking';
// const CENTER = 'center';
const CONSUMER = 'consumerAppAppRoute/';
const PAYMENT = 'payment/';
const VEHICLE = 'vehicle/'
export const RAZOR_PAY_KEY = 'rzp_test_xbtU9g8sjSB3vN';
// export const RAZOR_PAY_KEY = `rzp_live_yr00EgqO9pvjDt`;
export const API = {
  SENT_OTP: NEW_BASE_URL + CONSUMER + 'sent-otp',
  VERIFY_OTP: NEW_BASE_URL + CONSUMER + 'verify-otp',
  LOGIN_WITH_OTP: NEW_BASE_URL + CONSUMER + 'login-with-otp',
  REGISTER_USER: NEW_BASE_URL + CONSUMER + 'register-consumer',
  GET_ALL_SERVICES: NEW_BASE_URL + 'admin/get-all-active-services',
  CREATE_CONTACTS_FOLDER: NEW_BASE_URL + CONSUMER + 'consumercontactsCreateDir',
  CREATE_CONTACT: NEW_BASE_URL + CONSUMER + 'consumerSetcontacts',
  GET_ALL_CONTACTS: NEW_BASE_URL + CONSUMER + 'consumerGetAllcontacts',
  GET_ALL_CONTACTS_DIRECTORY: NEW_BASE_URL + CONSUMER + 'consumercontactsGetDirName/',
  GET_ALL_DOCUMENTS: NEW_BASE_URL + CONSUMER + 'getAllConsumerDocuments',
  GET_ALL_DOCUMENTS_DIRECTORY: NEW_BASE_URL + CONSUMER + 'consumerDocumentsGetDir/',
  CREATE_NEW_DOCUMENT_DIRECTORY: NEW_BASE_URL + CONSUMER + 'createConsumerDocumentsDir',
  CREATE_TICKET: NEW_BASE_URL + 'center/public-ticket-booking',
  GET_ACTIVE_TICKETS: NEW_BASE_URL + CONSUMER + 'consumerActiveTicket/',
  GET_COMPLETED_TICKETS: NEW_BASE_URL + CONSUMER + 'consumerCompletedTicket/',
  PICK_AND_DROP: NEW_BASE_URL + CONSUMER + 'public-ticket-booking-vehicle',
  CREATE_TASK: NEW_BASE_URL + CONSUMER + 'tasks/createTask',
  GET_ALL_TASKS: NEW_BASE_URL + CONSUMER + 'tasks/getAllTask',
  DELETE_TASK: NEW_BASE_URL + CONSUMER + 'tasks/deleteTask',
  GET_VEHICLE: NEW_BASE_URL + VEHICLE + 'getAll-vehicle',
  CREATE_TICKET_PICK_DROP: NEW_BASE_URL + CONSUMER + 'ticket/create',
  GETTICKETDATA: NEW_BASE_URL + CONSUMER + 'get-only-ticket/',
  WALLET_BALANCE: NEW_BASE_URL + PAYMENT + 'wallet-balance/',

};