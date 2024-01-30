//This can be replaced by service list coming from API later
import React from "react";
const homeList = [
  {
    id: 1,
    name: "Tasks & Reminders",
    img: require("../assets/logo/Task.png"),
    isDefault: false,
    screen: '',
    mainTab: "TaskManager",
    secondaryTab: "Reminders",
  },
  {
    id: 2,
    name: "Money Manager",
    img: require("../assets/logo/Money.png"),
    isDefault: false,
    screen: '',
    mainTab: "MoneyManager",
    secondaryTab: "PersonalCare",
  },

  {
    id: 4,
    name: "Contacts & Documents",
    img: require("../assets/logo/Contact.png"),
    isDefault: false,
    screen: '',
    mainTab: "Contacts",
    secondaryTab: "Documents",
  },
  {
    id: 5,
    name: "Service Needs",
    img: require("../assets/logo/Service.png"),
    isDefault: true,
    screen: "ServiceNeeds",
    mainTab: '',
    secondaryTab: ''
  },
  {
    id: 6,
    name: "Pick & Drop",
    img: require("../assets/logo/location.png"),
    isDefault: false,
    screen: '',
    mainTab: "PickDrop",
    secondaryTab: "",
  },
  {
    id:7,
    name:"More",
    img:require("../assets/logo/plus-fotor-bg-remover-2023070513411.png"),
    isDefault:false,
    screen:'PaymentService',
    mainTab:"PaymentService",
    secondaryTab:"",
  }
];

export default homeList;
