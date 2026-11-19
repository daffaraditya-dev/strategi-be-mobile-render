/**
 * @openapi
 * components:
 *   schemas:
 *     FileUpload:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         path:
 *           type: string
 *         createdDate:
 *           type: string
 *           format: date-time
 *
 *     LaporanPosko:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         judulLaporan:
 *           type: string
 *         tanggalLaporan:
 *           type: string
 *           format: date
 *         deskripsi:
 *           type: string
 *         eventId:
 *           type: integer
 *         shiftId:
 *           type: integer
 *         posko:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: string
 *         updatedAt:
 *           type: string
 *           format: string
 *         totalKecelakaan:
 *           type: integer
 *         totalMeninggal:
 *           type: integer
 *         totalLukaBerat:
 *           type: integer
 *         totalLukaRingan:
 *           type: integer
 *         totalKerugian:
 *           type: string
 *           format: string
 *         files:
 *           type: array
 *           items:
 *            type: string
 *           example: ["e0c1bcd7-1a32-4c80-a899-84cba1d7c1d1", "a38ff102-6821-4812-a554-5e5b1193d239"]
 *
 *
 * /v2/laporan-posko:
 *   get:
 *     tags:
 *     - V2 Laporan Posko
 *     summary: Get list laporan posko
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: page
 *         in: query
 *         schema:
 *           type: integer
 *       - name: limit
 *         in: query
 *         schema:
 *           type: integer
 *       - name: search
 *         in: query
 *         schema:
 *           type: string
 *       - name: tanggalAwal
 *         in: query
 *         schema:
 *           type: string
 *           format: date
 *       - name: tanggalAkhir
 *         in: query
 *         schema:
 *           type: string
 *           format: date
 *       - name: eventId
 *         in: query
 *         schema:
 *           type: integer
 *       - name: shiftId
 *         in: query
 *         schema:
 *           type: integer
 *       - name: instansi
 *         in: query
 *         schema:
 *            type: string
 *     responses:
 *       200:
 *         description: Successfully fetched laporan posko list
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/LaporanPosko'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: integer
 *                     limit:
 *                       type: integer
 *                     total:
 *                       type: integer
 *
 *
 *   post:
 *     tags:
 *     - V2 Laporan Posko
 *     summary: Create laporan posko
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               judulLaporan:
 *                 type: string
 *               tanggalLaporan:
 *                 type: string
 *                 format: date
 *               deskripsi:
 *                 type: string
 *               uploadedFiles:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["e0c1bcd7-1a32-4c80-a899-84cba1d7c1d1", "a38ff102-6821-4812-a554-5e5b1193d239"]
 *               eventId:
 *                 type: integer
 *               laporanPoskoShiftId:
 *                 type: integer
 *               posko:
 *                 type: string
 *               totalKecelakaan:
 *                 type: integer
 *               totalMeninggal:
 *                 type: integer
 *               totalLukaBerat:
 *                 type: integer
 *               totalLukaRingan:
 *                 type: integer
 *               totalKerugian:
 *                 type: number
 *             example:
 *               judulLaporan: "Kondisi Lalu Lintas"
 *               tanggalLaporan: "2025-12-07"
 *               deskripsi: "Kondisi lancar terkendali"
 *               uploadedFiles: ["e0c1bcd7-1a32-4c80-a899-84cba1d7c1d1"]
 *               eventId: 1
 *               laporanPoskoShiftId: 2
 *               posko: "Posko Utama"
 *               totalKecelakaan: 2
 *               totalMeninggal: 0
 *               totalLukaBerat: 1
 *               totalLukaRingan: 3
 *               totalKerugian: 2000000
 *     responses:
 *       201:
 *         description: Successfully created laporan posko
 *
 *
 * /v2/laporan-posko/{id}:
 *   get:
 *     tags:
 *     - V2 Laporan Posko
 *     summary: Get detail laporan posko
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully fetched detail
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/LaporanPosko'
 *
 *
 *   put:
 *     tags:
 *     - V2 Laporan Posko
 *     summary: Update laporan posko
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               judulLaporan:
 *                 type: string
 *               tanggalLaporan:
 *                 type: string
 *                 format: date
 *               deskripsi:
 *                 type: string
 *               uploadedFiles:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["0c8f81d2-40b1-4fda-935d-351b787aed12"]
 *               eventId:
 *                 type: integer
 *               laporanPoskoShiftId:
 *                 type: integer
 *               posko:
 *                 type: string
 *               totalKecelakaan:
 *                 type: integer
 *               totalMeninggal:
 *                 type: integer
 *               totalLukaBerat:
 *                 type: integer
 *               totalLukaRingan:
 *                 type: integer
 *               totalKerugian:
 *                 type: number
 *             example:
 *               judulLaporan: "Update Kondisi"
 *               tanggalLaporan: "2025-12-08"
 *               deskripsi: "Update kondisi terkini"
 *               uploadedFiles: ["0c8f81d2-40b1-4fda-935d-351b787aed12"]
 *               eventId: 1
 *               laporanPoskoShiftId: 2
 *               posko: "Posko Selatan"
 *               totalKecelakaan: 2
 *               totalMeninggal: 0
 *               totalLukaBerat: 1
 *               totalLukaRingan: 3
 *               totalKerugian: 2000000
 *     responses:
 *       200:
 *         description: Successfully updated laporan posko
 *
 *   delete:
 *     tags:
 *     - V2 Laporan Posko
 *     summary: Soft delete laporan posko
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully deleted laporan posko
 */
