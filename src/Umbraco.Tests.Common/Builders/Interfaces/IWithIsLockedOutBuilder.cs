﻿using System;

namespace Umbraco.Tests.Common.Builders.Interfaces
{
    public interface IWithIsLockedOutBuilder
    {
        bool? IsLockedOut { get; set; }

        DateTime? LastLockoutDate { get; set; }
    }
}
