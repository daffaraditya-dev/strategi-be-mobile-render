/**
 * @openapi
 * '/incident-report':
 *  post:
 *     tags:
 *     - Incident Report
 *     summary: Create a new incident report
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              required:
 *                - nama
 *                - waktuKejadian
 *                - kronologiKejadian
 *                - lokasi
 *              properties:
 *                nama:
 *                  type: string
 *                  description: Name of the reporter
 *                  example: 'John Doe'
 *                email:
 *                  type: string
 *                  format: email
 *                  description: Email of the reporter
 *                  example: 'john.doe@example.com'
 *                noHp:
 *                  type: string
 *                  description: Reporter's phone number
 *                  example: '081234567890'
 *                waktuKejadian:
 *                  type: string
 *                  description: When the incident occurred
 *                  example: '2024-02-15T14:30:00Z'
 *                kronologiKejadian:
 *                  type: string
 *                  description: Detailed chronology of the incident
 *                  example: 'The vehicle was moving at normal speed when suddenly...'
 *                dataPendukung:
 *                  type: array
 *                  description: Supporting data files (usually file paths or URLs)
 *                  items:
 *                    type: string
 *                  example: ['file1.jpg', 'document.pdf']
 *                lokasi:
 *                  type: string
 *                  description: Location description of the incident
 *                  example: 'Jalan Sudirman No. 123'
 *                longitude:
 *                  type: number
 *                  format: double
 *                  description: Longitude coordinate of the incident
 *                  example: 106.8456
 *                latitude:
 *                  type: number
 *                  format: double
 *                  description: Latitude coordinate of the incident
 *                  example: -6.2088
 *                modaTransportasi:
 *                  type: string
 *                  description: Mode of transportation involved
 *                  example: 'Bus'
 *                kategori:
 *                  type: string
 *                  description: Category of the incident
 *                  example: 'Collision'
 *                unitKerja:
 *                  type: string
 *                  description: Working unit related to the incident
 *                  example: 'North Jakarta Transportation Unit'
 *                laporanKejadianDetail:
 *                  type: object
 *                  required:
 *                    - matra
 *                    - jenisKecelakaan
 *                  properties:
 *                    matra:
 *                      type: string
 *                      description: Military or other relevant sector involved
 *                      example: 'Army'
 *                    picPelapor:
 *                      type: string
 *                      example: 'User Lapor'
 *                    jenisKecelakaan:
 *                      type: string
 *                      description: Type of the accident
 *                      example: 'Car crash'
 *                    saranaTerlibat:
 *                      type: array
 *                      description: Vehicles involved in the incident
 *                      items:
 *                        type: string
 *                      example: ['Bus', 'Car']
 *                    korbanMeninggalDunia:
 *                      type: number
 *                      description: Number of fatalities
 *                      example: 1
 *                    korbanLukaBerat:
 *                      type: number
 *                      description: Number of severely injured people
 *                      example: 2
 *                    korbanLukaSedang:
 *                      type: number
 *                      description: Number of moderately injured people
 *                      example: 3
 *                    korbanLukaRingan:
 *                      type: number
 *                      description: Number of lightly injured people
 *                      example: 4
 *                    korbanHilang:
 *                      type: number
 *                      description: Number of missing people
 *                      example: 0
 *                    korbanSelamat:
 *                      type: number
 *                      description: Number of survivors
 *                      example: 5
 *                    onScheneCommander:
 *                      type: string
 *                      description: Person in charge at the scene
 *                      example: 'John Smith'
 *                    kerusakanFisik:
 *                      type: string
 *                      description: Physical damage caused by the incident
 *                      example: 'Broken windshield'
 *                    dampakLingkungan:
 *                      type: string
 *                      description: Environmental impact of the incident
 *                      example: 'Oil spill'
 *                    dampakLaluLintas:
 *                      type: string
 *                      description: Traffic impact of the incident
 *                      example: 'Severe traffic jam'
 *                    statusPenanggulangan:
 *                      type: string
 *                      description: Status of the incident handling
 *                      example: 'Under investigation'
 *                    laporanFinal:
 *                      type: string
 *                      description: Final report status
 *                      example: 'Complete'
 *                    isApproved:
 *                      type: boolean
 *                      description: Approval status of the report
 *                      example: false
 *                    approvedBy:
 *                      type: string
 *                      description: Name of the person who approved the report
 *                      example: 'Jane Doe'
 *                    approvedDate:
 *                      type: string
 *                      description: Date of approval
 *                    notes:
 *                      type: string
 *                      description: Additional notes
 *                      example: 'Witnesses confirmed the details'
 *                    rejectedBy:
 *                      type: string
 *                      description: Name of the person who rejected the report
 *                      example: 'Jack Daniels'
 *       responses:
 *         201:
 *           description: Successfully created incident report
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                       description: Unique identifier for the incident report
 *                     nama:
 *                       type: string
 *                       description: Name of the reporter
 *                     email:
 *                       type: string
 *                       description: Email of the reporter
 *                     noHp:
 *                       type: string
 *                       description: Reporter's phone number
 *                     waktuKejadian:
 *                       type: string
 *                       description: When the incident occurred
 *                     kronologiKejadian:
 *                       type: string
 *                       description: Detailed chronology of the incident
 *                     dataPendukung:
 *                       type: array
 *                       items:
 *                         type: string
 *                       description: Supporting data files
 *                     lokasi:
 *                       type: string
 *                       description: Location description of the incident
 *                     longitude:
 *                       type: number
 *                       description: Longitude coordinate of the incident
 *                     latitude:
 *                       type: number
 *                       description: Latitude coordinate of the incident
 *                     modaTransportasi:
 *                       type: string
 *                       description: Mode of transportation involved
 *                     kategori:
 *                       type: string
 *                       description: Category of the incident
 *                     unitKerja:
 *                       type: string
 *                       description: Working unit related to the incident
 *                     createDate:
 *                       type: string
 *                       description: When the report was created
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["\"nama\" is required", "\"waktuKejadian\" must be a valid ISO 8601 date"]
 *                 statusCode:
 *                   type: number
 *                   example: 400
 *       500:
 *         description: Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to create laporan kejadian"
 *                 statusCode:
 *                   type: number
 *                   example: 500
 *  get:
 *     tags:
 *     - Incident Report
 *     summary: Get a paginated list of incident report with optional filtering
 *     security:
 *       - bearerAuth: []
 *     parameters:
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
 *         name: status
 *         schema:
 *           type: integer
 *         description: Filter by report status
 *       - in: query
 *         name: moda
 *         schema:
 *           type: string
 *         description: Filter by transportation mode
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date for filtering (ISO format)
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: End date for filtering (ISO format, must be >= startDate)
 *       - in: query
 *         name: dateField
 *         schema:
 *           type: string
 *           enum: [waktuKejadian, createDate, updateDate, verifyDate, waktuTindaklanjut]
 *           default: waktuKejadian
 *         description: Specifies which date field to filter by
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *           enum: [kecelakaan, kejadian menonjol]
 *         description: Specifies which date field to filter by
 *     responses:
 *       200:
 *         description: Successfully retrieved incident report
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
 *                         format: uuid
 *                       nama:
 *                         type: string
 *                       email:
 *                         type: string
 *                         format: email
 *                       noHp:
 *                         type: string
 *                       waktuKejadian:
 *                         type: string
 *                       kronologiKejadian:
 *                         type: string
 *                       dataPendukung:
 *                         type: array
 *                         items:
 *                           type: string
 *                       lokasi:
 *                         type: string
 *                       longitude:
 *                         type: number
 *                         format: float
 *                       latitude:
 *                         type: number
 *                         format: float
 *                       status:
 *                         type: number
 *                       idVerifier:
 *                         type: string
 *                         format: uuid
 *                       keterangan:
 *                         type: string
 *                       modaTransportasi:
 *                         type: string
 *                       kategori:
 *                         type: string
 *                       createDate:
 *                         type: string
 *                       updateDate:
 *                         type: string
 *                       laporanKejadianDetail:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             format: uuid
 *                           idLaporanKejadian:
 *                             type: string
 *                             format: uuid
 *                           matra:
 *                             type: string
 *                           picPelapor:
 *                             type: string
 *                           jenisKecelakaan:
 *                             type: string
 *                           saranaTerlibat:
 *                             type: array
 *                             items:
 *                               type: string
 *                           korbanMeninggalDunia:
 *                             type: number
 *                           korbanLukaBerat:
 *                             type: number
 *                           korbanLukaSedang:
 *                             type: number
 *                           korbanLukaRingan:
 *                             type: number
 *                           korbanHilang:
 *                             type: number
 *                           korbanSelamat:
 *                             type: number
 *                           onScheneCommander:
 *                             type: string
 *                           kerusakanFisik:
 *                             type: string
 *                           dampakLingkungan:
 *                             type: string
 *                           dampakLaluLintas:
 *                             type: string
 *                           statusPenanggulangan:
 *                             type: string
 *                           laporanFinal:
 *                             type: string
 *                           createDate:
 *                             type: string
 *                           updateDate:
 *                             type: string
 *                           isApproved:
 *                             type: boolean
 *                           approvedBy:
 *                             type: string
 *                             format: uuid
 *                           approvedDate:
 *                             type: string
 *                           notes:
 *                             type: string
 *                           rejectedBy:
 *                             type: string
 *                             format: uuid
 *                           reason:
 *                             type: string
 *                           additionalComments:
 *                             type: string
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
 *       400:
 *         description: Bad Request - Invalid filter parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["\"endDate\" must be greater than or equal to \"startDate\""]
 *                 statusCode:
 *                   type: number
 *                   example: 400
 *       500:
 *         description: Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Failed to fetch laporan kejadian
 *                 statusCode:
 *                   type: number
 *                   example: 500
 * '/incident-report/{id}':
 *  get:
 *     tags:
 *     - Incident Report
 *     summary: Get detailed information about a specific incident report
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The ID of the incident report to retrieve
 *     responses:
 *       200:
 *         description: Successfully retrieved the incident report
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                     nama:
 *                       type: string
 *                     email:
 *                       type: string
 *                       format: email
 *                     noHp:
 *                       type: string
 *                     waktuKejadian:
 *                       type: string
 *                     kronologiKejadian:
 *                       type: string
 *                     dataPendukung:
 *                       type: array
 *                       items:
 *                         type: string
 *                     lokasi:
 *                       type: string
 *                     longitude:
 *                       type: number
 *                       format: float
 *                     latitude:
 *                       type: number
 *                       format: float
 *                     status:
 *                       type: number
 *                     idVerifier:
 *                       type: string
 *                       format: uuid
 *                     keterangan:
 *                       type: string
 *                     modaTransportasi:
 *                       type: string
 *                     kategori:
 *                       type: string
 *                     createDate:
 *                       type: string
 *                     updateDate:
 *                       type: string
 *                     updateLokasi:
 *                       type: string
 *                     updateLongitude:
 *                       type: number
 *                       format: float
 *                     updateLatitude:
 *                       type: number
 *                       format: float
 *                     unitKerja:
 *                       type: string
 *                     verifyDate:
 *                       type: string
 *                     idTindaklanjut:
 *                       type: string
 *                       format: uuid
 *                     statusKejadian:
 *                       type: number
 *                     tindakLanjut:
 *                       type: string
 *                     dataPendukungTindaklanjut:
 *                       type: array
 *                       items:
 *                         type: string
 *                     waktuTindaklanjut:
 *                       type: string
 *                     laporanKejadianDetail:
 *                       type: object
 *                       properties:
 *                           id:
 *                             type: string
 *                             format: uuid
 *                           idLaporanKejadian:
 *                             type: string
 *                             format: uuid
 *                           matra:
 *                             type: string
 *                           picPelapor:
 *                             type: string
 *                           jenisKecelakaan:
 *                             type: string
 *                           saranaTerlibat:
 *                             type: array
 *                             items:
 *                               type: string
 *                           korbanMeninggalDunia:
 *                             type: number
 *                           korbanLukaBerat:
 *                             type: number
 *                           korbanLukaSedang:
 *                             type: number
 *                           korbanLukaRingan:
 *                             type: number
 *                           korbanHilang:
 *                             type: number
 *                           korbanSelamat:
 *                             type: number
 *                           onScheneCommander:
 *                             type: string
 *                           kerusakanFisik:
 *                             type: string
 *                           dampakLingkungan:
 *                             type: string
 *                           dampakLaluLintas:
 *                             type: string
 *                           statusPenanggulangan:
 *                             type: string
 *                           laporanFinal:
 *                             type: string
 *                           createDate:
 *                             type: string
 *                           updateDate:
 *                             type: string
 *                           isApproved:
 *                             type: boolean
 *                           approvedBy:
 *                             type: string
 *                             format: uuid
 *                           approvedDate:
 *                             type: string
 *                           notes:
 *                             type: string
 *                           rejectedBy:
 *                             type: string
 *                             format: uuid
 *                           reason:
 *                             type: string
 *                           additionalComments:
 *                             type: string
 *       404:
 *         description: Incident report not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Laporan kejadian not found
 *                 statusCode:
 *                   type: number
 *                   example: 404
 *       500:
 *         description: Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Failed to fetch laporan kejadian
 *                 statusCode:
 *                   type: number
 *                   example: 500
 *  put:
 *     tags:
 *     - Incident Report
 *     summary: Update an existing incident report
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The ID of the incident report to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nama
 *               - waktuKejadian
 *               - kronologiKejadian
 *               - lokasi
 *             properties:
 *               nama:
 *                 type: string
 *                 description: Name of the reporter
 *                 example: 'John Doe'
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email of the reporter
 *                 example: 'john.doe@example.com'
 *               noHp:
 *                 type: string
 *                 description: Reporter's phone number
 *                 example: '081234567890'
 *               waktuKejadian:
 *                 type: string
 *                 description: When the incident occurred
 *                 example: '2024-02-15T14:30:00Z'
 *               kronologiKejadian:
 *                 type: string
 *                 description: Detailed chronology of the incident
 *                 example: 'The vehicle was moving at normal speed when suddenly...'
 *               dataPendukung:
 *                 type: array
 *                 description: Supporting data files (usually file paths or URLs)
 *                 items:
 *                   type: string
 *                 example: ['file1.jpg', 'document.pdf']
 *               lokasi:
 *                 type: string
 *                 description: Location description of the incident
 *                 example: 'Jalan Sudirman No. 123'
 *               longitude:
 *                 type: number
 *                 format: double
 *                 description: Longitude coordinate of the incident
 *                 example: 106.8456
 *               latitude:
 *                 type: number
 *                 format: double
 *                 description: Latitude coordinate of the incident
 *                 example: -6.2088
 *               modaTransportasi:
 *                 type: string
 *                 description: Mode of transportation involved
 *                 example: 'Bus'
 *               kategori:
 *                 type: string
 *                 description: Category of the incident
 *                 example: 'Collision'
 *               unitKerja:
 *                 type: string
 *                 description: Working unit related to the incident
 *                 example: 'North Jakarta Transportation Unit'
 *               laporanKejadianDetail:
 *                 type: object
 *                 required:
 *                   - matra
 *                   - jenisKecelakaan
 *                 properties:
 *                   matra:
 *                     type: string
 *                     description: Military or other relevant sector involved
 *                     example: 'Army'
 *                   picPelapor:
 *                     type: string
 *                     example: 'User Lapor'
 *                   jenisKecelakaan:
 *                     type: string
 *                     description: Type of the accident
 *                     example: 'Car crash'
 *                   saranaTerlibat:
 *                     type: array
 *                     description: Vehicles involved in the incident
 *                     items:
 *                       type: string
 *                     example: ['Bus', 'Car']
 *                   korbanMeninggalDunia:
 *                     type: number
 *                     description: Number of fatalities
 *                     example: 1
 *                   korbanLukaBerat:
 *                     type: number
 *                     description: Number of severely injured people
 *                     example: 2
 *                   korbanLukaSedang:
 *                     type: number
 *                     description: Number of moderately injured people
 *                     example: 3
 *                   korbanLukaRingan:
 *                     type: number
 *                     description: Number of lightly injured people
 *                     example: 4
 *                   korbanHilang:
 *                     type: number
 *                     description: Number of missing people
 *                     example: 0
 *                   korbanSelamat:
 *                     type: number
 *                     description: Number of survivors
 *                     example: 5
 *                   onScheneCommander:
 *                     type: string
 *                     description: Person in charge at the scene
 *                     example: 'John Smith'
 *                   kerusakanFisik:
 *                     type: string
 *                     description: Physical damage caused by the incident
 *                     example: 'Broken windshield'
 *                   dampakLingkungan:
 *                     type: string
 *                     description: Environmental impact of the incident
 *                     example: 'Oil spill'
 *                   dampakLaluLintas:
 *                     type: string
 *                     description: Traffic impact of the incident
 *                     example: 'Severe traffic jam'
 *                   statusPenanggulangan:
 *                     type: string
 *                     description: Status of the incident handling
 *                     example: 'Under investigation'
 *                   laporanFinal:
 *                     type: string
 *                     description: Final report status
 *                     example: 'Complete'
 *                   isApproved:
 *                     type: boolean
 *                     description: Approval status of the report
 *                     example: false
 *                   approvedBy:
 *                     type: string
 *                     description: Name of the person who approved the report
 *                     example: 'Jane Doe'
 *                   approvedDate:
 *                     type: string
 *                     description: Date of approval
 *                     example: '2024-02-18T09:00:00Z'
 *                   notes:
 *                     type: string
 *                     description: Additional notes
 *                     example: 'Witnesses confirmed the details'
 *                   rejectedBy:
 *                     type: string
 *                     description: Name of the person who rejected the report
 *                     example: 'Jack Daniels'
 *     responses:
 *       200:
 *         description: Incident report updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                     nama:
 *                       type: string
 *                     email:
 *                       type: string
 *                       format: email
 *                     noHp:
 *                       type: string
 *                     waktuKejadian:
 *                       type: string
 *                     kronologiKejadian:
 *                       type: string
 *                     dataPendukung:
 *                       type: array
 *                       items:
 *                         type: string
 *                     lokasi:
 *                       type: string
 *                     longitude:
 *                       type: number
 *                       format: float
 *                     latitude:
 *                       type: number
 *                       format: float
 *                     status:
 *                       type: number
 *                     idVerifier:
 *                       type: string
 *                       format: uuid
 *                     keterangan:
 *                       type: string
 *                     modaTransportasi:
 *                       type: string
 *                     kategori:
 *                       type: string
 *                     createDate:
 *                       type: string
 *                     updateDate:
 *                       type: string
 *                     updateLokasi:
 *                       type: string
 *                     updateLongitude:
 *                       type: number
 *                       format: float
 *                     updateLatitude:
 *                       type: number
 *                       format: float
 *                     unitKerja:
 *                       type: string
 *                     verifyDate:
 *                       type: string
 *                     idTindaklanjut:
 *                       type: string
 *                       format: uuid
 *                     statusKejadian:
 *                       type: number
 *                     tindakLanjut:
 *                       type: string
 *                     dataPendukungTindaklanjut:
 *                       type: array
 *                       items:
 *                         type: string
 *                     waktuTindaklanjut:
 *                       type: string
 *                     updateWaktuKejadian:
 *                       type: string
 *                     updateKronologiKejadian:
 *                       type: string
 *                     updateDataPendukung:
 *                       type: array
 *                       items:
 *                         type: string
 *                     nextUpdateModaTransportasi:
 *                       type: string
 *                     nextUpdateKategori:
 *                       type: string
 *                     nextUpdateLokasi:
 *                       type: string
 *                     nextUpdateLongitude:
 *                       type: number
 *                       format: float
 *                     nextUpdateLatitude:
 *                       type: number
 *                       format: float
 *                     nextUpdateWaktuKejadian:
 *                       type: string
 *                     nextUpdateKronologiKejadian:
 *                       type: string
 *                     nextUpdateKeterangan:
 *                       type: string
 *       400:
 *         description: Bad Request - Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["Invalid email format", "Field noHp exceeds maximum length of 15 characters"]
 *                 statusCode:
 *                   type: number
 *                   example: 400
 *       404:
 *         description: Incident report not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Laporan kejadian not found
 *                 statusCode:
 *                   type: number
 *                   example: 404
 *       500:
 *         description: Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Failed to update laporan kejadian
 *                 statusCode:
 *                   type: number
 *                   example: 500
 *  delete:
 *     tags:
 *     - Incident Report
 *     summary: Delete an existing incident report
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The ID of the incident report to delete
 *     responses:
 *       200:
 *         description: Incident report successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Laporan kejadian successfully deleted
 *       404:
 *         description: Incident report not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Laporan kejadian not found
 *                 statusCode:
 *                   type: number
 *                   example: 404
 *       500:
 *         description: Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Failed to delete laporan kejadian
 *                 statusCode:
 *                   type: number
 *                   example: 500
 * '/incident-report/{id}/approve':
 *  post:
 *     tags:
 *     - Incident Report
 *     summary: Approve an incident report
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The ID of the incident report to approve
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - approvedBy
 *             properties:
 *               approvedBy:
 *                 type: string
 *                 format: uuid
 *                 description: ID of the user approving the report
 *               notes:
 *                 type: string
 *                 description: Optional notes regarding the approval
 *     responses:
 *       200:
 *         description: Incident report successfully approved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                     isApproved:
 *                       type: boolean
 *                       example: true
 *                     approvedBy:
 *                       type: string
 *                       format: uuid
 *                     approvedDate:
 *                       type: string
 *                     notes:
 *                       type: string
 *                       description: Notes provided during approval
 *                 message:
 *                   type: string
 *                   example: Incident report successfully approved
 *       400:
 *         description: Bad Request - Missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["\"approvedBy\" is required"]
 *                 statusCode:
 *                   type: number
 *                   example: 400
 *       404:
 *         description: Incident report not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Laporan kejadian not found
 *                 statusCode:
 *                   type: number
 *                   example: 404
 *       409:
 *         description: Incident report already approved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Incident report already approved
 *                 statusCode:
 *                   type: number
 *                   example: 409
 *       500:
 *         description: Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Failed to approve incident report
 *                 statusCode:
 *                   type: number
 *                   example: 500
 * '/incident-report/{id}/reject':
 *  post:
 *     tags:
 *     - Incident Report
 *     summary: Reject an incident report
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The ID of the incident report to reject
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - rejectedBy
 *               - reason
 *             properties:
 *               rejectedBy:
 *                 type: string
 *                 format: uuid
 *                 description: ID of the user rejecting the report
 *               reason:
 *                 type: string
 *                 description: Reason for rejection
 *               additionalComments:
 *                 type: string
 *                 description: Optional additional comments regarding the rejection
 *     responses:
 *       200:
 *         description: Incident report successfully rejected
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                     isRejected:
 *                       type: boolean
 *                       example: true
 *                     rejectedBy:
 *                       type: string
 *                       format: uuid
 *                     rejectedDate:
 *                       type: string
 *                     reason:
 *                       type: string
 *                       description: Reason provided for rejection
 *                     additionalComments:
 *                       type: string
 *                       description: Additional comments provided during rejection
 *                 message:
 *                   type: string
 *                   example: Incident report successfully rejected
 *       400:
 *         description: Bad Request - Missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["\"rejectedBy\" is required", "\"reason\" is required"]
 *                 statusCode:
 *                   type: number
 *                   example: 400
 *       404:
 *         description: Incident report not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Laporan kejadian not found
 *                 statusCode:
 *                   type: number
 *                   example: 404
 *       409:
 *         description: Incident report already processed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Incident report already approved or rejected
 *                 statusCode:
 *                   type: number
 *                   example: 409
 *       500:
 *         description: Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Failed to reject incident report
 *                 statusCode:
 *                   type: number
 *                   example: 500
 */
