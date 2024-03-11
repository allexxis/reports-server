#Este es el procedimiento almacenado que se ejecuta en esta función

```sql
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
```
