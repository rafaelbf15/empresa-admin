namespace EmpresaAdmin.Core.Options
{
    public class AppSettingsConfig
    {
        public string Secret { get; set; }
        public int TokenExpiration { get; set; }
        public string Emissor { get; set; }
        public string ValidoEm { get; set; }
        public int RefreshTokenExpiration { get; set; }
    }
}
