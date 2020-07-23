namespace api.net.Entities
{
    using System.ComponentModel.DataAnnotations;
    public class TrimUrlEntity
    {
        [Key]
        public long Id { get; set; }
        public string Address { get; set; }
        public string HashCode { get; set; }
        public TrimUrlEntity()
        {

        }
    }
}
