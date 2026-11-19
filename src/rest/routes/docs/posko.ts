/**
 * @openapi
 * components:
 *   schemas:
 *     Coordinates:
 *       type: object
 *       properties:
 *         x:
 *           type: number
 *           format: double
 *           example: 106.8456
 *         y:
 *           type: number
 *           format: double
 *           example: -6.2088
 *
 *     JenisPosko:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         nama:
 *           type: string
 *           example: "Mobilitas Penumpang"
 *         status:
 *           type: boolean
 *           example: true
 *
 *     PesertaPosko:
 *       type: object
 *       nullable: true
 *       properties:
 *         id:
 *           type: integer
 *           example: 10
 *         nama:
 *           type: string
 *           example: "Asosiasi Radio Amatir"
 *         status:
 *           type: boolean
 *           example: true
 *
 *     Event:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 19
 *         nama:
 *           type: string
 *           example: "ANGKUTAN NATARU 2024/2025"
 *         tipe:
 *           type: string
 *           example: "NATAL"
 *         tanggalMulai:
 *           type: string
 *           format: date
 *           example: "2024-12-18"
 *         tanggalSelesai:
 *           type: string
 *           format: date
 *           example: "2025-01-05"
 *         prevEvent:
 *           type: string
 *           example: "[13]"
 *         h1:
 *           type: string
 *           format: date
 *           example: "2024-12-25"
 *         subNama:
 *           type: string
 *           example: "Titik Sesuai Rencana Operasi"
 *         noteNarasi:
 *           type: string
 *         splitPeriode:
 *           type: string
 *           example: "[[\"2024-12-18\",\"2024-12-27\"],[\"2024-12-28\",\"2025-01-05\"]]"
 *         flag:
 *           type: integer
 *           example: 1
 * 
 *     LampiranPosko:
 *       type: object
 *       properties:
 *         filename:
 *           type: string
 *           example: "1756122875319-blue_betta_fish.jpg"
 *         originalname:
 *           type: string
 *           example: "blue betta fish.jpg"
 *         size:
 *           type: integer
 *           example: 45893
 *         mimetype:
 *           type: string
 *           example: "image/jpeg"
 *         destination:
 *           type: string
 *           example: "/app/src/uploads"
 *         fileURL:
 *           type: string
 *           example: "http://localhost:3003/v1/mob/api/uploads/1756122875319-blue_betta_fish.jpg"
 *
 *     Posko:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         idJenisPosko:
 *           type: integer
 *           example: 1
 *         idEvent:
 *           type: integer
 *           example: 19
 *         namaPosko:
 *           type: string
 *           example: "Posko A"
 *         alamatPosko:
 *           type: string
 *           example: "Jl. Merdeka No. 1"
 *         unitKerjaKoordinator:
 *           type: string
 *           example: "Unit 1"
 *         idPesertaPosko:
 *           type: integer
 *           example: 10
 *         koordinatorPosko:
 *           type: string
 *           example: "John Doe"
 *         lokasiPosko:
 *           type: string
 *           example: "Jl. Merdeka No. 1"
 *         koordinatPosko:
 *           $ref: '#/components/schemas/Coordinates'
 *         ketuaPosko:
 *           type: string
 *           example: "Ketua A"
 *         noTelpKetuaPosko:
 *           type: string
 *           example: "081234567890"
 *         picPosko:
 *           type: string
 *           example: "PIC A"
 *         noTelpPosko:
 *           type: string
 *           example: "081234567891"
 *         masaPantauAwal:
 *           type: string
 *           format: date
 *           example: "2024-12-18"
 *         masaPantauAkhir:
 *           type: string
 *           format: date
 *           example: "2024-12-18"
 *         titikPantau:
 *           type: string
 *           example: "Jakarta"
 *         fokusPantau:
 *           type: array
 *           items:
 *             type: string
 *           example: ["Fokus A"]
 *         createDate:
 *           type: string
 *         updateDate:
 *           type: string
 *           nullable: true
 *         jenisPosko:
 *           $ref: '#/components/schemas/JenisPosko'
 *         pesertaPosko:
 *           $ref: '#/components/schemas/PesertaPosko'
 *         lampiran:
 *           type: array
 *           items: 
 *             $ref: '#/components/schemas/LampiranPosko'
 *         event:
 *           $ref: '#/components/schemas/Event'
 *
 *     PoskoResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         data:
 *           $ref: '#/components/schemas/Posko'
 *         eventList:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Event'
 *
 *     PaginatedPoskoResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Posko'
 *         count:
 *           type: integer
 *           example: 3
 *         page:
 *           type: integer
 *           example: 1
 *         limit:
 *           type: integer
 *           example: 10
 *         totalPages:
 *           type: integer
 *           example: 1
 *
 * /posko:
 *   get:
 *     tags:
 *     - Posko
 *     summary: Get a paginated list of Posko records with optional filtering
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
 *         name: idJenisPosko
 *         schema:
 *           type: integer
 *         description: Filter by Posko type
 *       - in: query
 *         name: namaPosko
 *         schema:
 *           type: string
 *         description: Filter by Posko name
 *       - in: query
 *         name: idEvent
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Filter by Event ID (UUID)
 *       - in: query
 *         name: masaPantauAwal
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter by monitoring period (ISO format)
 *       - in: query
 *         name: masaPantauAkhir
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter by monitoring period (ISO format)
 *       - in: query
 *         name: titikPantau
 *         schema:
 *           type: string
 *         description: Filter by monitoring point
 *     responses:
 *       200:
 *         description: Successfully retrieved Posko records
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginatedPoskoResponse'
 *       500:
 *         description: Internal server error
 *   post:
 *     tags:
 *     - Posko
 *     summary: Create a new Posko record
 *     security:
 *       - bearerAuth: []
 *     description: Adds a new Posko record to the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idJenisPosko:
 *                 required: true
 *                 type: integer
 *                 example: 1
 *               idEvent:
 *                 required: true
 *                 type: integer
 *                 example: 1
 *               namaPosko:
 *                 type: string
 *                 required: true
 *                 example: "Posko C"
 *               alamatPosko:
 *                 type: string
 *                 example: "Jl. Example 3"
 *               unitKerjaKoordinator:
 *                 type: string
 *                 example: "Unit C"
 *               idPesertaPosko:
 *                 type: integer
 *                 example: 20
 *               koordinatorPosko:
 *                 type: string
 *                 example: "John Doe"
 *               lokasiPosko:
 *                 type: string
 *                 example: "Jl. Example 2"
 *               koordinatPosko:
 *                 type: string
 *                 example: "41.8781, -87.6298"
 *               ketuaPosko:
 *                 type: string
 *                 example: "Charlie Lee"
 *               noTelpKetuaPosko:
 *                 type: string
 *                 example: "+62 812 9876 5432"
 *               picPosko:
 *                 type: string
 *                 example: "David White"
 *               noTelpPosko:
 *                 type: string
 *                 example: "+62 812 5678 4321"
 *               masaPantauAwal:
 *                 type: string
 *                 format: date
 *                 example: "2025-03-01"
 *               masaPantauAkhir:
 *                 type: string
 *                 format: date
 *                 example: "2025-03-01"
 *               titikPantau:
 *                 type: string
 *                 example: "Area C"
 *               fokusPantau:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Surveillance", "Monitoring"]
 *               lampiran:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/LampiranPosko'
 *                 description: File lampiran yang akan diunggah (bisa lebih dari satu)
 *     responses:
 *       201:
 *         description: Successfully created a new Posko record
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 * /posko/{id}:
 *   get:
 *     tags:
 *     - Posko
 *     summary: Get a specific Posko record by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the Posko to retrieve
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Successfully retrieved a single Posko record
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PoskoResponse'
 *   put:
 *     tags:
 *     - Posko
 *     summary: Update an existing Posko record
 *     security:
 *       - bearerAuth: []
 *     description: Updates a specific Posko record identified by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the Posko to update
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idJenisPosko:
 *                 required: true
 *                 type: integer
 *                 example: 1
 *               idEvent:
 *                 required: true
 *                 type: integer
 *                 example: 1
 *               namaPosko:
 *                 required: true
 *                 type: string
 *                 example: "Posko C"
 *               alamatPosko:
 *                 type: string
 *                 example: "Jl. Example 3"
 *               unitKerjaKoordinator:
 *                 type: string
 *                 example: "Unit C"
 *               idPesertaPosko:
 *                 type: integer
 *                 example: 20
 *               koordinatorPosko:
 *                 type: string
 *                 example: "John Doe"
 *               lokasiPosko:
 *                 type: string
 *                 example: "Jl. Example 2"
 *               koordinatPosko:
 *                 type: string
 *                 example: "41.8781, -87.6298"
 *               ketuaPosko:
 *                 type: string
 *                 example: "Charlie Lee"
 *               noTelpKetuaPosko:
 *                 type: string
 *                 example: "+62 812 9876 5432"
 *               picPosko:
 *                 type: string
 *                 example: "David White"
 *               noTelpPosko:
 *                 type: string
 *                 example: "+62 812 5678 4321"
 *               masaPantauAwal:
 *                 type: string
 *                 format: date
 *                 example: "2025-03-01"
 *               masaPantauAkhir:
 *                 type: string
 *                 format: date
 *                 example: "2025-03-01"
 *               titikPantau:
 *                 type: string
 *                 example: "Area C"
 *               fokusPantau:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Surveillance", "Monitoring"]
 *               lampiran:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/LampiranPosko'
 *                 description: File lampiran yang akan diunggah (bisa lebih dari satu)
 *     responses:
 *       200:
 *         description: Successfully updated Posko record
 *       400:
 *         description: Bad request
 *       404:
 *         description: Posko not found
 *       500:
 *         description: Internal server error
 *   delete:
 *     tags:
 *     - Posko
 *     summary: Delete a specific Posko record
 *     security:
 *       - bearerAuth: []
 *     description: Deletes a specific Posko record identified by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the Posko to delete
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Successfully deleted Posko record
 *       404:
 *         description: Posko not found
 *       500:
 *         description: Internal server error
 * /posko/type:
 *   get:
 *     tags:
 *     - Posko
 *     summary: Get list of Posko type
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved Posko type records
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                  example: true
 *                data:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/JenisPosko'
 *       500:
 *         description: Internal server error
 * /posko/participant:
 *   get:
 *     tags:
 *     - Posko
 *     summary: Get list of Posko type
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved Posko participant records
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                  example: true
 *                data:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/PesertaPosko'
 *       500:
 *         description: Internal server error
 */
