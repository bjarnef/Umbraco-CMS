﻿using System.Collections.Generic;
using Umbraco.Core.PropertyEditors;

namespace Umbraco.Web.PropertyEditors
{
    public class MemberPickerConfiguration : ConfigurationEditor
    {
        [ConfigurationField("minNumber", "Minimum number of items", "number")]
        public int MinNumber { get; set; }

        [ConfigurationField("maxNumber", "Maximum number of items", "number")]
        public int MaxNumber { get; set; }

        [ConfigurationField("showOpenButton", "Show open button", "boolean", Description = "Opens the node in a dialog")]
        public bool ShowOpen { get; set; }

        public override IDictionary<string, object> DefaultConfiguration => new Dictionary<string, object>
        {
            { "idType", "udi" }
        };
    }
}
