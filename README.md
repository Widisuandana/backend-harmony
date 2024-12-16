# Villa Booking App Backend

Backend untuk aplikasi booking villa dengan fitur manajemen user, CRUD villa, manajemen ketersediaan, pencarian, dan sistem review.

## Prasyarat

Sebelum Anda memulai, pastikan Anda telah menginstal:

- [Node.js](https://nodejs.org/) (versi 14 atau lebih baru)
- [Docker](https://www.docker.com/) dan [Docker Compose](https://docs.docker.com/compose/install/)

## Instalasi

1. Clone repositori ini:
   ```
   git clone https://github.com/yourusername/villa-booking-app.git
   cd villa-booking-app
   ```

2. Instal dependensi:
   ```
   npm install
   ```

## Konfigurasi

1. Buat file `.env` di root proyek dan isi dengan konfigurasi berikut:
   ```
   PORT=5000
   MONGODB_URI=mongodb://mongo:27017/villa_booking_app
   JWT_SECRET=your_jwt_secret_key
   JWT_REFRESH_SECRET=your_jwt_refresh_secret_key
   ```

   Ganti `your_jwt_secret_key` dan `your_jwt_refresh_secret_key` dengan string acak yang aman.

## Menjalankan Aplikasi

1. Jalankan aplikasi menggunakan Docker Compose:
   ```
   docker-compose up --build
   ```

   Ini akan membangun dan menjalankan aplikasi beserta database MongoDB dalam container Docker.

2. Aplikasi akan berjalan di `http://localhost:5000`.

## Penggunaan API

Berikut adalah endpoint utama yang tersedia:

### User

- Register: `POST /api/users/register`
- Login: `POST /api/users/login`
- Refresh Token: `POST /api/users/refresh-token`

### Villa

- Get All Villas: `GET /api/villas`
- Search Villas: `GET /api/villas/search`
- Get Villa by ID: `GET /api/villas/:id`
- Create Villa: `POST /api/villas` (Admin only)
- Update Villa: `PUT /api/villas/:id` (Admin only)
- Delete Villa: `DELETE /api/villas/:id` (Admin only)

### Booking

- Create Booking: `POST /api/bookings`
- Get User Bookings: `GET /api/bookings/user`
- Get Booking by ID: `GET /api/bookings/:id`
- Cancel Booking: `PUT /api/bookings/:id/cancel`

### Review

- Create Review: `POST /api/reviews`
- Get Villa Reviews: `GET /api/reviews/villa/:villaId`
- Update Review: `PUT /api/reviews/:id`
- Delete Review: `DELETE /api/reviews/:id`

Untuk detail lengkap tentang payload dan response, silakan lihat file `test.rest`.

## Struktur Proyek

```
villa-booking-app/
├── config/
│   └── jwt.js
├── controllers/
│   ├── userController.js
│   ├── villaController.js
│   ├── bookingController.js
│   └── reviewController.js
├── middleware/
│   └── auth.js
├── models/
│   ├── User.js
│   ├── Villa.js
│   ├── Booking.js
│   └── Review.js
├── routes/
│   ├── userRoutes.js
│   ├── villaRoutes.js
│   ├── bookingRoutes.js
│   └── reviewRoutes.js
├── .env
├── docker-compose.yml
├── Dockerfile
├── package.json
├── server.js
└── test.rest
```

## Teknologi yang Digunakan

- Express.js: Framework web untuk Node.js
- MongoDB: Database NoSQL
- Mongoose: ODM (Object Data Modeling) untuk MongoDB dan Node.js
- JSON Web Token (JWT): Untuk autentikasi dan otorisasi
- bcrypt: Untuk hashing password
- Docker: Untuk kontainerisasi aplikasi

## Pengembangan Lebih Lanjut

Untuk pengembangan lebih lanjut, Anda dapat:

1. Menambahkan validasi input yang lebih ketat
2. Mengimplementasikan sistem pembayaran
3. Menambahkan fitur notifikasi email
4. Mengimplementasikan caching untuk meningkatkan performa
5. Menambahkan unit test dan integration test

Jika Anda memiliki pertanyaan atau mengalami masalah, jangan ragu untuk membuat issue di repositori GitHub.