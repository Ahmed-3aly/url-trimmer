﻿namespace api.net.Utils
{
    using Microsoft.AspNetCore.Mvc.Formatters;
    using System;
    using System.IO;
    using System.Text;
    using System.Threading.Tasks;
    public class TextPlainFormatter : TextInputFormatter
    {
        public TextPlainFormatter()
        {
            SupportedMediaTypes.Add("text/plain");
        }

        protected override bool CanReadType(
            Type type
        )
        {
            return type == typeof(string);
        }

        public override async Task<InputFormatterResult> ReadAsync(
            InputFormatterContext context
        )
        {
            string data = null;
            using (var streamReader = new StreamReader(
                context.HttpContext.Request.Body))

            {
                data = await streamReader.ReadToEndAsync();
            }

            return InputFormatterResult.Success(data);
        }

        public override Task<InputFormatterResult> ReadRequestBodyAsync(
            InputFormatterContext context,
            Encoding encoding
        )
        {
            throw new NotImplementedException();
        }
    }
}
