/**
 * @openapi
 * /comparison:
 *   get:
 *     tags:
 *       - Comparison
 *     summary: Compare transportation data
 *     description: Fetches transportation comparison data based on routine or seasonal inputs.
 *     parameters:
 *       - name: tanggalAwal1
 *         in: query
 *         description: Start date for routine data (optional)
 *         schema:
 *           type: string
 *           format: date
 *       - name: tanggalAkhir1
 *         in: query
 *         description: End date for routine data (optional)
 *         schema:
 *           type: string
 *           format: date
 *       - name: event
 *         in: query
 *         description: Event name for seasonal data (optional)
 *         schema:
 *           type: string
 *       - name: idLocation
 *         in: query
 *         description: Location ID for filtering
 *         required: true
 *         schema:
 *           type: integer
 *       - name: moda
 *         in: query
 *         description: Mode of transportation
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: Successful response with comparison data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       moda:
 *                         type: string
 *                         example: "bus"
 *                       idLocation:
 *                         type: integer
 *                         example: 123
 *                       location:
 *                         type: string
 *                         example: "Jakarta"
 *                       arrivalSummary:
 *                         type: integer
 *                         example: 5000
 *                       departureSummary:
 *                         type: integer
 *                         example: 4800
 *                       vehicleArrivalSummary:
 *                         type: integer
 *                         example: 5000
 *                       vehicleDepartureSummary:
 *                         type: integer
 *                         example: 4800
 *                       weekly:
 *                         type: object
 *                         additionalProperties:
 *                           type: object
 *                           properties:
 *                             arrival:
 *                               type: integer
 *                               example: 60000
 *                             departure:
 *                               type: integer
 *                               example: 58000
 *                             vehicleArrival:
 *                               type: integer
 *                               example: 1500
 *                             vehicleDeparture:
 *                               type: integer
 *                               example: 1400
 *                       monthly:
 *                         type: object
 *                         additionalProperties:
 *                           type: object
 *                           properties:
 *                             arrival:
 *                               type: integer
 *                               example: 60000
 *                             departure:
 *                               type: integer
 *                               example: 58000
 *                             vehicleArrival:
 *                               type: integer
 *                               example: 1500
 *                             vehicleDeparture:
 *                               type: integer
 *                               example: 1400
 *                       yearly:
 *                         type: object
 *                         additionalProperties:
 *                           type: object
 *                           properties:
 *                             arrival:
 *                               type: integer
 *                               example: 60000
 *                             departure:
 *                               type: integer
 *                               example: 58000
 *                             vehicleArrival:
 *                               type: integer
 *                               example: 1500
 *                             vehicleDeparture:
 *                               type: integer
 *                               example: 1400
 *                       seasonal:
 *                         type: object
 *                         description: Data for seasonal events (only present if `event` is provided)
 *                         additionalProperties:
 *                           type: object
 *                           properties:
 *                             arrival:
 *                               type: integer
 *                               example: 3000
 *                             departure:
 *                               type: integer
 *                               example: 2800
 *                             vehicleArrival:
 *                               type: integer
 *                               example: 1500
 *                             vehicleDeparture:
 *                               type: integer
 *                               example: 1400
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
 *                   example: "idLocation is required"
 *       "500":
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to fetch focus records"
 */
