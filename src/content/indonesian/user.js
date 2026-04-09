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
    title: { highlight: "Selamat Datang" },
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
        externalButton: "Masuk sebagai pengunjung",
      },
      {
        gap: true,
        minLength: "5",
        type: "password",
        name: "password",
        maxLength: "100",
        icons: "lock-closed",
        customInput: "input",
        externalButton: "Masuk sebagai pengunjung",
        placeholder: "password*",
        description: "Silakan masuk menggunakan email dan kata sandi yang sudah terdaftar.",
      },
     ]
    }
  },
  register: {
    title: { highlight: "Yuk Mulai Sekarang" },
    forms: {
     initial_values: { email: '', password: '' },
     datas: [
      {
        name: "email",
        type: "email",
        icons: "mail",
        maxLength: "35",
        minLength: "10",
        externalButton: "Masuk sebagai pengunjung",
        placeholder: "email*",
        customInput: "input",
        info: "Gunakan format email yang baik dan benar, misalnya nama@gmail.com"
      },
      {
        minLength: "5",
        type: "password",
        name: "password",
        maxLength: "100",
        icons: "lock-closed",
        customInput: "input",
        externalButton: "Masuk sebagai pengunjung",
        placeholder: "password*",
        description: "Gunakan email yang valid dan kata sandi yang aman untuk membuat akun kamu.",
        info: "Gunakan minimal 5 karakter, bisa kombinasi huruf dan angka ya."
      },
     ]
    }
  }
};