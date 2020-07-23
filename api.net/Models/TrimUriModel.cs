namespace api.net.Models
{
    using System.Runtime.Serialization;
    [DataContract]
    public class TrimUriModel
    {
        [DataMember]
        public string Address { get; private set; }
        [DataMember]
        public string Trimmed { get; set; }
        public string Print() => Address + "," + Trimmed;
        public TrimUriModel
        (
            string address
        )
        {
            Address = address;
            Trimmed = "";
        }
        public TrimUriModel
        (
            string address,
            string trimmed
        )
        {
            Address = address;
            Trimmed = trimmed;
        }
    }
}
