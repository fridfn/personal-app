import Statistics from "@/pages/dashboard/statistics"
import History from "@/pages/dashboard/history"
import Broadcast from "@/pages/dashboard/broadcast"

export const dashboard = {
  pagination: [
    {
      icon: "calendar",
      requiredRole: ["admin", "owner"],
      component: Statistics,
      routes: "/dashboard/statistics"
    },
    {
      icon: "people",
      requiredRole: ["admin", "owner"],
      component: History,
      routes: "/dashboard/history"
    },
    {
      icon: "mail",
      requiredRole: ["admin", "owner"],
      component: Broadcast,
      routes: "/dashboard/broadcast"
    },
  ],
  personal: {
    title: { highlight: "Statistik" },
    mood: {
      title: {
        highlight: "Mood-mu",
        normal: "Histori"
      },
      datas: [
        {
          label: "happy",
          icons: "sentiment_satisfied",
          description: "Hari ini berasa ringan banget ya, kaya dunia ikut senyum bareng kamu. Simpen energi positif ini, biar bisa jadi bahan bakar buat hari-hari berikutnya"
        },
        {
          label: "calm",
          icons: "sentiment_calm",
          description: "Tenang, adem, dan stabil. Kadang nggak perlu yang heboh, cukup hati yang damai udah bikin segalanya terasa pas"
        },
        {
          label: "netral",
          icons: "sentiment_neutral",
          description: "Hari ini biasa aja? Itu juga nggak apa-apa kok. Justru di momen flat gini, kamu lagi ngumpulin tenaga buat sesuatu yang lebih besar besok"
        },
        {
          label: "sadness",
          icons: "sentiment_dissatisfied",
          description: "Ada yang bikin berat ya? gpp kalau lagi sedih, semua orang pernah di titik ini. Ingat, kamu nggak sendirian, selalu ada jalan buat pelan-pelan bangkit️"
        },
        {
          label: "stressed",
          icons: "sentiment_stressed",
          description: "Rasanya kepala penuh banget sampe bikin capek ya. Gpp kalau lagi kewalahan, coba tarik napas dulu, tenangin diri. Kamu nggak sendirian kok."
        },
        {
          label: "sick",
          icons: "sick",
          description: "Badannya lagi nggak enak? istirahat aja dulu, jangan maksain. Kamu butuh waktu buat pulih. Tenang, pelan-pelan nanti juga sembuh."
        },
        {
          label: "default",
          icons: "mode_standby",
          description: "Aku penasaran, gimana perasaan kamu hari ini? Nggak perlu buru-buru jawab, cukup ambil waktu sejenak buat dengerin dirimu sendiri."
        }
      ]
    },
    statistics: {
       title: {
        highlight: "Mood",
        normal: "Statistik"
      },
       description: "Ada cerita di balik harimu, dimana setiap suasana hati kamu ada banyak rasa yang menyimpan bagian dari dirimu yang terus tumbuh dan membentuk diri kamu yang sekarang ini. semangat yaa...",
      datas: []
    },
    playlist: {
       title: {
        highlight: "Harian-mu",
        normal: "Playlist"
      },
      datas: []
    },
  },
  broadcast: {
    title: { highlight: "Notifikasi" },
    footer: "portofolio ini adalah catatan perjalanan saya yang penuh rasa ingin tahu, ketelitian, dan semangat untuk terus belajar.",
    broadcast: {
      title: {
        highlight: "Notifikasi",
        normal: "Kirimkan"
      },
    },
    history: {
      title: {
        highlight: "Notifikasi",
        normal: "Riwayat"
      },
      datas: []
    },
    forms: {
     initial_values: { title: '', message: '' },
     datas: [
      {
       name: "title",
       type: "text",
       maxLength: "35",
       icons: "pencil",
       placeholder: "title*",
      },
      {
       rows: 8,
       type: "text",
       name: "message",
       maxLength: "190",
       customInput: "textarea",
       placeholder: "message*",
      },
     ]
    }
  },
  history: {
    title: { highlight: "Manajemen" },
    user: {
      title: {
        highlight: "Aktif",
        normal: "Pengguna"
      },
    },
  }
};