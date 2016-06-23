using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Umbraco.Core;
using Umbraco.Core.Models;
using Umbraco.Core.PropertyEditors;
using Umbraco.Core.Services;

namespace Umbraco.Web.PropertyEditors
{
    [PropertyEditor(Constants.PropertyEditors.TextboxAlias, "Textbox", "textbox", IsParameterEditor = true, Group = "Common")]
    public class TextboxPropertyEditor : PropertyEditor
    {
        protected override PreValueEditor CreatePreValueEditor()
        {
            return new TextboxPreValueEditor();
        }

        internal class TextboxPreValueEditor : PreValueEditor
        {
            [PreValueField("maxChars", "Maximum characters allowed", "number", Description = "If empty or \"0\" no character limit is set")]
            public int MaxChars { get; set; }

            [PreValueField("showCharsCount", "Show characters count", "boolean", Description = "If maximum characters is set, then count of characters will always be visible")]
            public bool ShowCharsCount { get; set; }
        }
    }
}
