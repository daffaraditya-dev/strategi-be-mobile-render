SELECT dsa.*
            FROM data_sarana_asdp dsa
            LEFT JOIN view_siasati_mst_pelabuhan pa on dsa.id_pelabuhan = pa.id
            LEFT JOIN view_siasati_mst_provinsi p on pa.id_provinsi = p.id
            LEFT JOIN view_siasati_mst_trayek_asdp t on dsa.id_trayek = t.id
            LEFT JOIN view_siasati_mst_pelabuhan tpa on
                (pa.id = t.id_pelabuhan_tujuan and tpa.id = t.id_pelabuhan_tujuan)
                OR (pa.id <> t.id_pelabuhan_tujuan and tpa.id = t.id_pelabuhan_asal)
            LEFT JOIN view_siasati_mst_pelabuhan tpt on
                (pa.id = t.id_pelabuhan_tujuan and tpt.id = t.id_pelabuhan_asal)
                OR (pa.id <> t.id_pelabuhan_tujuan and tpt.id = t.id_pelabuhan_tujuan)
            WHERE (cast(:idProvinsi as int) IS NULL OR p.id = cast(:idProvinsi as int))
                AND (cast(:idPelabuhan as int) IS NULL OR pa.id = cast(:idPelabuhan as int) OR tpa.id = cast(:idPelabuhan as int) OR tpt.id = cast(:idPelabuhan as int))
                AND ((:filterBySimpulUser = false) OR
                        (:filterBySimpulUser = true AND
                            ((cast(:jenis as int) IS NULL AND (pa.id IN (:listIdPelabuhan) OR tpa.id IN (:listIdPelabuhan) OR tpt.id IN (:listIdPelabuhan)))
                                OR (cast(:jenis as int) = 1 AND (cast(:idPelabuhan as int) IS NULL OR tpa.id = cast(:idPelabuhan as int)) AND tpa.id IN (:listIdPelabuhan))
                                OR (cast(:jenis as int) = 2 AND (cast(:idPelabuhan as int) IS NULL OR tpt.id = cast(:idPelabuhan as int)) AND tpt.id IN (:listIdPelabuhan))
                                OR (dsa.is_nihil = 1 AND pa.id IN (:listIdPelabuhan))
                            )
                        )
                    )
                AND (cast(:startDate as date) IS NULL OR dsa.tgl_berangkat >= cast(:startDate as date))
                AND (cast(:endDate as date) IS NULL OR dsa.tgl_berangkat <= cast(:endDate as date))
                AND (cast(:isNihil as int) IS NULL OR dsa.is_nihil = cast(:isNihil as int))
                AND (cast(:isDelete as int) IS NULL OR dsa.is_delete = cast(:isDelete as int))
            ORDER BY
                CASE
                    WHEN dsa.updated_date IS NOT NULL THEN dsa.updated_date
                    ELSE dsa.created_date
                END DESC
            LIMIT :limit OFFSET :offset
