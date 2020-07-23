namespace api.net.Models
{
    using System.Runtime.Serialization;
    [DataContract]
    public class PageModel<T>
    {
        [DataMember]
        public int Index { get; private set; }
        [DataMember]
        public int Count { get; private set; }
        [DataMember]
        public T List { get; private set; }
        public PageModel
        (
            int index,
            int size,
            T payload
        )
        {
            Index = index;
            Count = size;
            List = payload;
        }
    }
}
