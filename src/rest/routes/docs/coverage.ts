/**
 * @openapi
 * components:
 *   schemas:
 *     Streaming:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         idUser:
 *           type: string
 *         lokasiStreaming:
 *           type: string
 *         longitude:
 *           type: number
 *           format: float
 *         latitude:
 *           type: number
 *           format: float
 *         jadwalStreaming:
 *           type: string
 *           format: date-time
 *         judul:
 *           type: string
 *         kategori:
 *           type: string
 *         deskripsi:
 *           type: string
 *         urlYoutubeStreaming:
 *           type: string
 *           format: uri
 *         status:
 *           type: integer
 *         idVerifier:
 *           type: string
 *         reasonReject:
 *           type: string
 *           nullable: true
 *         createDate:
 *           type: string
 *           format: date-time
 *         updateDate:
 *           type: string
 *           format: date-time
 *         createId:
 *           type: string
 *         updateId:
 *           type: string
 *         videoId:
 *           type: string
 *         urlThumbnail:
 *           type: string
 *           format: uri
 *         publishedAt:
 *           type: string
 *           format: date-time
 *         idAkun:
 *           type: string
 *         isActive:
 *           type: integer
 *         statusLive:
 *           type: integer
 *         tipeMedia:
 *           type: string
 *         tipeLokasi:
 *           type: string
 *         matra:
 *           type: string
 *         kontributor:
 *           type: string
 *
 * /coverage:
 *   get:
 *     tags:
 *     - Coverage
 *     summary: Get the list of video coverage
 *     security:
 *       - bearerAuth: []
 *     description: Retrieves a list of video coverage data with details like location, stream URL, and more. You can filter the results based on specific fields.
 *     parameters:
 *       - name: tanggalAwal
 *         in: query
 *         description: Start date for filter by schedule date (optional)
 *         schema:
 *           type: string
 *           format: date
 *       - name: tanggalAkhir
 *         in: query
 *         description: End date for filter by schedule date (optional)
 *         schema:
 *           type: string
 *           format: date
 *       - name: matra
 *         in: query
 *         description: Matra name for filter by matra (optional)
 *         schema:
 *           type: string
 *       - name: kontributor
 *         in: query
 *         description: Contributor name for filter by contributor (optional)
 *         schema:
 *           type: string
 *       - name: tipeLokasi
 *         in: query
 *         description: Location type for filter (optional)
 *         schema:
 *           type: string
 *       - name: tipeMedia
 *         in: query
 *         description: Media type for filter (optional)
 *         schema:
 *           type: string
 *       - name: statusLive
 *         in: query
 *         description: Status live for filter (optional)
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully fetched video coverage
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Streaming'
 *       500:
 *         description: Internal server error
 */
