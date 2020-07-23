namespace api.net.tests.helpers
{
    using System.Net.Http;
    using System.Net.Http.Headers;
    using System.Threading.Tasks;
    public static class HttpClientExtensions
    {
        public static Task<HttpResponseMessage> PostStringAsync
        (
            this HttpClient httpClient,
            string url,
            string data
        )
        {
            var content = new StringContent(data);
            content.Headers.ContentType = new MediaTypeHeaderValue("text/plain");
            return httpClient.PostAsync(url, content);
        }
    }
}
