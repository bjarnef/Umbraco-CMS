using System;
using System.Linq;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Umbraco.Core.Persistence;
using Umbraco.Core.Persistence.Dtos;

namespace Umbraco.Core.Migrations.Upgrade.V_8_8_0.DataTypes
{
    public class UpdateMediaPickerMultiItemsConfiguration : MigrationBase
    {
        public UpdateMediaPickerMultiItemsConfiguration(IMigrationContext context) : base(context)
        { }

        public override void Migrate()
        {
            var sqlDataTypes = Sql()
                .Select<DataTypeDto>()
                .From<DataTypeDto>()
                .Where<DataTypeDto>(x => x.EditorAlias == Constants.PropertyEditors.Aliases.MediaPicker);

            var dataTypes = Database.Fetch<DataTypeDto>(sqlDataTypes).ToList();

            foreach (var datatype in dataTypes.Where(x => !x.Configuration.IsNullOrWhiteSpace()))
            {
                switch (datatype.EditorAlias)
                {
                    case Constants.PropertyEditors.Aliases.MediaPicker:
                        {
                            var config = JsonConvert.DeserializeObject<JObject>(datatype.Configuration);
                            var multiPicker = config.Value<int?>("multiPicker");

                            if (multiPicker.HasValue && multiPicker.Value == 0)
                            {
                                config["minNumber"] = new JValue("0");
                                config["maxNumber"] = new JValue("1");

                                datatype.Configuration = JsonConvert.SerializeObject(config);
                                Database.Update(datatype);
                            }

                            break;
                        }
                }
            }

        }
    }
}
