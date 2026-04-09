import Login from "@/pages/user/login"
import Register from "@/pages/user/register"

export const user = {
  pagination: [
    {
      icon: "person",
      component: Login,
      routes: "/user/login"
    },
    {
      icon: "receipt",
      component: Register,
      routes: "/user/register"
    },
  ],
  login: {
    title: { highlight: "Login to get started" },
    forms: {
     initial_values: { email: '', password: '' },
     datas: [
      {
        gap: true,
        name: "email",
        type: "email",
        icons: "mail",
        maxLength: "35",
        minLength: "10",
        placeholder: "email*",
        customInput: "input",
        externalButton: "login as a visitor",
      },
      {
        gap: true,
        minLength: "5",
        type: "password",
        name: "password",
        maxLength: "100",
        icons: "lock-closed",
        customInput: "input",
        externalButton: "login as a visitor",
        placeholder: "password*",
        description: "Please sign in using your registered email and password.",
      },
     ]
    }
  },
  register: {
    title: { highlight: "Register to access" },
    forms: {
     initial_values: { email: '', password: '' },
     datas: [
      {
        name: "email",
        type: "email",
        icons: "mail",
        maxLength: "35",
        minLength: "10",
        placeholder: "email*",
        customInput: "input",
        externalButton: "login as a visitor",
        info: "Enter email in valid format must be use @ for example: yourname@gmail.com or other."
      },
      {
        minLength: "5",
        type: "password",
        name: "password",
        maxLength: "100",
        icons: "lock-closed",
        customInput: "input",
        externalButton: "login as a visitor",
        placeholder: "password*",
        description: "Create your account with a valid email and a secure password.",
        info: "Use at least 5 characters, a combination of letters & numbers."
      },
     ]
    }
  }
};