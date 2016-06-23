using Umbraco.Core;
using Umbraco.Core.PropertyEditors;

namespace Umbraco.Web.PropertyEditors
{
    [PropertyEditor(Constants.PropertyEditors.TextboxMultipleAlias, "Textarea", "textarea", IsParameterEditor = true, ValueType = PropertyEditorValueTypes.Text, Icon="icon-application-window-alt")]
    public class TextAreaPropertyEditor : PropertyEditor
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
