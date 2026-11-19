/**
 * @openapi
 * /performance-report:
 *   get:
 *     tags:
 *     - Performance Report
 *     summary: Fetch Performance Report Data
 *     security:
 *       - bearerAuth: []
 *     description: Retrieves and parses Performance Report data from the specified URL.
 *     parameters:
 *       - name: "tahun"
 *         in: "query"
 *         required: true
 *         schema:
 *           type: "string"
 *       - name: "moda"
 *         in: "query"
 *         required: true
 *         schema:
 *           type: "string"
 *     responses:
 *       200:
 *         description: Successfully retrieved Performance Report data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: "array"
 *                   items:
 *                     type: "object"
 *                     properties:
 *                       pengelola:
 *                         type: "string"
 *                       jumlahSimpul:
 *                         type: "integer"
 *                       jumlahPantau:
 *                         type: "integer"
 *                       simpulMelapor:
 *                         type: "integer"
 *                       laporanMasuk:
 *                         type: "integer"
 *                       targetLaporan:
 *                         type: "integer"
 *                       persentase:
 *                         type: "string"
 *       500:
 *         description: Internal server error
 */
