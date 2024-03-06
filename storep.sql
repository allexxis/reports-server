use HG_SevenFront;
GO
SELECT
        SCHEMA_NAME(sysobject.schema_id),
        OBJECT_NAME(stats.object_id),
        stats.last_execution_time
    FROM
        sys.dm_exec_procedure_stats stats
        INNER JOIN sys.objects sysobject ON sysobject.object_id = stats.object_id
    WHERE
        sysobject.type = 'P'
    ORDER BY
           stats.last_execution_time DESC


begin
    declare @desde datetime = DATEADD(yy, DATEDIFF(yy, 0, GETDATE()), 0)
    declare @hasta datetime = GETDATE()

    exec
        dbo.Estadisticas_Explotacion_Gene
                  @desde,
                  @hasta
end

begin
    declare @desde datetime = '2024-01-01 00:00:00.000'
    declare @hasta datetime = '2024-03-05 00:00:00.000'
    declare @orden int = 0
    declare @id_mone int = 0
    declare @tasa numeric(13, 8) = null
    declare @TipoInforme varchar(100) = ''
    declare @Fil_id_agen bit = null
    declare @vFil_id_agen int = 0
    declare @Fil_id_merc bit = null
    declare @vFil_id_merc int = 0
    declare @Fil_id_cont bit = null
    declare @vFil_id_cont int = 0
    declare @Fil_id_thab bit = null
    declare @vFil_id_thab int = 0
    declare @Fil_id_uhab bit = null
    declare @vFil_id_uhab int = 0
    declare @Fil_tipo bit = null
    declare @vFil_tipo bit = null
    declare @full_ingresos bit = null

    exec
       dbo.DSS_Explotacion
                  @desde,
                  @hasta,
                  @orden,
                  @id_mone,
                  @tasa,
                  @TipoInforme,
                  @Fil_id_agen,
                  @vFil_id_agen,
                  @Fil_id_merc,
                  @vFil_id_merc,
                  @Fil_id_cont,
                  @vFil_id_cont,
                  @Fil_id_thab,
                  @vFil_id_thab,
                  @Fil_id_uhab,
                  @vFil_id_uhab,
                  @Fil_tipo,
                  @vFil_tipo,
                  @full_ingresos

end

begin
    declare @desde datetime = DATEADD(yy, DATEDIFF(yy, 0, GETDATE()), 0)
    declare @hasta datetime = GETDATE()
    declare @id_mone int = 0
    declare @tasa numeric(13, 8) = null
    exec
         dbo.Estadisticas_Explotacion_Otros
                  @desde,
                  @hasta,
                  @id_mone,
                  @tasa

end



begin
    declare @desde datetime = DATEADD(yy, DATEDIFF(yy, 0, GETDATE()), 0)
    declare @hasta datetime = GETDATE()

    exec
    dbo.Estadisticas_Explotacion_Gene
                  @desde,
                  @hasta

end

begin
    declare @vIdUsuario int = 0
    declare @vLangCode varchar(5) = ''

    exec
        dbo.FrontAccordion
                  @vIdUsuario,
                  @vLangCode

end


begin
    declare @desde datetime = DATEADD(yy, DATEDIFF(yy, 0, GETDATE()), 0)
    declare @hasta datetime = GETDATE()
    declare @Orden int = 0
    declare @Id_Mone int = 0
    declare @Tasa numeric(13, 8) = null
    declare @Tipoinforme varchar(100) = ''
    declare @Fil_Id_Agen bit = null
    declare @Vfil_Id_Agen int = 0
    declare @Fil_id_merc bit = null
    declare @vFil_id_merc int = 0
    declare @Fil_id_cont bit = null
    declare @vFil_id_cont int = 0
    declare @Fil_id_thab bit = null
    declare @vFil_id_thab int = 0
    declare @Fil_id_uhab bit = null
    declare @vFil_id_uhab int = 0
    declare @Fil_tipo bit = null
    declare @vFil_tipo bit = null
    declare @full_ingresos bit = null
    declare @ret_fil bit = null

    exec
         dbo.DSS_Pronostico_Explotacion
                  @desde,
                  @hasta,
                  @Orden,
                  @Id_Mone,
                  @Tasa,
                  @Tipoinforme,
                  @Fil_Id_Agen,
                  @Vfil_Id_Agen,
                  @Fil_id_merc,
                  @vFil_id_merc,
                  @Fil_id_cont,
                  @vFil_id_cont,
                  @Fil_id_thab,
                  @vFil_id_thab,
                  @Fil_id_uhab,
                  @vFil_id_uhab,
                  @Fil_tipo,
                  @vFil_tipo,
                  @full_ingresos,
                  @ret_fil

end