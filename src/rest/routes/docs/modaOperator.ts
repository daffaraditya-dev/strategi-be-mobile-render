/**
 * @openapi
 * /moda/operators/{moda}/routine:
 *   get:
 *     tags:
 *      - Moda
 *     summary: Get list of transportation operators
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: moda
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: dateStart
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date for filtering data
 *       - in: query
 *         name: dateEnd
 *         schema:
 *           type: string
 *           format: date
 *         description: End date for filtering data
 *       - in: query
 *         name: period
 *         schema:
 *           type: string
 *           enum: [weekly, monthly, yearly]
 *         description: Data aggregation period
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search term for filtering operators
 *       - in: query
 *         name: sortColumn
 *         schema:
 *           type: string
 *         description: Define column for sorting
 *       - in: query
 *         name: sortDirection
 *         schema:
 *           type: string
 *         description: Define direction for sorting (asc or desc)
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   logo:
 *                     type: string
 *                     format: uri
 *                   contactPerson:
 *                     type: string
 *                   contactPhone:
 *                     type: string
 *                   contactEmail:
 *                     type: string
 *                   contactLocation:
 *                     type: string
 *                   addressLongLat:
 *                     type: string
 *                   fleetSize:
 *                     type: integer
 *                   passengerCount:
 *                     type: integer
 *                   otpRate:
 *                     type: number
 *                     format: float
 *                     description: On-Time Performance rate in percentage
 *                   documents:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                          type: integer
 *                         name:
 *                          type: string
 *                         type:
 *                          type: string
 *                         fileUrl:
 *                           type: string
 *                           format: uri
 *
 * /moda/operators/{moda}/seasonal:
 *   get:
 *     tags:
 *      - Moda
 *     summary: Get list of transportation operators
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: moda
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: event
 *         schema:
 *           type: string
 *         description: Data aggregation event
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search term for filtering operators
 *       - in: query
 *         name: sortColumn
 *         schema:
 *           type: string
 *         description: Define column for sorting
 *       - in: query
 *         name: sortDirection
 *         schema:
 *           type: string
 *         description: Define direction for sorting (asc or desc)
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   logo:
 *                     type: string
 *                     format: uri
 *                   contactPerson:
 *                     type: string
 *                   contactPhone:
 *                     type: string
 *                   contactEmail:
 *                     type: string
 *                   contactLocation:
 *                     type: string
 *                   addressLongLat:
 *                     type: string
 *                   fleetSize:
 *                     type: integer
 *                   passengerCount:
 *                     type: integer
 *                   otpRate:
 *                     type: number
 *                     format: float
 *                     description: On-Time Performance rate in percentage
 *                   documents:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                          type: integer
 *                         name:
 *                          type: string
 *                         type:
 *                          type: string
 *                         fileUrl:
 *                           type: string
 *                           format: uri
 *
 * /moda/operators/{moda}/fleets:
 *   get:
 *     tags:
 *     - Moda
 *     summary: Get list of fleet operators
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: moda
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *           minimum: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *           minimum: 1
 *         description: Number of items per page
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Filter by search term
 *       - in: query
 *         name: idOperator
 *         required: true
 *         schema:
 *           type: string
 *         description: Id of the operator
 *       - in: query
 *         name: sortColumn
 *         schema:
 *           type: string
 *         description: Define column for sorting
 *       - in: query
 *         name: sortDirection
 *         schema:
 *           type: string
 *         description: Define direction for sorting (asc or desc)
 *     responses:
 *       200:
 *         description: Successfully retrieved fleet records
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
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       location:
 *                         type: string
 *                       longLat:
 *                         type: string
 *                       plateNumber:
 *                         type: string
 *                       brand:
 *                         type: string
 *                       wheelCount:
 *                         type: integer
 *                       maxPassengerCount:
 *                         type: integer
 *                       documents:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                              type: integer
 *                             name:
 *                              type: string
 *                             type:
 *                              type: string
 *                             fileUrl:
 *                               type: string
 *                               format: uri
 *                 count:
 *                   type: integer
 *                   description: Total number of items that match the filter criteria
 *                   example: 50
 *                 page:
 *                   type: integer
 *                   description: Current page number
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   description: Number of items per page
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   description: Total number of pages available
 *                   example: 5
 *       500:
 *         description: Internal server error
 * /moda/operators/{moda}/od:
 *   get:
 *     tags:
 *     - Moda
 *     summary: Get list of od operators
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: moda
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *           minimum: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *           minimum: 1
 *         description: Number of items per page
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Filter by search term
 *       - in: query
 *         name: idOperator
 *         required: true
 *         schema:
 *           type: string
 *         description: Id of the operator
 *     responses:
 *       200:
 *         description: Successfully retrieved fleet records
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
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 *                       origin:
 *                         type: string
 *                       destination:
 *                         type: string
 *                 count:
 *                   type: integer
 *                   description: Total number of items that match the filter criteria
 *                   example: 50
 *                 page:
 *                   type: integer
 *                   description: Current page number
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   description: Number of items per page
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   description: Total number of pages available
 *                   example: 5
 *       500:
 *         description: Internal server error
 */
