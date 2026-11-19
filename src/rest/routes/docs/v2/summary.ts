/**
 * @openapi
 * '/v2/summary':
 *   get:
 *     tags:
 *       - v2 Summary
 *     summary: Mendapatkan ringkasan (summary) data rekap rutin pergerakan penumpang dan sarana per moda transportasi v2
 *     parameters:
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
 *         name: event
 *         required: false
 *         schema:
 *           type: string
 *         description: Filter ID event musiman (opsional, default 0 untuk rutin)
 *     responses:
 *       200:
 *         description: Data ringkasan berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     graph:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                           count:
 *                             type: number
 *                     vehicle:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           type:
 *                             type: string
 *                           name:
 *                             type: string
 *                           count:
 *                             type: number
 *                           percent:
 *                             type: number
 *                     network:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           type:
 *                             type: string
 *                           name:
 *                             type: string
 *                           count:
 *                             type: number
 *                           point:
 *                             type: number
 *                     flight:
 *                       type: object
 *                       properties:
 *                         passengers:
 *                           type: object
 *                         aircraft:
 *                           type: object
 *                     sailing:
 *                       type: object
 *                       properties:
 *                         passengers:
 *                           type: object
 *                         ship:
 *                           type: object
 *                 filter:
 *                   type: object
 *       400:
 *         description: Parameter tidak valid
 *       500:
 *         description: Internal server error
 */
