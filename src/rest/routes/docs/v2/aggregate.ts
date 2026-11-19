/**
 * @openapi
 * '/v2/aggregate':
 *   get:
 *     tags:
 *       - v2 Aggregate
 *     summary: Mendapatkan data agregasi volume penumpang dan sarana per moda transportasi v2
 *     parameters:
 *       - in: query
 *         name: moda
 *         required: true
 *         schema:
 *           type: string
 *         description: Jenis moda transportasi (jalan, asdp, laut, udara, toll, arteri, stasiun)
 *         example: udara
 *       - in: query
 *         name: reportType
 *         required: true
 *         schema:
 *           type: string
 *           enum: [daily, weekly, monthly, yearly]
 *         description: Tipe periode agregasi waktu
 *         example: daily
 *       - in: query
 *         name: tanggalAwal1
 *         required: false
 *         schema:
 *           type: string
 *           format: date
 *         description: Tanggal awal filter (YYYY-MM-DD)
 *         example: "2025-01-01"
 *       - in: query
 *         name: tanggalAkhir1
 *         required: false
 *         schema:
 *           type: string
 *           format: date
 *         description: Tanggal akhir filter (YYYY-MM-DD)
 *         example: "2025-01-07"
 *       - in: query
 *         name: namaProvinsi
 *         required: false
 *         schema:
 *           type: string
 *         description: Filter nama provinsi (opsional)
 *       - in: query
 *         name: idProvinsi
 *         required: false
 *         schema:
 *           type: string
 *         description: Filter ID provinsi (opsional)
 *       - in: query
 *         name: sort
 *         required: false
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Arah sorting
 *       - in: query
 *         name: event
 *         required: false
 *         schema:
 *           type: string
 *         description: Filter ID event musiman (opsional)
 *     responses:
 *       200:
 *         description: Data agregasi berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Data retrived
 *                 data:
 *                   type: object
 *                   properties:
 *                     chart:
 *                       type: object
 *                       properties:
 *                         departure:
 *                           type: array
 *                           items:
 *                             type: object
 *                         arrival:
 *                           type: array
 *                           items:
 *                             type: object
 *                     graph:
 *                       type: object
 *                     total:
 *                       type: object
 *                       properties:
 *                         departure:
 *                           type: number
 *                         arrival:
 *                           type: number
 *                         vehicleDeparture:
 *                           type: number
 *                         vehicleArrival:
 *                           type: number
 *                     chartFlight:
 *                       type: object
 *                     chartSailing:
 *                       type: object
 *                     chartCapacity:
 *                       type: object
 *       400:
 *         description: Validasi parameter input gagal
 *       500:
 *         description: Internal server error
 */
