/**
 * @openapi
 * '/v2/regional':
 *   get:
 *     tags:
 *       - v2 Regional
 *     summary: Get detail regional routine data for specified date range and id location v2
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: idLokasi
 *         schema:
 *           type: string
 *         required: false
 *         description: Id lokasi
 *       - in: query
 *         name: tanggalAwal1
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date for the data query (format YYYY-MM-DD)
 *       - in: query
 *         name: tanggalAkhir1
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: End date for the data query (format YYYY-MM-DD)
 *       - in: query
 *         name: namaProvinsi
 *         required: false
 *         schema:
 *           type: string
 *         description: Filter by province name (optional)
 *       - in: query
 *         name: moda
 *         required: true
 *         schema:
 *           type: string
 *         description: Optional type parameter for determine which moda to use
 *       - in: query
 *         name: reportType
 *         required: true
 *         schema:
 *           type: string
 *         description: Type of report to generate (e.g., "daily", "weekly", "monthly", "yearly")
 *       - in: query
 *         name: event
 *         schema:
 *           type: string
 *         description: Event to aggregate seasonal data for (optional)
 *     responses:
 *       200:
 *         description: Successfully retrieved regional routine data
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
 *                   example: Success
 *                 data:
 *                   type: object
 *                   properties:
 *                     graph:
 *                       type: object
 *                       properties:
 *                         daily:
 *                           type: object
 *                           additionalProperties:
 *                             type: object
 *                             properties:
 *                               arrival:
 *                                 type: integer
 *                                 example: 1026
 *                               departure:
 *                                 type: integer
 *                                 example: 1628
 *                               vehicleArrival:
 *                                 type: integer
 *                                 example: 296
 *                               vehicleDeparture:
 *                                 type: integer
 *                                 example: 298
 *                         weekly:
 *                           type: object
 *                           additionalProperties:
 *                             type: object
 *                             properties:
 *                               arrival:
 *                                 type: integer
 *                                 example: 1026
 *                               departure:
 *                                 type: integer
 *                                 example: 1628
 *                               vehicleArrival:
 *                                 type: integer
 *                                 example: 296
 *                               vehicleDeparture:
 *                                 type: integer
 *                                 example: 298
 *                         monthly:
 *                           type: object
 *                           additionalProperties:
 *                             type: object
 *                             properties:
 *                               arrival:
 *                                 type: integer
 *                                 example: 1026
 *                               departure:
 *                                 type: integer
 *                                 example: 1628
 *                               vehicleArrival:
 *                                 type: integer
 *                                 example: 296
 *                               vehicleDeparture:
 *                                 type: integer
 *                                 example: 298
 *                         yearly:
 *                           type: object
 *                           additionalProperties:
 *                             type: object
 *                             properties:
 *                               arrival:
 *                                 type: integer
 *                                 example: 1026
 *                               departure:
 *                                 type: integer
 *                                 example: 1628
 *                               vehicleArrival:
 *                                 type: integer
 *                                 example: 296
 *                               vehicleDeparture:
 *                                 type: integer
 *                                 example: 298
 *                     total:
 *                       type: object
 *                       properties:
 *                         departure:
 *                           type: integer
 *                           example: 20424
 *                         arrival:
 *                           type: integer
 *                           example: 309
 *                         vehicleDeparture:
 *                           type: integer
 *                           example: 1595
 *                         vehicleArrival:
 *                           type: integer
 *                           example: 19
 *                     list:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           idLocation:
 *                             type: string
 *                             example: "9"
 *                           province:
 *                             type: string
 *                             example: "Sumatera Utara"
 *                           name:
 *                             type: string
 *                             example: "Amplas"
 *                           city:
 *                             type: string
 *                             example: "Kota Medan"
 *                           type:
 *                             type: string
 *                             example: "A"
 *                           longitude:
 *                             type: string
 *                             example: "98.7180999664"
 *                           latitude:
 *                             type: string
 *                             example: "3.53917555039"
 *                           coordinate:
 *                             type: string
 *                             example: "3Â° 32' 21,032\" N 98Â° 43' 5,160\" E"
 *                           departure:
 *                             type: integer
 *                             example: 20424
 *                           arrival:
 *                             type: integer
 *                             example: 309
 *                           vehicleDeparture:
 *                             type: integer
 *                             example: 1595
 *                           vehicleArrival:
 *                             type: integer
 *                             example: 19
 *       400:
 *         description: Bad Request - Missing or invalid parameters
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
 *                   example: '"tanggalAwal1" is required'
 *       500:
 *         description: Internal Server Error
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
 *                   example: Internal server error
 */
