/**
 * @openapi
 * /v2/generals/event-check:
 *   get:
 *     tags:
 *       - v2 Event Check
 *     summary: Check date is in event or not
 *     description: Checks if a given date falls within any event period, optionally filtered by mode of transportation.
 *     parameters:
 *       - name: moda
 *         in: query
 *         description: Mode of transportation (optional)
 *         schema:
 *           type: string
 *       - name: date
 *         in: query
 *         description: Date to check (optional, defaults to current date)
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       "200":
 *         description: Successful response indicating if the date is within an event
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 date:
 *                   type: string
 *                   example: "2025-03-22"
 *                 isEvent:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   example: {
 *                     "id": 22,
 *                     "nama": "ANGKUTAN LEBARAN 2025",
 *                     "tipe": "ANGLEB",
 *                     "tanggal_mulai": "2025-03-21",
 *                     "tanggal_selesai": "2025-04-11",
 *                     "prev_event": "[16]",
 *                     "h_1": "2025-03-31",
 *                     "h_2": "2025-04-01",
 *                     "sub_nama": "Titik Sesuai Rencana Operasi",
 *                     "note_narasi": "<ul class=\"list-unstyled categories-list mb-0\">     <li><i class=\"mdi mdi-circle-medium me-1\"></i> Data yang ditampilkan merupakan data berjalan dan bersifat dinamis menyesuaikan dengan bisnis proses dari masing-masing sumber data.</li>     <li><i class=\"mdi mdi-circle-medium me-1\"></i> Data moda <b>Darat</b> menggunakan data pergerakan penumpang berangkat harian pada 115 Terminal Tipe A, 118 Terminal Tipe B dan 191 Terminal Tipe C</li>     <li><i class=\"mdi mdi-circle-medium me-1\"></i> Data moda <b>ASDP</b> menggunakan data pergerakan penumpang berangkat harian pada 162 Pelabuhan Penyeberangan.</li>     <li><i class=\"mdi mdi-circle-medium me-1\"></i> Data moda <b>Laut</b> menggunakan data pergerakan penumpang berangkat harian pada 264 Pelabuhan Laut.</li>     <li><i class=\"mdi mdi-circle-medium me-1\"></i> Data moda <b>Udara</b> menggunakan data pergerakan penumpang berangkat harian pada 60 Bandar Udara - Domestik dan Internasional.</li>     <li><i class=\"mdi mdi-circle-medium me-1\"></i> Data moda <b>Kereta Api</b> menggunakan data pergerakan penumpang berangkat harian pada Pelayanan <b>Perkeretaapian Antarkota</b>.</li>     <li><i class=\"mdi mdi-circle-medium me-1\"></i> Data <b>Jalan Tol</b> menggunakan data pergerakan kendaraan keluar dan masuk harian pada 43 Gerbang Tol (GT).</li>     <li><i class=\"mdi mdi-circle-medium me-1\"></i> Data <b>Jalan Arteri</b> menggunakan data pergerakan kendaraan masuk dan keluar Jakarta harian pada 48 Ruas Jalan.</li>     <li><i class=\"mdi mdi-circle-medium me-1\"></i> Data berlabel <b>Merah</b> menunjukkan jumlah data tertinggi pada masing - masing Moda Transportasi.</li> </ul>",
 *                     "flag": 1
 *                     }
 *       "400":
 *         description: Invalid request parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Invalid date format"
 *       "500":
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */
