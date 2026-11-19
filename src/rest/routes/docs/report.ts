/**
 * @openapi
 * components:
 *   schemas:
 *     Report:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *           readOnly: true
 *         type:
 *           type: string
 *         matra:
 *           type: string
 *           description: Transportation mode (Darat, Laut, Udara, etc.)
 *         event:
 *           type: string
 *         nama:
 *           type: string
 *         personil:
 *           type: string
 *         pengikut:
 *           type: string
 *           description: Comma separated (,)
 *         tanggal:
 *           type: string
 *           format: date
 *         provinsi:
 *           type: string
 *         kabupaten:
 *           type: string
 *         angkutan:
 *           type: string
 *         unitPelayanan:
 *           type: string
 *         deskripsi:
 *           type: string
 *         isKejadianMenonjol:
 *           type: boolean
 *           default: false
 *         kejadianMenonjol:
 *           type: string
 *         koordinatKejadianMenonjol:
 *           type: string
 *         isKecelakaan:
 *           type: boolean
 *           default: false
 *         kecelakaan:
 *           type: string
 *         koordinatKecelakaan:
 *           type: string
 *         lokasiKecelakaan:
 *           type: string
 *         pembuat:
 *           type: string
 *         persetujuan:
 *           type: string
 *         file:
 *           type: string
 *         photo:
 *           type: string
 *         captionPhoto:
 *           type: string
 *         isApproved:
 *           type: boolean
 *         approvedBy:
 *           type: string
 *         approvedDate:
 *           type: string
 *         approvedNotes:
 *           type: string
 *         rejectedBy:
 *           type: string
 *         rejectedDate:
 *           type: string
 *         rejectedReason:
 *           type: string
 *         rejectedAdditionalComments:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *           readOnly: true
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           readOnly: true
 *         kecelakaanList:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Kecelakaan'
 *         cuacaList:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Cuaca'
 *
 *     Kecelakaan:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *           readOnly: true
 *         idLaporanPantau:
 *           type: integer
 *           description: ID of the associated report
 *         matra:
 *           type: string
 *           description: Transportation mode (Darat, Laut, Udara, etc.)
 *         tanggalWaktuKejadian:
 *           type: string
 *           format: date-time
 *           description: Date and time of the accident
 *         jenisKecelakaan:
 *           type: string
 *           description: Type of accident
 *         uraian:
 *           type: string
 *           description: Detailed description of the accident
 *         korbanJiwa:
 *           type: integer
 *           description: Number of fatalities
 *           minimum: 0
 *         lukaBerat:
 *           type: integer
 *           description: Number of seriously injured people
 *           minimum: 0
 *         lukaRingan:
 *           type: integer
 *           description: Number of slightly injured people
 *           minimum: 0
 *         hilang:
 *           type: integer
 *           description: Number of missing people
 *           minimum: 0
 *         selamat:
 *           type: integer
 *           description: Number of survivors
 *           minimum: 0
 *         dampakLingkunganJenis:
 *           type: string
 *           description: Type of environmental impact
 *         dampakLingkunganUraian:
 *           type: string
 *           description: Description of environmental impact
 *         dampakLaluLintasJenis:
 *           type: string
 *           description: Type of traffic impact
 *         dampakLaluLintasUraian:
 *           type: string
 *           description: Description of traffic impact
 *         statusPenanggulanganJenis:
 *           type: string
 *           description: Type of response/mitigation status
 *         statusPenanggulanganUraian:
 *           type: string
 *           description: Description of response/mitigation efforts
 *         lokasi:
 *           type: string
 *           description: Location description of the accident
 *         koordinat:
 *           type: string
 *           description: Geographic coordinates of the accident location
 *         createdAt:
 *           type: string
 *           format: date-time
 *           readOnly: true
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           readOnly: true
 *     Cuaca:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *           readOnly: true
 *         idLaporanPantau:
 *           type: integer
 *           description: ID of the associated report
 *         kondisiCuaca:
 *           type: string
 *           description: Weather condition (e.g., Berangin, Hujan, Cerah)
 *         jarakPandang:
 *           type: number
 *           format: float
 *           description: Visibility distance in kilometers
 *         arahAnginDari:
 *           type: string
 *           description: Wind direction (from)
 *         arahAnginKe:
 *           type: string
 *           description: Wind direction (to)
 *         kecepatanAngin:
 *           type: number
 *           format: float
 *           description: Wind speed in knots
 *         tinggiGelombang:
 *           type: number
 *           format: float
 *           description: Wave height in meters
 *         createdAt:
 *           type: string
 *           format: date-time
 *           readOnly: true
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           readOnly: true
 *
 * /report:
 *   get:
 *     tags:
 *     - Report
 *     summary: Get all reports
 *     security:
 *       - bearerAuth: []
 *     description: Retrieves a list of all reports with optional filtering
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [poskoTerpadu, poskoLapangan, harianPit, mingguanPit, eventPit, piketIm]
 *         description: Filter by type
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Filter by typed keyword
 *       - in: query
 *         name: poskoTerpadu
 *         schema:
 *           type: string
 *         description: Filter by integrated post
 *       - in: query
 *         name: event
 *         schema:
 *           type: string
 *         description: Filter by event
 *       - in: query
 *         name: dateFrom
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter by date range (start)
 *       - in: query
 *         name: dateTo
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter by date range (end)
 *       - in: query
 *         name: isApproved
 *         schema:
 *           type: string
 *         description: Filter status approved (true/false)
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
 *     responses:
 *       '200':
 *         description: Successful operation
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
 *                     $ref: '#/components/schemas/Report'
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
 *   post:
 *     tags:
 *     - Report
 *     summary: Create a new report
 *     security:
 *       - bearerAuth: []
 *     description: Creates a new report with the provided information
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *               matra:
 *                 type: string
 *               event:
 *                 type: string
 *               nama:
 *                 type: string
 *               personil:
 *                 type: string
 *               pengikut :
 *                 type: string
 *                 description: Comma separated (,)
 *               tanggal:
 *                 type: string
 *                 format: date
 *               provinsi:
 *                 type: string
 *               kabupaten:
 *                 type: string
 *               angkutan:
 *                 type: string
 *               unitPelayanan:
 *                 type: string
 *               deskripsi:
 *                 type: string
 *               isKejadianMenonjol:
 *                 type: boolean
 *                 default: false
 *               kejadianMenonjol:
 *                 type: string
 *               koordinatKejadianMenonjol:
 *                 type: string
 *               isKecelakaan:
 *                 type: boolean
 *                 default: false
 *               kecelakaan:
 *                 type: string
 *               koordinatKecelakaan:
 *                 type: string
 *               lokasiKecelakaan:
 *                 type: string
 *               pembuat:
 *                 type: string
 *               persetujuan:
 *                 type: string
 *               file:
 *                 type: string
 *                 format: binary
 *               photo:
 *                 type: string
 *                 format: binary
 *               captionPhoto:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Report created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Report'
 *       '400':
 *         description: Invalid input
 * /report/{id}:
 *   get:
 *     tags:
 *     - Report
 *     summary: Get report by ID
 *     security:
 *       - bearerAuth: []
 *     description: Retrieves a specific report by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the report to retrieve
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Report'
 *       '404':
 *         description: Report not found
 *   put:
 *     tags:
 *     - Report
 *     summary: Update a report
 *     security:
 *       - bearerAuth: []
 *     description: Updates an existing report with new information
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the report to update
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *               matra:
 *                 type: string
 *               event:
 *                 type: string
 *               nama:
 *                 type: string
 *               personil:
 *                 type: string
 *               pengikut :
 *                 type: string
 *                 description: Comma separated (,)
 *               tanggal:
 *                 type: string
 *                 format: date
 *               provinsi:
 *                 type: string
 *               kabupaten:
 *                 type: string
 *               angkutan:
 *                 type: string
 *               unitPelayanan:
 *                 type: string
 *               deskripsi:
 *                 type: string
 *               isKejadianMenonjol:
 *                 type: boolean
 *                 default: false
 *               kejadianMenonjol:
 *                 type: string
 *               koordinatKejadianMenonjol:
 *                 type: string
 *               isKecelakaan:
 *                 type: boolean
 *                 default: false
 *               kecelakaan:
 *                 type: string
 *               koordinatKecelakaan:
 *                 type: string
 *               lokasiKecelakaan:
 *                 type: string
 *               pembuat:
 *                 type: string
 *               persetujuan:
 *                 type: string
 *               file:
 *                 type: string
 *                 format: binary
 *               photo:
 *                 type: string
 *                 format: binary
 *               captionPhoto:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Report updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Report'
 *       '400':
 *         description: Invalid input
 *       '404':
 *         description: Report not found
 *   delete:
 *     tags:
 *     - Report
 *     summary: Delete a report
 *     security:
 *       - bearerAuth: []
 *     description: Deletes a specific report by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the report to delete
 *     responses:
 *       '204':
 *         description: Report deleted successfully
 *       '404':
 *         description: Report not found
 *
 * /report/{idLaporanPantau}/kecelakaan:
 *   post:
 *     tags:
 *     - Report
 *     summary: Create or update a new accident report
 *     security:
 *       - bearerAuth: []
 *     description: Creates or updates a new accident report associated with an existing report
 *     parameters:
 *       - in: path
 *         name: idLaporanPantau
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the report to associate with this accident report
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Kecelakaan'
 *     responses:
 *       '201':
 *         description: Accident report updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Kecelakaan'
 *       '400':
 *         description: Invalid input
 *       '404':
 *         description: Report not found
 *   get:
 *     tags:
 *     - Report
 *     summary: Get all accident reports for a report
 *     security:
 *       - bearerAuth: []
 *     description: Retrieves all accident reports associated with a specific report
 *     parameters:
 *       - in: path
 *         name: idLaporanPantau
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the report to get accident reports for
 *     responses:
 *       '200':
 *         description: Successful operation
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
 *                     $ref: '#/components/schemas/Kecelakaan'
 *       '404':
 *         description: Report not found
 * /report/{idLaporanPantau}/cuaca:
 *   post:
 *     tags:
 *     - Report
 *     summary: Create weather information
 *     security:
 *       - bearerAuth: []
 *     description: Creates weather information associated with an existing report
 *     parameters:
 *       - in: path
 *         name: idLaporanPantau
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the report to associate with this weather information
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cuaca'
 *     responses:
 *       '201':
 *         description: Weather information created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Cuaca'
 *       '400':
 *         description: Invalid input
 *       '404':
 *         description: Report not found
 *   get:
 *     tags:
 *     - Report
 *     summary: Get weather information for a report
 *     security:
 *       - bearerAuth: []
 *     description: Retrieves weather information associated with a specific report
 *     parameters:
 *       - in: path
 *         name: idLaporanPantau
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the report to get weather information for
 *     responses:
 *       '200':
 *         description: Successful operation
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
 *                     $ref: '#/components/schemas/Cuaca'
 *       '404':
 *         description: Report not found
 *
 * '/report/{id}/approve':
 *   post:
 *      tags:
 *        - Report
 *      summary: Approve an report
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *            format: uuid
 *          description: The ID of the report to approve
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                notes:
 *                  type: string
 *                  description: Optional notes regarding the approval
 *      responses:
 *        200:
 *          description: report successfully approved
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  success:
 *                    type: boolean
 *                    example: true
 *                  data:
 *                    type: object
 *                    properties:
 *                      id:
 *                        type: string
 *                      isApproved:
 *                        type: boolean
 *                        example: true
 *                      approvedBy:
 *                        type: string
 *                        format: uuid
 *                      approvedDate:
 *                        type: string
 *                      notes:
 *                        type: string
 *                        description: Notes provided during approval
 *                  message:
 *                    type: string
 *                    example: report successfully approved
 *        500:
 *          description: Server Error
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  success:
 *                    type: boolean
 *                    example: false
 *                  message:
 *                    type: string
 *                    example: Failed to approve report
 *                  statusCode:
 *                    type: number
 *                    example: 500
 *
 * '/report/{id}/reject':
 *   post:
 *      tags:
 *        - Report
 *      summary: Reject an report
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *            format: uuid
 *          description: The ID of the report to reject
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                reason:
 *                  type: string
 *                  description: Reason for rejection
 *                additionalComments:
 *                  type: string
 *                  description: Optional additional comments regarding the rejection
 *      responses:
 *        200:
 *          description: report successfully rejected
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  success:
 *                    type: boolean
 *                    example: true
 *                  data:
 *                    type: object
 *                    properties:
 *                      id:
 *                        type: string
 *                      isApproved:
 *                        type: boolean
 *                        example: true
 *                      rejectedBy:
 *                        type: string
 *                        format: uuid
 *                      rejectedDate:
 *                        type: string
 *                      reason:
 *                        type: string
 *                        description: Reason provided for rejection
 *                      additionalComments:
 *                        type: string
 *                        description: Additional comments provided during rejection
 *                  message:
 *                    type: string
 *                    example: report successfully rejected
 *        500:
 *          description: Server Error
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  success:
 *                    type: boolean
 *                    example: false
 *                  message:
 *                    type: string
 *                    example: Failed to reject report
 *                  statusCode:
 *                    type: number
 *                    example: 500
 *
 * /report/approval:
 *   get:
 *     tags:
 *     - Report
 *     summary: Get all reports need to approve
 *     security:
 *       - bearerAuth: []
 *     description: Retrieves a list of all reports with optional filtering
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [poskoTerpadu, poskoLapangan, harianPit, mingguanPit, eventPit, piketIm]
 *         description: Filter by type
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Filter by typed keyword
 *       - in: query
 *         name: poskoTerpadu
 *         schema:
 *           type: string
 *         description: Filter by integrated post
 *       - in: query
 *         name: event
 *         schema:
 *           type: string
 *         description: Filter by event
 *       - in: query
 *         name: dateFrom
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter by date range (start)
 *       - in: query
 *         name: dateTo
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter by date range (end)
 *       - in: query
 *         name: isApproved
 *         schema:
 *           type: string
 *         description: Filter status approved (true/false)
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
 *     responses:
 *       '200':
 *         description: Successful operation
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
 *                     $ref: '#/components/schemas/Report'
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
 */
